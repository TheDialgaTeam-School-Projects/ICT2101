import {StyleSheet} from 'react-native';

/**
 * Stylesheet containing align items.
 * @type {{alignItemsFlexStart: object, alignItemsCenter: object, alignItemsFlexEnd: object}}
 */
export const AlignItemsCss = StyleSheet.create({
  alignItemsFlexStart: {
    alignItems: 'flex-start',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end',
  },
});
