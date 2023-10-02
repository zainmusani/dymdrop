import PropTypes from 'prop-types';
import _ from 'lodash';
import DataTypes from '../../dataTypes';
import {OpenGraphParser} from 'react-native-opengraph-kit';
import {getLinkPreview, getPreviewFromContent} from 'link-preview-js';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import React, {useMemo, useRef, useState, useEffect, useCallback} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  Switch,
  TouchableOpacity,
  View,
  LayoutAnimation,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Modal from 'react-native-modal';
import {connect, useDispatch} from 'react-redux';
import {
  activePassRequest,
  addPageRequest,
  deletePageRequest,
  getPageDetailsRequest,
  publishPageRequest,
  updatePageRequest,
  updatePageSuccess,
} from '../../actions/PagesActions';
import {getActivationsRequest} from '../../actions/PassActivationActions';
import {
  AlertModal,
  BottomSheetComponent,
  FlatlistComponent,
  KeyboardAwareScrollViewComponent,
  LinkCard,
  ModalView,
  PageHeader,
  SelectImageComponent,
  SpinkitComponent,
  Text,
  TextInput,
  ViewPositionerComponent,
} from '../../components';
import {
  EDITPAGE_BOTTOMSHEET_OPTIONS,
  PAGE_TITLE_MAX_LENTH,
  PAGE_DESC_MAX_LENTH,
  ALERT_TIMER,
  LINK_URLS,
  SOCIAL_MEDIA_LINK_URLS,
  CONTACT_OPTION_TYPES,
  LINK_CARD_VIEW_TYPE,
  EDITLINK_BOTTOMSHEET_OPTIONS,
  LINK_DESC_MAX_LENTH,
  LINK_ACTION_MAX_LENTH,
  IDEAL_LINK_VID_HEIGHT,
} from '../../constants';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';
import Spinner from 'react-native-spinkit';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {uploadImageToServer} from '../../helpers/ImageUploadHelper';
import nfcManager from 'react-native-nfc-manager';
import {writeNdef} from '../../helpers/NFCHelpers';
import {ManageActivation, Team, ChooseActivation} from '../';

