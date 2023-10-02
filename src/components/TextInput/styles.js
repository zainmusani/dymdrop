// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    borderColor: Colors.grey1,
    borderWidth: 1,
    borderRadius: Metrics.borderRadius,
    padding: 12,
    marginTop: 4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  buttonOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: util.isPlatformAndroid() ? 29 : 27,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOverlayLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: util.isPlatformAndroid() ? 30 : 25,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIconLeft: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // marginBottom: 8,
    ...AppStyles.mLeft10,
  },
  arrowIconLeftLarge: {
    width: 45,
    height: 45,
  },
  arrowIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    ...AppStyles.mRight10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
});
