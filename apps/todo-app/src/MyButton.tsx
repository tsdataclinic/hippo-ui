import { ThemeContext } from '@hippo/theme-provider';
import React, { useContext, useEffect, useMemo } from 'react';

interface IProps {}

const NAME = 'MyButton';
const MyButton = ({}: IProps) => {
  const { theme, registerComponentName, highlightedComponents } =
    useContext(ThemeContext);
  useEffect(() => {
    registerComponentName(NAME);
  }, []);
  const configs = theme.componentSpecificConfigs[NAME];
  const isHighlighted = new Set(highlightedComponents).has(NAME);

  return (
    <button
      style={{
        color: theme.color,
        fontSize: theme.fontSize,
        ...configs,
        backgroundColor: isHighlighted ? 'Yellow' : 'inherit',
      }}
    >
      My Button
    </button>
  );
};

export default MyButton;
