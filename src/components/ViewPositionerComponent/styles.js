// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    borderWidth: 1.1,
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    borderColor: Colors.border.quaternary,
    borderRadius: 9,
    backgroundColor: Colors.background.primary,
  },
  activeStyle: {borderWidth: 2, borderColor: Colors.border.hepta},
});
