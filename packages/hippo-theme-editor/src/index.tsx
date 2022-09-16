import { ThemeContext } from '@hippo/theme-provider';
import { Modal } from '@hippo/modal';
import { GlobalHotKeys } from 'react-hotkeys';
import * as React from 'react';
import StartButton from './StartButton';

export function ThemeEditor(): JSX.Element {
  const [isThemeEditorOpen, setIsThemeEditorOpen] =
    React.useState<boolean>(false);

  const {
    setColor,
    setFontSize,
    setPadding,
    theme,
    setComponentSpecificConfigs,
    setHighlightedComponents,
  } = React.useContext(ThemeContext);
  const [selectedComponentName, setSelectedComponentName] = React.useState<
    string | undefined
  >(undefined);
  const selectedComponentConfig = React.useMemo(
    () =>
      (selectedComponentName &&
        theme.componentSpecificConfigs[selectedComponentName]) ??
      null,
    [theme, selectedComponentName],
  );
  const [isDebugging, setIsDebugging] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (selectedComponentName) {
      setHighlightedComponents([selectedComponentName]);
    } else {
      setHighlightedComponents([]);
    }
  }, [selectedComponentName]);

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
          setHighlightedComponents([]);
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
          <div style={{ width: '100%', textAlign: 'left' }}>
            Registered components:{' '}
            {[...Object.keys(theme.componentSpecificConfigs)].map(
              (name, index) => {
                const config = theme.componentSpecificConfigs[name];
                return (
                  <span key={name}>
                    {index !== 0 && <span style={{ marginRight: 2 }}>,</span>}
                    <span
                      style={{ color: 'teal' }}
                      onMouseEnter={() => {
                        if (!selectedComponentName) {
                          setHighlightedComponents([name]);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!selectedComponentName) {
                          setHighlightedComponents([]);
                        }
                      }}
                    >
                      {name}
                    </span>
                  </span>
                );
              },
            )}
          </div>
          <hr />
          <div style={{ width: '100%', textAlign: 'left', marginBottom: 8 }}>
            <span>Apply style changes to </span>
            <select
              value={selectedComponentName}
              onChange={ev => {
                if (ev.target.value === 'all') {
                  setSelectedComponentName(undefined);
                } else {
                  setSelectedComponentName(ev.target.value);
                }
              }}
            >
              <option value="all">Global</option>
              {[...Object.keys(theme.componentSpecificConfigs)].map(
                componentName => {
                  return (
                    <option key={componentName} value={componentName}>
                      {componentName}
                    </option>
                  );
                },
              )}
            </select>
          </div>
          <div style={{ display: 'flex' }}>
            <span>Text Color</span>
            <span style={{ marginLeft: 8 }}>
              <input
                type="color"
                value={
                  selectedComponentName
                    ? selectedComponentConfig.color
                    : theme.color
                }
                onChange={e => {
                  if (selectedComponentName) {
                    setComponentSpecificConfigs(selectedComponentName, {
                      color: e.target.value,
                    });
                  } else {
                    setColor(e.target.value);
                  }
                }}
              />
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <span>Font Size</span>
            <span style={{ marginLeft: 8 }}>
              <input
                type="range"
                min="9"
                max="96"
                value={
                  selectedComponentName
                    ? selectedComponentConfig.fontSize
                    : theme.fontSize
                }
                className="slider"
                onChange={e => {
                  if (selectedComponentName) {
                    setComponentSpecificConfigs(selectedComponentName, {
                      fontSize: parseInt(e.target.value, 10),
                    });
                  } else {
                    setFontSize(parseInt(e.target.value, 10));
                  }
                }}
              />
            </span>
            <span style={{ marginLeft: 4 }}>
              {selectedComponentName
                ? selectedComponentConfig.fontSize
                : theme.fontSize}
            </span>
          </div>

          <div style={{ display: 'flex' }}>
            <span>Padding - Small</span>
            <span style={{ marginLeft: 8 }}>
              <input
                type="range"
                min="1"
                max="100"
                value={
                  typeof theme.paddings.sm === 'string'
                    ? parseInt(theme.paddings.sm, 10)
                    : theme.paddings.sm
                }
                className="slider"
                onChange={e => {
                  if (selectedComponentName) {
                    setComponentSpecificConfigs(selectedComponentName, {
                      paddings: {
                        ...theme.componentSpecificConfigs[selectedComponentName]
                          .paddings,
                        sm: parseInt(e.target.value, 10),
                      },
                    });
                  } else {
                    setPadding('sm', parseInt(e.target.value, 10));
                  }
                }}
              />
            </span>
            <span style={{ marginLeft: 4 }}>{theme.paddings.sm}</span>
          </div>

          <div style={{ display: 'flex' }}>
            <span>Padding - Medium</span>
            <span style={{ marginLeft: 8 }}>
              <input
                type="range"
                min="1"
                max="100"
                value={
                  typeof theme.paddings.md === 'string'
                    ? parseInt(theme.paddings.md, 10)
                    : theme.paddings.md
                }
                className="slider"
                onChange={e => {
                  if (selectedComponentName) {
                    setComponentSpecificConfigs(selectedComponentName, {
                      paddings: {
                        ...theme.componentSpecificConfigs[selectedComponentName]
                          .paddings,
                        md: parseInt(e.target.value, 10),
                      },
                    });
                  } else {
                    setPadding('md', parseInt(e.target.value, 10));
                  }
                }}
              />
            </span>
            <span style={{ marginLeft: 4 }}>{theme.paddings.md}</span>
          </div>

          <div style={{ display: 'flex' }}>
            <span>Padding - Large</span>
            <span style={{ marginLeft: 8 }}>
              <input
                type="range"
                min="1"
                max="100"
                value={
                  typeof theme.paddings.lg === 'string'
                    ? parseInt(theme.paddings.lg, 10)
                    : theme.paddings.lg
                }
                className="slider"
                onChange={e => {
                  if (selectedComponentName) {
                    setComponentSpecificConfigs(selectedComponentName, {
                      paddings: {
                        ...theme.componentSpecificConfigs[selectedComponentName]
                          .paddings,
                        lg: parseInt(e.target.value, 10),
                      },
                    });
                  } else {
                    setPadding('lg', parseInt(e.target.value, 10));
                  }
                }}
              />
            </span>
            <span style={{ marginLeft: 4 }}>{theme.paddings.lg}</span>
          </div>

          {isDebugging && (
            <>
              <hr />
              <pre style={{ width: '100%', textAlign: 'left' }}>
                {JSON.stringify(theme, null, 2)}
              </pre>
            </>
          )}
          <button
            style={{ position: 'absolute', bottom: 0, right: 0 }}
            onClick={() => {
              setIsDebugging(v => !v);
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
