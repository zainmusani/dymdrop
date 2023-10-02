import {Images} from '../theme';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {Alert} from 'react-native';
import util from '../util';

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const PASSWORD_PLACEHOLDER = '•••••••••••';
export const RESEND_CODE_TIMER = 59;
export const PAGE_TITLE_MAX_LENTH = 72;
export const PAGE_DESC_MAX_LENTH = 65;
export const LINK_DESC_MAX_LENTH = 160;
export const LINK_ACTION_MAX_LENTH = 15;
export const ALERT_TIMER = 3000;
export const CURRENT_USER = 'creator';

// date time formats
export const DATE_FORMAT1 = 'ddd, MMM YY';
export const DATE_FORMAT2 = 'DD, MMM YY';
export const DATE_FORMAT3 = 'YYYY-MM-DD';
export const DATE_FORMAT4 = 'DD-MM-YYYY';
export const TIME_FORMAT1 = 'hh:mm a';
export const TIME_FORMAT2 = 'hh:mm';
export const TIME_FORMAT3 = 'hh';
export const DATE_TIME = 'DD-MM-YYYY hh:mm a';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

export const IDEAL_LINK_VID_HEIGHT = 385;

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

export const PAGE_IMAGES_OPTIONS = [
  {
    id: 0,
    image: 'https://dymedrop-dev.s3.amazonaws.com/PageImagePlaceholder1.png',
  },
  {id: 1, image: 'https://dymedrop-dev.s3.amazonaws.com/Bulldog.png'},

  {id: 2, image: 'https://dymedrop-dev.s3.amazonaws.com/Vipers.png'},
];

export const LINK_URLS = [
  {title: 'Page URL', link: 'https://dymedrop-webapp.web.app/'},
];

export const CONTACT_OPTION_TYPES = {
  FB: 'fb',
  INSTA: 'insta',
  EMAIL: 'email',
  LINKEDIN: 'linkedin',
  MEDIUM: 'medium',
  PHONE: 'phone',
  PINTEREST: 'pinterest',
  REDDIT: 'reddit',
  SNAPCHAT: 'snapchat',
  TIKTOK: 'tiktok',
  TWITCH: 'twitch',
  TWITTER: 'twitter',
  YOUTUBE: 'youtube',
  HUDL: 'hudl',
  MAXPREPS: 'maxpreps',
};

export const ACTIVATION_TYPES = {
  NAME: 'name',
  PRICE: 'price',
  FREQUENCY: 'frequency',
  DESCRIPTION: 'description',
  SCANLIMIT: 'scanLimit',
  FANLIMIT: 'fanLimit',
  PROMOCODE: 'promocode',
};

export const SOCIAL_MEDIA_LINK_URLS = [
  {icon: Images.InstaShareIcon, title: 'Go to instagram'},
  {icon: Images.TikTokShareIcon, title: 'Go to tiktok'},
  {icon: Images.FacebookShareIcon, title: 'Go to facebook'},
  {icon: Images.TwitterShareIcon, title: 'Go to twitter'},
  {icon: Images.PinterestShareIcon, title: 'Go to pinterest'},
];

export const IMAGES_OPTIONS = [
  {
    id: 1,
    title: 'Photo Library',
    img: Images.PhotoLibraryIcon,
    onPress: (getImage, permissionGrantFunc) => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          getImage({image: image?.path, type: image?.mime});
        })
        .catch(e => {
          console.log({eeeeeeeeeeLIbrary: e});
          if (e.code === 'E_NO_LIBRARY_PERMISSION') {
            permissionGrantFunc(false);
          }
        });
    },
  },
  {
    id: 2,

    title: 'Take Photo',
    img: Images.CameraIcon,
    onPress: (getImage, permissionGrantFunc) => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          getImage({image: image?.path, type: image?.mime});
        })
        .catch(e => {
          console.log({eeeeeeeeeeLIbrary: e.code});

          if (e.code === 'E_NO_CAMERA_PERMISSION') {
            permissionGrantFunc(false);
          }
        });
    },
  },
  {
    id: 3,
    title: 'Browse',
    img: Images.BrowseIcon,
    onPress: async (getImage, permissionGrantFunc) => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        const stringifiedData = JSON.stringify(res);
        getImage({
          image: JSON.parse(stringifiedData)[0]?.uri ?? '',
          type: JSON.parse(stringifiedData)[0]?.type ?? '',
        });
      } catch (err) {}
    },
  },
];

