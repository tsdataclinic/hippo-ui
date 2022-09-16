import * as React from 'react';
import { ThemeContext, type ThemeAPI } from './ThemeContext';
import { ThemeEditor } from './ThemeEditor';

type Props = {
  children: React.ReactNode;
  theme: ThemeAPI;
};

export function ThemeProvider({ children, theme }: Props): JSX.Element {
  // remove this eslint disable once setIsThemeEditorOpen is used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isThemeEditorOpen, setIsThemeEditorOpen] = React.useState(false);

  return (
    <>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      {isThemeEditorOpen ? <ThemeEditor /> : null}
    </>
  );
}
