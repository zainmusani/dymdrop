// @flow
import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import ProgressBar from 'react-native-progress/Bar';
import {
  ActivityIndicator,
  Image,
  Linking,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  AlertModal,
  FlatlistComponent,
  MainScreensHeader,
  SpinnerComponent,
  Text,
} from '../../components';
import {AppStyles, Colors, Images, Metrics, Fonts} from '../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {useCallback} from 'react';
import {
  ALERT_TIMER,
  DATE_FORMAT1,
  DATE_FORMAT2,
  PAGE_IMAGES_OPTIONS,
} from '../../constants';
import {ISOToFormat} from '../../helpers/DateTimeHelpers';
import Page from '../Page';
import {
  getPageDetailsRequest,
  getPageDetailsSuccess,
  getPagesRequest,
} from '../../actions/PagesActions';
import {userApprovalRequest} from '../../actions/UserActions';
import {
  acceptTeamInvitation,
  removeInvitedUser,
} from '../../actions/teamAction';
import {
  addCardDetails,
  getPaymentDetailRequest,
} from '../../actions/PaymentAction';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spinner from 'react-native-spinkit';

function Dashboard(props) {
  const {
    isAccountCreatedAlert,
    isAccountSetupAlert,
    isBlockedAlert,
    freePages,
    freePageDetails,
    userData,
    isQrCodeScanned,
    isQrCodeScannedError,
    QrCodeScannedError,
    paymentDetails,
    isUserInvited,
    invitedPage,
    invitedName,
    isInvitedTeammate,
    invitedTeammatePage,
    invitedTeammateOwner,
  } = props;
  const isAlertModal =
    isAccountCreatedAlert ||
    isAccountSetupAlert ||
    isQrCodeScanned ||
    isQrCodeScannedError ||
    isUserInvited ||
    isInvitedTeammate ||
    isBlockedAlert;
  const isWarningAlert = isBlockedAlert;
  const [isFetching, setIsFetching] = useState(false);
  const [freePagesList, setFreePagesList] = useState(() => []);
  const [alertModal, setAlertModal] = useState(() => isAlertModal);
  const [responseMessageFromApiCall, setResponseMessageFromApiCall] = useState(
    () => '',
  );
  const [activePagePerformanceId, setActivePagePerformanceId] = useState([]);
  const [activePageAttendanceId, setActivePageAttendanceId] = useState([]);
  const [isInvited, setInvited] = useState(isUserInvited || isInvitedTeammate);
  const [isPageModal, setPageModal] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [acceptLoading, setacceptLoading] = useState(false);
  const [warningAlert, setWarningAlert] = useState(() => isWarningAlert);
  const [loadingPageImageIds, setLoadingPageImageIds] = useState(() => []);
  const [loadingPerfomanceImageIds, setLoadingPerfomancePageImageIds] =
    useState(() => []);
  const [pageImageIds, setPageImageIds, getPageImageIds] = useState(() => []);
  const [pageOption, setPageOption] = useState(() => {});
  const pageListRef = useRef(null);
  const dispatch = useDispatch(null);
  const getPagesRequestHandler = () => {
    dispatch(
      getPagesRequest(res => {
        setIsLoading(false);
        if (!res?.status && !userData.isTeammate) {
          let pages = util.cloneDeepItem(freePagesList);
          pages.unshift({imagePreview: Images.AddIcon});
          setFreePagesList(pages);
        }
      }),
    );
  };
  const getPaymentDetailHandler = () => {
    setPaymentLoading(true);
    dispatch(
      getPaymentDetailRequest(res => {
        setPaymentLoading(false);
        if (!res.status) {
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        }
      }),
    );
  };
  const acceptInvitationHandler = () => {
    setacceptLoading(true);
    dispatch(
      acceptTeamInvitation(
        isInvitedTeammate ? invitedTeammatePage : invitedPage,
        res => {
          setacceptLoading(false);
          setInvited(false);
          if (res.status) {
            setAlertModal(false);
            getPagesRequestHandler();
            if (isInvitedTeammate) {
              dispatch(removeInvitedUser());
            }
          } else {
            setInvited(false);
            setResponseMessageFromApiCall(res.message);
            setAlertModal(true);
          }
        },
      ),
    );
  };
  const addCardDetailHandler = () => {
    setPaymentLoading(true);
    dispatch(
      addCardDetails(res => {
        setPaymentLoading(false);
        if (res.status) {
          Actions.push('paymentWebContainer', {incomingURL: res.data.url});
          // util.openLink(res.data.url);
        } else {
          setResponseMessageFromApiCall(res.message);
          setAlertModal(true);
        }
      }),
    );
  };

  useEffect(() => {
    if (userData?.isUserApproved) {
      if (!isQrCodeScanned && !isQrCodeScannedError) {
        setIsLoading(true);
      }
      getPagesRequestHandler();
      getPaymentDetailHandler();
    }
  }, []);

  useEffect(() => {
    let pages = [];
    if (userData.isTeammate) {
      pages = [...freePages];
    } else {
      if (
        !util.isArrayOrObjEmpty(freePages) &&
        !util.isArrayOrObjEmpty(freePagesList)
      ) {
        pages = [freePagesList[0], ...freePages];
      } else {
        pages.unshift({imagePreview: Images.AddIcon});
      }
    }
    setFreePagesList(pages);
  }, [freePages]);

  const handleTapOnItem = (isAddPageItem, item) => {
    if (!isAddPageItem) {
      const payload = {
        id: item.id,
      };
      setIsLoading(true);

      dispatch(
        getPageDetailsRequest(payload, res => {
          setIsLoading(false);

          if (res.status) {
            setPageModal(true);
          } else {
            setResponseMessageFromApiCall(res.message);
            setAlertModal(true);
          }
        }),
      );
    } else {
      getPageImage();
      dispatch(getPageDetailsSuccess({}));
      setPageModal(true);
    }
  };

  function checkForItemStyling(item, pagesLength) {
    if (!util.isFieldNil(item?.id) && pagesLength > 2) {
      return {
        marginLeft: 15,
      };
    } else if (util.isFieldNil(item?.id) && pagesLength < 2) {
      return [
        styles.mobileViewStyle,
        AppStyles.mLeft20,
        styles.addPagesMobileViewRadiusAndDimension,
      ];
    }
  }

  function checkFreePagesExceeded(isAddPageItem, isPagesLengthExceeded) {
    if (isAddPageItem && isPagesLengthExceeded) {
      setIsFreePagesLimitReached(true);
    }
  }

  const handlePagePerformanceIndex = index => {
    const pressForClose = _.includes(activePagePerformanceId, index);
    // const pressForClose = index === activePagePerformanceId;

    // if (pressForClose) {
    //   setActivePagePerformanceId(null);
    // } else {
    //   setActivePagePerformanceId(index);
    // }

    if (pressForClose) {
      //
      const dummyArrayForDelete = _.cloneDeep(activePagePerformanceId);
      const findItemIndex = _.indexOf(dummyArrayForDelete, index);
      dummyArrayForDelete.splice(findItemIndex, 1);
      setActivePagePerformanceId(dummyArrayForDelete);
      //
    } else {
      //
      const dummyArray = util.cloneDeepItem(activePagePerformanceId);
      dummyArray.push(index);

      setActivePagePerformanceId(dummyArray);
      //
    }
  };
  const handlePageAttendanceIndex = index => {
    const pressForClose = _.includes(activePageAttendanceId, index);
    if (pressForClose) {
      const dummyArrayForDelete = _.cloneDeep(activePageAttendanceId);
      const findItemIndex = _.indexOf(dummyArrayForDelete, index);
      dummyArrayForDelete.splice(findItemIndex, 1);
      setActivePageAttendanceId(dummyArrayForDelete);
    } else {
      const dummyArray = util.cloneDeepItem(activePageAttendanceId);
      dummyArray.push(index);

      setActivePageAttendanceId(dummyArray);
      //
    }
  };

  const alertSec = useCallback(() => {
    if (isInvited) {
      return (
        <AlertModal
          getAlertText={getAlertText}
          hasBtn={true}
          invitation
          btnText="Accept"
          disableBtn={acceptLoading}
          btnLoading={acceptLoading}
          btnAction={acceptInvitationHandler}
          incomingStyle={{marginLeft: 17, marginRight: 15}}
          styleSpacingFromTopofScreen={{
            top: util.isPlatformAndroid()
              ? Metrics.screenHeight / 9
              : Metrics.screenHeight / 7.5,
          }}
        />
      );
    } else {
      setTimeout(() => {
        setAlertModal(false);
        setWarningAlert(false);
        setResponseMessageFromApiCall('');
      }, ALERT_TIMER);

      return (
        <AlertModal
          getAlertText={getAlertText}
          hasError={
            !util.isEmptyValue(responseMessageFromApiCall) ||
            isQrCodeScannedError
          }
          hasWarning={warningAlert}
          styleSpacingFromTopofScreen={{
            top: util.isPlatformAndroid()
              ? Metrics.screenHeight / 6.5
              : Metrics.screenHeight / 9,
          }}
        />
      );
    }
  }, [alertModal, acceptLoading]);

  const getAlertText = () => {
    if (!util.isEmptyValue(responseMessageFromApiCall)) {
      return responseMessageFromApiCall;
    } else if (isBlockedAlert || !userData.isUserApproved) {
      return 'Admin approval required';
    } else if (isQrCodeScanned) {
      return 'QR code verified';
    } else if (isQrCodeScannedError) {
      return QrCodeScannedError;
    } else if (isAccountSetupAlert) {
      return 'Account Setup Successfully';
    } else if (isUserInvited) {
      return `You're invited to join ${invitedName.replaceAll(
        '%20',
        ' ',
      )} team`;
    } else if (isInvitedTeammate) {
      return `You're invited to join ${invitedTeammateOwner.replaceAll(
        '%20',
        ' ',
      )} team`;
    } else {
      return 'Account created';
    }
  };

  const pagesView = (item, index) => {
    const isAddPageItem = util.isFieldNil(item?.id);
    const myPages = freePages.filter(x => x.isInvited !== true);
    return (
      <>
        <View style={{paddingTop: 26}}>
          <TouchableOpacity
            onPress={() => handleTapOnItem(isAddPageItem, item)}
            activeOpacity={0.9}
            style={[
              AppStyles.mLeft25,
              {marginRight: 10},
              checkForItemStyling(item, myPages.length),
            ]}>
            {!isAddPageItem && !item?.isPublished && (
              <View style={styles.unpublishedPageIconContainer}>
                <Image source={Images.UnpublishedPageIconIndicator} />
              </View>
            )}
            <View
              style={[
                util.isFieldNil(item?.id) && styles.mobileViewStyle,
                styles.addPagesMobileViewRadiusAndDimension,
              ]}>
              {myPages.length > 2 && isAddPageItem
                ? pagesLimitReachedSec()
                : pagesViewSec(item, isAddPageItem, myPages.length > 2)}
            </View>
          </TouchableOpacity>
          {!isAddPageItem && item.members !== 0 && (
            <View style={styles.memberText}>
              <Text
                style={{
                  fontFamily: Fonts.type.medium,
                  fontSize: 14,
                  opacity: 0.7,
                }}>
                {item.members} member{item.members >= 2 ? 's' : ''}
              </Text>
            </View>
          )}
        </View>
      </>
    );
  };

  const pagesLimitReachedSec = () => (
    <TouchableOpacity
      style={styles.pagesLimitReachedContainer}
      onPress={() => Linking.openURL('mailto:help@dymdrop.com')}>
      {/* // onPress={() => Actions.paymentPlan()}> */}
      {/* <View style={{paddingHorizontal: 24}}>
        <Text color={Colors.text.reca} size={13}>
          Upgrade
        </Text>
      </View> */}
      <View style={[styles.getMorePagesText, {marginBottom: 70}]}>
        {/* <Text color={Colors.text.neka} size={13} style={{textAlign: 'center'}}> */}
        <Text color={Colors.text.reca} size={14} style={{textAlign: 'center'}}>
          {/* Get more pages with PRO */}
          Get more pages
        </Text>
      </View>
    </TouchableOpacity>
  );

  const pagesViewSec = (item, isAddPageItem, isPagesLengthExceeded) => {
    checkFreePagesExceeded(isAddPageItem, isPagesLengthExceeded);
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isAddPageItem}
          // onPress={function () {
          //   isAddPageItem ? Actions.page() : {};
          // }}>

          onPress={function () {
            isAddPageItem ? handleTapOnItem(isAddPageItem, item) : {};
          }}>
          {!isAddPageItem && !loadingPageImageIds.includes(item?.id) && (
            <View style={styles.emptyImageStyle}>
              <Image
                source={Images.DymeDropIcon}
                style={{height: 30, width: 40}}
              />
            </View>
          )}
          <Image
            source={
              isAddPageItem ? item.imagePreview : {uri: item.imagePreview}
            }
            resizeMode={isAddPageItem ? 'contain' : 'cover'}
            style={[isAddPageItem ? {} : styles.freePageImageStyle]}
            // onLoad={() => setImageLoading(false)}
            onLoadStart={() => {
              if (!isAddPageItem) {
                let ids = util.cloneDeepItem(loadingPageImageIds);
                ids.push(item?.id);

                setLoadingPageImageIds(ids);
              }
            }}
            onLoadEnd={() => {
              if (!isAddPageItem) {
                let ids = util.cloneDeepItem(loadingPageImageIds);

                let index = ids.indexOf(item?.id);

                if (index > -1) {
                  ids.splice(index, 1); // 2nd parameter means remove one item only
                  setLoadingPageImageIds(ids);
                }
              }
            }}
          />

          {!isAddPageItem && (
            <View style={styles.imageOverlayStyle}>
              {/* <Image
                source={Images.DymeDropIcon}
                style={{height: 30, width: 40}}
              /> */}
            </View>
          )}

          {!isAddPageItem && loadingPageImageIds.includes(item?.id) && (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={styles.imageLoading}
            />
          )}
          {!isAddPageItem && item.members !== 0 && (
            <Image
              source={
                item?.isInvited ? Images.MemberInvitedIcon : Images.MemberIcon
              }
              style={[styles.passMemberIcon, {left: item?.isInvited ? 40 : 32}]}
            />
          )}
        </TouchableOpacity>
      </>
    );
  };
  const pagesListSec = () => (
    <View style={AppStyles.flexRow}>
      <FlatlistComponent
        flatListRef={pageListRef}
        scrollEnabled={freePages.length > 1}
        horizontal={true}
        itemsList={freePagesList}
        renderItemView={pagesView}
      />
    </View>
  );

  const pagesSec = isApproved => (
    <View style={styles.pagesSecContainer}>
      <View style={[AppStyles.mLeft20]}>
        <Text size={18} type="bold" style={AppStyles.mBottom5}>
          Pages
        </Text>
        <Text color={Colors.text.secondary} size={16}>
          {userData.isTeammate
            ? 'Edit and contribute'
            : ' Create, manage and promote'}
        </Text>
      </View>
      {!isApproved || (userData.isTeammate && freePagesList.length <= 0) ? (
        <View
          style={{
            flex: 1,
            height: (Metrics.screenHeight / 100) * 20,
            alignItems: 'center',
            paddingHorizontal: Metrics.screenWidth / 4.8,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>
            {userData.isTeammate && freePagesList.length <= 0
              ? 'Upon invite, this is where pages will live'
              : 'Upon approval, this is where your pages will live'}
          </Text>
        </View>
      ) : (
        pagesListSec()
      )}

      <View style={styles.borderLineStyle} />
    </View>
  );

  const pagePerformanceSec = (
    data,
    item,
    attendance,
    isPageActive,
    pageIndex,
    isAttendanceActive,
  ) => {
    return (
      <View style={styles.insightBoxStyle}>
        <View style={[AppStyles.flex, AppStyles.flexRow]}>
          <View style={styles.insightTextStyle}>
            {util.isFieldNil(item)
              ? insightsBoxInfo()
              : performanceInfoSec(item)}
            {insightsBoxPlaceholders(item)}
          </View>

          <View
            style={[
              util.isFieldNil(item)
                ? [
                    styles.mobileViewStyle,

                    styles.insightMobileViewRadiusAndDimension,
                  ]
                : styles.performanceImagePreviewContainer,
            ]}>
            {!util.isFieldNil(item) && (
              <View>
                {!loadingPerfomanceImageIds.includes(data?.id) && (
                  <View style={styles.emptyImageStyle}>
                    <Image
                      source={Images.DymeDropIcon}
                      style={{height: 30, width: 40}}
                    />
                  </View>
                )}
                <Image
                  source={{uri: item.imagePreview}}
                  resizeMode={'cover'}
                  style={styles.performanceImagePreviewStyle}
                  onLoadStart={() => {
                    let ids = util.cloneDeepItem(loadingPerfomanceImageIds);
                    ids.push(data?.id);
                    setLoadingPerfomancePageImageIds(ids);
                  }}
                  onLoadEnd={() => {
                    let ids = util.cloneDeepItem(loadingPerfomanceImageIds);
                    let index = ids.indexOf(data?.id);
                    if (index > -1) {
                      ids.splice(index, 1);
                      setLoadingPerfomancePageImageIds(ids);
                    }
                  }}
                />
                <View style={styles.imageOverlayStyle} />
                {loadingPerfomanceImageIds.includes(data?.id) && (
                  <ActivityIndicator
                    size="small"
                    color={Colors.white}
                    style={styles.imageLoading}
                  />
                )}
              </View>
            )}
          </View>
        </View>

        {/* no line font ui */}
        {!util.isFieldNil(item) && util.isArrayOrObjEmpty(item?.links) && (
          <View style={styles.noLinkFound}>
            <Text type="bold" size={18}>
              Top Links
            </Text>
            <Text type="light" size={16} style={AppStyles.mTop15}>
              No data to display yet.
            </Text>
            {/* <View style={styles.noLinkFoundBorder}></View> */}
          </View>
        )}

        {/* no line font ui */}

        {!util.isFieldNil(item) && !util.isArrayOrObjEmpty(item.links) && (
          <View style={styles.linksViewContainer}>
            {linksSec(item, isPageActive, pageIndex)}
          </View>
        )}
        {!util.isFieldNil(attendance) && attendance.length === 0 && (
          <View style={styles.noLinkFound}>
            <Text type="bold" size={18}>
              Top Attendance
            </Text>
            <Text type="light" size={16} style={AppStyles.mTop15}>
              No data to display yet.
            </Text>
          </View>
        )}
        {!util.isFieldNil(attendance) && attendance.length >= 1 && (
          <View style={styles.attendanceViewContainer}>
            {attendanceSec(attendance, isAttendanceActive, pageIndex)}
          </View>
        )}
      </View>
    );
  };

  const linksSec = (item, isPageActive, pageIndex) => {
    let topLinks = util.cloneDeepItem(item?.links ?? []);
    let topLinksAfterSlice = [];

    let showBtnForMoreLinks = true;

    if (item?.links.length < 4) {
      showBtnForMoreLinks = false;
    } else {
      topLinksAfterSlice = topLinks.slice(0, 3);
    }

    let allLinks = util.cloneDeepItem(item?.links ?? []);
    return (
      <View style={AppStyles.mTop25}>
        <View>
          <View style={AppStyles.mBottom25}>
            <Text type="bold" size={18}>
              Top Links
            </Text>
          </View>

          {!isPageActive &&
            showBtnForMoreLinks &&
            topLinksAfterSlice.map((item, index) =>
              linkItemSec(item, item.id, topLinksAfterSlice.length, index),
            )}
          {(isPageActive ||
            (!showBtnForMoreLinks && topLinksAfterSlice.length === 0)) &&
            allLinks.map((item, index) =>
              linkItemSec(item, item.id, allLinks.length, index),
            )}

          {showBtnForMoreLinks && performanceSecBtn(isPageActive, pageIndex)}
        </View>
      </View>
    );
  };

  const linkItemSec = (item, index, numOfItems, linkIndex) => (
    <View
      key={index}
      style={[
        styles.linksItemContainer,
        numOfItems - 1 !== linkIndex && {
          borderBottomWidth: 1.6,
          borderBottomColor: Colors.border.tertiary,
          marginBottom: 23,
        },
      ]}>
      <View
        style={[
          AppStyles.mBottom35,
          AppStyles.flexRow,
          {justifyContent: 'space-between'},
        ]}>
        <View style={{width: '60%'}}>
          <Text size={16} color={Colors.text.secondary}>
            {item.title}
          </Text>
        </View>
        <View>
          <Text size={16} color={Colors.text.secondary}>
            {item.clicks} Clicks
          </Text>
        </View>
      </View>
      <View style={AppStyles.mBottom25}>
        <ProgressBar
          progress={item.progress / 100}
          width={Metrics.screenWidth - 90}
          height={8}
          borderRadius={4}
          unfilledColor={Colors.border.tertiary}
          borderColor={Colors.border.tertiary}
          color={Colors.linkProgressColors[linkIndex]}
        />
      </View>
    </View>
  );

  const performanceSecBtn = (isPageActive, pageIndex) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        borderColor: Colors.border.quaternary,
        borderWidth: 1,
      }}
      onPress={() => {
        handlePagePerformanceIndex(pageIndex);
      }}>
      <Text size={14} color={Colors.text.primary} type="semiBold">
        {util.capitalizeString(isPageActive ? 'Less' : 'More')}
      </Text>
    </TouchableOpacity>
  );

  const attendanceSecBtn = (isActive, pageIndex) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        borderColor: Colors.border.quaternary,
        borderWidth: 1,
      }}
      onPress={() => {
        handlePageAttendanceIndex(pageIndex);
      }}>
      <Text size={14} color={Colors.text.primary} type="semiBold">
        {util.capitalizeString(isActive ? 'Less' : 'More')}
      </Text>
    </TouchableOpacity>
  );

  const attendanceSec = (item, isActive, pageIndex) => {
    let topAttendance = util.cloneDeepItem(item ?? []);
    let topAttendanceAfterSlice = [];
    let showBtnForMoreLinks = true;

    if (item.length < 4) {
      showBtnForMoreLinks = false;
    } else {
      topAttendanceAfterSlice = topAttendance.slice(0, 3);
    }
    let allAttendance = util.cloneDeepItem(item ?? []);
    return (
      <View style={AppStyles.mTop25}>
        <View>
          <View style={AppStyles.mBottom25}>
            <Text type="bold" size={18}>
              Top Attendance
            </Text>
          </View>

          {!isActive &&
            showBtnForMoreLinks &&
            topAttendanceAfterSlice.map((item, index) =>
              attendanceItemSec(item, index),
            )}
          {(isActive ||
            (!showBtnForMoreLinks && topAttendanceAfterSlice.length === 0)) &&
            allAttendance
              .slice(0, 10)
              .map((item, index) => attendanceItemSec(item, index))}

          {showBtnForMoreLinks && attendanceSecBtn(isActive, pageIndex)}
        </View>
      </View>
    );
  };

  const attendanceItemSec = item => (
    <View style={[styles.attendanceItemContainer]}>
      <View
        style={[
          AppStyles.mBottom15,
          AppStyles.flexRow,
          // {justifyContent: 'space-between'},
        ]}>
        <View style={styles.attendanceThumb}>
          <Image
            source={
              item.thumb
                ? {
                    uri: item.thumb,
                  }
                : Images.UserIcon
            }
            style={{
              width: item.thumb ? 48 : 24,
              height: item.thumb ? 48 : 24,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={styles.attendanceDetail}>
          <Text
            size={16}
            type="bold"
            color={Colors.text.secondary}
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text size={14} style={{marginTop: 3}} color={Colors.text.secondary}>
            {item.activationName}
          </Text>
        </View>
        <View style={styles.attendanceEvent}>
          <Text size={16} color={Colors.text.secondary}>
            {item.events} event{item.events >= 2 ? 's' : ''}
          </Text>
        </View>
      </View>
    </View>
  );

  const performanceInfoSec = item => (
    <View style={{marginBottom: 20}}>
      <View style={{marginBottom: 8}}>
        <Text size={24} type="bold">
          {item.title}
        </Text>
      </View>
      <View>
        <Text type="medium" size={14} color={Colors.text.secondary}>
          Published {getDateFormat(item)}
        </Text>
      </View>
    </View>
  );

  const getDateFormat = item => {
    const today = moment();
    const createdDate = moment(item.publishDate);

    if (createdDate.add(1, 'weeks').isBefore(today)) {
      return ISOToFormat(item.publishDate, DATE_FORMAT2);
    } else {
      return ISOToFormat(item.publishDate, DATE_FORMAT1);
    }
  };

  const insightsBoxInfo = () => (
    <View>
      <Text color={Colors.text.secondary} size={16}>
        To view performance,{' '}
        <TouchableOpacity
          onPress={() => {
            if (freePages.length > 0) {
              handleTapOnItem(false, freePages[0]);
            } else {
              handleTapOnItem(true);
            }
          }}
          style={AppStyles.alignItemsFlexEnd}>
          <Text color={Colors.text.reca} size={16} style={{top: 3}}>
            {freePages.length > 0 ? 'publish page' : 'create page'}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );

  const insightsBoxPlaceholders = item => (
    <View style={[AppStyles.flexRow]}>
      <View>
        <Text size={14} type="semiBold">
          Views
        </Text>
        {util.isFieldNil(item) ||
        (!util.isFieldNil(item) && util.isArrayOrObjEmpty(item?.links)) ||
        item?.views === 0 ? (
          <View style={styles.insightPlaceholderBadge} />
        ) : (
          <Text type="bold" size={24}>
            {item.views}
          </Text>
        )}
      </View>
      <View style={[AppStyles.mLeft20]}>
        <Text size={14} type="semiBold">
          Clicks
        </Text>
        {util.isFieldNil(item) ||
        (!util.isFieldNil(item) && util.isArrayOrObjEmpty(item?.links)) ||
        item?.clicks === 0 ? (
          <View style={styles.insightPlaceholderBadge} />
        ) : (
          <Text type="bold" size={24}>
            {item.clicks}
          </Text>
        )}
      </View>
      <View style={[AppStyles.mLeft20]}>
        <View style={{alignSelf: 'flex-start'}}>
          <Text size={14} type="semiBold">
            CTR
          </Text>
        </View>
        {util.isFieldNil(item) ||
        (!util.isFieldNil(item) && util.isArrayOrObjEmpty(item?.links)) ? (
          <View style={styles.insightPlaceholderBadge} />
        ) : (
          <>
            {(item.views === 0 && item.clicks === 0) ||
            (item.clicks > 0 && item.views === 0) ||
            (item.views > 0 && item.clicks === 0) ? (
              <View style={styles.insightPlaceholderBadge} />
            ) : (
              <View>
                <Text type="bold" size={24}>
                  {getCTRValue(item)}%
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );

  const getCTRValue = item => {
    let ctr = 0;
    if (item.views > 0 && item.clicks === 0) {
      return ctr;
    } else {
      // return ((item.clicks / item.views) * 100).toFixed(2);
      return Math.round((item.clicks / item.views) * 100).toFixed(0);
    }
  };

  const insightsSec =
    //  useMemo(
    isApproved => {
      return (
        <View style={styles.insightSecContainer}>
          <View style={AppStyles.mBottom25}>
            <Text size={18} type="bold" style={AppStyles.mBottom5}>
              Performance
            </Text>
            <Text color={Colors.text.secondary} size={16}>
              Explore, analyze and measure
            </Text>
          </View>
          {!isApproved || (userData.isTeammate && freePagesList.length <= 0) ? (
            <View
              style={{
                flex: 1,
                height: (Metrics.screenHeight / 100) * 28,
                alignItems: 'center',
                paddingHorizontal: Metrics.screenWidth / 8,
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', top: -65}}>
                {userData.isTeammate && freePagesList.length <= 0
                  ? 'Upon invite, this is where pages stats will live'
                  : 'Upon approval, this is where your stats will live'}
              </Text>
            </View>
          ) : freePagesList.length > 1 ? (
            pagePerformanceListing()
          ) : userData.isTeammate && freePagesList.length >= 1 ? (
            pagePerformanceListing()
          ) : !userData.isTeammate && freePagesList.length <= 1 ? (
            pagePerformanceSec()
          ) : (
            <View />
          )}
        </View>
      );
    };
  // , [freePages]);
  const pagePerformanceListing = () => {
    let isPublishPage = false;
    let freePagesItems = [];

    // performace once calculated, show always

    const filteredPages = _.filter(freePages, function (o) {
      return !_.isEmpty(o.performance);
    });

    /* const filteredPages = util.filterArray(
      freePages,
      item => item?.isPublished,
    ); */

    if (!util.isArrayOrObjEmpty(filteredPages)) {
      freePagesItems = filteredPages.map((item, index) => {
        // const active = index === activePagePerformanceId;
        const active = _.includes(activePagePerformanceId, item.id);
        const attActive = _.includes(activePageAttendanceId, item.id);

        return (
          <View style={AppStyles.mBottom25}>
            {pagePerformanceSec(
              item,
              item.performance,
              item.topAttendence,
              active,
              item.id,
              attActive,
            )}
          </View>
        );
      });

      return freePagesItems;
    }

    return !isPublishPage && pagePerformanceSec();
  };
  const setUserPaymentHandler = () => {
    if (!userData.isUserApproved) {
      setAlertModal(true);
      setWarningAlert(true);
    } else {
      !paymentDetails.status ? addCardDetailHandler() : Actions.push('payment');
    }
  };
  const paymentSec = () => (
    <View style={styles.paymentSecContainer}>
      <View style={[AppStyles.mBottom25, AppStyles.mLeft20]}>
        <Text size={18} type="bold" style={AppStyles.mBottom5}>
          Payment
        </Text>
        <Text color={Colors.text.secondary} size={16}>
          View and manage cash flow
        </Text>
      </View>
      <TouchableOpacity
        disabled={paymentLoading}
        onPress={() => {
          setUserPaymentHandler();
        }}
        style={[AppStyles.mLeft20, styles.insightBoxStyle]}>
        <View style={[AppStyles.flex, AppStyles.flexRow]}>
          <View style={styles.insightTextStyle}>
            <Text
              color={Colors.text.secondary}
              size={16}
              type="medium"
              style={AppStyles.mBottom5}>
              {!paymentDetails.status || !userData.isUserApproved
                ? 'Not set up'
                : paymentDetails.balance === 0
                ? 'You don’t have any'
                : 'Current Earnings'}
            </Text>
            <Text
              type={
                !paymentDetails.status || paymentDetails.balance !== 0
                  ? 'semiBold'
                  : 'medium'
              }
              size={16}
              color={
                !paymentDetails.status || paymentDetails.balance !== 0
                  ? Colors.black
                  : Colors.text.secondary
              }>
              {!paymentDetails.status || !userData.isUserApproved
                ? 'Set Up Payments'
                : paymentDetails.balance === 0
                ? 'earnings yet'
                : `$${paymentDetails.balance}`}
            </Text>
          </View>
          <View style={AppStyles.centerInner}>
            {paymentLoading ? (
              <Spinner
                style={[{alignSelf: 'center'}]}
                isVisible={paymentLoading}
                size={20}
                type={'FadingCircleAlt'}
                color={Colors.black}
              />
            ) : !paymentDetails.status || paymentDetails.balance !== 0 ? (
              <Image source={Images.ArrowIcon} resizeMode={'contain'} />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.borderLineStyle} />
    </View>
  );
  useEffect(() => {
    if (!util.isArrayOrObjEmpty(pageOption)) {
      returnPageImage();
    }
  }, [pageOption]);

  useEffect(() => {
    if (pageImageIds && pageImageIds.length >= 3) {
      setPageImageIds([]);
    }
  }, [pageImageIds]);

  const getPageImage = () => {
    if (util.isArrayOrObjEmpty(pageImageIds)) {
      setPageOption(PAGE_IMAGES_OPTIONS[0]);
      //
    } else if (!pageImageIds.includes(PAGE_IMAGES_OPTIONS[0].id)) {
      setPageOption(PAGE_IMAGES_OPTIONS[0]);
      //
    } else if (!pageImageIds.includes(PAGE_IMAGES_OPTIONS[1].id)) {
      setPageOption(PAGE_IMAGES_OPTIONS[1]);
      //
    } else if (!pageImageIds.includes(PAGE_IMAGES_OPTIONS[2].id)) {
      setPageOption(PAGE_IMAGES_OPTIONS[2]);
      //
    } else {
      setPageOption(PAGE_IMAGES_OPTIONS[0]);
      //
    }
  };
  const getApproval = () =>
    new Promise(resolve =>
      dispatch(
        userApprovalRequest(res => {
          // if (!res?.status) {
          // }
          dispatch(
            getPagesRequest(res => {
              // if (!res?.status) {
              //   let pages = util.cloneDeepItem(freePagesList);
              //   pages.unshift({imagePreview: Images.AddIcon});
              //   setFreePagesList(pages);
              // }
              getPaymentDetailHandler();
              resolve();
            }),
          );
        }),
      ),
    );
  const onRefresh = async () => {
    setIsFetching(true);
    await getApproval();
    setIsFetching(false);
  };
  const returnPageImage = () => {
    const tempPageImageIds = util.cloneDeepItem(pageImageIds);
    tempPageImageIds.push(pageOption.id);
    setPageImageIds(tempPageImageIds);
  };
  return (
    <>
      <SafeAreaView
        style={[
          {
            backgroundColor: Colors.background.primary,
            // paddingBottom: 40,
            flex: 1,
          },
        ]}
        edges={['top']}>
        {alertModal && alertSec()}
        <SpinnerComponent isLoading={isLoading} />
        <FlatlistComponent
          itemsList={[0]}
          scrollEnabled={true}
          // scrollEnabled={userData.isUserApproved}
          onRefresh={onRefresh}
          refreshing={isFetching}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          style={{backgroundColor: Colors.background.primary, height: '100%'}}
          renderItemView={item => {
            return (
              <View
                key={item}
                style={{
                  flex: 1,
                  backgroundColor: Colors.background.primary,
                }}>
                {/* <KeyboardAwareScrollViewComponent
                  scrollEnabled={userData.isUserApproved}
                  contentContainerStyle={[styles.container]}
                  style={{backgroundColor: Colors.background.primary}}> */}
                <MainScreensHeader
                  headerText={userData.isTeammate ? 'Teammate' : 'Creator'}
                  firstIcon={Images.DymeDropIcon}
                  shouldFirstIconPress={false}
                  secondIcon={Images.SettingsIcon}
                  secondIconAction={() => Actions.settings()}
                  borderWidth={Metrics.screenWidth / 1.11}
                  hasScanBtn={userData.isUserApproved}
                  scanBtnText="Scan"
                />
                {pagesSec(userData.isUserApproved)}
                {!userData.isTeammate && paymentSec()}
                {insightsSec(userData.isUserApproved)}
                {/* </KeyboardAwareScrollViewComponent> */}
              </View>
            );
          }}
        />
      </SafeAreaView>
      {isPageModal && (
        <Page
          isPageOpen={true}
          setView={() => {
            getPaymentDetailHandler();
            getPagesRequestHandler();
            setPageModal(false);
          }}
          isPageEditable={!util.isEmptyValue(freePageDetails) ? true : false}
          onDeletePress={() => {
            pageListRef?.current?.scrollToIndex({animated: true, index: 0});
          }}
          initialRenderPageImageId={pageOption?.id ?? 0}
          initialRenderImage={pageOption?.image ?? ''}
        />
      )}
    </>
  );
}

Dashboard.propTypes = {
  freePages: PropTypes.array,
  isAccountCreatedAlert: PropTypes.bool,
  isAccountSetupAlert: PropTypes.bool,
  isQrCodeScanned: PropTypes.bool,
  isQrCodeScannedError: PropTypes.bool,
  QrCodeScannedError: PropTypes.string,
  freePageDetails: PropTypes.object,
  isBlockedAlert: PropTypes.bool,
};

Dashboard.defaultProps = {
  freePages: [],
  isAccountCreatedAlert: false,
  isAccountSetupAlert: false,
  freePageDetails: {},
  isQrCodeScanned: false,
  isQrCodeScannedError: false,
  QrCodeScannedError: '',
  isBlockedAlert: false,
};

const mapStateToProps = ({user, pages, payment, team}) => ({
  userData: user.data,
  freePages: pages.freePages,
  freePageDetails: pages.freePageDetails,
  paymentDetails: payment.details,
  isInvitedTeammate: team.isInvitedUser,
  invitedTeammatePage: team.invitedUserPage,
  invitedTeammateOwner: team.invitedUserPageOwner,
});

const actions = {};

export default connect(mapStateToProps, actions)(Dashboard);
