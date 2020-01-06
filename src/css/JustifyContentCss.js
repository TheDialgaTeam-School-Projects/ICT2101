import {StyleSheet} from 'react-native';

/**
 * Stylesheet containing justify content.
 * @type {{justifyContentFlexStart: object, justifyContentCenter: object, justifyContentFlexEnd: object}}
 */
export const JustifyContentCss = StyleSheet.create({
  justifyContentFlexStart: {
    justifyContent: 'flex-start',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentFlexEnd: {
    justifyContent: 'flex-end',
  },
});
