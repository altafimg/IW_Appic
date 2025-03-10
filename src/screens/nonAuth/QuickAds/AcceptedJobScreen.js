import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import acceptImage from '../../../assets/images/acceptImage.png';
import ErrorImage from '../../../assets/images/ErrorImage.png';
import Colors from '../../../theme/Colors';
import {useSelector} from 'react-redux';

const AcceptedJobScreen = ({navigation, route}) => {
  // const {status} = route.params;
  const [select, setSelect] = useState(true);

  // const onNavigationHandler = () =>{
  //   navigation.goBack();
  // }
  return (
    <View style={styles.container}>
      {select ? (
        <Image source={acceptImage} style={styles.imageStyle} />
      ) : (
        <Image source={ErrorImage} style={styles.imageStyle1} />
      )}
      <View style={styles.mainTextStyle}>
        <Text style={styles.TextStyle}>
          {select ? 'Accepted job' : 'Unable to accept'}
        </Text>
        {select ? (
          <Text style={styles.TextStyle1}>
            We’ve moved this job to your to do list
          </Text>
        ) : (
          <Text style={styles.TextStyle1}>
            You cannot take on 2 or more jobs which are scheduled to be
            delivered at the same time. We do this to lessen the burden on
            influencers who are managing multiple jobs at once.
          </Text>
        )}
      </View>
      {select ? (
        <Text style={[styles.TextStyle1, {marginTop: scale(100)}]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui tellus
          pretium at nisi proing.
        </Text>
      ) : (
        <Text style={[styles.TextStyle1, {marginTop: scale(70)}]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui tellus
          pretium at nisi proing.
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ToDoBottomNavigation');
        }}
        activeOpacity={0.6}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          {select ? 'View Job' : 'back'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AcceptedJobScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  imageStyle: {
    width: '286@s',
    height: '237@s',
    marginTop: '100@s',
    alignSelf: 'center',
  },
  imageStyle1: {
    width: '210@s',
    height: '220@s',
    marginTop: '100@s',
    alignSelf: 'center',
  },
  mainTextStyle: {
    marginTop: '50@s',
    alignItems: 'center',
  },
  TextStyle: {
    fontWeight: '600',
    fontSize: '24@s',
    color: Colors.Neutral900,
  },
  TextStyle1: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral700,
    marginTop: '10@s',
    textAlign: 'center',
  },
  buttonStyle: {
    position: 'absolute',
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '10@s',
    width: '100%',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
});
