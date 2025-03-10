import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const hp = percentage => {
  return heightPercentageToDP(percentage);
};

export const wp = percentage => {
  return widthPercentageToDP(percentage);
};
