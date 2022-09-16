import { Modal } from '@hippo/modal';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeEditor(): JSX.Element {
  const {
    setIsThemeEditorOpen,
    setColor,
    setFontSize,
    theme,
    setComponentSpecificConfigs,
    setHighlightedComponents,
  } = useContext(ThemeContext);
  const [selectedComponentName, setSelectedComponentName] = useState<
    string | undefined
  >(undefined);
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
        <div style={{ display: 'flex' }}>
          <span>Text Color</span>
          <span style={{ marginLeft: 8 }}>
            <input
              type="color"
              value={theme.color}
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
              value={theme.fontSize}
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
          <span style={{ marginLeft: 4 }}>{theme.fontSize}</span>
        </div>
        <hr />
        <div style={{ width: '100%', textAlign: 'left' }}>
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
            <option value="all">--</option>
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
        {isDebugging && (
          <pre style={{ width: '100%', textAlign: 'left' }}>
            {JSON.stringify(theme, null, 2)}
          </pre>
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
