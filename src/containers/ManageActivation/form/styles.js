// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme';
import util from '../../../util';

export default StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    height: util.isPlatformAndroid() ? '100%' : '102%',
    width: '100%',
  },
  shareSheetContainer: {
    marginRight: 21,
    marginLeft: 27,
    marginTop: 16,
    flex: 1,
    marginBottom: 25,
  },
  bottomBorderStyle: {
    borderTopWidth: 1.2,
    borderTopColor: Colors.border.tertiary,
    marginTop: 1,
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
  lengthStl: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  title: {
    color: Colors.black,
    fontSize: 16,
  },

  description: {
    color: Colors.black,
    fontSize: 13,
    marginTop: 4,
    marginBottom: -10,
  },
  frequencyWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  frequencyItem: {
    borderRadius: 8,
    width: '31%',
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    borderColor: Colors.border.quaternary,
    borderWidth: 2,
  },
  activeFrequencyItem: {
    borderColor: Colors.border.hepta,
  },
  frequencyItemText: {
    fontSize: 14,
    fontFamily: Fonts.type.semiBold,
  },
  fieldWrapper: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  leftField: {
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
  },
  infinityStyle: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: '30%',
    top: util.isPlatformAndroid() ? 36 : 26,
    // top: '44%',
  },
  rightfield: {
    width: '55%',
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 26,
  },
  checkboxContent: {
    paddingLeft: 5,
    fontSize: 14,
  },
});
