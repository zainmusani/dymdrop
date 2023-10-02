// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background.primary},

  inputSectionContainer: {
    marginHorizontal: 26,
    marginTop: 8,
  },

  termsAndPrivacyContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 27,
    marginTop: 35,
  },

  termsTextWrapper: {
    flexDirection: 'row',
    marginLeft: 17,
  },

  termsTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  checkboxStyle: {
    width: 28,
    height: 28,
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

  haveAccountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
    marginBottom: 40,
  },
});
