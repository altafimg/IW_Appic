import React, {useEffect} from 'react';
import {Text, View, SafeAreaView, FlatList, ScrollView} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import SVG from '../../../assets/svg';
import {useDispatch, useSelector} from 'react-redux';
import QuickAdsCardRenderItem from '../../../components/nonAuth/QuickAds/QuickAdsCardRenderItem';
import QuickAdsCardSavedRenderItem from '../../../components/nonAuth/QuickAds/QuickAdsCardSavedRenderItem';

// image
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {getSavedQuickAdsApiAction} from '../../../redux/actions/getSavedQuickAdsApiAction';
import NewHeader from '../../../components/NewHeader';

const SavedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const recommendedData = useSelector(
    state => state.availableQuickAdsReducer.data?.data?.data,
  );

  const savedQuickAdsData = useSelector(
    state => state.getSavedQuickAdsApiReducer.data?.data,
  );

  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);

  const getSavedQuickAdsHandler = () => {
    dispatch(getSavedQuickAdsApiAction(_id))
      .then(res => {
        console.log(res?.data, '{{}{}{');
      })
      .catch(err => {
        console.log(err, '<<<<<<err');
      });
  };

  useEffect(() => {
    getSavedQuickAdsHandler();
  }, []);

  const SavedRenderItem = ({item}) => {
    return <QuickAdsCardSavedRenderItem item={item} />;
  };
  const renderItem = ({item}) => {
    return <QuickAdsCardRenderItem item={item} />;
  };

  const goBack = () => {
    dispatch(getSavedQuickAdsApiAction(_id));
    navigation.goBack('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <NewHeader
        headerTitle={AppLocalizedStrings.quickAdsHomescreen.saved}
        onPress={goBack}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {savedQuickAdsData?.length > 0 && (
          <Text style={styles.topHeaderTitle}>
            {AppLocalizedStrings.quickAdsHomescreen.saved_long}
          </Text>
        )}

        {savedQuickAdsData?.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={savedQuickAdsData}
            renderItem={SavedRenderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={{marginTop: hp(4)}}>
            <SVG.NothingSave style={styles.imageStyle} />
            <Text style={styles.noPostTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.nothing_save}
            </Text>
            <Text style={styles.noPostTextStyleSec}>
              QuickAds that have expired will be removed from here.
            </Text>
          </View>
        )}
        <View style={{marginTop: scale(30)}}>
          <Text style={styles.recommendTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Recommended}
          </Text>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={recommendedData}
            renderItem={renderItem}
            key={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '10@s',
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
  },
  recommendTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  imageStyle: {
    alignSelf: 'center',
  },
  noPostTextStyle: {
    fontSize: '23@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    alignSelf: 'center',
    marginTop: '30@s',
  },
  noPostTextStyleSec: {
    fontSize: '14@s',
    fontWeight: '400',
    color: '#404040',
    textAlign: 'center',
    marginTop: '10@s',
  },
  topHeaderTitle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: '#404040',
    textAlign: 'center',
    marginTop: '30@s',
  },
});
