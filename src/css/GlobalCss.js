import {StyleSheet} from 'react-native';
import {PaddingCss} from './PaddingCss';
import {MarginCss} from './MarginCss';
import {JustifyContentCss} from './JustifyContentCss';
import {AlignItemsCss} from './AlignItemsCss';
import {FontSizeCss} from './FontSizeCss';
import {FontStyleCss} from './FontStyleCss';

/**
 * Get global style sheet.
 * @type {
 * {headerStyle: Object, bodyStyle: Object, sidebarStyle: Object, inputBoxStyle: Object, buttonStyle: Object, buttonTextStyle: Object, mapStyle: Object} |
 * PaddingCss | MarginCss | JustifyContentCss | AlignItemsCss | FontSizeCss | FontStyleCss
 * }
 */
export const GlobalCss = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#42AAFF',
  },
  bodyStyle: {
    backgroundColor: '#F2F8FF',
  },
  sidebarStyle: {
    backgroundColor: '#F2F8FF',
  },
  inputBoxStyle: {
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonStyle: {
    backgroundColor: '#94CBFF',
    borderWidth: 1,
  },
  buttonTextStyle: {
    color: '#000000',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  ...PaddingCss,
  ...MarginCss,
  ...JustifyContentCss,
  ...AlignItemsCss,
  ...FontSizeCss,
  ...FontStyleCss,
});
