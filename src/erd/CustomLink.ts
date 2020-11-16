
import { DefaultLinkModel } from '@projectstorm/react-diagrams';

interface ICustomLink {
  name: string;
  label?: any;
}

export class CustomLink extends DefaultLinkModel {
  constructor(options: ICustomLink) {
    super({ type: options.name, width: 1, color: 'grey' });
  }
  addLabel(type:any) {
    super.addLabel(type);
  }

  serialize() {
    return {
      ...super.serialize(),
      selectedColor: 'grey',
    };
  }
}
