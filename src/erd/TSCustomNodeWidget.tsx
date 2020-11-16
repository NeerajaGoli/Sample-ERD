import * as React from "react";
import {
  DiagramEngine,
  PortWidget,
  PortModel,
} from "@projectstorm/react-diagrams-core";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { TSCustomNodeModel } from "./TSCustomNodeModel";

export interface TSCustomNodeWidgetProps {
  node: TSCustomNodeModel;
  engine: DiagramEngine;
  table: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: "5px",
      width: "100%",
      minWidth: "240px",
      maxWidth: "240px",
      height: "100%",
      position: "relative",
      boxShadow: "0 10px 10px 0 rgba(48, 49, 51, 0.1)",
      backgroundColor: "white",
    },
    node1: {
      border: `1px solid ${theme.palette.grey[100]}`,
      width: "100%",
      height: "33px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      position: "relative",
      "&:hover": {
        background: theme.palette.grey[100],
      },
    },
    circle: {
      width: "1px",
      height: "20px",
      margin: "2px",
      borderRadius: "4px",
      cursor: "pointer",
     
    },
  })
);

const TSCustomNodeWidget: React.FC<TSCustomNodeWidgetProps> = (
  props: TSCustomNodeWidgetProps
) => {
  const classes = useStyles();

  return (
    <Box>
      <div className={classes.table}>
        <Typography
          variant="body2"
          style={{
            color: "white",
            background: "grey",
            borderRadius: "4px",
            textAlign: "left",
            height: "33px",
            fontWeight: 600,
            padding: "3px 0px 0px 6px",
          }}
        >
          {props.table.table_name}
        </Typography>

        {props.table.columns.map((value: any, index: any) => {
          return (
            <div key={index} className={classes.node1}>
              <PortWidget
                engine={props.engine}
                port={
                  props.node.getPort(value.name) || new PortModel({ name: "" })
                }
              >
                <div className={classes.circle} />
              </PortWidget>

              <div style={{ width: "100%" }}>{value.name}</div>

              <PortWidget
                engine={props.engine}
                port={
                  props.node.getPort(value.name + "_out") ||
                  new PortModel({ name: "" })
                }
              >
                <div className={classes.circle} />
              </PortWidget>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default TSCustomNodeWidget;
