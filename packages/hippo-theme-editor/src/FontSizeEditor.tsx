import * as React from 'react';
import { capitalize } from '@hippo/utils';
import { useTheme } from '@hippo/theme-provider';

type Props = {
  name: string;
  onChange: (val: number) => void;
  value: number;
};

// TODO: this should handle multiple units as well as lineHeight
export default function FontSizeEditor({
  name,
  onChange,
  value,
}: Props): JSX.Element {
  const { computedTheme } = useTheme();

  return (
    <label>
      <span style={{ paddingRight: computedTheme.paddings.small }}>
        {capitalize(name)}
      </span>
      <span style={{ paddingRight: computedTheme.paddings.small }}>
        <input
          type="range"
          min="0"
          max="50"
          value={value}
          className="slider"
          onChange={e => {
            onChange(parseInt(e.target.value, 10));
          }}
        />
      </span>
      {value}px
    </label>
  );
}
