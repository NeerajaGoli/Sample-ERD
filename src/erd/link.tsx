import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { CustomLink } from './CustomLink';

interface IAdvancedLinkSegment {
  dashed: boolean;
  label: string;
  model: CustomLink;
  path: string;
}

const AdvancedLinkSegment: React.FC<IAdvancedLinkSegment> = (
  props: IAdvancedLinkSegment,
) => {
  let path: any = React.useRef();
  let text: any = React.useRef();
  let text1: any = React.useRef();

  React.useEffect(() => {
    const callback = () => {
      if (!path) {
        return;
      }

      const startPoint = path.getPointAtLength(path.getTotalLength() * 0.2);
      const endPoint = path.getPointAtLength(path.getTotalLength() * 0.9);
      if (props.label) {
        text.setAttribute('dx', '' + startPoint.x);
        text.setAttribute('dy', '' + startPoint.y);

        text1.setAttribute('dx', '' + endPoint.x);
        text1.setAttribute('dy', '' + endPoint.y);
      }
      requestAnimationFrame(callback);
    };
    requestAnimationFrame(callback);
  });
  return (
    <>
      <path
        fill="none"
        ref={ref => (path = ref)}
        strokeWidth={1}
        stroke={props.model.getOptions().color || 'grey'}
        d={props.path}
        strokeDasharray={props.dashed ? 5 : undefined}
      />

      {props.label && (
        <g fill="black" stroke="none" textAnchor="middle">
          <text
            id="from"
            style={{ fill:props.model.getOptions().color!=='#ffffff'? 'grey':props.model.getOptions().color }}
            ref={ref => (text = ref)}
          >
            {props.label.charAt(0)}
          </text>
          <text
            id="to"
            style={{ fill:props.model.getOptions().color!=='#ffffff'? 'grey':props.model.getOptions().color }}
            ref={ref => (text1 = ref)}
          >
            {props.label.charAt(1)}
          </text>
        </g>
      )}
      </>
  );
};

export default AdvancedLinkSegment;

interface ILinkFactory {
  dashed: boolean;
  name: string;
  label: string;
}
export class AdvancedLinkFactory extends DefaultLinkFactory {
  dashed: boolean = false;
  name: string = '';
  label: string = '';
  constructor(options: ILinkFactory) {
    super(options.name);
    this.dashed = options.dashed;
    this.name = options.name;
    this.label = options.label;
  }

  generateModel(): CustomLink {
    return new CustomLink({ name: this.name });
  }

  generateLinkSegment(model: CustomLink, selected: boolean, path: string) {
    return (
      <g>
        <AdvancedLinkSegment
          dashed={this.dashed}
          model={model}
          path={path}
          label={this.label}
        />
      </g>
    );
  }
}
