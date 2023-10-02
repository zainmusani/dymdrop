// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,

    marginBottom: 16,
    alignItems: 'center',
  },
  backBtnStyle: {
    zIndex: 1,
    position: 'absolute',
    alignItems: 'flex-start',

    marginTop: 35,
    width: Metrics.screenWidth / 1.12,
  },

  backbtnIconStyle: {height: 40, width: 40},

  bottomLineStyle: {
    borderColor: Colors.border.primary,
    opacity: 0.1,
    borderBottomWidth: 1,
    width: Metrics.screenWidth / 1.17,
    height: 1,
  },
});
