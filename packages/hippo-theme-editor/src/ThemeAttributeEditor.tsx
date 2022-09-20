import * as React from 'react';
import { assertUnreachable } from '@hippo/utils';
import {
  useTheme,
  useThemeDispatch,
  type ThemeAttribute,
} from '@hippo/theme-provider';
import SpacingEditor from './SpacingEditor';
import FontSizeEditor from './FontSizeEditor';
import ColorEditor from './ColorEditor';

type Props = {
  selectedComponentName: string | undefined;
  themeAttribute: ThemeAttribute;
};

export default function ThemeAttributeEditor({
  selectedComponentName,
  themeAttribute,
}: Props): JSX.Element {
  const dispatch = useThemeDispatch();
  const { computedTheme, computedComponentThemes } = useTheme();
  const computedThemeToUse =
    selectedComponentName === undefined
      ? computedTheme
      : computedComponentThemes[selectedComponentName];

  const renderEditor = (): JSX.Element | null => {
    switch (themeAttribute) {
      case 'borderWidths': {
        const { borderWidths } = computedThemeToUse;
        return (
          <>
            {Object.entries(borderWidths).map(
              ([borderWidthName, borderWidthValue]) => (
                <div key={borderWidthName}>
                  <SpacingEditor
                    min={0}
                    max={5}
                    name={borderWidthName}
                    value={
                      typeof borderWidthValue === 'number'
                        ? borderWidthValue
                        : parseInt(borderWidthValue, 10)
                    }
                    onChange={newVal => {
                      dispatch({
                        borderWidthName,
                        borderWidthValue: newVal,
                        componentName: selectedComponentName,
                        type: 'THEME_BORDER_WIDTH_UPDATE',
                      });
                    }}
                  />
                </div>
              ),
            )}
          </>
        );
      }

      case 'borderRadiuses': {
        const { borderRadiuses } = computedThemeToUse;
        return (
          <>
            {Object.entries(borderRadiuses).map(
              ([borderRadiusName, borderRadiusValue]) => (
                <div key={borderRadiusName}>
                  <SpacingEditor
                    min={0}
                    max={20}
                    name={borderRadiusName}
                    value={
                      typeof borderRadiusValue === 'number'
                        ? borderRadiusValue
                        : parseInt(borderRadiusValue, 10)
                    }
                    onChange={newVal => {
                      dispatch({
                        borderRadiusName,
                        borderRadiusValue: newVal,
                        componentName: selectedComponentName,
                        type: 'THEME_BORDER_RADIUS_UPDATE',
                      });
                    }}
                  />
                </div>
              ),
            )}
          </>
        );
      }

      case 'colors': {
        const { colors } = computedThemeToUse;
        return (
          <>
            {Object.entries(colors).map(([colorSemanticName, colorValue]) => (
              <div key={colorSemanticName}>
                <ColorEditor
                  name={colorSemanticName}
                  value={colorValue}
                  onChange={newColor => {
                    dispatch({
                      color: newColor,
                      colorSemanticName,
                      componentName: selectedComponentName,
                      type: 'THEME_COLOR_UPDATE',
                    });
                  }}
                />
              </div>
            ))}
          </>
        );
      }

      case 'fontSizes': {
        const { fontSizes } = computedThemeToUse;
        return (
          <>
            {Object.entries(fontSizes).map(([fontSizeName, fontSizeValue]) => (
              <div key={fontSizeName}>
                <FontSizeEditor
                  name={fontSizeName}
                  value={
                    typeof fontSizeValue.fontSize === 'number'
                      ? fontSizeValue.fontSize
                      : parseInt(fontSizeValue.fontSize, 10)
                  }
                  onChange={newVal => {
                    dispatch({
                      componentName: selectedComponentName,
                      fontSizeName,
                      fontSizeValue: {
                        fontSize: newVal,
                        lineHeight: 1.25,
                      },
                      type: 'THEME_FONT_SIZE_UPDATE',
                    });
                  }}
                />
              </div>
            ))}
          </>
        );
      }

      case 'paddings': {
        const { paddings } = computedThemeToUse;
        return (
          <>
            {Object.entries(paddings).map(([paddingName, paddingValue]) => (
              <div key={paddingName}>
                <SpacingEditor
                  name={paddingName}
                  value={
                    typeof paddingValue === 'number'
                      ? paddingValue
                      : parseInt(paddingValue, 10)
                  }
                  onChange={newVal => {
                    dispatch({
                      componentName: selectedComponentName,
                      paddingName,
                      paddingValue: newVal,
                      type: 'THEME_PADDING_UPDATE',
                    });
                  }}
                />
              </div>
            ))}
          </>
        );
      }
      default:
        assertUnreachable(themeAttribute);
    }
  };

  return <div>{renderEditor()}</div>;
}
