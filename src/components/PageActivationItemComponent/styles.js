import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.tertiary,
    borderColor: Colors.background.tertiary,
    borderWidth: 2,
    paddingVertical: 20,
    paddingLeft: 20,
    borderRadius: 16,
    // maxHeight: '100%',
  },

  activeItemStyle: {
    borderColor: Colors.border.hepta,
    borderWidth: 2,
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
    borderRadius: 10,
    height: 112,
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

  qrIconStyle: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
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
    paddingLeft: 50,
    paddingRight: 30,
    paddingBottom: 30,
  },

  modalImageIconStyle: {
    top: 17,
    right: 2,
    position: 'absolute',
    marginRight: 16,
  },

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

  addPassesMobileViewRadiusAndDimension: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },

  freePassImageStyle: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.transparent,
    width: '100%',
    height: 48,
    top: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
  },

  bottomLineStyle: {
    marginVertical: 15,
    borderColor: Colors.border.primary,
    opacity: 0.1,
    borderBottomWidth: 1,
    height: 1,
  },

  imageOverlayStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  imageLoading: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
