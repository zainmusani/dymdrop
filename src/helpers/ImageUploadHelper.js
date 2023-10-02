import {BASE_URL} from '../config/WebService';
import util from '../util';

const uploadImageToServer = async file => {
  console.log({filele: file});

  let URL = '';
  try {
    await fetch(`${BASE_URL}api/v1/aws/sign-url`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      }),
    })
      .then(response => response.json())
      .then(result => {
        URL = result.data.url;
      });
  } catch (error) {}

  const fileExt = util.getFileExtension(file);
  const media = {
    uri: file,
    type: 'image/jpeg',
    name: 'imageFile.' + fileExt,
  };

  await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: media,
  })
    .then(result => {
      console.log({meraresponse: result.text()});
    })
    .catch(err => console.error('err', err));

  let imageUrl = URL.split('?')[0];

  console.log({imageUrl});

  return imageUrl;
};

export {uploadImageToServer};
