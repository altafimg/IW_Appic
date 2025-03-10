import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SVG from '../../assets/svg';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {useSelector} from 'react-redux';
import {completeSteps} from '../../redux/actions/completeStepsAction';
import {useNavigation} from '@react-navigation/native';

const BuildProfile = props => {
  const navigation = useNavigation();
  const selectedCardData = useSelector(
    state => state.completeStepsReducer.steps,
  );

  let selectedCard = props.selectedCard;
  let setSelectedCard = props.setSelectedCard;

  const test1 = selectedCardData[0];
  const test2 = selectedCardData[1];
  const test3 = selectedCardData[2];
  const test4 = selectedCardData[3];

  const handleCardClick = cardNumber => {
    if (selectedCardData[0] == true && cardNumber == 1) {
      navigation.navigate('ProfilePictureScreen');
    } else if (selectedCardData[1] == true && cardNumber == 2) {
      navigation.navigate('AddAdditionalDetailsScreen');
    } else if (selectedCardData[2] == true && cardNumber == 3) {
      navigation.navigate('SelectYourCategoryScreen');
    } else if (selectedCardData[3] == true && cardNumber == 4) {
      navigation.navigate('AddMusicVideosScreen');
    }
  };

  return (
    <View>
      {/* -----------------one----------------- */}
      <TouchableOpacity
        style={[
          styles.cardView,
          {
            borderColor:
              test1 === false &&
              test2 === false &&
              test3 === false &&
              test4 === false
                ? Colors.Primary500
                : Colors.Neutral300,
          },
        ]}
        onPress={() => handleCardClick(1)}>
        {test1 ? (
          <View style={styles.rightIcon}>
            <SVG.Tick style={{color: 'red'}} />
          </View>
        ) : (
          <SVG.Step1
            color={selectedCard === 1 ? Colors.Primary500 : Colors.Neutral400}
          />
        )}

        <Text style={[styles.cardTitle, {color: Colors.Neutral500}]}>
          {AppLocalizedStrings.buildProfileScreen.setUp}
        </Text>
      </TouchableOpacity>

      {/* -----------------two----------------- */}

      <TouchableOpacity
        disabled={test1 === false ? true : false}
        style={[
          styles.cardView,
          {
            borderColor:
              test1 && test3 === false && test4 === false && test2 === false
                ? Colors.Primary500
                : Colors.Neutral300,
          },
        ]}
        onPress={() => handleCardClick(2)}>
        {test2 ? (
          <View style={styles.rightIcon}>
            <SVG.Tick />
          </View>
        ) : (
          <SVG.Step2
            color={
              test1 && test3 === false && test4 === false && test2 === false
                ? Colors.Primary500
                : Colors.Neutral400
            }
          />
        )}

        <Text style={[styles.cardTitle, {color: Colors.Neutral500}]}>
          {AppLocalizedStrings.buildProfileScreen.add}
        </Text>
      </TouchableOpacity>

      {/* -----------------three----------------- */}

      <TouchableOpacity
        disabled={test1 === false && test2 === false ? true : false}
        style={[
          styles.cardView,
          {
            borderColor:
              test1 && test2 && test3 === false && test4 == false
                ? Colors.Primary500
                : Colors.Neutral300,
          },
        ]}
        onPress={() => handleCardClick(3)}>
        {test3 ? (
          <View style={styles.rightIcon}>
            <SVG.Tick />
          </View>
        ) : (
          <SVG.Step3
            color={
              test1 && test2 && test3 === false && test4 == false
                ? Colors.Primary500
                : Colors.Neutral400
            }
          />
        )}

        <Text style={[styles.cardTitle, {color: Colors.Neutral500}]}>
          {AppLocalizedStrings.buildProfileScreen.select}
        </Text>
      </TouchableOpacity>

      {/* -----------------four----------------- */}

      <TouchableOpacity
        disabled={
          test1 === false && test2 === false && test3 === false ? true : false
        }
        style={[
          styles.cardView,
          {
            borderColor:
              test1 && test2 && test3 && test4 === false
                ? Colors.Primary500
                : Colors.Neutral300,
          },
        ]}
        onPress={() => handleCardClick(4)}>
        {test4 ? (
          <View style={styles.rightIcon}>
            <SVG.Tick />
          </View>
        ) : (
          <SVG.Step4
            color={
              test1 && test2 && test3 && test4 === false
                ? Colors.Primary500
                : Colors.Neutral400
            }
          />
        )}

        <Text style={[styles.cardTitle, {color: Colors.Neutral500}]}>
          {AppLocalizedStrings.buildProfileScreen.addMusic}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuildProfile;

const styles = ScaledSheet.create({
  cardView: {
    borderColor: Colors.Primary500,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.8),
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    paddingLeft: wp(5),
  },
  cardView2: {
    borderColor: Colors.Neutral400,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.8),
  },
  cardTitle2: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '600',
    paddingLeft: wp(5),
  },
  rightIcon: {
    borderColor: '#4CD964',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
  },
});
