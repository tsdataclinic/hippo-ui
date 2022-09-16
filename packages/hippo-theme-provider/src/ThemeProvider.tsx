import { useState } from 'react';
import * as React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import StartButton from './StartButton';
import { defaultTheme, type ThemeAPI, ThemeContext } from './ThemeContext';
import { ThemeEditor } from './ThemeEditor';

type Props = {
  children: React.ReactNode;
  theme?: ThemeAPI;
};

export function ThemeProvider({ children, theme }: Props): JSX.Element {
  // remove this eslint disable once setIsThemeEditorOpen is used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { setIsThemeEditorOpen, isThemeEditorOpen } =
  //   useContext(ThemeEditorContext);
  const [isThemeEditorOpen, setIsThemeEditorOpen] =
    React.useState<boolean>(false);
  const [themeOverrides, setThemeOverrides] = useState<Partial<ThemeAPI>>({});
  const [highlightedComponents, setHighlightedComponents] = useState<string[]>(
    [],
  );

  return (
    <>
      <ThemeContext.Provider
        value={{
          setIsThemeEditorOpen,
          isThemeEditorOpen,
          theme: { ...(theme ?? defaultTheme), ...themeOverrides },
          setColor: color => {
            setThemeOverrides(v => ({ ...v, color }));
          },
          setFontSize: fontSize => {
            setThemeOverrides(v => ({ ...v, fontSize }));
          },
          setPadding: (
            paddingType: 'sm' | 'md' | 'lg',
            paddingVal: number | string,
          ) => {
            setThemeOverrides(v => ({
              ...v,
              paddings: { ...v.paddings, [paddingType]: paddingVal },
            }));
          },
          registerComponentName: componentName => {
            setThemeOverrides(v => ({
              ...v,
              componentSpecificConfigs: {
                ...v.componentSpecificConfigs,
                [componentName]: {},
              },
            }));
          },
          setComponentSpecificConfigs: (
            componentName: string,
            configs: any,
          ) => {
            setThemeOverrides(v => ({
              ...v,
              componentSpecificConfigs: {
                ...v.componentSpecificConfigs,
                [componentName]: {
                  ...(v.componentSpecificConfigs
                    ? v.componentSpecificConfigs[componentName]
                    : {}),
                  ...configs,
                },
              },
            }));
          },
          setHighlightedComponents,
          highlightedComponents,
        }}
      >
        <GlobalHotKeys
          keyMap={{
            TOGGLE: 'e',
          }}
          handlers={{
            TOGGLE: keyEvent => {
              if (keyEvent) {
                keyEvent.preventDefault();
              }
              setIsThemeEditorOpen((v: boolean) => !v);
            },
          }}
        >
          {children}
        </GlobalHotKeys>

        {isThemeEditorOpen ? (
          <ThemeEditor />
        ) : (
          <StartButton
            onClick={() => {
              setIsThemeEditorOpen(true);
            }}
          />
        )}
      </ThemeContext.Provider>
    </>
  );
}
