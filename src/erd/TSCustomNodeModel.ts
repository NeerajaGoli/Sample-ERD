import { DefaultPortModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';

export interface TSCustomNodeModelOptions extends BaseModelOptions {
	color?: string;
	table?:any;
	table_name?:any;
}

export class TSCustomNodeModel extends DefaultNodeModel {
	color: string;
	table:any;
	table_name:any;
	constructor(options: TSCustomNodeModelOptions) {
		super({
			...options,
			type: options.table_name
		});
		this.color = options.color || 'red';
		this.table=options.table || [];
		this.table_name=options.table_name || "";

		
		//  in and out port

		for(let i of this.table)
		{
			
			this.addPort(
				new DefaultPortModel({
					in: true,
					name: i.name
				})
			);
			this.addPort(
				new DefaultPortModel({
					in: false,
					name: i.name+"_out"
				})
			);
		}
		
		
		
	}

	getTableName(){
		return this.table_name;
	}
	
}
