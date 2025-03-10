import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import MediaFilesImageComponent from '../../../components/nonAuth/toDoList/MediaFilesImageComponent';
import MediaFilesVideoComponent from '../../../components/nonAuth/toDoList/MediaFilesVideoComponent';
import MediaFilesAudioComponent from '../../../components/nonAuth/toDoList/MediaFilesAudioComponent';
import MediaFilesLinksComponent from '../../../components/nonAuth/toDoList/MediaFilesLinksComponent';
import MediaFilesDocsComponent from '../../../components/nonAuth/toDoList/MediaFilesDocsComponent';

const MediaFilesScreen = () => {
  const navigation = useNavigation('');
  const [selectedButton, setSelectedButton] = useState(0);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const HandleButtonClick = () => {
    if (selectedButton === 0) {
      return <MediaFilesImageComponent />;
    } else if (selectedButton === 1) {
      return <MediaFilesVideoComponent />;
    } else if (selectedButton === 2) {
      return <MediaFilesAudioComponent />;
    } else if (selectedButton === 3) {
      return <MediaFilesLinksComponent />;
    } else {
      return <MediaFilesDocsComponent />;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle="Media & Files" />
        {/* {top bar start from here} */}
        <View style={styles.topTabMainView}>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 0 ? Colors.Primary500 : null,
              },
            ]}
            onPress={() => setSelectedButton(0)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 0 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 1 ? Colors.Primary500 : null,
              },
            ]}
            onPress={() => setSelectedButton(1)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 1 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 2 ? Colors.Primary500 : null,
              },
            ]}
            onPress={() => setSelectedButton(2)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 2 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              Audio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 3 ? Colors.Primary500 : null,
              },
            ]}
            onPress={() => setSelectedButton(3)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 3 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              Links
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 4 ? Colors.Primary500 : Colors.null,
              },
            ]}
            onPress={() => setSelectedButton(4)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 4 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              Docs
            </Text>
          </TouchableOpacity>
        </View>
        {/* {top bar End from here} */}
        <HandleButtonClick />
      </ScrollView>
    </View>
  );
};

export default MediaFilesScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  // {Top Tab }
  topTabMainView: {
    backgroundColor: Colors.Neutral100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36@s',
    paddingHorizontal: wp(1),
    borderRadius: 5,
    marginVertical: hp(1),
    marginTop: hp(-5),
  },
  topTabButtonView: {
    backgroundColor: Colors.Primary500,
    flex: 1,
    height: '28@s',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  topTabButtonTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '500',
    textAlign: 'center',
  },
});
