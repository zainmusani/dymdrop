// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
    marginBottom: 20,
  },

  pagesSecContainer: {
    marginBottom: 16,
  },
  paymentSecContainer: {
    marginBottom: 16,
    // marginLeft: 20,
    marginRight: 20,
  },

  mobileViewStyle: {
    borderColor: Colors.border.quaternary,
    borderWidth: 1.3,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addPagesMobileViewRadiusAndDimension: {
    width: 103,
    height: 183,
    borderRadius: 22,
    overflow: 'hidden',
  },

  freePageImageStyle: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.transparent,
    width: '100%',
    height: 183,
    top: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    position: 'relative',
    // zIndex: 10,
  },

  insightMobileViewRadiusAndDimension: {
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 79,
    height: 140,
  },
  unpublishedPageIconContainer: {
    position: 'absolute',
    right: 0,
    left: 41,
    zIndex: 1,
    top: -18,
    bottom: 0,
  },
  emptyImageStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  imageOverlayStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },

  imageLoading: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  borderLineStyle: {
    borderColor: Colors.border.primary,
    opacity: 0.1,
    borderBottomWidth: 1,
    marginTop: 24,
    width: Metrics.screenWidth / 1.12,
    marginLeft: 20,
    height: 1,
  },

  insightSecContainer: {flex: 1, marginHorizontal: 24, marginBottom: 20},
  passMemberIcon: {
    position: 'absolute',
    right: 0,
    bottom: 11,
  },
  memberText: {
    zIndex: 1,
    marginLeft: 25,
    marginRight: 10,
    color: Colors.text.neka,
    marginTop: 2,
    alignItems: 'center',
  },
  insightBoxStyle: {
    // shadow
    shadowColor: '#8a8a8a',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.29,
    shadowRadius: 8,
    elevation: 7,
    // shadow
    paddingHorizontal: 22,
    paddingVertical: 24,

    borderRadius: 16,
    borderColor: 'red',
    backgroundColor: Colors.background.primary,
  },

  insightTextStyle: {
    flex: 2,
    marginRight: 25,
  },
  insightPlaceholderBadge: {
    backgroundColor: Colors.badge.tertiary,
    width: 32,
    height: 16,
    borderRadius: 16,
    marginTop: 8,
  },

  pagesLimitReachedContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },

  linksViewContainer: {
    borderTopWidth: 1.6,
    borderTopColor: Colors.border.tertiary,
    marginTop: 22,
  },

  linksItemContainer: {
    marginBottom: 3,
  },

  attendanceViewContainer: {
    borderTopWidth: 1.6,
    borderTopColor: Colors.border.tertiary,
    marginTop: 10,
  },
  getMorePagesText: {
    paddingHorizontal: 18,
    marginTop: 24,
    marginBottom: 12,
  },

  performanceImagePreviewContainer: {
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 80,
    height: 142,
    overflow: 'hidden',
  },

  performanceImagePreviewStyle: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: Colors.white,
    width: 80,
    height: 142,
    overflow: 'hidden',
  },

  noLinkFound: {
    marginTop: 25,
    paddingTop: 25,
    borderTopWidth: 1.6,
    borderTopColor: Colors.border.tertiary,
  },

  noLinkFoundBorder: {
    marginTop: 35,
    backgroundColor: Colors.border.tertiary,
    height: 10,
    borderRadius: 3,
  },
  attendanceItemContainer: {
    marginBottom: 13,
  },
  attendanceThumb: {
    backgroundColor: Colors.label.penta,
    borderRadius: 50,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceThumbImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  attendanceDetail: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
