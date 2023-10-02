import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    // bottom: 32,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    flex: 1,
    marginTop: Metrics.statusBarHeight + (util.isPlatformAndroid() ? 0 : 10), // adding 10px more for more gapping
  },

  alertViewContainer: {
    backgroundColor: Colors.background.heca,
    overflow: 'hidden',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 16,
  },

  alertTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 16,
  },
  btnContainer: {
    backgroundColor: Colors.alertBtn.primary,
    height: 40,
    width: 96,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageSelectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

  linearWrap: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderRadius: 10,
    borderWidth: 0.85,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },
  actionBtnStyles: {
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },

  alertIconStyle: {height: 18, width: 18},

  progessBarStyle: {
    backgroundColor: Colors.progressBar.primary,
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
