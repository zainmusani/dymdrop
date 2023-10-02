import {Linking} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import util from '../util';

export const readNdef = async () => {
  if (util.isPlatformAndroid()) {
    await NfcManager.registerTagEvent();
  }

  NfcManager.isSupported().then(async supported => {
    if (supported) {
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef, {
          alertMessage: 'Hold your phone near the Dymedrop logo.',
        });
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        _onTagDiscovered(tag);
      } catch (ex) {
        console.warn('Oops!', ex);
      } finally {
        // stop the nfc scanning
        console.log('finally read');

        NfcManager.cancelTechnologyRequest()
          .then(data => {
            console.log({cancelTechRead: data});
          })
          .catch(err => {
            console.log({cancelTechReadErr: err});
          });
      }
    } else {
      console.warn('Unsupported');
    }
  });
};

const _onTagDiscovered = tag => {
  console.log('Tag Discovered', tag);

  let parsed = null;
  if (tag.ndefMessage && tag.ndefMessage.length > 0) {
    // ndefMessage is actually an array of NdefRecords,
    // and we can iterate through each NdefRecord, decode its payload
    // according to its TNF & type
    const ndefRecords = tag.ndefMessage;

    function decodeNdefRecord(record) {
      if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
        return ['text', Ndef.text.decodePayload(record.payload)];
      } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
        return ['uri', Ndef.uri.decodePayload(record.payload)];
      }

      return ['unknown', '---'];
    }

    parsed = ndefRecords.map(decodeNdefRecord);
  }
  Linking.openURL(parsed[0][1]);
};

export const writeNdef = async (value, checkFunc) => {
  let result = false;

  if (util.isPlatformAndroid()) {
    await NfcManager.registerTagEvent();
  }

  NfcManager.isSupported()

    .then(async supported => {
      if (supported) {
        try {
          // STEP 1
          await NfcManager.requestTechnology([NfcTech.Ndef], {
            isReaderModeEnabled: false,
          });

          const bytes = Ndef.encodeMessage([Ndef.uriRecord(value)]);

          if (bytes) {
            await NfcManager.ndefHandler // STEP 2
              .writeNdefMessage(bytes); // STEP 3
            result = true;
            checkFunc(true);
          }
        } catch (ex) {
          checkFunc(true);
          console.warn(ex);
        } finally {
          // STEP 4
          console.log('finally write');

          NfcManager.cancelTechnologyRequest()
            .then(data => {
              console.log({cancelTechWrite: data});
            })
            .catch(err => {
              console.log({cancelTechWriteErr: err});
            });
        }
        console.warn({writeNFC: result});
      } else {
        console.warn('Unsupported');
      }
    })
    .catch(err => {
      console.warn('isSupportErr', err);
    });
};
