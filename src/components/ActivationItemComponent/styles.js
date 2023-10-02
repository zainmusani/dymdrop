import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.background.tertiary,
    borderColor: Colors.background.tertiary,
    borderWidth: 2,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 50,
    borderRadius: 16,
    maxHeight: 156,
    marginHorizontal: 16,
  },

  activeItemStyle: {
    borderColor: Colors.border.hepta,
    borderWidth: 2,
  },
  activationDescription: {
    minHeight: 42,
  },

  selectIconStyle: {
    width: 26,
    height: 26,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 14,
    right: 15,
  },
  voucherCountStyle: {
    width: 98,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 11,
    paddingBottom: 5,
    borderRadius: 10,
  },

  selectAndRemoveIconStyle: {
    width: 26,
    height: 26,
    borderRadius: 100,
    right: 0,
    position: 'absolute',
    right: 20,
    top: 17,
  },
  editItemBtn: {
    position: 'absolute',
    left: -10,
    top: -10,
  },
  editItemBtnImg: {
    width: 30,
    height: 30,
  },
  qrIconStyle: {width: 32, height: 32, marginBottom: 12},
  infinityStyle: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    backgroundColor: Colors.background.primary,
    maxHeight: Metrics.screenHeight / 1.75,
    paddingBottom: 10,
    borderRadius: 16,
  },
  modalContentContainer: {
    paddingTop: 42,
    paddingLeft: 30,
    paddingRight: 45,
    paddingBottom: 0,
  },

  modalImageIconStyle: {
    top: 17,
    right: 2,
    position: 'absolute',
    marginRight: 16,
  },
  // SHOULD BE CHECK ON DIFFERENT DEVICES
  moreTextContainer: {
    zIndex: 1,
    // paddingVertical: 11,
    height: '51%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: -1,
  },

  modalLinearGradient: {
    height: 25,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});