export const VIEW_POSITIONER_ITEMS = {
  IS_TOP: 'IS_TOP',
  IS_BOTTOM: 'IS_BOTTOM',
  IS_LEFT: 'IS_LEFT',
  IS_RIGHT: 'IS_RIGHT',
};

export const EDITPAGE_BOTTOMSHEET_OPTIONS = [
  {
    id: 0,
    title: 'Photo',
  },
  {
    id: 1,
    title: 'Text',
  },
  {
    id: 2,
    title: 'Contact Buttons',
  },
];

export const EDITLINK_BOTTOMSHEET_OPTIONS = [
  {
    id: 0,
    title: 'Thumbnail',
  },
  {
    id: 1,
    title: 'Text',
  },
  // {
  //   id: 2,
  //   title: 'Animation',
  // },
];

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

export const LINK_CARD_VIEW_TYPE = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

export const STATE_LIST = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export const FANBASE_SIZE_LIST = [
  '1-100',
  '101-250',
  '251-500',
  '501-1000',
  '1001-2000',
  '2001-3000',
  '3001-5000',
  '5001-10000',
  '10001-25000',
  '25001-50000',
  '50001+',
];
export const MY_ACTIVATIONS_DUMMY_DESC = `Twenty vouchers can be used across five different sports: Football,Volleyball, Boy's Basketball, Girls Basketball and Baseball. You will not receive tickets when you activate your Perfect Pass™.Instead, you will receive a smart wristband and a mobile game pass loaded with your chosen number of game scans. One game scan is good for one general admission seat. Game scans may be used in any quantity for any regular season home game*. Buy as many Perfect Passes™ as you want. With each Perfect Pass™ you buy, you'll receive one smart wristband and one mobile game pass with your chosen number of game scans. **Reminder: You must pick up your smart wristband by showing your activated pass. Enjoy all the action at your convenience! If you have any questions, feel free to reach out to the Wimberley ticket office at 419-372-0000. *The following games are excluded from the 2022 Calendar Year Perfect Pass: *All WHS Postseason Home Games *All WHS vs. Cuero home games *Football Homecoming Game PLEASE NOTE: If capacity is limited due to COVID-19 guidelines, Flex Plan usage towards a specific sport may be limited or based on a first come first served basis.`;

export const FREQUENCY_OPTIONS = [
  {
    id: 1,
    value: 'ANNUAL',
  },
  {
    id: 2,
    value: 'MONTHLY',
  },
  {
    id: 13,
    value: '1-TIME',
  },
];

export const PAYMENT_LIST = [
  {
    thumb:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    title: 'Blake Hicks',
    time: 'Wed Sep 21 2022 18:17:57 GMT+0500 (Pakistan Standard Time)',
    amount: 70,
  },
  {
    thumb:
      'https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1571829929929-XRB9VF9242RNUKBBX55E/DwayneBrownStudio_OttawaLinkedInHeadshots_ClaireBrown.jpg?format=1000w',
    title: 'Kierra Martinez',
    time: 'Tue Sep 20 2022 9:44:57 GMT+0500 (Pakistan Standard Time)',
    amount: 250,
  },
  {
    thumb:
      'https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/cache/3.JPG-nggid03125-ngg0dyn-591x591-00f0w010c010r110f110r010t010.JPG',
    title: 'Janet James',
    time: 'Mon Sep 19 2022 14:10:57 GMT+0500 (Pakistan Standard Time)',
    amount: 140,
  },
  {
    thumb:
      'https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1571829929929-XRB9VF9242RNUKBBX55E/DwayneBrownStudio_OttawaLinkedInHeadshots_ClaireBrown.jpg?format=1000w',
    title: 'Kierra Martinez',
    time: 'Sat Sep 17 2022 9:44:57 GMT+0500 (Pakistan Standard Time)',
    amount: 250,
  },
];
