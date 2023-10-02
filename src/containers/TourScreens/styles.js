import {StyleSheet} from 'react-native';

import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  page1Wrapper: {
    ...AppStyles.flex,
    ...AppStyles.alignItemsCenter,
    paddingHorizontal: 50,
    marginTop: 60,
  },
  skipParent: {
    bottom: 33,
    right: 30,
    position: 'absolute',
    zIndex: 1,
  },

  para: {
    color: 'rgba(0,0,0,.6)',
    textAlign: 'left',
    width: '100%',
    fontSize: 18,
  },

  narration: {
    fontSize: 45,
    textAlign: 'left',
    fontWeight: '700',
    width: '90%',
    alignSelf: 'flex-start',
    top: 12,
  },

  bold: {
    fontSize: 25,
    ...AppStyles.fontBold,
  },

  centerImage: {
    ...AppStyles.flex,
  },

  button: {
    backgroundColor: Colors.blue,
    height: 66,
    marginBottom: 70,
    ...AppStyles.baseMargin,
  },

  buttonText: {
    backgroundColor: Colors.red,
    color: Colors.white,
  },

  featuresContainer: {
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
    marginTop: 80,
  },

  featuresView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.2)',
  },

  featuresText: {
    fontSize: 16,
    marginLeft: 25,
  },

  featuresImage: {
    width: 27,
    height: 27,
  },

  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: '18%',
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    bottom: 15,
  },

  activeDotView: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: '18%',
    height: 5,
    borderRadius: 5,
    borderTopRightRadius: 10,
    marginHorizontal: 5,
    bottom: 15,
    borderTopEndRadius: 15,
  },

  activeDot: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
