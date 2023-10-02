// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background.primary},

  inputSectionContainer: {
    marginHorizontal: 26,
    marginTop: 8,
    marginBottom: 2,
  },
  forgotPasswordContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },

  noAccountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
});
