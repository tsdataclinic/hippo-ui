import * as React from 'react';
import { capitalize } from '@hippo/utils';
import { useTheme } from '@hippo/theme-provider';

type Props = {
  name: string;
  onChange: (hexColor: string) => void;
  value: string;
};

export default function ColorEditor({
  name,
  onChange,
  value,
}: Props): JSX.Element {
  const { computedTheme } = useTheme();

  return (
    <label>
      <span style={{ paddingRight: computedTheme.paddings.medium }}>
        {capitalize(name)}
      </span>
      <span style={{ paddingRight: computedTheme.paddings.medium }}>
        <input
          type="color"
          value={value}
          onChange={e => {
            onChange(e.target.value);
          }}
        />
      </span>
      {value}
    </label>
  );
}
