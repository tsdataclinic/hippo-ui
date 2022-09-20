import * as React from 'react';

type Props = {
  componentNames: readonly string[];
  onClearHighlightedComponent: () => void;
  onUpdateHighlightedComponent: (componentName: string) => void;
};

export default function RegisteredComponents({
  componentNames,
  onClearHighlightedComponent,
  onUpdateHighlightedComponent,
}: Props): JSX.Element {
  return (
    <>
      Registered components:{' '}
      {componentNames.map((name, index) => {
        return (
          <span key={name}>
            {index !== 0 && <span style={{ marginRight: 2 }}>,</span>}
            <span
              style={{ color: 'teal' }}
              onMouseEnter={() => {
                onUpdateHighlightedComponent(name);
              }}
              onMouseLeave={() => {
                onClearHighlightedComponent();
              }}
            >
              {name}
            </span>
          </span>
        );
      })}
    </>
  );
}
