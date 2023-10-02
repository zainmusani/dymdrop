// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  modalStyle: {
    flexGrow: 1,
    marginBottom: util.isPlatformAndroid() ? -60 : -30,
    backgroundColor: 'white',
    padding: 0,
    top: -30,
    width: Metrics.screenWidth,
    alignSelf: 'center',
  },
  planSecStyle: {
    flex: 1,
    top: util.isPlatformAndroid() ? 1 : 35,
    marginBottom: 0,
    // paddingBottom: 30,
  },
  list: {
    // flex: 1,
    // backgroundColor: 'yellow',
    // height: '100%',
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: util.isPlatformAndroid() ? '100%' : '102%',
    width: '100%',
  },
  pageBottomSheetMargins: {
    paddingLeft: 24,
    paddingRight: 24,
    // paddingVertical: 1,
  },
  headerContainer: {
    paddingBottom: 20,
    backgroundColor: Colors.background.primary,
  },
  aligningItemsStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topNotchBottomSheet: {
    position: 'absolute',
    backgroundColor: Colors.background.tertiary,
    width: 72,
    height: 4,
    borderRadius: 2,
    top: 9,
    left: Metrics.screenWidth / 2 - 35,
    right: 0,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
});
