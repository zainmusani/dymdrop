import React, {useRef, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './styles';
import {Images, Colors, Metrics} from '../../theme';
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../../components';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {setInitialApp} from '../../actions/GeneralActions';
import util from '../../util';
import {SafeAreaView} from 'react-native-safe-area-context';

function TourScreens(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  const skip = () => {
    dispatch(setInitialApp());
    Actions.reset('signup');
  };

  const _renderPage1 = () => {
    return (
      <ImageBackground
        source={Images.TourImage1}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Colors.black,
        }}
        resizeMode="contain">
        <View style={[styles.page1Wrapper]}>
          <Text style={[styles.para, {color: 'rgba(255,255,255,.5)'}]}>
            Fundraising
          </Text>
          <Text style={[styles.narration, {color: Colors.white}]}>
            It's grow time
          </Text>
        </View>
      </ImageBackground>
    );
  };

  const _renderPage2 = () => {
    return (
      <ImageBackground
        source={Images.TourImage2}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Colors.black,
        }}
        resizeMode="cover">
        <View style={[styles.page1Wrapper, {paddingRight: 87}]}>
          <Text style={[styles.para]}>Perfect Pass™</Text>
          <Text style={[styles.narration]}>For Sports</Text>
        </View>

        <LinearGradient
          start={{x: 0, y: 0.2}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,.0)', 'rgba(0,0,0,.3)', 'rgba(0,0,0,.5)']}
          style={{height: '62%'}}>
          <View style={styles.featuresContainer}>
            <View style={styles.featuresView}>
              <Image
                source={Images.OneContentHubIcon}
                resizeMode="contain"
                style={styles.featuresImage}
              />
              <Text style={styles.featuresText}>One content hub</Text>
            </View>

            <View style={styles.featuresView}>
              <Image
                source={Images.FeaturedVideoIcon}
                resizeMode="contain"
                style={styles.featuresImage}
              />
              <Text style={styles.featuresText}>Featured video</Text>
            </View>

            <View style={[styles.featuresView, {borderBottomWidth: 0}]}>
              <Image
                source={Images.InsiderInfoIcon}
                resizeMode="contain"
                style={styles.featuresImage}
              />
              <Text style={styles.featuresText}>Insider info</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  };

  const _renderPage3 = () => {
    return (
      <SafeAreaView edges={['bottom']}>
        <ImageBackground
          source={Images.TourImage3}
          style={{
            width: '100%',
            height: Metrics.screenHeight,
            backgroundColor: Colors.transparent,
          }}
          resizeMode="stretch">
          <View
            style={{
              height: Metrics.screenHeight + Metrics.screenHeight / 12.5,
            }}>
            {/* <View
            style={{
              position: 'absolute',
              height: Metrics.screenHeight + 40,
              width: Metrics.screenWidth,
              left: 0,
            }}>
            <Image
              source={Images.TourImage3}
              style={{height: '100%', width: '100%'}}
            />
          </View> */}
            <View style={[styles.page1Wrapper]}>
              <Text style={[styles.para]}>Perfect Partners™</Text>
              <Text style={[styles.narration]}>For ministry.</Text>
            </View>

            <LinearGradient
              start={{x: 0, y: 0.2}}
              end={{x: 0, y: 1}}
              colors={['rgba(0,0,0,.0)', 'rgba(0,0,0,.3)', 'rgba(0,0,0,.5)']}
              style={{
                height: '60%',
                top: 0,
                left: 0,
              }}>
              <View
                style={[
                  styles.featuresContainer,
                  {marginTop: 1, top: -93, right: 20},
                ]}>
                <View style={styles.featuresView}>
                  <Image
                    source={Images.RecurringIncomeIcon}
                    resizeMode="contain"
                    style={styles.featuresImage}
                  />
                  <Text style={styles.featuresText}>
                    Recurring contributions
                  </Text>
                </View>

                <View style={styles.featuresView}>
                  <Image
                    source={Images.MobileCommerceIcon}
                    resizeMode="contain"
                    style={styles.featuresImage}
                  />
                  <Text style={styles.featuresText}>Mobile commerce</Text>
                </View>

                <View style={[styles.featuresView, {borderBottomWidth: 0}]}>
                  <Image
                    source={Images.GrowthIcon}
                    resizeMode="contain"
                    style={styles.featuresImage}
                  />
                  <Text style={styles.featuresText}>Growth opportunities</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  };

  const _renderPage4 = () => {
    return (
      <ImageBackground
        source={Images.TourImage5}
        style={{width: '100%', height: '100%', backgroundColor: Colors.black}}
        resizeMode="stretch">
        <View style={[styles.page1Wrapper]}>
          <Text style={[styles.para]}>Innovation</Text>
          <Text style={[styles.narration]}>For the future.</Text>
        </View>

        <LinearGradient
          start={{x: 0, y: 0.2}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,.0)', 'rgba(0,0,0,.3)', 'rgba(0,0,0,.5)']}
          style={{height: '62%'}}>
          <View style={[styles.featuresContainer, {marginTop: 96}]}>
            <View style={styles.featuresView}>
              <Image
                source={Images.ScannableIcon}
                resizeMode="contain"
                style={styles.featuresImage}
              />
              <Text style={styles.featuresText}>Scannable</Text>
            </View>

            <View style={styles.featuresView}>
              <Image
                source={Images.RunningIcon}
                resizeMode="contain"
                style={styles.featuresImage}
              />
              <Text style={styles.featuresText}>Fast</Text>
            </View>

            <View style={[styles.featuresView, {borderBottomWidth: 0}]}>
              <Image
                source={Images.ShowGoIcon}
                resizeMode="contain"
                style={styles.featuresImage}
              />
              <Text style={styles.featuresText}>Show and go</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  };

  const dot = () => {
    return <View style={styles.dot} />;
  };

  const activeDot = () => {
    return (
      <View style={styles.activeDotView}>
        <View style={styles.activeDot} />
      </View>
    );
  };

  const slidesData = [
    _renderPage1(),
    _renderPage2(),
    _renderPage3(),
    _renderPage4(),
  ];
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View
        style={[styles.skipParent, !util.isPlatformAndroid() && {bottom: 50}]}>
        <TouchableOpacity onPress={() => skip()}>
          <Text color={'rgba(255,255,255,.3)'} type="semiBold">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <AppIntroSlider
        data={slidesData}
        renderItem={({item, index}) => {
          return slidesData[index];
        }}
        onSlideChange={(index, lastIndex) => {
          setActiveIndex(index);
        }}
        renderNextButton={() => {}}
        renderDoneButton={() => {}}
        activeDotStyle={{}}
        dotStyle={{}}
      />
      <View
        style={[
          {
            bottom: util.isPlatformAndroid() ? 25 : 40,
            flexDirection: 'row',
            position: 'absolute',
            alignSelf: 'center',
          },
        ]}>
        {slidesData.map((item, index) => {
          if (index === activeIndex) {
            return activeDot();
          }
          return dot();
        })}
      </View>
    </View>
  );
}

TourScreens.propTypes = {};
TourScreens.defaultProps = {};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(TourScreens);
