import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    margin: 0,
    height: 45,
    width: 45,
  },
  bottomOverlay: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 20,
    paddingRight: 20,
  },
  box: {
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 11,
    height: Metrics.screenWidth - 30,
    width: Metrics.screenWidth - 30,
  },
  redBorder: {
    borderColor: Colors.accent,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  dymedropText: {
    position: 'absolute',
    bottom: 4,
    right: 8,
  },
});
