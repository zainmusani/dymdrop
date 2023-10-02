// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  modalStyle: {
    flexGrow: 1,
    marginBottom: -30,
    backgroundColor: 'white',
    padding: 0,
    top: -30,
    width: Metrics.screenWidth,
    alignSelf: 'center',

    // right: 21.5,
    // right: 18.25,
    // left: 0,
  },

  imageBackgroundStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    flex: 1,
  },

  pageInputAndContactContainer: {
    paddingHorizontal: 45,
    flexWrap: 'wrap',
    ...AppStyles.alignItemsCenter,
  },

  pageOverlayColorStyle: {
    position: 'absolute',
    top: 0,
    bottom: -30,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },

  contactOptionImageStyle: {width: 56, height: 56, resizeMode: 'contain'},
  aligningItemsStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  alignTextCenterStyle: {
    textAlign: 'center',
  },

  headerContainer: {
    paddingBottom: 20,
    backgroundColor: Colors.background.primary,
  },

  bottomSheetHeaderShadow: {
    paddingTop: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.49,

    elevation: 9,
  },

  pageImgDimensionsStyle: {width: 96, height: 96, borderRadius: 100},

  // pageBottomSheetMargins: {marginLeft: 24, marginRight: 24},

  pageBottomSheetMargins: {
    paddingLeft: 24,
    paddingRight: 24,
    // paddingVertical: 1,
  },

  iconStyle: {
    width: 32,
    height: 32,
  },

  optionContainerStyle: {
    paddingVertical: 13,
  },
  bottomBorderStyleHeader: {
    borderBottomWidth: 1.2,
    borderBottomColor: Colors.border.tertiary,
  },

  bottomBorderStyle: {
    borderTopWidth: 1.2,
    borderTopColor: Colors.border.tertiary,
    marginTop: 1,
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

  textOptionContainer: {paddingHorizontal: 4, marginTop: 10},

  copyLinkContainer: {
    flexDirection: 'row',
    flex: 2,
    // padding: 9,
    paddingLeft: 8,

    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    marginRight: 9,
    borderRadius: 8,
  },

  shareSheetLinkIconDimension: {height: 24, width: 24},

  shareSheetCopyBtnContainer: {
    borderRadius: 8,
    borderColor: Colors.border.quaternary,
    borderWidth: 1,
    height: 40,
    width: 64,
    ...AppStyles.centerInner,
  },

  shareSheetContainer: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 16,
    flex: 1,
    marginBottom: 25,
  },

  shareSocialLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 8,
    borderColor: Colors.border.quaternary,
    borderWidth: 1,
    marginBottom: 16,
  },

  addLinkBottomSheetView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',

    paddingHorizontal: 24,
    // marginTop: 15,
    paddingTop: 1,
    backgroundColor: Colors.background.primary,
    height: '100%',
    width: '100%',
  },

  addLinkBottomSheetButton: {
    marginLeft: 8.5,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareSecShopConnectedProductsContainer: {
    backgroundColor: Colors.background.heca,
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 16,
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    borderRadius: 9,
    marginTop: 17,
    right: 1,
  },

  shareSecArrowIconStyle: {
    tintColor: Colors.icon.secondary,
    width: 32,
    height: 32,
  },

  proImageStyle: {
    position: 'absolute',
    right: 40,
  },

  pageImageLoadingStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    ...AppStyles.centerInner,
  },

  editIcon: {
    position: 'absolute',
    top: -10,
    left: 0,
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: util.isPlatformAndroid() ? '100%' : '102%',
    width: '100%',
    zIndex: 99,
  },
  perfectPassBtn: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 8,
    borderColor: Colors.border.quaternary,
    borderWidth: 1,
  },
  noPublishedAct: {
    fontSize: 13,
    fontFamily: Fonts.type.semiBold,
    color: Colors.text.hexa,
  },
  userLabelStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 34,
    marginHorizontal: 12,
    paddingVertical: 18,
    paddingHorizontal: 15,
    paddingRight: 10,
    zIndex: 1,
  },
  passThumb: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 48,
    height: 48,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseActWrap: {
    backgroundColor: 'red',
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
