import * as React from 'react';
import { TSCustomNodeModel } from './TSCustomNodeModel';
import  TSCustomNodeWidget  from './TSCustomNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class TSCustomNodeFactory extends AbstractReactFactory<TSCustomNodeModel, DiagramEngine> {
	props:any;
	constructor(props?:any) {
		super(props.table_name);
		this.props=props;
	}

	
	generateModel(initialConfig:any) {
		return new TSCustomNodeModel(this.props.columns);
	}

	generateReactWidget(event:any): JSX.Element {
		return <TSCustomNodeWidget table={this.props} engine={this.engine as DiagramEngine} node={event.model} />;
	}
}
