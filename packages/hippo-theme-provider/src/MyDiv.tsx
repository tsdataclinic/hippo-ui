import React, { useContext, useEffect, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';

const NAME = 'MyDiv';
const MyDiv = () => {
  const { theme, registerComponentName, highlightedComponents } =
    useContext(ThemeContext);
  useEffect(() => {
    registerComponentName(NAME);
  }, []);
  const configs = theme.componentSpecificConfigs[NAME];
  const isHighlighted = new Set(highlightedComponents).has(NAME);
  return (
    <div
      style={{
        color: theme.color,
        fontSize: theme.fontSize,
        ...configs,
        backgroundColor: isHighlighted ? 'Yellow' : 'inherit',
      }}
    >
      TEST
    </div>
  );
};

export default MyDiv;