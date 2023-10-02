// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.screenHeight,
  },

  inputSectionContainer: {
    marginHorizontal: 26,
    marginTop: 8,
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
    marginTop: 26,
  },

  dropDownBtnStyle: {
    width: Metrics.screenWidth / 1.15,
    borderRadius: 10,
    backgroundColor: Colors.background.tertiary,
  },

  dropDownRowStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  termsAndPrivacyContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 43,
    top: -2,
    marginBottom: 10,
    right: 4,
  },

  termsTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    left: 0,
  },

  termsTextWrapper: {
    flexDirection: 'row',
    marginLeft: 14,
    top: 4,
  },

  signOutStyle: {
    top: 80,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border.quaternary,
    height: 40,
    borderRadius: 8,
  },
});
