/* eslint-disable typescript-sort-keys/interface */
export type HexColor = `#${string}`;
export type CSSDimensionUnit = 'rem' | 'em' | 'px' | 'vh' | 'vw' | '%';
export type CSSDimension = number | `${number}${CSSDimensionUnit}`;

export type ColorBaseName = keyof ThemePrimitives['colors'];
type Values<T> = T[keyof T];
type ColorShadeValues =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
type ColorPrimitives<Color extends ColorBaseName> = {
  [Shade in ColorShadeValues as `${Color}${Shade}`]: string;
};

// A font size needs to be defined by both a size and a line height
export type FontSizeDefinition = {
  fontSize: CSSDimension;
  lineHeight: CSSDimension;
};

export type ThemePrimitives = {
  colors: {
    slate: ColorPrimitives<'slate'>;
    gray: ColorPrimitives<'gray'>;
    zinc: ColorPrimitives<'zinc'>;
    neutral: ColorPrimitives<'neutral'>;
    stone: ColorPrimitives<'stone'>;
    red: ColorPrimitives<'red'>;
    orange: ColorPrimitives<'orange'>;
    amber: ColorPrimitives<'amber'>;
    yellow: ColorPrimitives<'yellow'>;
    lime: ColorPrimitives<'lime'>;
    green: ColorPrimitives<'green'>;
    emerald: ColorPrimitives<'emerald'>;
    teal: ColorPrimitives<'teal'>;
    cyan: ColorPrimitives<'cyan'>;
    sky: ColorPrimitives<'sky'>;
    blue: ColorPrimitives<'blue'>;
    indigo: ColorPrimitives<'indigo'>;
    violet: ColorPrimitives<'violet'>;
    purple: ColorPrimitives<'purple'>;
    fuchsia: ColorPrimitives<'fuchsia'>;
    pink: ColorPrimitives<'pink'>;
    rose: ColorPrimitives<'rose'>;
  };

  spacings: {
    s0: CSSDimension;
    's0.5': CSSDimension;
    s1: CSSDimension;
    s2: CSSDimension;
    's2.5': CSSDimension;
    s3: CSSDimension;
    's3.5': CSSDimension;
    s4: CSSDimension;
    s5: CSSDimension;
    s6: CSSDimension;
    s7: CSSDimension;
    s8: CSSDimension;
    s9: CSSDimension;
    s10: CSSDimension;
    s11: CSSDimension;
    s12: CSSDimension;
    s14: CSSDimension;
    s16: CSSDimension;
    s20: CSSDimension;
    s24: CSSDimension;
    s28: CSSDimension;
    s32: CSSDimension;
    s36: CSSDimension;
    s40: CSSDimension;
    s44: CSSDimension;
    s48: CSSDimension;
    s52: CSSDimension;
    s56: CSSDimension;
    s60: CSSDimension;
    s64: CSSDimension;
    s72: CSSDimension;
    s80: CSSDimension;
    s96: CSSDimension;
  };

  fontSizes: {
    xs: FontSizeDefinition;
    sm: FontSizeDefinition;
    base: FontSizeDefinition;
    lg: FontSizeDefinition;
    xl: FontSizeDefinition;
    t2xl: FontSizeDefinition;
    t3xl: FontSizeDefinition;
    t4xl: FontSizeDefinition;
    t5xl: FontSizeDefinition;
    t6xl: FontSizeDefinition;
    t7xl: FontSizeDefinition;
    t8xl: FontSizeDefinition;
    t9xl: FontSizeDefinition;
  };
};

export type ColorPrimitive = Values<{
  [ColorKey in keyof ThemePrimitives['colors']]: keyof ThemePrimitives['colors'][ColorKey];
}>;
export type SpacingPrimitive = keyof ThemePrimitives['spacings'];
export type FontSizePrimitive = keyof ThemePrimitives['fontSizes'];

/**
 * A Theme is broken down into primitives and semantic values.
 * 'Primitives' refer to all of the granular values that can be used when styling
 * components. A semantic value has a name that indicates how it should be used.
 *
 * For example, a spacing 's4' of 16px is a primitive value, but this doesn't
 * tell us if this is a big or small spacing. A padding named 'medium' is a
 * semantic value.
 *
 * All primitives that form the basis of a theme are in the `primitives` object.
 * All other objects store semantic values.
 *
 * TODO: rename to ThemeSpec. and clearly delineate `primitives` and `semantics`.
 */
export type Theme = {
  borderWidths: {
    none: 0;
    soft: 1;
    hard: 2;
  };

  // TODO: update these to semantic terms, like "sharp", "soft", etc.
  borderRadiuses: {
    none: CSSDimension;
    small: CSSDimension;
    normal: CSSDimension;
    medium: CSSDimension;
    large: CSSDimension;
  };

  /**
   * All colors are either a valid color primitive (e.g. 'red200') or are a hex
   * value (e.g. '#abc123')
   */
  colors: {
    background: ColorPrimitive | HexColor;
    error: ColorPrimitive | HexColor;
    primary: ColorPrimitive | HexColor;
    secondary: ColorPrimitive | HexColor;
    success: ColorPrimitive | HexColor;
    text: ColorPrimitive | HexColor;
    warning: ColorPrimitive | HexColor;
  };

  /**
   * A user can define a font size using a FontSizePrimitive or by specifying
   * an exact value.
   */
  fontSizes: {
    base: FontSizePrimitive | FontSizeDefinition;
    h1: FontSizePrimitive | FontSizeDefinition;
    h2: FontSizePrimitive | FontSizeDefinition;
    h3: FontSizePrimitive | FontSizeDefinition;
    paragraph: FontSizePrimitive | FontSizeDefinition;
  };

  /**
   * A user can define a padding using a SpacingPrimitive or by specifying an
   * exact value.
   */
  paddings: {
    huge: SpacingPrimitive | CSSDimension;
    large: SpacingPrimitive | CSSDimension;
    medium: SpacingPrimitive | CSSDimension;
    small: SpacingPrimitive | CSSDimension;
    tiny: SpacingPrimitive | CSSDimension;
  };

  /** The theme primitives from which semantic values are computed */
  primitives: ThemePrimitives;
};
