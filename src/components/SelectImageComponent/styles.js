import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {zIndex: 1, position: 'absolute', width: '100%'},
  chooseImgContainer: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.border.accent,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    flex: 4.8,
    marginRight: 9,
    overflow: 'hidden',
  },

  imageOptionsContainer: {
    borderRadius: 12,
    zIndex: 1,
    width: 213,
    backgroundColor: Colors.background.primary,
    top: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 6.5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 15,
    borderTopColor: Colors.border.veca,
    borderTopWidth: 0.5,
  },

  noBorderBottomStyling: {
    borderTopWidth: 0,
  },

  iconStyling: {width: 17, height: 17, top: 1},

  imgViewContainer: {
    backgroundColor: Colors.background.tertiary,
    top: 4.5,
    bottom: 0,
    height: 37,
    borderRadius: 9,
    width: 56,
  },

  imgView: {
    flex: 1,
    alignSelf: 'flex-end',
    borderColor: Colors.border.accent,
    backgroundColor: Colors.background.tertiary,
    width: 56,
    height: 37,
    borderStyle: 'dashed',
    borderRadius: 8,
    borderWidth: 1.6,
  },

  boxImageStyle: {
    height: '100%',
    borderRadius: 7,
    width: '100%',
  },

  progressBarContainer: {
    backgroundColor: Colors.background.quaternary,
    height: 3,
    borderRadius: 10,
  },
  progressBarStyle: {
    backgroundColor: Colors.progressBar.secondary,
    top: util.isPlatformAndroid() ? 0 : 3,
    height: util.isPlatformAndroid() ? 41 : 38,
    // borderRadius: 10,
    position: 'absolute',
  },

  thumbnailLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0,0,0,.3)',
    ...AppStyles.centerInner,
  },
});
