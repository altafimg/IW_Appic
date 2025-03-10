import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {useDispatch, useSelector} from 'react-redux';
import userImage from '../../../assets/images/userImage.png';
// import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';

import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';
import {useIsFocused} from '@react-navigation/native';

const MainHeader = props => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userProfilePicture = useSelector(
    state =>
      state.getLoggedInUserProfileReducer.data?.data?.data?.profile_picture,
  );

  const {token, _id} = useSelector(state => ({
    token: state.loginReducer.user?.data?.token,
    _id: state.loginReducer.user?.data?.data?._id,
  }));

  useEffect(() => {
    if (isFocused) {
      const data = {
        _id: _id,
        token: token,
      };
      dispatch(getLoggedInUserProfileAction(data));
    }
  }, [isFocused, dispatch]);

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text style={styles.TextStyle}>{props.title}</Text>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            {userProfilePicture == null || userProfilePicture == undefined ? (
              <Image source={userImage} style={styles.imageStyle} />
            ) : (
              <Image
                source={{uri: userProfilePicture}}
                style={styles.imageStyle}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={props.onPress1}>
            <SVG.HeaderMassage
              style={styles.imageStyle}
              width={20}
              height={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;

const styles = ScaledSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginTop: hp(2),
  },
  TextStyle: {
    color: Colors.Black,
    fontWeight: '600',
    fontSize: '24@s',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: '24@s',
    height: '24@s',
    marginLeft: wp(5),
    borderRadius: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
});
