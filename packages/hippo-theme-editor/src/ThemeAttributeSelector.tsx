import * as React from 'react';
import { defaultTheme, ThemeAttribute } from '@hippo/theme-provider';
import BasicSelect from './BasicSelect';

type Props = {
  onChange: (themeAttribute: ThemeAttribute) => void;
  value: ThemeAttribute;
};

const THEME_ATTRIBUTES: ThemeAttribute[] = Object.keys(defaultTheme).filter(
  attr => attr !== 'primitives',
) as any;

export default function ThemeAttributeSelector({
  onChange,
  value,
}: Props): JSX.Element {
  return (
    <>
      Change the following attributes:{' '}
      <BasicSelect
        value={value}
        options={THEME_ATTRIBUTES}
        onChange={onChange}
      />
    </>
  );
}
