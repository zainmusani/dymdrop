// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {},

  heading: {
    fontSize: 24,
    color: '#333240',
    fontFamily: Fonts.type.bold,
    flex: 1,
    lineHeight: 27,
  },

  description: {
    fontSize: 14,
    color: '#5b596a',
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
    flex: 1,
  },

  button: {
    backgroundColor: '#f0f3f5',
    marginLeft: 16,
    paddingHorizontal: 19,
    paddingVertical: 7.5,
    borderRadius: 8,
  },

  buttonText: {
    color: '#156bf9',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  imageLoading: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  rightImgContainer: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    marginVertical: 13,
    paddingBottom: 21,
  },

  rightImageView1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
  },

  rightImageView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  leftImgContainer: {
    paddingVertical: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    marginVertical: 13,
    paddingBottom: 21,
  },

  leftImageView1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
  },

  leftImageView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  topImgBg: {
    // marginHorizontal: 29,
    marginVertical: 16,
  },

  topImgContainer: {
    padding: Metrics.baseMargin,
    flex: 1,
    marginTop: -2,
    paddingTop: 18,
  },

  topImgView1: {
    backgroundColor: Colors.white,
    height: 80,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  bottomImgView1: {
    backgroundColor: Colors.white,
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  bottomImgContainer: {
    padding: Metrics.baseMargin,
    flex: 1,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 21,
    marginBottom: -2,
  },

  editIcon: {
    position: 'absolute',
    top: 2,
    left: -14,
    zIndex: 99,
  },

  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    ...AppStyles.centerInner,
  },
  brokenImg: {
    position: 'absolute',
    width: '100%',
  },
});
