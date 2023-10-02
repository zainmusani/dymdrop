// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  timePeriodSecContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 8,
  },

  selectedPlanStyles: {
    backgroundColor: 'white',
    // flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 9,
    zIndex: 1,
  },
  unSelectedPlanStyles: {
    backgroundColor: '#f0f3f5',
    // flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 52,
    borderRadius: 8,
    borderWidth: 0,
  },
});
