import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  checkboxStyle: {
    width: 24,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkBoxEnabled: {
    backgroundColor: Colors.button.primary,
    borderColor: Colors.button.primary,
    borderRadius: 5,
    borderWidth: 0.8,
  },
  checkBoxDisabled: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.border.quaternary,
  },
});
