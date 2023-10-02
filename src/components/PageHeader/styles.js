// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginTop: 4,
  },

  pageHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingTop: !util.isPlatformAndroid() ? Metrics.statusBarHeight + 15 : 0,
  },

  iconWidthHeight: {width: 40, height: 40, borderRadius: 100},

  buttonStyle: {
    width: 80,
    height: 40,
    borderTopRightRadius: 36,
    borderBottomRightRadius: 36,
    borderTopLeftRadius: 36,
    borderBottomLeftRadius: 36,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.button.primary,
  },

  discardIcon: {
    marginRight: 16,
  },
  disabledBtn: {
    opacity: 0.6,
  },

  closeBottomSheetContainerStyle: {
    width: '100%',
    height: '12%',
    top: 20,
    zIndex: 1,
    position: 'absolute',
  },
});
