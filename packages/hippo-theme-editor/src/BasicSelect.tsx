import * as React from 'react';
import { capitalize } from '@hippo/utils';

type Props<T extends string> = {
  onChange: (value: T) => void;
  options: readonly T[];
  value: T | undefined;
};

/**
 * A basic select component. Update this with a Dropdpown from Hippo once one
 * is built.
 */
export default function BasicSelect<T extends string>({
  onChange,
  options,
  value,
}: Props<T>): JSX.Element {
  return (
    <select
      value={value}
      onChange={ev => {
        onChange(ev.target.value as T);
      }}
    >
      {options.map(optionString => {
        return (
          <option key={optionString} value={optionString}>
            {capitalize(optionString)}
          </option>
        );
      })}
    </select>
  );
}
