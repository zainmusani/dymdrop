// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background.primary},

  inputSectionContainer: {
    marginHorizontal: 26,
    marginTop: 26,
  },

  returnToSignInContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
  },
  guidelineContainer: {
    flex: 1,
    marginHorizontal: 60,
  },
});
