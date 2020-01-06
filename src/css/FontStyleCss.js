import {StyleSheet} from 'react-native';

/**
 * Stylesheet containing font style.
 * @type {{fontStyleBold: object, fontStyleItalic: object, fontStyleBoldItalic: object, fontStyleUnderline: object}}
 */
export const FontStyleCss = StyleSheet.create({
  fontStyleBold: {
    fontWeight: 'bold',
  },
  fontStyleItalic: {
    fontStyle: 'italic',
  },
  fontStyleBoldItalic: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  fontStyleUnderline: {
    textDecorationLine: 'underline',
  },
});
