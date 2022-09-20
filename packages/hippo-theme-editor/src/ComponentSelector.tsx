import * as React from 'react';
import BasicSelect from './BasicSelect';

type Props = {
  componentNames: readonly string[];
  onChange: (componentName: string | undefined) => void;
  value: string | undefined;
};

export default function ComponentSelector({
  componentNames,
  onChange,
  value,
}: Props): JSX.Element {
  return (
    <>
      <span>Apply style changes to </span>
      <BasicSelect
        value={value}
        options={['Global'].concat(componentNames)}
        onChange={value => {
          onChange(value === 'Global' ? undefined : value);
        }}
      />
    </>
  );
}
