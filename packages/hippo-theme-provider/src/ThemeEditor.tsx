import { Modal } from '@hippo/modal';
import * as React from 'react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeEditor(): JSX.Element {
  const {
    setIsThemeEditorOpen,
    setColor,
    setFontSize,
    setPadding,
    theme,
    setComponentSpecificConfigs,
    setHighlightedComponents,
  } = useContext(ThemeContext);
  const [selectedComponentName, setSelectedComponentName] = useState<
    string | undefined
  >(undefined);
  const selectedComponentConfig = useMemo(
    () =>
      (selectedComponentName &&
        theme.componentSpecificConfigs[selectedComponentName]) ??
      null,
    [theme, selectedComponentName],
  );
  const [isDebugging, setIsDebugging] = useState<boolean>(false);
  useEffect(() => {
    if (selectedComponentName) {
      setHighlightedComponents([selectedComponentName]);
    } else {
      setHighlightedComponents([]);
    }
  }, [selectedComponentName]);
  return (
    <Modal
      isOpen
      onDismiss={() => {
        setIsThemeEditorOpen(false);
        setHighlightedComponents([]);
      }}
      title="Hippo Style Editor"
    >
      <div
        style={{ border: '1px solid teal', padding: 40, position: 'relative' }}
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
              value={theme.paddings.sm}
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
  );
}
