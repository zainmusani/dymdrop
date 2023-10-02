// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
  },

  inputSectionContainer: {
    marginHorizontal: 26,
  },

  buttonContainer: {marginTop: 40},
  buttonStyle: {
    backgroundColor: Colors.button.primary,
    borderRadius: 8,
    marginHorizontal: 26,
  },
  returnToSignInContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
  },
});
