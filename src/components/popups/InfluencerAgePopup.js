import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';

const InfluencerAgePopup = props => {
  const isVisible = props.isVisible;
  const [selectedCard2, setSelectedCard2] = useState(null);

  const handleCardClick = cardNumber => {
    setSelectedCard2(selectedCard2 === cardNumber ? null : cardNumber);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      onRequestClose={props.toggleModal}>
      <TouchableWithoutFeedback onPress={props.toggleModal}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.welcomeScreen.forward}
              </Text>
              <TouchableOpacity
                onPress={() => handleCardClick(1)}
                style={[
                  styles.cardView,
                  {
                    borderColor:
                      selectedCard2 === 1
                        ? Colors.Primary500
                        : Colors.Neutral200,
                  },
                ]}>
                <View style={styles.cradHeaderView}>
                  <Text style={styles.cardHeaderTitle}>{props.first_text}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCardClick(2)}
                style={[
                  styles.cardView,
                  {
                    borderColor:
                      selectedCard2 === 2
                        ? Colors.Primary500
                        : Colors.Neutral200,
                  },
                ]}>
                <Text style={styles.cardHeaderTitle}>{props.second_text}</Text>
              </TouchableOpacity>
            </View>
            {selectedCard2 ? (
              <PrimaryButton
                title={AppLocalizedStrings.button.continue}
                onPress={
                  selectedCard2 === 1
                    ? props.selectedCard == 1
                      ? props.onProfileDetailHandler
                      : props.onProfileDetailHandler
                    : props.selectedCard == 2
                    ? props.onManagingkidInfluencersHandler
                    : props.onProfileBusinessHandler
                }
              />
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InfluencerAgePopup;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: wp(-5),
    marginBottom: hp(-2.3),
  },
  main: {
    height: '40%',
    backgroundColor: Colors.White,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: hp(2),
    justifyContent: 'space-between',
    paddingTop: hp(4),
  },
  headerTitle: {
    fontSize: '14@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingHorizontal: wp(3),
  },
  cardView: {
    borderWidth: 1.5,
    borderColor: Colors.Neutral200,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    marginVertical: hp(1),
    marginHorizontal: wp(3),
  },
  cardHeaderTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
  },
});
