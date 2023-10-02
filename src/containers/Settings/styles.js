// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  bottomLineStyle: {
    marginTop: 30,
    borderColor: Colors.border.primary,
    opacity: 0.1,
    borderBottomWidth: 1,
    // width: Metrics.screenWidth / 1.22,
    // width: Metrics.screenWidth / 1.19,
    width: '100%',
    height: 1,
  },

  resetPasswordBtn: {
    marginTop: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.accent,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },

  planSecContainer: {
    borderWidth: 0.3,
    borderColor: Colors.border.accent,
    minHeight: 75,
    borderRadius: 8,
  },
  planChildContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  planSectext: {flex: 2},
  btnStyle: {
    marginTop: 14,
    // borderWidth: 0.4,
    // borderColor: Colors.border.accent,
    borderWidth: 1,
    borderColor: Colors.border.quaternary,
    paddingVertical: 10,
    width: 160,
    alignItems: 'center',
    borderRadius: 10,
  },

  hiddenTap: {
    position: 'absolute',
    backgroundColor: Colors.transparent,
    height: 45,
    width: '100%',
    bottom: 0,
  },
  paymentBtn: {
    paddingHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 8,
    borderColor: Colors.border.quaternary,
    borderWidth: 1,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentIconStyle: {
    width: 35,
    height: 35,
  },
});