function Page(props) {
  const {
    activations,
    incomingPageDetails,
    isPageEditable,
    setView,
    onDeletePress,
    userDetails,
    initialRenderImage,
    initialRenderPageImageId,
    isPageOpen,
  } = props;

  const [isOpenView, setOpenView] = useState(() => true);
  const [isChooseActVew, setChooseActVew] = useState(false);
  const [pageDetails, setPageDetails] = useState(() => incomingPageDetails);

  const [isOptionDropDown, setOptionDropDown] = useState(() => false);
  const [isStartEditing, setStartEditing] = useState(() => false);

  const [pageImage, setPageImage] = useState(() => {});

  const [pageTitle, setPageTitle] = useState(() => '');
  const [pageTitleError, setPageTitleError] = useState(() => '');
  const [pageTitleFocus, setPageTitleFocus] = useState(() => false);

  const [pageDesc, setPageDesc] = useState(() => '');
  const [pageDescError, setPageDescError] = useState(() => '');
  const [pageDescFocus, setPageDescFocus] = useState(() => false);

  const [linkTitle, setLinkTitle] = useState(() => '');
  const [linkTitleError, setLinkTitleError] = useState(() => '');

  const [linkDesc, setLinkDesc] = useState(() => '');
  const [linkDescError, setLinkDescError] = useState(() => '');

  const [linkActionText, setLinkActionText] = useState(() => '');
  const [linkActionTextError, setLinkActionTextError] = useState(() => '');

  const [linkImage, setLinkImage] = useState(() => {});

  const [addLink, setAddLink] = useState(() => '');
  const [addLinkError, setAddLinkError] = useState(() => '');

  const [isBottomSheet, setBottomSheet] = useState(() => false);
  const [imageBackgroundLoading, setImageBackgroundLoading] = useState(
    () => false,
  );
  const [isCreationMode, setCreationMode] = useState(() => !isPageEditable);
  const [isEditMode, setEditMode] = useState(() => false);

  const [isShareLinkCopy, setShareLinkCopy] = useState(() => false);

  const [showPublishPage, setPublishPageAlert] = useState(() => isPageEditable);

  const [isPagePublishing, setPublishingPage] = useState(() => false);

  const [isPagePublished, setPagePublished] = useState(() => false);

  const [isPublishCancel, setPublishCancel] = useState(() => false);

  const [isPublishRetry, setPublishRetry] = useState(() => false);

  const [showDeletePageModal, setDeletePageModal] = useState(() => false);

  const [isSharePage, setSharePage] = useState(() => false);
  const [isPageEdited, setPageEdited] = useState(false);
  const [isLinkPage, setLinkPage] = useState(() => false);

  const [selectedLinkPositionOption, setSelectedLinkPositionOption] = useState(
    () => LINK_CARD_VIEW_TYPE.LEFT,
  );

  const [activeBottomSheetId, setActiveBottomSheetId] = useState(() => null);

  const [email, setEmail] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.EMAIL] ??
      userDetails?.email,
  );
  const [emailError, setEmailError] = useState(() => '');
  const [emailFocus, setEmailFocus] = useState(() => false);

  const [facebook, setFacebook] = useState(
    () => incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.FB] ?? '',
  );
  const [facebookError, setFacebookError] = useState(() => '');
  const [facebookFocus, setFacebookFocus] = useState(() => false);

  const [instagram, setInstagram] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.INSTA] ?? '',
  );
  const [instagramError, setInstagramError] = useState(() => '');

  const [instagramFocus, setInstagramFocus] = useState(() => false);

  const [linkedin, setLinkedin] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.LINKEDIN] ??
      '',
  );
  const [linkedinError, setLinkedinError] = useState(() => '');

  const [linkedinFocus, setLinkedinFocus] = useState(() => false);

  const [medium, setMedium] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.MEDIUM] ?? '',
  );
  const [mediumError, setMediumError] = useState(() => '');

  const [mediumFocus, setMediumFocus] = useState(() => false);

  const [phone, setPhone] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.PHONE] ?? '',
  );
  const [phoneError, setPhoneError] = useState(() => '');

  const [phoneFocus, setPhoneFocus] = useState(() => false);

  const [pinterest, setPinterest] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.PINTEREST] ??
      '',
  );
  const [pinterestError, setPinterestError] = useState(() => '');

  const [pinterestFocus, setPinterestFocus] = useState(() => false);

  const [reddit, setReddit] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.REDDIT] ?? '',
  );
  const [redditError, setRedditError] = useState(() => '');

  const [redditFocus, setRedditFocus] = useState(() => false);

  const [snapChat, setSnapChat] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.SNAPCHAT] ??
      '',
  );
  const [snapChatError, setSnapChatError] = useState(() => '');

  const [snapChatFocus, setSnapChatFocus] = useState(() => false);

  const [tiktok, setTiktok] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.TIKTOK] ?? '',
  );
  const [tiktokError, setTiktokError] = useState(() => '');

  const [tiktokFocus, setTiktokFocus] = useState(() => false);

  const [twitch, setTwitch] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.TWITCH] ?? '',
  );
  const [twitchError, setTwitchError] = useState(() => '');

  const [twitchFocus, setTwitchFocus] = useState(() => false);

  const [twitter, setTwitter] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.TWITTER] ??
      '',
  );
  const [twitterError, setTwitterError] = useState(() => '');

  const [twitterFocus, setTwitterFocus] = useState(() => false);

  const [youtube, setYoutube] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.YOUTUBE] ??
      '',
  );
  const [youtubeError, setYoutubeError] = useState(() => '');

  const [youtubeFocus, setYoutubeFocus] = useState(() => false);

  const [hudl, setHudl] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.HUDL] ?? '',
  );
  const [hudlError, setHudlError] = useState(() => '');

  const [hudlFocus, setHudlFocus] = useState(() => false);

  const [maxpreps, setMaxpreps] = useState(
    () =>
      incomingPageDetails?.contactOptions?.[CONTACT_OPTION_TYPES?.MAXPREPS] ??
      '',
  );
  const [maxprepsError, setMaxprepsError] = useState(() => '');

  const [maxprepsFocus, setMaxprepsFocus] = useState(() => false);

  const [showThumbnailToggle, setShowThumbnailToggle] = useState(true);

  const [pageLinks, setPageLinks] = useState(incomingPageDetails.links || []);

  const [editLinkIndex, setEditLinkIndex] = useState(null); // this variable is used when user wanted to edit any link

  const [isLinkLoading, setLinkLoading] = useState(false); // when link add set loader

  const [hasDoneEditing, setHasDoneEditing] = useState(false); // when user had done some changes in page, we are using this to show publish button

  const [isLinkCopy, setLinkCopy] = useState(false); // when page is publish, share link of page

  const [isViewScrolling, setViewScrolling] = useState(false); // when page is publish, share link of page

  const [responseMessageFromApiCall, setResponseMessageFromApiCall] = useState(
    () => '',
  );
  const [statusFromAPi, setStatusFromAPi] = useState(() => false);

  const [disableProgressBarBtn, setDisableProgressBarBtn] = useState(
    () => false,
  );

  const [isPageLoading, setPageLoading] = useState(() => false);

  const [addedLinks, setAddedLinks] = useState(() => []);

  const [editedLinks, setEditedLinks] = useState(() => []);

  const [deletedLinks, setDeletedLinks] = useState(() => []);

  const [addLinkButtonLoading, setAddLinkButtonLoading] = useState(() => false); // link is correct, show button loading

  const [pageImageLoading, setPageImageLoading] = useState(() => false); // link is correct, show button loading

  const [discardConfirmationAlertVisible, setDiscardConfirmationAlertVisible] =
    useState(false);

  const [loadingLinkImageIds, setLoadingLinkImageIds] = useState(() => []);

  const [isLongPress, setLongPress] = useState(() => false);

  const [isNFC, setNFC] = useState(() => false);

  const [isThumbnailLoading, setThumbnailLoading] = useState(() => false);

  const [isPermissionGranted, setPermissionGranted] = useState(() => true);

  const [deletedContactOption, setDeletedContactOption] = useState(() => {});

  const [showSharePageToggle, setShowSharePageToggle] = useState(
    incomingPageDetails?.passenable,
  );
  const [showManagePageToggle, setShowManagePageToggle] = useState(false);
  const [showTeamPageToggle, setshowTeamPageToggle] = useState(false);

  const [showSharePageToggleLoading, setShowSharePageToggleLoading] = useState(
    () => false,
  );

  const [hasWarning, setHasWarning] = useState(() => false);
  const [perfectPass, setPerfectPass] = useState(() => false);

  const [wereLinksShuffled, setWereLinksShuffled] = useState(() => false);

  const [onFieldFocus, setOnFieldFocus] = useState(() => false);

  const [shouldImageOptionsRemainVisible, setImageOptionsRemainVisible] =
    useState(() => true);

  const [enableViewOfThumbnail, setEnableViewOfThumbnail] = useState(
    () => true,
  );

  const [isLinkAdded, setLinkAdded] = useState(() => false);

  const [onPageOpen, setPageOpen] = useState(() => isPageOpen);

  const [newlyAddedLinksId, setNewlyAddedLinkIds] = useState(() => []);

  const [linkValidated, setLinkValidated] = useState(() => false);
  const [activationSaved, setactivationSaved] = useState(false);
  const [isPerfectPassDisabled, setPerfectPassDisabled] = useState(false);

  const viewShotRef = useRef(null);

  const refRBSheet = useRef(null);

  const bottomRef = useRef(null);

  const pageTitleRef = useRef(null);
  const pageDescRef = useRef(null);
  const linkTitleRef = useRef(null);
  const linkActionTextRef = useRef(null);
  const linkDescRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addLinkRef = useRef(null);

  const facebookRef = useRef(null);
  const mediumRef = useRef(null);
  const linkedinRef = useRef(null);
  const redditRef = useRef(null);
  const twitterRef = useRef(null);
  const youtubeRef = useRef(null);
  const twitchRef = useRef(null);
  const instagramRef = useRef(null);
  const snapChatRef = useRef(null);
  const maxPrepsRef = useRef(null);
  const hudlRef = useRef(null);
  const tiktokRef = useRef(null);
  const pinterestRef = useRef(null);
  const mainViewRef = useRef();
  const contactBtnFlatlistRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (onFieldFocus) {
      if (util.isPlatformAndroid()) {
        bottomRef?.current?.scrollToFocusedInput(0, 50, 15);
      }
    }
  }, [onFieldFocus]);
  const getPageDetailsRequestHandler = () => {
    dispatch(getPageDetailsRequest({id: pageDetails.id}));
  };
  useEffect(() => {
    if (isPageEditable) {
      // set image data set
      const pageImg = {};
      if (pageDetails && pageDetails.image) {
        pageImg['image'] = pageDetails.image;
        pageImg['type'] = 'jpeg';
      }
      setPageTitle(pageDetails?.title ?? '');
      setPageDesc(pageDetails?.description ?? '');
      setPageImage(pageImg);
      getContactOption();
    }
    dispatch(getActivationsRequest(pageDetails?.id));
  }, [pageDetails]);
  useEffect(() => {
    if (!incomingPageDetails.isPublished) {
      setPageDetails(incomingPageDetails);
    }
    setPageLinks(incomingPageDetails?.links ?? []);
  }, [incomingPageDetails]);

  function contactOptionValidation(
    option,
    errorFunc,
    isPhone = false,
    isEmail = false,
  ) {
    if (isPhone && !util.isEmptyValue(option) && !util.isNumber(option)) {
      errorFunc('Invalid Number');
    } else if (
      isEmail &&
      !util.isEmptyValue(option) &&
      !util.isEmailValid(option)
    ) {
      errorFunc('Invalid Email');
    } else if (
      !isPhone &&
      !isEmail &&
      !util.isEmptyValue(option) &&
      !util.isValidURL(option)
    ) {
      errorFunc('Invalid link');
    } else {
      errorFunc('');
    }
  }

  let CONTACT_BUTTON_OPTIONS = [
    {
      id: 0,
      contactType: CONTACT_OPTION_TYPES.HUDL,

      label: 'Hudl',
      icon: Images.HudlIcon,
      ref: hudlRef,
      error: hudlError,
      onChangeAction: setHudl,
      type: 'url',

      value: hudl,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(hudl, setHudlError);
      },

      isFocused: hudlFocus,
      onFocus: setHudlFocus,
    },
    {
      id: 1,
      contactType: CONTACT_OPTION_TYPES.MAXPREPS,

      label: 'MaxPreps',
      icon: Images.MaxPrepsIcon,
      ref: maxPrepsRef,
      error: maxprepsError,
      type: 'url',

      onChangeAction: setMaxpreps,
      value: maxpreps,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(maxpreps, setMaxprepsError);
      },

      isFocused: maxprepsFocus,
      onFocus: setMaxprepsFocus,
    },

    {
      id: 2,
      contactType: CONTACT_OPTION_TYPES.EMAIL,
      label: 'Email',
      icon: Images.EmailIcon,
      error: emailError,
      ref: emailRef,
      onChangeAction: setEmail,
      value: email,
      type: 'email-address',
      placeholder: 'Enter email',
      validation: () => {
        contactOptionValidation(email, setEmailError, false, true);
      },

      isFocused: emailFocus,
      onFocus: setEmailFocus,
    },

    {
      id: 3,
      contactType: CONTACT_OPTION_TYPES.FB,

      label: 'Facebook',
      icon: Images.FacebookIcon,
      ref: facebookRef,
      error: facebookError,
      onChangeAction: setFacebook,
      value: facebook,
      type: 'url',
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(facebook, setFacebookError);
      },
      isFocused: facebookFocus,
      onFocus: setFacebookFocus,
    },
    {
      id: 4,
      contactType: CONTACT_OPTION_TYPES.INSTA,

      label: 'Instagram',
      ref: instagramRef,
      error: instagramError,
      icon: Images.InstaIcon,
      type: 'url',

      onChangeAction: setInstagram,
      value: instagram,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(instagram, setInstagramError);
      },
      isFocused: instagramFocus,
      onFocus: setInstagramFocus,
    },
    {
      id: 5,
      contactType: CONTACT_OPTION_TYPES.LINKEDIN,

      label: 'LinkedIn',
      ref: linkedinRef,
      error: linkedinError,
      icon: Images.LinkedinIcon,
      type: 'url',

      onChangeAction: setLinkedin,
      value: linkedin,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(linkedin, setLinkedinError);
      },

      isFocused: linkedinFocus,
      onFocus: setLinkedinFocus,
    },
    {
      id: 6,
      contactType: CONTACT_OPTION_TYPES.MEDIUM,

      label: 'Medium',

      ref: mediumRef,
      error: mediumError,
      icon: Images.MediumIcon,
      type: 'url',

      onChangeAction: setMedium,
      value: medium,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(medium, setMediumError);
      },
      isFocused: mediumFocus,
      onFocus: setMediumFocus,
    },
    {
      id: 7,
      contactType: CONTACT_OPTION_TYPES.PHONE,

      label: 'Phone',
      ref: phoneRef,
      icon: Images.PhoneIcon,
      error: phoneError,
      onChangeAction: setPhone,
      value: phone,
      type: 'number-pad',
      placeholder: '(555) 555-5555',
      validation: () => {
        contactOptionValidation(phone, setPhoneError, true, false);
      },
      isFocused: phoneFocus,
      onFocus: setPhoneFocus,
    },
    {
      id: 8,
      contactType: CONTACT_OPTION_TYPES.PINTEREST,

      label: 'Pinterest',
      icon: Images.PinterestIcon,
      type: 'url',

      ref: pinterestRef,
      error: pinterestError,
      onChangeAction: setPinterest,
      value: pinterest,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(pinterest, setPinterestError);
      },
      isFocused: pinterestFocus,
      onFocus: setPinterestFocus,
    },
    {
      id: 9,
      contactType: CONTACT_OPTION_TYPES.REDDIT,

      label: 'Reddit',
      ref: redditRef,
      error: redditError,
      icon: Images.RedditIcon,
      type: 'url',

      onChangeAction: setReddit,
      value: reddit,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(reddit, setRedditError);
      },
      isFocused: redditFocus,
      onFocus: setRedditFocus,
    },
    {
      id: 10,
      contactType: CONTACT_OPTION_TYPES.SNAPCHAT,

      label: 'Snapchat',
      ref: snapChatRef,
      error: snapChatError,
      icon: Images.SnapChatIcon,
      type: 'url',

      onChangeAction: setSnapChat,
      value: snapChat,
      placeholder: 'Paste url',

      validation: () => {
        contactOptionValidation(snapChat, setSnapChatError);
      },
      isFocused: snapChatFocus,
      onFocus: setSnapChatFocus,
    },
    {
      id: 11,
      contactType: CONTACT_OPTION_TYPES.TIKTOK,

      label: 'Tiktok',
      ref: tiktokRef,
      error: tiktokError,
      icon: Images.TikTokIcon,
      type: 'url',

      onChangeAction: setTiktok,
      value: tiktok,
      placeholder: 'Paste url',
      validation: () => {
        contactOptionValidation(tiktok, setTiktokError);
      },
      isFocused: tiktokFocus,
      onFocus: setTiktokFocus,
    },
    {
      id: 12,
      contactType: CONTACT_OPTION_TYPES.TWITCH,

      label: 'Twitch',
      ref: twitchRef,
      error: twitchError,
      icon: Images.TwitchIcon,
      type: 'url',

      onChangeAction: setTwitch,
      value: twitch,
      placeholder: 'Paste url',

      validation: () => {
        contactOptionValidation(twitch, setTwitchError);
      },
      isFocused: twitchFocus,
      onFocus: setTwitchFocus,
    },
    {
      id: 13,
      contactType: CONTACT_OPTION_TYPES.TWITTER,

      label: 'Twitter',
      ref: twitterRef,
      error: twitterError,
      icon: Images.TwitterIcon,
      type: 'url',

      onChangeAction: setTwitter,
      value: twitter,
      placeholder: 'Paste url',

      validation: () => {
        contactOptionValidation(twitter, setTwitterError);
      },
      isFocused: twitterFocus,
      onFocus: setTwitterFocus,
    },
    {
      id: 14,
      contactType: CONTACT_OPTION_TYPES.YOUTUBE,

      label: 'Youtube',
      icon: Images.YoutubeIcon,
      ref: youtubeRef,
      error: youtubeError,
      onChangeAction: setYoutube,
      value: youtube,
      placeholder: 'Paste url',
      type: 'url',

      validation: () => {
        contactOptionValidation(youtube, setYoutubeError);
      },
      isFocused: youtubeFocus,
      onFocus: setYoutubeFocus,
    },
  ];

  const [pageContactOptions, setPageContactOptions] = useState(() => [
    CONTACT_BUTTON_OPTIONS[2],
  ]);
  ////
  const getContactOption = () => {
    let deletedContact = null;

    pageContactOptions.map((pageOptionItem, index) => {
      CONTACT_BUTTON_OPTIONS.map((contactButtonItem, index) => {
        if (!util.isFieldNil(deletedContact)) {
          return true;
        }
        if (
          contactButtonItem.contactType === pageOptionItem.contactType &&
          util.isEmptyValue(contactButtonItem.value)
        ) {
          deletedContact = contactButtonItem;
        }
      });
    });

    if (deletedContact !== -1) {
      setDeletedContactOption(deletedContact);
      reRenderContactOptions();
    }

    let contactFiltered = util.filterArray(
      CONTACT_BUTTON_OPTIONS,
      function (item) {
        return (
          util.isEmptyValue(item.error) &&
          (util.isValidURL(item.value) ||
            util.isEmailValid(item.value) ||
            util.isNumber(item.value))
        );
      },
    );
    setPageContactOptions(contactFiltered);
  };

  const reRenderContactOptions = () => {
    if (
      // util.isPlatformAndroid() &&
      !util.isFieldNil(deletedContactOption) &&
      !util.isArrayOrObjEmpty(deletedContactOption)
      // &&
      // deletedContactOption.id ===
      //   pageContactOptions[pageContactOptions.length - 1].id
    ) {
      // this.scrollView.scrollTo({ x: DEVICE_WIDTH * current_index, y: 0, animated: false });

      contactBtnFlatlistRef?.current?.scrollTo({x: 0, y: 0, animated: true});

      setDeletedContactOption({});
    }
  };

  useEffect(() => {
    reRenderContactOptions();
  }, [deletedContactOption]);

  const openBottomSheet = () => {
    CONTACT_BUTTON_OPTIONS.map((item, index) => {
      item.validation();
    });

    setBottomSheet(true);
    setPublishPageAlert(false);
    setStartEditing(true);
    if (
      isPageEditable ||
      (!isCreationMode && !util.isArrayOrObjEmpty(pageDetails))
    ) {
      setLinkPage(false);
      setEditMode(true);
    } else {
      setCreationMode(true);
    }
    refRBSheet?.current?.snapTo(1);
  };

  const selectBottomSheetId = id => {
    if (id === activeBottomSheetId && isBottomSheet) {
      Keyboard.dismiss();
      setActiveBottomSheetId(null);
    } else {
      setActiveBottomSheetId(id);
    }
  };

  const onCloseBottomSheet = async () => {
    setLinkActionTextError('');
    setLinkTitleError('');
    setLinkDescError('');
    setPageDescError('');
    setPageTitleFocus(false);
    setPageDescFocus(false);

    CONTACT_BUTTON_OPTIONS.map((item, index) => {
      item.onFocus(false);
      item.validation();
    });

    validation();

    setPageTitleError('');

    if (util.isOnlyWhiteSpace(pageTitle) && !util.isEmptyValue(pageTitle)) {
      pageTitleRef?.current?.focus?.();

      setActiveBottomSheetId(1);

      setPageTitleError('Invalid title');

      isValid = false;
    }

    if (!util.isFieldNil(editLinkIndex)) {
      if (linkFieldsValidation()) {
        manipulateDataInArraysAfterEdit();
        closeSheetFuncsToInvoke();
        setEditLinkIndex(null);
      }
    } else {
      closeSheetFuncsToInvoke();
    }
  };
  const showManagePagePreviewToggle = () => {
    setShowManagePageToggle(!showManagePageToggle);
    getPageDetailsRequestHandler();
  };
  const showTeamPagePreviewToggle = () => {
    getPageDetailsRequestHandler();
    setshowTeamPageToggle(!showTeamPageToggle);
  };

  useEffect(() => {
    getContactOption();
  }, [isBottomSheet]);

  // useEffect(() => {
  //   if (linkValidated) {
  //     manipulateDataInArraysAfterEdit(pageLinks, addedLinks, editedLinks);
  //   }
  // }, [linkValidated]);

  const manipulateDataInArraysAfterEdit = () => {
    const allPageLinks = util.cloneDeepItem(pageLinks);

    const isNewlyAddedLink = !util.isFieldNil(
      allPageLinks[editLinkIndex]?.tempId,
    );
    // if the link is newly added, then we modify the addedLink array with the newly edited lin data
    if (isNewlyAddedLink) {
      let tempAddedLinks = util.cloneDeepItem(addedLinks);
      let addLinkIndexToReplace = tempAddedLinks.findIndex(item => {
        return item?.tempId === allPageLinks[editLinkIndex]?.tempId;
      });
      tempAddedLinks[addLinkIndexToReplace] = allPageLinks[editLinkIndex];
      setAddedLinks(tempAddedLinks);
    }

    //  if the link is old one, so on edit we check if the link is not already present in edited links array
    //  if the link is not present in edited links array, then we push the data,
    //  but if the link is already present in edited link array, then we update the edited link array with the newly edited data
    else {
      let tempEditedLinks = util.cloneDeepItem(editedLinks);

      let editLinkIndexToReplace = tempEditedLinks.findIndex(item => {
        return item?.id === allPageLinks[editLinkIndex]?.id;
      });
      if (editLinkIndexToReplace < 0) {
        tempEditedLinks.push(allPageLinks[editLinkIndex]);
      } else {
        tempEditedLinks[editLinkIndexToReplace] = allPageLinks[editLinkIndex];
      }
      setEditedLinks(tempEditedLinks);
    }
    setLinkValidated(false);
  };

  const closeSheetFuncsToInvoke = () => {
    setLinkPage(false);

    setActiveBottomSheetId(null);

    // getContactOption();
    setOptionDropDown(false);
    setBottomSheet(false);
    setSharePage(false);
  };

  const linkFieldsValidation = (focusField = true) => {
    let validate = true;

    setLinkActionTextError('');

    setLinkDescError('');
    setLinkTitleError('');
    if (
      !util.isEmptyValue(linkActionText) &&
      util.isOnlyWhiteSpace(linkActionText)
    ) {
      setLinkActionTextError('Invalid action');

      if (focusField) {
        setActiveBottomSheetId(1);
        linkActionTextRef?.current?.focus?.();

        validate = false;
      }
    }

    if (!util.isEmptyValue(linkDesc) && util.isOnlyWhiteSpace(linkDesc)) {
      setLinkDescError('Invalid description');
      if (focusField) {
        setActiveBottomSheetId(1);
        linkDescRef?.current?.focus?.();

        validate = false;
      }
    }
    if (util.isEmptyValue(linkDesc)) {
      setLinkDescError('Description is required');
      if (focusField) {
        setActiveBottomSheetId(1);
        linkDesc?.current?.focus?.();

        validate = false;
      }
    }

    if (!util.isEmptyValue(linkTitle) && util.isOnlyWhiteSpace(linkTitle)) {
      setLinkTitleError('Invalid title');
      if (focusField) {
        setActiveBottomSheetId(1);
        linkTitleRef?.current?.focus?.();

        validate = false;
      }
    }

    if (util.isEmptyValue(linkTitle)) {
      setLinkTitleError('Title is required');
      if (focusField) {
        setActiveBottomSheetId(1);
        linkTitleRef?.current?.focus?.();

        validate = false;
      }
    }
    if (validate) {
      setLinkValidated(true);
    }
    return validate;
  };

  const onDeletePage = () => {
    setDeletePageModal(true);
  };
  const onActivationSaved = () => {
    // setAler
    setactivationSaved(true);
    getPageDetailsRequestHandler();
  };
  const onDeleteAction = () => {
    toggleDeletePageModal();
    onDeletePress();
    setPageLoading(true);
    const payload = {
      id: incomingPageDetails?.id,
    };
    setPageLoading(true);
    dispatch(
      deletePageRequest(payload, res => {
        setPageLoading(false);
        if (res.status) {
          setOpenView(false);
        } else {
          setResponseMessageFromApiCall(res.message);
        }
      }),
    );
  };

  const pageImageSec = useCallback(() => {
    const ImageS =
      pageImage?.type &&
      (pageImage?.type.includes('jpeg') ||
        pageImage?.type.includes('jpg') ||
        pageImage?.type.includes('png'))
        ? {uri: pageImage?.image}
        : util.isArrayOrObjEmpty(pageDetails?.image)
        ? {uri: initialRenderImage}
        : {uri: pageDetails.image};

    return ImageS;
  }, [pageImage]);

  const toggleDeletePageModal = () => {
    setDeletePageModal(!showDeletePageModal);
  };

  const togglePerfectPassModal = () => {
    setPerfectPassDisabled(false);
  };

  const validation = () => {
    let isValid = true;

    if (!util.isEmptyValue(maxpreps) && !util.isValidURL(maxpreps)) {
      maxPrepsRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setMaxprepsError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[0]);
      isValid = false;
    }

    if (!util.isEmptyValue(hudl) && !util.isValidURL(hudl)) {
      hudlRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setHudlError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[1]);

      isValid = false;
    }

    if (!util.isEmptyValue(youtube) && !util.isValidURL(youtube)) {
      youtubeRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setYoutubeError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[14]);

      isValid = false;
    }

    if (!util.isEmptyValue(twitter) && !util.isValidURL(twitter)) {
      twitterRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setTwitterError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[13]);
      isValid = false;
    }

    if (!util.isEmptyValue(twitch) && !util.isValidURL(twitch)) {
      twitchRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setTwitchError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[12]);
      isValid = false;
    }

    if (!util.isEmptyValue(tiktok) && !util.isValidURL(tiktok)) {
      tiktokRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setTiktokError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[11]);
      isValid = false;
    }

    if (!util.isEmptyValue(snapChat) && !util.isValidURL(snapChat)) {
      snapChatRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setSnapChatError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[10]);
      isValid = false;
    }

    if (!util.isEmptyValue(reddit) && !util.isValidURL(reddit)) {
      redditRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setRedditError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[9]);
      isValid = false;
    }

    if (!util.isEmptyValue(pinterest) && !util.isValidURL(pinterest)) {
      pinterestRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setPinterestError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[8]);
      isValid = false;
    }

    if (!util.isNumber(phone) && !util.isEmptyValue(phone)) {
      phoneRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setPhoneError('Invalid number');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[7]);
      isValid = false;
    }

    if (!util.isEmptyValue(medium) && !util.isValidURL(medium)) {
      mediumRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setMediumError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[6]);
      isValid = false;
    }

    if (!util.isEmptyValue(linkedin) && !util.isValidURL(linkedin)) {
      linkedinRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setLinkedinError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[5]);
      isValid = false;
    }

    if (!util.isEmptyValue(instagram) && !util.isValidURL(instagram)) {
      instagramRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setInstagramError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[4]);
      isValid = false;
    }

    if (!util.isEmptyValue(facebook) && !util.isValidURL(facebook)) {
      facebookRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setFacebookError('Invalid link');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[3]);
      isValid = false;
    }

    if (!util.isEmptyValue(email) && !util.isEmailValid(email)) {
      emailRef?.current?.focus?.();
      setActiveBottomSheetId(2);
      setEmailError('Invalid Email');
      setDeletedContactOption(CONTACT_BUTTON_OPTIONS[2]);
      isValid = false;
    }
    if (util.isOnlyWhiteSpace(pageDesc) && !util.isEmptyValue(pageDesc)) {
      setActiveBottomSheetId(1);

      setPageDescError('Invalid description');

      pageDescRef?.current?.focus?.();
      isValid = false;
    }

    if (util.isOnlyWhiteSpace(pageTitle) && !util.isEmptyValue(pageTitle)) {
      pageTitleRef?.current?.focus?.();

      setActiveBottomSheetId(1);

      setPageTitleError('Invalid title');

      isValid = false;
    }

    if (util.isEmptyValue(pageTitle)) {
      pageTitleRef?.current?.focus?.();

      setActiveBottomSheetId(1);

      setPageTitleError('Title is required');
      isValid = false;
    }

    return isValid;
  };

  const scrollToPageTop = () => {
    mainViewRef?.current?._component?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  };

  const validateTheForm = () => {
    if (validation()) {
      scrollToPageTop();
      setEditMode(false);
      setCreationMode(false);
      setBottomSheet(false);
    } else {
      openBottomSheet();
    }
  };

  const takeScreenShotAndSubmit = (
    pageDetailsInternal,
    pageLinksInternal,
    isEditModeInternal,
    hasDoneEditingInternal,
  ) => {
    setEditMode(false);

    captureRef(viewShotRef, {
      format: 'png',
      quality: 0.9,
    }).then(
      screenshotOfPage => {
        setPageLoading(true);
        let screenShotPromise = uploadImageToServer(screenshotOfPage);
        let imgLinkFromAWS = '';
        screenShotPromise.then(data => {
          imgLinkFromAWS = data;
          submitDataToReducer(
            imgLinkFromAWS,
            pageDetailsInternal,
            pageLinksInternal,
            isEditModeInternal,
            hasDoneEditingInternal,
          );
        });
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const emptyErrorsOnSubmit = () => {
    setMaxprepsError('');
    setHudlError('');
    setTwitterError('');
    setTwitchError('');
    setTiktokError('');
    setSnapChatError('');
    setRedditError('');
    setPinterestError('');
    setMediumError('');
    setLinkedinError('');
    setInstagramError('');
    setFacebookError('');
    setEmailError('');
    setPageDescError('');
    setPageTitleError('');
    setLinkTitleError('');
    setLinkDescError('');
  };

  const onPagePublished = () => {
    /**
     * @type {Performance}
     */
    let details = util.cloneDeepItem(incomingPageDetails);

    setPublishPageAlert(false);
    setPageDetails({...details, isInitiallyPublished: true});
    setPagePublished(true);
    setHasDoneEditing(false);
  };

  const onPagePublishApiCall = () => {
    const payload = {
      id: incomingPageDetails?.id,
    };
    setDisableProgressBarBtn(true);
    dispatch(
      publishPageRequest(payload, res => {
        setDisableProgressBarBtn(false);
        if (!res.status) {
          setResponseMessageFromApiCall(res.message);
          setStatusFromAPi(false);
          toggleCancelPublishingPage();
        }
      }),
    );
  };

  const togglePublishPage = () => {
    setPublishingPage(!isPagePublishing);
  };

  const toggleCancelPublishingPage = () => {
    setPublishingPage(false);
    setPublishCancel(!isPublishCancel);
  };

  const togglePublishRetry = () => {
    setPublishingPage(true);
    setPublishCancel(false);
    setPublishRetry(!isPublishRetry);
    setResponseMessageFromApiCall('');
  };

  const alertSec = useCallback(() => {
    if (
      showPublishPage &&
      !pageDetails?.isPublished &&
      (statusFromAPi || isPageEditable) &&
      !isPageLoading
    ) {
      return (
        <AlertModal
          getAlertText={getAlertText}
          hasBtn={true}
          btnText={getBtnText()}
          isPublishingMode={isPagePublishing}
          btnAction={getAlertBtnActions()}
          hasError={isPublishCancel}
          setPagePublished={onPagePublished}
          onPagePublishApiCall={onPagePublishApiCall}
          disableBtn={disableProgressBarBtn}
          incomingStyle={{marginLeft: 17, marginRight: 15}}
          styleSpacingFromTopofScreen={{
            top: util.isPlatformAndroid()
              ? Metrics.screenHeight / 9
              : Metrics.screenHeight / 7.5,
          }}
        />
      );
    } else if (isPagePublished) {
      setTimeout(() => {
        setPagePublished(false);
        setResponseMessageFromApiCall('');
      }, ALERT_TIMER);
      return (
        <AlertModal
          getAlertText={getAlertText}
          incomingStyle={{marginLeft: 17, marginRight: 15}}
          styleSpacingFromTopofScreen={{
            top: util.isPlatformAndroid()
              ? Metrics.screenHeight / 9
              : Metrics.screenHeight / 7.5,
          }}
        />
      );
    }
  }, [
    showPublishPage,
    isPagePublishing,
    isPagePublished,
    pageDetails,
    isShareLinkCopy,
    isPublishCancel,
    hasDoneEditing,
    statusFromAPi,
    disableProgressBarBtn,
  ]);

  const alertForActivation = useCallback(() => {
    setTimeout(() => {
      setactivationSaved(false);
    }, ALERT_TIMER);
    return (
      <AlertModal
        getAlertText={getAlertText}
        incomingStyle={{marginLeft: 17, marginRight: 15}}
        styleSpacingFromTopofScreen={{top: Metrics.screenHeight / 9}}
      />
    );
  }, [activationSaved]);
  const alertForAPiSec = useCallback(() => {
    if (!util.isEmptyValue(responseMessageFromApiCall) && !statusFromAPi) {
      setTimeout(() => {
        setHasWarning(false);

        setResponseMessageFromApiCall('');
      }, ALERT_TIMER);
      return (
        <AlertModal
          getAlertText={getAlertText}
          hasError={!hasWarning}
          hasWarning={hasWarning}
          incomingStyle={{marginLeft: 17, marginRight: 15}}
          styleSpacingFromTopofScreen={{top: Metrics.screenHeight / 9}}
        />
      );
    }
  }, [responseMessageFromApiCall, statusFromAPi]);

  const photoLibraryAndCameraPermissionAlertSec = useCallback(() => {
    setTimeout(() => {
      setPermissionGranted(true);
    }, ALERT_TIMER);
    return (
      <AlertModal
        getAlertText={getCameraAlertText}
        hasError={true}
        styleSpacingFromTopofScreen={{
          top: util.isPlatformAndroid()
            ? Metrics.screenHeight / 9
            : Metrics.screenHeight / 7.5,
        }}
      />
    );
  }, [isPermissionGranted]);

  const getCameraAlertText = () => {
    return 'Please allow permission from settings';
  };

  const getAlertBtnActions = () => {
    if (isPagePublishing) {
      return toggleCancelPublishingPage;
    }
    if (isPublishCancel) {
      return togglePublishRetry;
    }
    return togglePublishPage;
  };

  const getBtnText = () => {
    if (isPagePublishing) {
      return 'cancel';
    }
    if (isPublishCancel) {
      return 'retry';
    }
    return 'publish';
  };
  const getAlertText = () => {
    if (!util.isEmptyValue(responseMessageFromApiCall)) {
      return responseMessageFromApiCall;
    } else {
      if (activationSaved) {
        return 'Activation Saved';
      }
      if (
        (incomingPageDetails?.isInitiallyPublished ?? false) &&
        !isPagePublishing
      ) {
        return 'Changes saved';
      }

      if (isPagePublished) {
        return 'Published';
      }

      if (isPagePublishing) {
        return 'Publishing...';
      }

      if (isPublishCancel) {
        return 'Publish failed';
      }

      return 'Ready to publish';
    }
  };

  const manipulateLinksDataToSendToApi = (item, index) => {
    let data = {
      ...(!util.isFieldNil(item?.id) ? {id: item?.id ?? 0} : {order: index}), // conditionally add key to object
      title: item.title,
      description: item.description,
      action: {
        text: item?.actionTitle ?? item?.action?.text ?? '',
        url: item?.link ?? item?.action?.url ?? '',
      },
      thumbnail: item?.thumbnail ?? item?.image?.image,

      position: item?.position ?? item?.viewType ?? 'left',

      show_thumbnail: item?.showThumbnail ?? false,

      link_height: item?.linkHeight ?? 200,
    };
    return data;
  };

  const getWasLinkShuffled = () => {
    let shuffle = true;
    shuffle = !util.areValuesEqual(incomingPageDetails.links, pageLinks);
    return shuffle;
  };

  const getDataForShuffleArray = (item, index) => {
    let data = {
      id: item.id,
      order: index,
    };
    return data;
  };

  const submitDataToReducer = (
    screenShotImageUrl,
    pageDetailsInternal,
    pageLinksInternal,
    isEditModeInternal,
    hasDoneEditingInternal,
  ) => {
    /**
     * @type {PageLink}
     */

    let contactOptions = {};
    pageContactOptions.map(item => {
      contactOptions[item.contactType] = item.value;
    });
    let newDetails = pageDetailsInternal;
    newDetails = {...pageDetailsInternal, isPublished: false};
    /**
     * @type {Page}
     */
    let data = {
      ...newDetails,
      imagePreview: screenShotImageUrl,
      image: pageImage?.image ?? initialRenderImage,
      image_type: pageImage?.type ?? 'image/jpeg', // Need to be fixes, currently done work arround.
      title: pageTitle,
      description: pageDesc,
      contactOptions,
      performance: pageDetailsInternal.performance || {},
      isPublished: pageDetailsInternal.isPublished
        ? !hasDoneEditingInternal
        : false,
    };
    console.log('======================= START ===============');
    setPublishPageAlert(true);
    if (hasDoneEditing) {
      setPageDetails({
        ...data,
        isPublished: false,
      });
    }
    // setPageLoading(true);
    let payload = {};
    let manipulateAddedLinksData = [];
    let manipulateEditedLinksData = [];
    let shuffledLinks = [];
    // while creating a page
    // added links manipulation
    if (!isEditModeInternal) {
      manipulateAddedLinksData = pageLinks.map((item, index) => {
        return manipulateLinksDataToSendToApi(item, index);
      });
    }
    // while updating a page
    if (isEditModeInternal) {
      ///

      setStatusFromAPi(false);
      setPublishPageAlert(false);
      // edited links manipulation
      editedLinks.map((item, index) => {
        let dataFromMainLinkList = util.findDataFromArray(
          incomingPageDetails?.links,
          {
            id: item.id,
          },
        );

        if (util.areValuesEqual(dataFromMainLinkList, item)) {
        } else {
          return manipulateEditedLinksData.push(
            manipulateLinksDataToSendToApi(item, index),
          );
        }
      });

      // shuffled and added links manipulation
      pageLinks.map((item, index) => {
        if (!util.isFieldNil(item.id) && getWasLinkShuffled()) {
          shuffledLinks.push(getDataForShuffleArray(item, index));
        } else if (util.isFieldNil(item.id)) {
          manipulateAddedLinksData.push(
            manipulateLinksDataToSendToApi(item, index),
          );
        }
      });
      // while updating a page api call
      payload = {
        id: incomingPageDetails?.id ?? 0,
        image_id: initialRenderPageImageId,
        title: pageTitle,
        description: pageDesc,
        screenshot: screenShotImageUrl,
        image: pageImage?.image ?? initialRenderImage,
        image_type: pageImage?.type ?? 'image/jpeg', // Need to be fixes, currently done work arround.
        contact_buttons: contactOptions,
        links: {
          add: manipulateAddedLinksData,
          shuffled: shuffledLinks,
          delete: deletedLinks,
          edit: manipulateEditedLinksData,
        },
        published_at: data.isPublished ? 'abc' : null,
      };

      // checking if there was any change in the page fields

      if (
        util.areValuesEqual(incomingPageDetails?.title, pageTitle) &&
        util.areValuesEqual(incomingPageDetails?.description, pageDesc) &&
        util.areValuesEqual(incomingPageDetails?.image, payload.image) &&
        util.areValuesEqual(
          incomingPageDetails?.contactOptions,
          payload.contact_buttons,
        ) &&
        !util.isFieldNil(payload.links) &&
        util.isArrayOrObjEmpty(payload.links.add) &&
        util.isArrayOrObjEmpty(payload.links.delete) &&
        util.isArrayOrObjEmpty(payload.links.shuffled) &&
        util.isArrayOrObjEmpty(payload.links.edit)
      ) {
        setPageLoading(false);

        if (!incomingPageDetails?.isPublished) {
          setStatusFromAPi(true);
          setPublishPageAlert(true);
          setPublishingPage(false);
          setStartEditing(false);
        }
        return true;
      }
      if (hasDoneEditing) {
        dispatch(
          updatePageRequest(payload, res => {
            setPageLoading(false);
            if (res.status) {
              setAddedLinks([]);
              setEditedLinks([]);
              setDeletedLinks([]);
              setStatusFromAPi(res.status);
              setPublishPageAlert(true);

              setPublishingPage(false);
              setStartEditing(false);
            } else {
              setResponseMessageFromApiCall(res.message);
              setStatusFromAPi(res.status);
            }
          }),
        );
      } else {
        setPageLoading(false);
      }
    }
    // while creating a page api call
    else {
      payload = {
        title: pageTitle,
        image_id: initialRenderPageImageId,
        description: pageDesc,
        screenshot: screenShotImageUrl,
        image: pageImage?.image ?? initialRenderImage,
        image_type: pageImage?.type ?? 'image/jpeg', // Need to be fixes, currently done work arround.
        contact_buttons: contactOptions,
        links: {
          add: manipulateAddedLinksData,
        },
        published_at: null,
      };
      dispatch(
        addPageRequest(payload, res => {
          setPageLoading(false);
          if (res.status) {
            setAddedLinks([]);

            setStatusFromAPi(res.status);
            setCreationMode(false);
            setStartEditing(false);
          } else {
            setResponseMessageFromApiCall(res.message);
            setStatusFromAPi(res.status);
          }
        }),
      );
    }
  };

  const onSubmitPage = () => {
    console.log('=================== onSubmitPage ==================');

    emptyErrorsOnSubmit();
    validateTheForm();
  };

  const descValidation = () => {
    setPageDescError('');
    if (util.isOnlyWhiteSpace(pageDesc) && !util.isEmptyValue(pageDesc)) {
      setActiveBottomSheetId(1);

      setPageDescError('Invalid description');
      // setPageDesc('');
    }
  };

  const titleValidation = () => {
    setPageTitleError('');

    if (!util.isEmptyValue(pageTitle) && util.isOnlyWhiteSpace(pageTitle)) {
      setActiveBottomSheetId(1);
      setPageTitleError('Invalid title');
    }
  };

  const linkValidation = () => {
    setAddLinkError('');
    if (util.isEmptyValue(addLink)) {
      // setActiveBottomSheetId(1);
      setAddLinkError('Link is require');
    } else {
      addNewRandomLink();
    }
  };

  const addNewRandomLink = async () => {
    /**
     * @type {PageLink}
     */

    setAddLinkButtonLoading(true);
    let linkData = {};

    await fetch(addLink)
      .then(response => {
        OpenGraphParser.extractMeta(addLink).then(async data => {
          linkData = data;
          if (
            util.capitalizeString(
              linkData[0]?.title ?? linkData[0]?.site_name ?? '',
            ) === 'TWITTER'
          ) {
            getLinkPreview(addLink, {
              imagesPropertyType: 'og', // fetches only open-graph images
              headers: {
                'user-agent': 'Twitterbot', // fetches with Twitterbot crawler user agent
                // ...other optional HTTP request headers
              },
              timeout: 2000,
            }).then(parserTwitter => {
              linkFromUrlFunc(parserTwitter, parserTwitter?.images[0]);
            });
          } else {
            linkFromUrlFunc(linkData[0], linkData[0]?.image);
          }
        });
      })
      .catch(err => {
        setAddLinkButtonLoading(false);
        setAddLinkError('Invalid Link');

        setLinkPage(true);

        setLinkLoading(false);
      });
  };

  const linkFromUrlFunc = async (linkData, linkImage) => {
    let imageUrlBroken = false;
    let linkImageOnAws = '';

    if (!util.isFieldNil(linkImage)) {
      await fetch(linkImage).then(response => {
        imageUrlBroken = response.status !== 200;
      });
    }

    setLinkLoading(true);
    setLinkPage(false);

    setAddLink('');

    setAddLinkButtonLoading(false);
    if (util.isArrayOrObjEmpty(linkData)) {
      setAddLinkError('Invalid Link');

      setLinkPage(true);

      setLinkLoading(false);
    } else {
      if (!imageUrlBroken) {
        let linkImagePromise = uploadImageToServer(linkImage);
        linkImagePromise
          .then(imgData => {
            linkImageOnAws = util.cloneDeepItem(imgData);
            getLinkData({...linkData, image: linkImageOnAws}, imageUrlBroken);
          })
          .catch(err => {
            getLinkData(linkData, true);
          });
      } else {
        getLinkData(linkData, imageUrlBroken);
      }
    }
  };

  const getLinkHeightByCases = linkPlatform => {
    switch (util.capitalizeString(linkPlatform)) {
      case 'TIKTOK': {
        return IDEAL_LINK_VID_HEIGHT;
      }
      case 'LIKEE': {
        return IDEAL_LINK_VID_HEIGHT;
      }
      case 'SNACKVIDEO': {
        return IDEAL_LINK_VID_HEIGHT;
      }
      default:
        return 200;
    }
  };

  const isWidthGreaterThanHeight = (width, height) => {
    return !_.isNil(width) && _.toInteger(height) < _.toInteger(width);
  };

  const getLinkData = (data, imageUrlBroken) => {
    const newPageLink = {};
    newPageLink.tempId = _.random(0, 4000);
    newPageLink.title =
      data?.title ?? data?.site_name ?? util.getDomainName(data?.url) ?? '';

    newPageLink.description = data?.description ?? data?.url ?? '';
    newPageLink.image = {
      image:
        !util.isFieldNil(data?.image) && !imageUrlBroken
          ? data?.image
          : 'https://i.ibb.co/9hcCGn9/broken-Image.png',
      type: 'image/jpg',
    };
    newPageLink.actionTitle = 'Go';
    newPageLink.link = data?.url;
    newPageLink.viewType = LINK_CARD_VIEW_TYPE.LEFT;
    newPageLink.showThumbnail = true;
    newPageLink.linkHeight =
      !util.isFieldNil(data?.image) &&
      !imageUrlBroken &&
      !_.isNil(data['video:height'])
        ? _.toInteger(data['video:height']) > IDEAL_LINK_VID_HEIGHT
          ? isWidthGreaterThanHeight(data['video:width'], data['video:height'])
            ? 200
            : IDEAL_LINK_VID_HEIGHT
          : isWidthGreaterThanHeight(data['video:width'], data['video:height'])
          ? 200
          : _.toInteger(data['video:height'])
        : getLinkHeightByCases(data?.site_name ?? '');

    const dataSetNew = util.cloneDeepItem(pageLinks);
    dataSetNew.unshift(newPageLink);

    const linkObjForApi = {
      tempId: newPageLink?.tempId,
      title: newPageLink?.title ?? '',
      description: newPageLink?.description ?? '',
      action: {
        text: 'Go',
        url: newPageLink?.link,
      },
      position: LINK_CARD_VIEW_TYPE.LEFT,
      thumbnail: !util.isFieldNil(newPageLink?.image?.image)
        ? newPageLink?.image?.image
        : 'https://i.ibb.co/9hcCGn9/broken-Image.png',

      showThumbnail: true,
      link_height: newPageLink.linkHeight,
    };

    const tempAddedLinks = util.cloneDeepItem(addedLinks);
    tempAddedLinks.unshift(linkObjForApi);

    //will do it later
    // ****************************
    // let addedLinkIds = util.cloneDeepItem(newlyAddedLinksId);
    // if (
    //   util.isArrayOrObjEmpty(loadingLinkImageIds) &&
    //   util.isArrayOrObjEmpty(newlyAddedLinksId)
    // ) {
    //   addedLinkIds.push(linkObjForApi?.tempId ?? 0);
    // } else if (
    //   util.isArrayOrObjEmpty(loadingLinkImageIds) &&
    //   !util.isArrayOrObjEmpty(newlyAddedLinksId)
    // ) {
    //   addedLinkIds = [];
    //   addedLinkIds.push(linkObjForApi?.tempId ?? 0);
    // }

    // setNewlyAddedLinkIds(addedLinkIds);
    // ****************************

    setHasDoneEditing(true);
    setTimeout(() => {
      if (!util.isPlatformAndroid()) {
        setLinkLoading(false);
      }

      setAddlinkAnimation();
      setPageLinks(dataSetNew);
      setAddedLinks(tempAddedLinks);
    }, 1500);

    onCloseBottomSheet();
  };

  useEffect(() => {
    /* console.log('=================== isEditModed ==================');

    console.log({isEditMode}); */

    if (!isEditMode) {
      takeScreenShotAndSubmit(pageDetails, pageLinks, true, hasDoneEditing);
    }
  }, [isEditMode]);

  useEffect(() => {
    /*  console.log('=================== isCreationMode ==================');

    console.log({isCreationMode}); */

    if (!isCreationMode) {
      takeScreenShotAndSubmit(pageDetails, pageLinks, false, hasDoneEditing);
    }
  }, [isCreationMode]);

  useEffect(() => {
    setTimeout(() => {
      if (!isOpenView) {
        setView();
      }
    }, 200);
  }, [isOpenView]);

  useEffect(() => {
    if (util.isFieldNil(activeBottomSheetId)) {
      refRBSheet?.current?.snapTo(1);
    } else {
      refRBSheet?.current?.snapTo(0);
    }
  }, [activeBottomSheetId]);

  const removeLink = index => {
    // delete item from pageLinks array

    /**
     * @type {PageLink[]}
     */

    //removing the deleted link from the array
    const allPageLinks = util.cloneDeepItem(pageLinks);
    const clonePageLinks = util.cloneDeepItem(pageLinks);
    clonePageLinks.splice(index, 1);

    // logic for checking if the deleted link is a newly added link

    const isNewlyAddedLink = !util.isFieldNil(allPageLinks[index]?.tempId);

    //checking if the page is in creation mode, then we will populate deleted links array and remove the data from edited links array
    if (!isCreationMode && !isNewlyAddedLink) {
      const tempDeletedLinks = util.cloneDeepItem(deletedLinks);

      tempDeletedLinks.unshift(allPageLinks[index]?.id);

      const editedLinksArrAfterRemove = editedLinks.filter(item => {
        return item?.id !== allPageLinks[index]?.id;
      });

      setEditedLinks(editedLinksArrAfterRemove);

      setPageLinks(clonePageLinks);
      setDeletedLinks(tempDeletedLinks);
    }

    //checking if the deleted link is a newly added link, and removing it from added links array
    if (isNewlyAddedLink) {
      const addedLinksArrAfterRemove = addedLinks.filter(item => {
        return item?.tempId !== allPageLinks[index]?.tempId;
      });

      setPageLinks(clonePageLinks);

      setAddedLinks(addedLinksArrAfterRemove);
    }
  };

  const linkLoaderSec = () => {
    return (
      isLinkLoading && (
        <View
          style={[
            {
              marginTop: 30,
              marginBottom: 40,
            },
          ]}>
          <Spinner
            style={[{alignSelf: 'center'}]}
            isVisible={isLinkLoading}
            size={30}
            type={'FadingCircleAlt'}
            color={Colors.white}
          />
        </View>
      )
    );
  };

  const renderLinkCard = () => (
    <View style={{flex: 1}}>
      <DraggableFlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // initialNumToRender={4} // Reduce initial render amount
        // maxToRenderPerBatch={4} // Reduce number in each render batch
        // updateCellsBatchingPeriod={5} // Increase time between renders
        activationDistance={10} // for nested flatlist scroll in android
        ref={mainViewRef}
        onRef={ref => {
          mainViewRef = ref;
        }}
        ListHeaderComponent={
          <>
            {pageInputAndContact()}
            {linkLoaderSec()}
          </>
        }
        nestedScrollEnabled={true}
        data={pageLinks}
        scrollEnabled={!isLongPress}
        contentInsetAdjustmentBehavior="scrollableAxes"
        onDragEnd={
          // ({data}) => {
          //   setWereLinksShuffled(true);

          //   setPageLinks(data);
          // }
          onLinkItemDragEnd
        }
        keyExtractor={(item, index) => {
          return pageLinks.length - index;
        }}
        renderItem={useMemo(
          () => linkItemView,
          [
            pageLinks,
            isEditMode,
            isCreationMode,
            isBottomSheet,
            loadingLinkImageIds,
          ],
        )}
      />
    </View>
  );

  const onLinkItemDragEnd = useCallback(({data}) => {
    setWereLinksShuffled(true);
    console.log('obaid', data);
    setPageLinks(data);
  }, []);

  const linkItemView = ({item, index, drag}) => (
    <ScaleDecorator activeScale={1.05}>
      <LinkCard
        linksLength={pageLinks.length}
        setLinkAdded={setLinkAdded}
        isLinkAdded={isLinkAdded}
        isLinkLoading={isLinkLoading}
        item={item}
        onLongPressLink={setLongPress}
        longPressLink={isLongPress}
        linkIndex={index}
        onDrag={drag}
        id={item?.id ?? item?.tempId}
        linkHeight={item?.linkHeight ?? 200}
        heading={item.title}
        description={item.description}
        actionButtonText={item.actionTitle}
        image={item.image}
        actionButtonPress={item.link}
        cardViewType={item.viewType}
        thumbnail={item.showThumbnail}
        editButtonPress={() => editLink(index)}
        removeButtonPress={() => removeLink(index)}
        editMode={isEditMode || isCreationMode}
        loadingStart={() => {
          if (!wereLinksShuffled) {
            linksLoading(item);
          }
        }}
        loadingEnd={() => {
          if (!wereLinksShuffled) {
            linksLoaded(item);
          }
        }}
        loadingLinkImageIds={loadingLinkImageIds}
      />
    </ScaleDecorator>
  );

  useEffect(() => {
    if (util.isArrayOrObjEmpty(loadingLinkImageIds)) {
      setPageOpen(false);
    }
  }, [loadingLinkImageIds]);

  // useEffect(() => {
  //   if (showSharePageToggle) {
  //     refRBSheet?.current?.snapTo(0);
  //   } else {
  //     refRBSheet?.current?.snapTo(1);
  //   }
  // }, [showSharePageToggle]);
  const linksLoading = item => {
    let ids = util.cloneDeepItem(loadingLinkImageIds);

    ids.push(item?.id ?? item.tempId);

    setLoadingLinkImageIds(ids);
  };

  const linksLoaded = item => {
    let ids = util.cloneDeepItem(loadingLinkImageIds);

    let index = ids.indexOf(item?.id ?? item?.tempId);

    if (index > -1) {
      ids.splice(index, 1); // 2nd parameter means number of items to remove
      setLoadingLinkImageIds(ids);
    }
  };

  const editLink = index => {
    setEditLinkIndex(index);

    /**
     * @type {PageLink}
     */

    const editPageLink = util.cloneDeepItem(pageLinks[index]);

    setLinkTitle(editPageLink.title);
    setLinkDesc(editPageLink.description);
    setLinkActionText(editPageLink.actionTitle);
    setShowThumbnailToggle(editPageLink.showThumbnail);
    setLinkImage(editPageLink.image);
    setSelectedLinkPositionOption(editPageLink.viewType);
    setBottomSheet(true);
  };

  const updateLinkData = (val, key) => {
    //   console.log('======== updateLinkData =========================');

    //updating the link

    /**
     * @type {PageLink[]}
     */
    const tempPageLinks = util.cloneDeepItem(pageLinks);

    const tempPageLinkItem = tempPageLinks[editLinkIndex];
    tempPageLinkItem[key] = val;
    tempPageLinks[editLinkIndex] = tempPageLinkItem;
    setPageLinks(tempPageLinks);
    setHasDoneEditing(true);
  };

  const contactItemView = (item, index) => (
    <TouchableOpacity
      onPress={() => {
        if (util.isPlatformAndroid()) {
          bottomRef?.current?.scrollToEnd({animated: false});
          setOnFieldFocus(true);
        }
        openBottomSheet();
        selectBottomSheetId(2);
        item.onFocus(true);
      }}>
      <Image
        source={item.icon}
        style={[
          styles.contactOptionImageStyle,
          AppStyles.mRight15,
          index === 0 && AppStyles.mLeft15,
        ]}
      />
    </TouchableOpacity>
  );

  const renderIconsofContactBtn = useMemo(() => {
    return (
      <>
        <View
          style={{
            marginBottom: 10,

            height: 70,
          }}>
          <ScrollView
            style={{top: 5}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={contactBtnFlatlistRef}
            scrollEnabled={pageContactOptions.length > 2}
            keyExtractor={item => `${item.id}`}
            horizontal={true}>
            {pageContactOptions.map((item, index) => {
              return contactItemView(item, index);
            })}
          </ScrollView>
        </View>
      </>
    );
  }, [pageContactOptions, deletedContactOption]);

  const pageInputAndContact = () => (
    <View
      style={[AppStyles.alignItemsCenter, AppStyles.mTop35, AppStyles.flex]}>
      <View style={styles.pageInputAndContactContainer}>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              openBottomSheet();
              selectBottomSheetId(0);
            }}>
            <Image
              source={pageImageSec()}
              style={styles.pageImgDimensionsStyle}
              onLoadStart={() => setPageImageLoading(true)}
              onLoadEnd={() => setPageImageLoading(false)}
            />

            {pageImageLoading && (
              <ActivityIndicator
                size="small"
                color={Colors.white}
                style={[styles.pageImageLoadingStyle, {borderRadius: 100}]}
              />
            )}
          </TouchableOpacity>

          {(isEditMode || (isCreationMode && isStartEditing)) && (
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                openBottomSheet();
                selectBottomSheetId(0);
              }}>
              <Image source={Images.EditImageIcon} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            openBottomSheet();
            selectBottomSheetId(1);
            setPageDescFocus(false);

            setPageTitleFocus(true);
          }}
          style={AppStyles.mTop10}>
          <Text
            size={39}
            type="bold"
            color={Colors.text.tertiary}
            style={[styles.alignTextCenterStyle]}>
            {util.isEmptyValue(pageTitle)
              ? isEditMode || isCreationMode
                ? 'Page Title'
                : ''
              : pageTitle}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openBottomSheet();
            selectBottomSheetId(1);
            setPageTitleFocus(false);

            setPageDescFocus(true);
          }}
          style={[AppStyles.mTop10, AppStyles.mBottom30]}>
          <Text
            size={15}
            color={Colors.text.tertiary}
            style={styles.alignTextCenterStyle}>
            {util.isEmptyValue(pageDesc)
              ? isEditMode || isCreationMode
                ? 'Your Description'
                : ''
              : pageDesc}
          </Text>
        </TouchableOpacity>
      </View>

      {renderIconsofContactBtn}
    </View>
  );

  const checkFocus = (item, index) => {
    let isFocused = true;
    if (!util.isEmptyValue(item.error)) {
      for (let i = index; i >= 0; i--) {
        if (CONTACT_BUTTON_OPTIONS[i].isFocused === true) {
          isFocused = false;
          break;
        }
      }

      return isFocused;
    } else {
      return false;
    }
  };

  const contactButtonsOptionView = () => (
    <View style={[AppStyles.mTop15, {marginBottom: 55}]}>
      {CONTACT_BUTTON_OPTIONS.map((item, index) => {
        return (
          <View style={AppStyles.mBottom20}>
            <TextInput
              autoFocus={checkFocus(item, index) || item.isFocused}
              label={item.label}
              placeholder={item.placeholder}
              autoCapitalize="none"
              labelColor={Colors.black}
              labelType={'semiBold'}
              value={item.value}
              ref={item.ref}
              keyboardType={item.type}
              onSubmitEditing={() => {
                item.validation();
                getContactOption();
                item.onFocus(false);
                CONTACT_BUTTON_OPTIONS[index + 1]?.ref?.current?.focus?.();
              }}
              rightIcon={
                util.isEmptyValue(item.value) ? null : Images.CrossIcon
              }
              onPress={() => {
                item.onChangeAction('');
                item.ref?.current?.focus?.();
                item.onFocus(false);
                setDeletedContactOption(item);
                getContactOption();
              }}
              error={item.error}
              onChangeText={val => {
                setHasDoneEditing(true);
                item.onChangeAction(val);
              }}
              onBlur={() => {
                item.validation();
                getContactOption();

                item.onFocus(false);
                item.ref?.current?.blur?.();
              }}
            />
          </View>
        );
      })}
    </View>
  );

  const getBottomSheetHeaderText = () => {
    if (
      (isEditMode || isCreationMode) &&
      !isLinkPage &&
      util.isFieldNil(editLinkIndex)
    ) {
      return 'Edit Bio';
    }
    if (isSharePage) {
      return 'Share';
    }
    if (isLinkPage) {
      return 'Add Link';
    }

    if (editLinkIndex !== null) {
      return 'Edit Link';
    }
  };

  const bottomSheetHeader = () => (
    <View
      style={[
        {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 20,
          borderWidth: 0,
          marginBottom: -1,
        },

        isViewScrolling && styles.bottomSheetHeaderShadow,
        styles.pageBottomSheetMargins,
        styles.headerContainer,
        styles.aligningItemsStyle,
        {width: Metrics.screenWidth},
      ]}>
      <View style={styles.topNotchBottomSheet}></View>
      <Text size={24} type="bold">
        {getBottomSheetHeaderText()}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (isLinkPage && addLinkButtonLoading) {
            return true;
          }
          Keyboard.dismiss();
          setOnFieldFocus(false);
          onCloseBottomSheet();
        }}>
        <Image source={Images.CircleCrossIcon} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );

  const bottomSheetView = () => {
    return (
      <KeyboardAwareScrollViewComponent
        scrollRef={bottomRef}
        scrollEnabled={true}
        incomingExtraScrollHeight={util.isPlatformAndroid() ? 30 : 50}
        onScrollBeginDrag={() => {
          refRBSheet?.current?.snapTo(0);
        }}
        style={{
          backgroundColor: Colors.background.primary,
          paddingBottom: 30,
          flexGrow: 1,
        }}
        incomingStyle={{
          height: '100%',
          width: '100%',
        }}>
        <View>
          {isSharePage && sharePageBottomSheetContent()}
          {(isEditMode || isCreationMode) &&
            !isLinkPage &&
            util.isFieldNil(editLinkIndex) &&
            editPageBottomSheetContent()}

          {/* isLinkPage && addLinkBottomSheetContent() */}

          {editLinkIndex !== null && editLinkBottomSheetContent()}
        </View>
      </KeyboardAwareScrollViewComponent>
    );
  };

  const addLinkBottomSheetContent = () => (
    <View style={styles.addLinkBottomSheetView}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          flex: 1,
          borderTopWidth: 1,
          borderTopColor: Colors.border.tertiary,
          paddingTop: 15,
        }}>
        <View style={{flex: 1}}>
          <TextInput
            label={'Link'}
            autoCapitalize="none"
            labelColor={Colors.black}
            labelType={'semiBold'}
            placeholder={'Paste Your Link'}
            onSubmitEditing={() => {
              addLink === '' ? null : linkValidation();
            }}
            ref={addLinkRef}
            error={addLinkError}
            value={addLink}
            onChangeText={val => {
              setAddLink(val);
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={addLink === '' ? 1 : 0.2}
          style={styles.addLinkBottomSheetButton}
          disabled={addLink === '' || addLinkButtonLoading}
          onPress={() => {
            addLink === '' ? null : linkValidation();
          }}>
          {!addLinkButtonLoading && (
            <Image
              source={
                addLink === ''
                  ? Images.BottomSheetLinkButtonDisable
                  : Images.BottomSheetLinkButton
              }
              style={styles.iconWidthHeight}
            />
          )}

          {addLinkButtonLoading && (
            <View
              style={[
                {
                  backgroundColor: 'rgba(22, 107, 250, 0.465)',
                  // position: 'absolute',
                  borderRadius: 100,
                  height: 40,
                  width: 40,
                },
              ]}
            />
          )}

          {addLinkButtonLoading && (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={{position: 'absolute'}}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const editLinkBottomSheetContent = () => {
    return EDITLINK_BOTTOMSHEET_OPTIONS.map(item => {
      const isActive = activeBottomSheetId === item.id;
      const showBorder =
        item.id < EDITPAGE_BOTTOMSHEET_OPTIONS.length - 1 && !isActive;
      return (
        <View
          style={[styles.pageBottomSheetMargins]}
          onTouchEnd={() => {
            item.title !== 'Animation' && refRBSheet?.current?.snapTo(0);
          }}>
          <TouchableOpacity
            onPress={() => {
              setImageOptionsRemainVisible(false);
              item.title !== 'Animation' ? selectBottomSheetId(item.id) : null;
            }}
            style={[
              styles.optionContainerStyle,
              styles.aligningItemsStyle,
              styles.bottomBorderStyle,
            ]}>
            <Text size={24} type="medium">
              {item.title}
            </Text>
            {item.title === 'Animation' && (
              <Image source={Images.ProImage} style={styles.proImageStyle} />
            )}
            <Image
              source={Images.ArrowIconBlack}
              style={[
                styles.iconStyle,
                isActive && {transform: [{rotate: '-270deg'}]},
              ]}
            />
          </TouchableOpacity>
          {
            <View
              style={{
                display:
                  activeBottomSheetId === 0 && item.id === 0 ? 'flex' : 'none',
              }}>
              {editLinkThumbnailOptionView()}
            </View>
          }
          {activeBottomSheetId === 1 &&
            item.id === 1 &&
            editLinkTextOptionView()}
        </View>
      );
    });
  };

  const userLabelSec = () => (
    <TouchableOpacity
      onPress={() => {
        setChooseActVew(true);
      }}
      activeOpacity={0.7}
      style={[
        styles.userLabelStyle,
        {
          backgroundColor: Colors.label.tertiary,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.passThumb}>
          <Image
            source={Images.UserIcon}
            style={{
              width: 24,
              height: 24,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={AppStyles.mLeft15}>
          <Text size={18} type="bold" color={Colors.text.tertiary}>
            Activate Perfect Pass™
          </Text>
          <Text size={14} color={Colors.text.tertiary}>
            Build your own game pack.
          </Text>
        </View>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginRight: 2}}>
        <Image
          source={Images.PassIcon}
          style={{width: 20, height: 20, marginRight: 7}}
        />
        <Image
          source={Images.RightArrowIcon}
          style={{
            width: 18,
            height: 18,
            resizeMode: 'contain',
            top: 2,
          }}
        />
      </View>
    </TouchableOpacity>
  );
  const sharePageBottomSheetActivationContent = () => (
    <>
      <TouchableOpacity
        style={[
          AppStyles.mTop10,
          AppStyles.mBottom10,
          AppStyles.flexRow,
          styles.perfectPassBtn,
          {alignItems: 'center'},
        ]}
        onPress={showManagePagePreviewToggle}>
        <Image source={Images.ManageActivation} style={[styles.iconStyle]} />
        <View style={AppStyles.mLeft15}>
          <Text type="semiBold" size={16} style={{marginBottom: 4}}>
            Manage Activations
          </Text>
          <Text type="normal" size={14} color="rgba(51, 50, 64, 0.7)">
            Choose what to offer fans
          </Text>
        </View>
        <Image
          source={Images.ArrowIconBlack}
          style={[styles.iconStyle, {position: 'absolute', right: 10}]}
        />
      </TouchableOpacity>
      {console.log('activations', activations)}
      {activations.filter(x => x.activationPublished === 1).length === 0 && (
        <Text style={styles.noPublishedAct}>
          No activation is published by you
        </Text>
      )}
    </>
  );
  const sharePageBottomSheetTeamContent = () => (
    <>
      <Text size={17} type="semiBold" style={AppStyles.mTop15}>
        Team
      </Text>
      <TouchableOpacity
        onPress={setshowTeamPageToggle}
        style={[
          AppStyles.mTop10,
          AppStyles.mBottom60,
          AppStyles.flexRow,
          styles.perfectPassBtn,
          {alignItems: 'center'},
        ]}>
        <Image source={Images.ManageTeam} style={[styles.iconStyle]} />
        <View style={AppStyles.mLeft15}>
          <Text type="semiBold" size={16} style={{marginBottom: 4}}>
            Invite Team
          </Text>
          <Text type="normal" size={14} color="rgba(51, 50, 64, 0.7)">
            {incomingPageDetails.members >= 1
              ? `${incomingPageDetails.members} member${
                  incomingPageDetails.members >= 2 ? 's' : ''
                }`
              : 'Add another Admin'}
          </Text>
        </View>
        <Image
          source={Images.ArrowIconBlack}
          style={[styles.iconStyle, {position: 'absolute', right: 10}]}
        />
      </TouchableOpacity>
    </>
  );

  const sharePageBottomSheetContent = () => (
    <>
      <View
        style={[styles.bottomBorderStyle, {marginRight: 24, marginLeft: 24}]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.shareSheetContainer]}
        style={{height: '100%'}}
        onScrollBeginDrag={() => refRBSheet?.current?.snapTo(1)}>
        {LINK_URLS.map(item => {
          return shareLinkSec(item);
        })}
        <View
          style={[
            AppStyles.pTop5,
            AppStyles.pBottom10,
            AppStyles.mTop40,
            AppStyles.flexRow,
            {alignItems: 'center'},
          ]}>
          <Switch
            size={1}
            disabled={showSharePageToggleLoading}
            trackColor={{false: '#e8e8e8', true: '#e8e8e8'}}
            thumbColor={showSharePageToggle ? '#62c770' : '#82828a'}
            onValueChange={val => {
              if (incomingPageDetails.isPurchased && val === false) {
                setPerfectPassDisabled(true);
              } else {
                passOffAction(val);
              }
            }}
            value={showSharePageToggle}
            style={{alignSelf: 'flex-start', marginRight: 12}}
          />
          <Text type="semiBold" size={16}>
            Perfect Pass
          </Text>
        </View>
        {showSharePageToggle && sharePageBottomSheetActivationContent()}
        {sharePageBottomSheetTeamContent()}
        <View style={{bottom: 20, position: 'absolute', width: '100%'}}>
          {shareSecShopConnectedProductsSec()}
        </View>

        {showSharePageToggleLoading && (
          <View style={{position: 'absolute', right: 25, top: 132}}>
            <SpinkitComponent
              isVisible={showSharePageToggleLoading}
              spinnerColor={Colors.black}
              hasOverlay={false}
              loaderSize={20}
            />
          </View>
        )}

        {/*<View style={[AppStyles.mTop15, AppStyles.mBottom10]}>
          <Text size={16} type="semiBold">
            Add everywhere:
          </Text>
        </View>

         {SOCIAL_MEDIA_LINK_URLS.map(item => {
          return shareSocialLinksSec(item);
        })} */}
      </ScrollView>
    </>
  );

  const activePass = toggleValue => {
    const payload = {
      pageId: pageDetails.id,
      perfectPass: toggleValue,
    };
    dispatch(
      activePassRequest(payload, res => {
        setShowSharePageToggleLoading(false);

        if (res.status) {
          getPageDetailsRequestHandler();
        } else {
          setShowSharePageToggle(incomingPageDetails.passenable);
          setHasWarning(true);

          setResponseMessageFromApiCall('Request Failed');
        }
      }),
    );
  };
  const passOffAction = (value = false) => {
    console.log('valiu', value);
    setShowSharePageToggleLoading(true);
    setShowSharePageToggle(!showSharePageToggle);
    activePass(value);
  };
  const shareSecShopConnectedProductsSec = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => util.openLink('https://www.dymedrop.com/')}
      style={styles.shareSecShopConnectedProductsContainer}>
      <View>
        <View style={AppStyles.mBottom5}>
          <Text size={16} type="semiBold" color={Colors.text.tertiary}>
            Get Connected Products
          </Text>
        </View>
        <View>
          <Text size={14} color={Colors.text.tertiary}>
            Visit dymedrop.com
          </Text>
        </View>
      </View>
      <View>
        <Image
          source={Images.ArrowIconBlack}
          style={styles.shareSecArrowIconStyle}
        />
      </View>
    </TouchableOpacity>
  );

  const shareSocialLinksSec = item => (
    <View style={[styles.shareSocialLinkContainer]}>
      <View style={[AppStyles.flexRow, {alignItems: 'center'}]}>
        <Image source={item.icon} style={{marginRight: 38}} />
        <Text size={14} type="semiBold">
          {util.capitalizeString(item.title)}
        </Text>
      </View>
      <Image source={Images.ShareArrowUp} />
    </View>
  );

  const shareLinkSec = item => (
    <View style={{marginTop: 8}}>
      <Text size={17} type="semiBold">
        {item.title}
      </Text>
      <View style={[AppStyles.flexRow, {marginTop: 3}]}>
        <TouchableOpacity
          style={styles.copyLinkContainer}
          onPress={() => util.openLink(incomingPageDetails?.url)}>
          <Image
            source={Images.UrlIcon}
            style={styles.shareSheetLinkIconDimension}
          />
          <View style={{width: '85%'}}>
            <Text numberOfLines={1} size={16} style={{marginLeft: 8}}>
              {incomingPageDetails?.url}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleShareLinkCopy(incomingPageDetails?.url ?? '')}
          style={[styles.shareSheetCopyBtnContainer]}>
          {!isLinkCopy && (
            <Text size={14} type="semiBold">
              {util.capitalizeString('copy')}
            </Text>
          )}
          {isLinkCopy && (
            <Image
              source={Images.ConfirmAlertIcon}
              style={{width: 16, height: 16}}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const toggleShareLinkCopy = link => {
    setShareLinkCopy(!isShareLinkCopy);
    Clipboard.setString(util.isFieldNil(link) ? '' : link);
    setLinkCopy(true);

    setTimeout(() => {
      setLinkCopy(false);
    }, ALERT_TIMER);
  };

  const editPageBottomSheetContent = () => {
    return EDITPAGE_BOTTOMSHEET_OPTIONS.map(item => {
      const isActive = activeBottomSheetId === item.id;
      const showBorder =
        item.id < EDITPAGE_BOTTOMSHEET_OPTIONS.length - 1 && !isActive;
      return (
        <View
          //
          style={[styles.pageBottomSheetMargins]}
          onTouchEnd={() => {
            refRBSheet?.current?.snapTo(0);
          }}>
          <TouchableOpacity
            onPress={() => {
              setImageOptionsRemainVisible(false);
              selectBottomSheetId(item.id);
            }}
            style={[
              styles.optionContainerStyle,
              styles.aligningItemsStyle,
              styles.bottomBorderStyle,
            ]}>
            <Text size={24} type="medium">
              {item.title}
            </Text>
            <Image
              source={Images.ArrowIconBlack}
              style={[
                styles.iconStyle,
                isActive && {transform: [{rotate: '-270deg'}]},
              ]}
            />
          </TouchableOpacity>
          {
            <View
              style={{
                display:
                  activeBottomSheetId === 0 && item.id === 0 ? 'flex' : 'none',
              }}>
              {photoOptionView()}
            </View>
          }
          {activeBottomSheetId === 1 && item.id === 1 && textOptionView()}
          {activeBottomSheetId === 2 &&
            item.id === 2 &&
            contactButtonsOptionView()}
        </View>
      );
    });
  };

  const getPageImage = imageObj => {
    setHasDoneEditing(true);
    setPageImage(imageObj);

    // Know issue, we will fix this later https://viabletree.atlassian.net/jira/software/projects/DYM/boards/11?selectedIssue=DYM-291&text=ios
    /*  if (!util.isPlatformAndroid()) {
      const imageLinkManipulated = _.replace(imageObj.image, 'file://', '');

      setPageImage({...imageObj, ...{image: imageLinkManipulated}});
    } else {
      setPageImage(imageObj);
    } */
  };

  const photoOptionView = () => (
    <View>
      <View
        style={[
          {marginBottom: 75, marginTop: 20},
          !util.isPlatformAndroid() && {zIndex: 1},
          isOptionDropDown && {height: 120},
        ]}>
        <SelectImageComponent
          setImageOptionsRemainVisible={setImageOptionsRemainVisible}
          shouldImageOptionsRemainVisible={shouldImageOptionsRemainVisible}
          isPermissionGranted={isPermissionGranted}
          setPermissionGranted={setPermissionGranted}
          getImage={getPageImage}
          isOptionDropDown={isOptionDropDown}
          setOptionDropDown={setOptionDropDown}
          selectedImageObj={pageImage}
          imageForShow={initialRenderImage}
          isPlaceholderImage={util.isArrayOrObjEmpty(pageImage)}
        />
      </View>
      <View></View>
    </View>
  );

  useEffect(() => {
    if (!util.isFieldNil(editLinkIndex) && !util.isFieldNil(linkImage))
      updateLinkData(linkImage, 'image');
  }, [linkImage]);

  const getLinkImage = imageObj => {
    setLinkImage(imageObj);
    // updateLinkData(imageObj, 'image');
  };

  const editLinkThumbnailOptionView = () => {
    const tempPageLinks = util.cloneDeepItem(pageLinks);

    const tempPageLinkItem = tempPageLinks[editLinkIndex];

    return (
      <View style={[AppStyles.mBottom5]}>
        <View
          style={[
            AppStyles.pTop5,
            AppStyles.pBottom10,
            !enableViewOfThumbnail && {opacity: 0.4},
          ]}>
          <Switch
            disabled={!enableViewOfThumbnail}
            trackColor={{false: '#e8e8e8', true: '#e8e8e8'}}
            thumbColor={showThumbnailToggle ? '#62c770' : '#82828a'}
            onValueChange={val => {
              setShowThumbnailToggle(val);
              updateLinkData(val, 'showThumbnail');
            }}
            value={showThumbnailToggle}
            style={{alignSelf: 'flex-start'}}
          />
        </View>

        <Text
          type="semiBold"
          size={16}
          style={
            (!showThumbnailToggle || !enableViewOfThumbnail) && {
              opacity: 0.4,
            } && {opacity: 0.4}
          }>
          Image
        </Text>

        <View
          style={[
            {marginBottom: 60},
            !util.isPlatformAndroid() && {zIndex: 1},
          ]}>
          <SelectImageComponent
            setEnableView={setEnableViewOfThumbnail}
            setImageOptionsRemainVisible={setImageOptionsRemainVisible}
            shouldImageOptionsRemainVisible={shouldImageOptionsRemainVisible}
            showThumbnailOfLinkSec={showThumbnailToggle}
            setWereLinksShuffled={setWereLinksShuffled}
            itemId={tempPageLinkItem?.id ?? tempPageLinkItem?.tempId}
            loadingLinkImageIds={loadingLinkImageIds}
            isPermissionGranted={isPermissionGranted}
            setPermissionGranted={setPermissionGranted}
            isThumbnailLoading={isThumbnailLoading}
            getImage={getLinkImage}
            isChoseImageClickable={!showThumbnailToggle}
            selectedImageObj={linkImage}
          />
        </View>

        <View style={[AppStyles.mBottom40]}>
          <View style={AppStyles.mBottom5}>
            <Text
              type="semiBold"
              size={16}
              style={!showThumbnailToggle && {opacity: 0.4}}>
              Position
            </Text>
          </View>

          <View>
            <View style={[AppStyles.flex, AppStyles.flexRow]}>
              <TouchableOpacity
                activeOpacity={1}
                style={[AppStyles.flex, AppStyles.mRight25]}>
                <ViewPositionerComponent
                  isPositionBoxClickable={
                    !showThumbnailToggle || !enableViewOfThumbnail
                  }
                  containerImg={Images.TopPositionerIcon}
                  title="top"
                  isActive={
                    selectedLinkPositionOption === LINK_CARD_VIEW_TYPE.TOP
                  }
                  onSelectOption={() => {
                    setImageOptionsRemainVisible(false);

                    setSelectedLinkPositionOption(LINK_CARD_VIEW_TYPE.TOP);
                    updateLinkData(LINK_CARD_VIEW_TYPE.TOP, 'viewType');
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={AppStyles.flex}>
                <ViewPositionerComponent
                  isPositionBoxClickable={
                    !showThumbnailToggle || !enableViewOfThumbnail
                  }
                  containerImg={Images.BottomPositionerIcon}
                  title="bottom"
                  isActive={
                    selectedLinkPositionOption === LINK_CARD_VIEW_TYPE.BOTTOM
                  }
                  onSelectOption={() => {
                    setImageOptionsRemainVisible(false);

                    setSelectedLinkPositionOption(LINK_CARD_VIEW_TYPE.BOTTOM);
                    updateLinkData(LINK_CARD_VIEW_TYPE.BOTTOM, 'viewType');
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={[AppStyles.flex, AppStyles.flexRow, AppStyles.mTop25]}>
              <TouchableOpacity
                activeOpacity={1}
                style={[AppStyles.flex, AppStyles.mRight25]}>
                <ViewPositionerComponent
                  isPositionBoxClickable={
                    !showThumbnailToggle || !enableViewOfThumbnail
                  }
                  containerImg={Images.LeftPositionerIcon}
                  title="left"
                  isActive={
                    selectedLinkPositionOption === LINK_CARD_VIEW_TYPE.LEFT
                  }
                  onSelectOption={() => {
                    setImageOptionsRemainVisible(false);
                    setSelectedLinkPositionOption(LINK_CARD_VIEW_TYPE.LEFT);
                    updateLinkData(LINK_CARD_VIEW_TYPE.LEFT, 'viewType');
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={AppStyles.flex}>
                <ViewPositionerComponent
                  isPositionBoxClickable={
                    !showThumbnailToggle || !enableViewOfThumbnail
                  }
                  containerImg={Images.RightPositionerIcon}
                  title="right"
                  isActive={
                    selectedLinkPositionOption === LINK_CARD_VIEW_TYPE.RIGHT
                  }
                  onSelectOption={() => {
                    setImageOptionsRemainVisible(false);

                    setSelectedLinkPositionOption(LINK_CARD_VIEW_TYPE.RIGHT);
                    updateLinkData(LINK_CARD_VIEW_TYPE.RIGHT, 'viewType');
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const textOptionView = () => (
    <View style={[styles.textOptionContainer]}>
      <View style={AppStyles.mBottom15}>
        <TextInput
          autoFocus={
            (!util.isEmptyValue(pageTitleError) && !pageDescFocus) ||
            pageTitleFocus
          }
          label={'Title'}
          autoCapitalize="none"
          labelColor={Colors.black}
          maxLength={PAGE_TITLE_MAX_LENTH}
          labelType={'semiBold'}
          placeholder={'Page Title'}
          value={pageTitle}
          error={pageTitleError}
          ref={pageTitleRef}
          rightIcon={util.isEmptyValue(pageTitle) ? null : Images.CrossIcon}
          onPress={() => {
            setPageTitle('');
          }}
          onBlur={() => {
            titleValidation();
            setPageTitleFocus(false);

            pageTitleRef?.current?.blur?.();
          }}
          onSubmitEditing={() => {
            titleValidation();
            pageTitleRef?.current?.blur?.();

            pageDescRef?.current?.focus?.();
            setPageTitleFocus(false);
          }}
          onChangeText={val => {
            if (!/^\s/.test(val)) {
              setPageTitle(val);
              setHasDoneEditing(true);
            }
          }}
        />
        <View style={{alignItems: 'flex-end', top: 2, right: 5}}>
          <Text
            size={12}>{`${pageTitle.length} / ${PAGE_TITLE_MAX_LENTH}`}</Text>
        </View>
      </View>

      <View style={AppStyles.mBottom10}>
        <TextInput
          autoFocus={
            (!util.isEmptyValue(pageDescError) && !pageTitleFocus) ||
            pageDescFocus
          }
          label={'Description'}
          autoCapitalize="none"
          labelColor={Colors.black}
          multiline={true}
          maxLength={PAGE_DESC_MAX_LENTH}
          labelType={'semiBold'}
          placeholder={'Your Description'}
          value={pageDesc}
          error={pageDescError}
          ref={pageDescRef}
          onBlur={() => {
            pageDescRef?.current?.blur?.();
            setPageDescFocus(false);
            descValidation();
          }}
          onChangeText={val => {
            setHasDoneEditing(true);
            setPageDesc(val);
          }}
        />
        <View style={{alignItems: 'flex-end', top: -20, right: 5}}>
          <Text size={12}>{`${pageDesc.length} / ${PAGE_DESC_MAX_LENTH}`}</Text>
        </View>
      </View>
    </View>
  );

  const editLinkTextOptionView = () => (
    <View style={[styles.textOptionContainer]}>
      <View style={AppStyles.mBottom15}>
        <TextInput
          label={'Title'}
          autoCapitalize="none"
          labelColor={Colors.black}
          maxLength={PAGE_TITLE_MAX_LENTH}
          labelType={'semiBold'}
          placeholder={'Page Title'}
          rightIcon={util.isEmptyValue(linkTitle) ? null : Images.CrossIcon}
          onPress={() => {
            setLinkTitle('');
            updateLinkData('', 'title');
          }}
          value={linkTitle}
          error={linkTitleError}
          ref={linkTitleRef}
          onBlur={() => {
            linkTitleRef?.current?.blur?.();
            linkFieldsValidation(false);
          }}
          onSubmitEditing={() => {
            linkTitleRef?.current?.blur?.();

            linkDescRef?.current?.focus?.();
            linkFieldsValidation(false);
          }}
          onChangeText={val => {
            setLinkTitle(val);
            updateLinkData(val, 'title');
          }}
        />
        <View style={{alignItems: 'flex-end', top: 2}}>
          <Text
            size={12}>{`${linkTitle.length} / ${PAGE_TITLE_MAX_LENTH}`}</Text>
        </View>
      </View>
      <View style={AppStyles.mBottom15}>
        <TextInput
          label={'Description'}
          autoCapitalize="none"
          labelColor={Colors.black}
          multiline={true}
          maxLength={LINK_DESC_MAX_LENTH}
          labelType={'semiBold'}
          placeholder={'Your Description'}
          value={linkDesc}
          error={linkDescError}
          ref={linkDescRef}
          onBlur={() => {
            linkDescRef?.current?.blur?.();

            linkFieldsValidation(false);
          }}
          onChangeText={val => {
            setLinkDesc(val);
            updateLinkData(val, 'description');
          }}
        />
        <View style={{alignItems: 'flex-end', top: 2}}>
          <Text size={12}>{`${linkDesc.length} / ${LINK_DESC_MAX_LENTH}`}</Text>
        </View>
      </View>

      <View style={AppStyles.mBottom15}>
        <TextInput
          label={'Action'}
          containerStyle={{width: '50%'}}
          autoCapitalize="none"
          labelColor={Colors.black}
          maxLength={LINK_ACTION_MAX_LENTH}
          labelType={'semiBold'}
          placeholder={'Page Title'}
          rightIcon={
            util.isEmptyValue(linkActionText) ? null : Images.CrossIcon
          }
          onPress={() => {
            setLinkActionText('');
            updateLinkData('', 'actionTitle');
          }}
          value={linkActionText}
          error={linkActionTextError}
          ref={linkActionTextRef}
          onBlur={() => {
            linkActionTextRef?.current?.blur?.();
            linkFieldsValidation(false);
          }}
          onSubmitEditing={() => {
            linkActionTextRef?.current?.blur?.();
            linkFieldsValidation(false);
          }}
          onChangeText={val => {
            setLinkActionText(val);
            updateLinkData(val, 'actionTitle');
          }}
        />
        <View style={{alignItems: 'flex-end', top: 2, width: '50%'}}>
          <Text
            size={
              12
            }>{`${linkActionText.length} / ${LINK_ACTION_MAX_LENTH}`}</Text>
        </View>
      </View>
    </View>
  );

  const renderBottomSheet = () => (
    <TouchableOpacity
      style={[styles.bottomSheetContainer]}
      activeOpacity={1}
      onPressOut={() => {
        setImageOptionsRemainVisible(false);
      }}>
      <BottomSheetComponent
        refRBSheet={refRBSheet}
        renderViewHeader={bottomSheetHeader}
        renderView={bottomSheetView}
        activeBottomSheetId={activeBottomSheetId}
        onBottomSheetClose={onCloseBottomSheet}
        removeSheet={() => {
          // setBottomSheet(false);
          onCloseBottomSheet();
          // setEditLinkIndex(null);
        }}
      />
    </TouchableOpacity>
  );

  const renderAddlinkBottomSheet = () => {
    return (
      <View style={styles.bottomSheetContainer}>
        <BottomSheetComponent
          refRBSheet={refRBSheet}
          renderViewHeader={bottomSheetHeader}
          renderView={addLinkBottomSheetContent}
          activeBottomSheetId={activeBottomSheetId}
          removeSheet={() => setLinkPage(false)}
          onBottomSheetClose={() => {
            onCloseBottomSheet();
          }}
        />
      </View>
    );
  };

  const deletePageModalSec = useMemo(
    () => (
      <ModalView
        showModal={showDeletePageModal}
        toggleModal={toggleDeletePageModal}
        mainText={'Are you sure?'}
        subMainText={
          incomingPageDetails.isPurchased
            ? 'Removing this page will delete all of its contents and performance data. Also, passes will no longer be available for sale. All current passholders can continue with valid use of remaining vouchers.'
            : 'Removing this page will delete all of its contents and performance data.'
        }
        btnArrOfModal={[
          {text: 'Cancel', onPress: () => toggleDeletePageModal()},
          {text: 'Delete', onPress: () => onDeleteAction()},
        ]}
      />
    ),
    [showDeletePageModal],
  );

  const perfectPassModalSec = useMemo(
    () => (
      <ModalView
        showModal={isPerfectPassDisabled}
        toggleModal={togglePerfectPassModal}
        mainText={'Are you sure?'}
        subMainText={
          'If you turn perfect pass off, passes will no longer be available for sale. All current passholders can continue with valid use of remaining vouchers.'
        }
        btnArrOfModal={[
          {text: 'Cancel', onPress: () => togglePerfectPassModal()},
          {text: 'Confirm', onPress: () => passOffAction()},
        ]}
      />
    ),
    [isPerfectPassDisabled],
  );
  const onEditPage = () => {
    setActiveBottomSheetId(null);
    setEditMode(!isEditMode);
    setPublishPageAlert(false);
  };

  const onSharePage = () => {
    setSharePage(!isSharePage);
    setBottomSheet(!isBottomSheet);
  };

  const onLinkPage = () => {
    setLinkAdded(false);
    setLinkPage(true);
  };

  const onStartEditingPage = () => {
    setBottomSheet(true);
    refRBSheet?.current?.snapTo(1);

    setStartEditing(true);
  };

  const onDiscardPress = () => {
    setOpenView(false);
  };

  const onPressNFCWrite = async () => {
    nfcManager.start();
    await writeNdef(incomingPageDetails?.url ?? '', setNFC);
  };

  const pageHeaderSec = useMemo(
    () => (
      <PageHeader
        isBottomSheet={isBottomSheet || isLinkPage}
        // setBottomSheetActiveId={()=>setActiveBottomSheetId(null)}
        isNFC={isNFC}
        removeBottomSheet={() => {
          // if (isBottomSheet) {
          //   setBottomSheet(false);
          //   setEditLinkIndex(null);
          // } else if (isLinkPage) {
          //   setLinkPage(false);
          // }
        }}
        isEdit={isEditMode}
        isCreation={isCreationMode}
        isPagePublished={pageDetails?.isPublished ?? false}
        isPageInitiallyPublished={pageDetails?.isInitiallyPublished ?? false}
        isStartEditing={isStartEditing}
        onPressNFCWrite={onPressNFCWrite}
        isActive={showSharePageToggle}
        startEditingBtnAction={onStartEditingPage}
        shareBtnAction={onSharePage}
        submitBtnAction={onSubmitPage}
        editBtnAction={onEditPage}
        deleteBtnAction={onDeletePage}
        linkBtnAction={onLinkPage}
        isInvited={incomingPageDetails?.isInvited}
        backBtnAction={() => {
          setOpenView(false);
        }}
        discardBtnAction={onDiscardPress}
        // isLinkLoading={isLinkLoading || imageBackgroundLoading}
        isLinkLoading={isLinkLoading}
        discardConfirmationAlertVisible={discardConfirmationAlertVisible}
        setDiscardConfirmationAlertVisible={setDiscardConfirmationAlertVisible}
      />
    ),
    [
      isNFC,
      isEditMode,
      isCreationMode,
      pageDetails,
      isBottomSheet,
      isLinkLoading,
      isLinkPage,
      imageBackgroundLoading,
      discardConfirmationAlertVisible,
      isStartEditing,
    ],
  );

  const setAddlinkAnimation = () => {
    if (!util.isPlatformAndroid()) {
      LayoutAnimation.configureNext({
        duration: 600,

        create: {
          type: LayoutAnimation.Types.easeIn,
          property: LayoutAnimation.Properties.scaleXY,
          springDamping: 3,
        },
      });
    } else {
      setLinkAdded(true);
      setLinkLoading(false);
    }
  };
  const mainContentOfPage = () => (
    <>
      {/* {isShareLinkCopy && bottomSheetAlertSec(setShareLinkCopy)} */}
      {((showPublishPage && !pageDetails?.isPublished) || isPagePublished) &&
        alertSec()}

      {!isPermissionGranted && photoLibraryAndCameraPermissionAlertSec()}

      {!statusFromAPi &&
        !util.isEmptyValue(responseMessageFromApiCall) &&
        alertForAPiSec()}
      {activationSaved && alertForActivation()}
      <View style={styles.container}>
        {pageHeaderSec}
        <ViewShot ref={viewShotRef} style={styles.container}>
          <ImageBackground
            source={pageImageSec()}
            style={[styles.imageBackgroundStyle]}
            blurRadius={util.isPlatformAndroid() ? 35 : 50}
            onLoadStart={() => setImageBackgroundLoading(true)}
            onLoadEnd={() => setImageBackgroundLoading(false)}>
            <View style={styles.pageOverlayColorStyle} />

            <View style={{flex: 1}}>
              {/* link Card */}
              {renderLinkCard()}
              {/* loader */}
              {incomingPageDetails.publishedActivation >= 1 &&
                incomingPageDetails.passenable &&
                !isEditMode &&
                userLabelSec()}
            </View>

            {isBottomSheet && renderBottomSheet()}
            {isLinkPage && renderAddlinkBottomSheet()}
          </ImageBackground>
        </ViewShot>
      </View>
      {showDeletePageModal && (
        <View style={{position: 'absolute'}}>{deletePageModalSec}</View>
      )}
      {isPerfectPassDisabled && (
        <View style={{position: 'absolute'}}>{perfectPassModalSec}</View>
      )}

      {isPageLoading && <SpinkitComponent isVisible={isPageLoading} />}
    </>
  );

  return (
    <>
      <Modal
        isVisible={isOpenView}
        onBackButtonPress={() => {
          if (isEditMode || isStartEditing) {
            setDiscardConfirmationAlertVisible(true);
          } else {
            setOpenView(false);
          }
        }}
        animationIn={'zoomInUp'}
        animationOut={'zoomOut'}
        animationInTiming={2}
        animationOutTiming={150}
        style={styles.modalStyle}>
        {util.isPlatformAndroid() ? (
          <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
            {mainContentOfPage()}
          </GestureHandlerRootView>
        ) : (
          mainContentOfPage()
        )}
        {showManagePageToggle && (
          <ManageActivation
            toggle={showManagePagePreviewToggle}
            saveAct={onActivationSaved}
          />
        )}
        {showTeamPageToggle && (
          <Team toggle={showTeamPagePreviewToggle} pageid={pageDetails?.id} />
        )}
        {isChooseActVew && (
          <View style={styles.chooseActWrap}>
            <ChooseActivation
              pageThumb={pageImageSec()}
              pageid={pageDetails.id}
              chooseActivationClose={() => {
                setChooseActVew(false);
              }}
            />
          </View>
        )}
      </Modal>
    </>
  );
}

Page.propTypes = {
  incomingPageDetails: PropTypes.object,
  userDetails: PropTypes.object,
  pagesList: PropTypes.array,
  isPageEditable: PropTypes.bool,
  isView: PropTypes.bool,
  setView: PropTypes.func,
  onDeletePress: PropTypes.func,
  initialRenderImage: PropTypes.string,
  initialRenderPageImageId: PropTypes.number,
  isPageOpen: PropTypes.bool,
};

Page.defaultProps = {
  incomingPageDetails: {},
  userDetails: {},
  pagesList: [],
  isPageEditable: false,
  isView: false,
  setView: Function(),
  onDeletePress: Function(),
  initialRenderImage: '',
  initialRenderPageImageId: 0,
  isPageOpen: true,
  activations: [],
};

const mapStateToProps = ({pages, user, passActivations}) => ({
  pagesList: pages.freePages,
  incomingPageDetails: pages.freePageDetails,
  userDetails: user.data,
  activations: passActivations.activations,
});

const actions = {};

export default connect(mapStateToProps, actions)(Page);
