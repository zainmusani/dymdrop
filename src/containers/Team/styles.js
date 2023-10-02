// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  modalStyle: {
    flexGrow: 1,
    marginBottom: -30,
    backgroundColor: 'white',
    padding: 0,
    top: -30,
    width: Metrics.screenWidth,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  userThumb: {
    borderRadius: 50,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetail: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
