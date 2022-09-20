import * as React from 'react';
import { useTheme, useThemeDispatch } from '@hippo/theme-provider';
import { Modal } from '@hippo/modal';
import { GlobalHotKeys } from 'react-hotkeys';
import { Button } from '@hippo/button';
import type { ThemeAttribute } from '@hippo/theme-provider';
import RegisteredComponents from './RegisteredComponents';
import StartButton from './StartButton';
import ComponentSelector from './ComponentSelector';
import ThemeAttributeSelector from './ThemeAttributeSelector';
import ThemeAttributeEditor from './ThemeAttributeEditor';

export function ThemeEditor(): JSX.Element {
  const { componentThemeOverrides, computedTheme, theme } = useTheme();
  const registeredComponentNames = React.useMemo(
    () => Object.keys(componentThemeOverrides),
    [componentThemeOverrides],
  );

  const dispatch = useThemeDispatch();

  const [isThemeEditorOpen, setIsThemeEditorOpen] = React.useState(false);
  const [copiedThemeToClipboard, setCopiedThemeToClipboard] =
    React.useState(false);

  // an 'undefined' selection means we are editing the global theme
  const [selectedComponentName, setSelectedComponentName] = React.useState<
    string | undefined
  >(undefined);

  const [themeAttribute, setThemeAttribute] =
    React.useState<ThemeAttribute>('colors');

  const [isDebugging, setIsDebugging] = React.useState<boolean>(false);

  const updateHighlightedComponents = React.useCallback(
    (components: string[]) => {
      dispatch({
        highlightedComponents: components,
        type: 'HIGHLIGHTED_COMPONENTS_SET',
      });
    },
    [dispatch],
  );

  return (
    <>
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
      />
      <Modal
        isOpen={isThemeEditorOpen}
        onDismiss={() => {
          setIsThemeEditorOpen(false);
          updateHighlightedComponents([]);
        }}
        title="Hippo Style Editor"
      >
        <div
          style={{
            border: '1px solid teal',
            padding: 40,
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'left', width: '100%' }}>
            <RegisteredComponents
              componentNames={registeredComponentNames}
              onUpdateHighlightedComponent={componentName =>
                updateHighlightedComponents([componentName])
              }
              onClearHighlightedComponent={() =>
                updateHighlightedComponents([])
              }
            />
          </div>
          <hr />
          <div
            style={{
              marginBottom: computedTheme.paddings.medium,
              textAlign: 'left',
              width: '100%',
            }}
          >
            <ComponentSelector
              componentNames={registeredComponentNames}
              onChange={setSelectedComponentName}
              value={selectedComponentName}
            />
          </div>

          <ThemeAttributeSelector
            onChange={setThemeAttribute}
            value={themeAttribute}
          />

          <ThemeAttributeEditor
            themeAttribute={themeAttribute}
            selectedComponentName={selectedComponentName}
          />

          {isDebugging && (
            <>
              <hr />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
                  setCopiedThemeToClipboard(true);
                }}
              >
                Copy to clipboard
              </Button>
              {copiedThemeToClipboard ? (
                <span style={{ paddingLeft: computedTheme.paddings.medium }}>
                  Copied!
                </span>
              ) : null}
              <pre
                style={{
                  textAlign: 'left',
                  width: '100%',
                  overflow: 'scroll',
                  height: 200,
                }}
              >
                {JSON.stringify(theme, null, 2)}
              </pre>
            </>
          )}
          <button
            style={{ bottom: 0, position: 'absolute', right: 0 }}
            onClick={() => {
              setIsDebugging(v => !v);
              setCopiedThemeToClipboard(false);
            }}
          >
            Debug
          </button>
        </div>
      </Modal>
      <StartButton
        onClick={() => {
          setIsThemeEditorOpen(true);
        }}
      />
    </>
  );
}
