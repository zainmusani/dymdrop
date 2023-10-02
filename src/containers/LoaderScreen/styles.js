// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {marginTop: 30, width: 100},

  logoContainer: {
    alignItems: 'center',
    marginBottom: 18,
    resizeMode: 'contain',
    height: 64,
    width: 85,
  },

  imageDimensionStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    left: 6,
  },

  progressBarContainer: {
    backgroundColor: Colors.background.tertiary,
    height: 3,
    borderRadius: 10,
  },
  progressBarStyle: {
    backgroundColor: Colors.progressBar.tertiary,
    top: -3,
    height: 3,
    borderRadius: 10,
  },
});
