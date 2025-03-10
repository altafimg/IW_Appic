import RNFetchBlob from 'rn-fetch-blob';
import {Platform, Alert, Linking} from 'react-native';
import RNFS from 'react-native-fs';
import {Share} from 'react-native';

const downloadFileHandler = async (fileExtension, downloadUrl) => {
  const {config, fs} = RNFetchBlob;
  const isIOS = Platform.OS === 'ios';

  // Extract file name from URL
  const fileName = downloadUrl.split('/').pop();

  // Define the path based on the platform
  const pathToDownload = isIOS
    ? `${fs.dirs.DocumentDir}/${fileName}` // iOS document directory
    : `${fs.dirs.DownloadDir}/${fileName}`; // Android download directory

  let mimeType = 'application/octet-stream'; // Default MIME type

  switch (fileExtension) {
    case 'pdf':
      mimeType = 'application/pdf';
      break;
    case 'jpg':
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'png':
      mimeType = 'image/png';
      break;
    case 'gif':
      mimeType = 'image/gif';
      break;
    case 'mp3':
      mimeType = 'audio/mpeg';
      break;
    case 'wav':
      mimeType = 'audio/wav';
      break;
    case 'aac':
      mimeType = 'audio/aac';
      break;
    case 'mp4':
      mimeType = 'video/mp4';
      break;
    case 'avi':
      mimeType = 'video/x-msvideo';
      break;
    case 'mov':
      mimeType = 'video/quicktime';
      break;
    case 'doc':
    case 'docx':
      mimeType = 'application/msword'; // DOCX specific MIME type can be used if needed
      break;
    case 'xls':
    case 'xlsx':
      mimeType = 'application/vnd.ms-excel'; // XLSX specific MIME type can be used if needed
      break;
    case 'ppt':
    case 'pptx':
      mimeType = 'application/vnd.ms-powerpoint'; // PPTX specific MIME type can be used if needed
      break;
    default:
      mimeType = 'application/octet-stream';
  }

  // Configure download settings
  config({
    fileCache: true,
    path: pathToDownload,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: fileName,
      description: 'File downloaded by download manager.',
      mime: mimeType,
      mediaScannable: true,
      path: pathToDownload,
    },
  })
    .fetch('GET', downloadUrl)
    .then(async res => {
      console.log('File downloaded to:', res.path());

      if (isIOS) {
        try {
          await Share.share({
            url: res.path(),
            title: fileName,
            message: 'File downloaded',
          });
          Alert.alert(
            'File downloaded',
            'File has been downloaded successfully.',
          );
        } catch (error) {
          console.log('File share error:', error);
          Alert.alert('Share failed', 'The file could not be shared.');
        }
      } else {
        Alert.alert(
          'File Downloaded',
          'File has been downloaded successfully. Do you want to open it?',
          [
            {text: 'No', style: 'cancel'},
            {
              text: 'Yes',
              onPress: () =>
                RNFetchBlob.android.actionViewIntent(res.path(), mimeType),
            },
          ],
          {cancelable: true},
        );
      }
    })
    .catch(error => {
      console.log('Download error:', error);
      Alert.alert('Download failed', 'The file could not be downloaded.');
    });
};

export default downloadFileHandler;
