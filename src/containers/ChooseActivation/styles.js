// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  images: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32.5
  },
  planSecStyle: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
    paddingBottom: 90,
  },

  btnSecGradientStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
  },
  buttonComponentWrapper: {
    position: 'absolute',
    width: '100%',
    top: util.isPlatformAndroid()
      ? Metrics.screenHeight / 1.15
      : Metrics.screenHeight / 1.21,
    paddingBottom: 40,
    height: 75,
  },
  emptyComponentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    // height: Metrics.screenHeight / 2.7,
  },
});
