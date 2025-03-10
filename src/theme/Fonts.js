import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const scale = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) / 420;

export const Fonts = {
  regular: 'BalooPaaji2-Regular',
  medium: 'BalooPaaji2-Medium',
  semiBold: 'BalooPaaji2-SemiBold',
  bold: 'BalooPaaji2-Bold',
  extraBold: 'BalooPaaji2-ExtraBold',

  normalize: size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },

  getFontFamily: type => {
    switch (type) {
      case 'Regular':
        return Fonts.regular;
      case 'Medium':
        return Fonts.medium;
      case 'SemiBold':
        return Fonts.semiBold;
      case 'Bold':
        return Fonts.bold;
      case 'ExtraBold':
        return Fonts.extraBold;
    }
  },
};
