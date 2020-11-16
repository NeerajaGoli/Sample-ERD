import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { CustomLink } from "./CustomLink";
import { TSCustomNodeFactory } from "./TSCustomNodeFactory";
import { TSCustomNodeModel } from "./TSCustomNodeModel";
import { AdvancedLinkFactory } from "./link";
import * as React from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export const useERD = (schema: any) => {
  const [engine, setEngine] = React.useState<DiagramEngine>();
  const [model, setModel] = React.useState();
  React.useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    const nodeList: any[] = [];
    const engine = createEngine();

    const model = new DiagramModel();

    let a = 250;
    let b = 50;
    let c = 0;
    let d = 0;
    const tableList: any = [];
    for (let i of schema) {
      engine.getNodeFactories().registerFactory(new TSCustomNodeFactory(i));
      const node = new TSCustomNodeModel({
        color: "rgb(0,192,255)",
        table: i.columns,
        table_name: i.table_name,
      });
      node.setPosition(a, b);
      nodeList.push(node);

      if (!tableList.includes(i.table_name)) {
        tableList.push(i.table_name);
        model.addNode(node);
      }

      a += 300;
      b += 50;
      c = a;
      d = b;
      const tables = i.foreign_keys.map((table: any) => table.toTable);
      for (let j of schema) {
        if (tables.includes(j.table_name) && j.table_name !== i.table_name) {
          engine.getNodeFactories().registerFactory(new TSCustomNodeFactory(j));
          const node = new TSCustomNodeModel({
            color: "rgb(0,192,255)",
            table: j.columns,
            table_name: j.table_name,
          });

          node.serialize();
          node.setPosition(c, d);
          nodeList.push(node);
          if (!tableList.includes(j.table_name)) {
            tableList.push(j.table_name);
            model.addNode(node);

            d += 300;
            a -= 100;
          }
        }
      }
    }

    //adding links using foreign keys
    engine
      .getLinkFactories()
      .registerFactory(
        new AdvancedLinkFactory({ dashed: false, name: "link", label: "1M" })
      );

    for (let i of schema) {
      for (let key of i.foreign_keys) {
        const link = new CustomLink({ name: "link" });

        const nodeFrom = nodeList.filter(
          (node) => node.getTableName() === i.table_name
        );
        const nodeTo = nodeList.filter(
          (node) => node.getTableName() === key.toTable
        );

        nodeFrom[0]
          .getPort(key.fromColumns[0] + "_out")
          .link(nodeFrom[0].getPort(key.fromColumns[0] + "_out"));
        if (i.table_name === key.toTable)
          link.setSourcePort(nodeFrom[0].getPort(key.fromColumns[0]));
        else
          link.setSourcePort(nodeFrom[0].getPort(key.fromColumns[0] + "_out"));
        link.setTargetPort(nodeTo[0].getPort(key.toColumns[0]));
        model.addLink(link);
      }
    }

    engine.setModel(model);
    setEngine(engine);
    setModel(model);
  };

  return {
    engine,
    model,
  };
};

export const getSchema = () => {
  const col = [];
  const tabs = [];
  for (let row = 0; row < 5; row++) {
    col.push({ name: "row" });
  }
  for (let table = 0; table < 2; table++) {
    tabs.push({
      columns: col,
      table_name: `table${table}`,
      foreign_keys:
        table !== 1
          ? [
              {
                toTable: `table${table + 1}`,

                toColumns: ["row"],
                fromColumns: ["row"],
              },
            ]
          : [],
    });
  }
  return tabs;
};
