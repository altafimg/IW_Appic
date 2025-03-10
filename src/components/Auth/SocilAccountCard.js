import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SVG from '../../assets/svg';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {AppLocalizedStrings} from '../../localization/Localization';

const socialAccounts = [
  {
    id: 'facebook',
    icon: <SVG.Facebook />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.face,
  },
  {
    id: 'instagram',
    icon: <SVG.Instagram />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.insta,
  },
  {
    id: 'youtube',
    icon: <SVG.Youtube />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.you,
  },
  {
    id: 'twitch',
    icon: <SVG.Twitch />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.twitch,
  },
  {
    id: 'tiktok',
    icon: <SVG.Tiktok />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.tiktok,
  },
  {
    id: 'linkedin',
    icon: <SVG.Linkedin />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.link,
  },
  {
    id: 'snapchat',
    icon: <SVG.Snapchat />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.snap,
  },
  {
    id: 'Connect to X',
    icon: <SVG.Twitter />,
    label: AppLocalizedStrings.connectSocialAccountsScreen.twitter,
  },
];

const SocialAccountCard = () => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const toggleSelection = id => {
    setSelectedAccounts(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id],
    );
  };

  return (
    <View style={styles.cardMainView}>
      {socialAccounts.map(account => (
        <TouchableOpacity
          key={account.id}
          style={[
            styles.card,
            selectedAccounts.includes(account.id) && styles.selectedCard,
          ]}
          onPress={() => toggleSelection(account.id)}>
          <View style={styles.iconTitleView}>
            {account.icon}
            <Text
              style={[
                styles.title,
                selectedAccounts.includes(account.id) && styles.titleSec,
              ]}>
              {account.label}
            </Text>
          </View>
          {selectedAccounts.includes(account.id) && (
            <TouchableOpacity onPress={() => toggleSelection(account.id)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialAccountCard;

const styles = ScaledSheet.create({
  cardMainView: {
    marginTop: hp(-3),
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginVertical: hp(0.6),
    backgroundColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCard: {
    borderColor: Colors.Primary500,
    backgroundColor: Colors.LightPrimary,
  },
  iconTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingHorizontal: wp(2),
  },
  titleSec: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '500',
    paddingHorizontal: wp(2),
  },
  removeText: {
    color: 'red',
    fontSize: '14@s',
    fontWeight: 'bold',
  },
});
