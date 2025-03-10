import {useEffect, useState, useCallback} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const onKeyboardShow = useCallback(() => setIsKeyboardOpen(true), []);
  const onKeyboardHide = useCallback(() => setIsKeyboardOpen(false), []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [onKeyboardShow, onKeyboardHide]);

  return isKeyboardOpen;
};

export default useKeyboardOpen;
