// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    ...AppStyles.centerInner,
  },
  image: {width: 250, height: 290, marginBottom: 70},
});
