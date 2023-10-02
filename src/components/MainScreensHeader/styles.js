// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    padding: Metrics.baseMargin,
    marginTop: util.isPlatformAndroid()
      ? Metrics.statusBarHeight - 2
      : Metrics.statusBarHeight - 25,
    backgroundColor: Colors.background.primary,
  },
  bottomLineStyle: {
    marginTop: 25,
    borderColor: Colors.border.primary,
    opacity: 0.1,
    borderBottomWidth: 1,
    height: 1,
  },
  buttonStyle: {
    height: 38,
    width: 78,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.tertiary,
  },

  iconDimensionsStyle: {height: 37, width: 37, resizeMode: 'contain'},
});
