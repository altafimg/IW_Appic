import React, {useState} from 'react';
import {View, Text} from 'react-native';
import SVG from '../../../assets/svg';

const PlatformIcon = props => {
  const platformData = props.platformData;
  const [apiData, setApiData] = useState(platformData || []);

  const platformName = [
    {
      id: 1,
      name: 'TikTok',
      svg: <SVG.TikTokS width={20} height={20} />,
    },
    {
      id: 2,
      name: 'Youtube',
      svg: <SVG.YoutubeS width={20} height={20} />,
    },
    {
      id: 3,
      name: 'Instagram',
      svg: <SVG.InstagramS width={20} height={20} />,
    },
    {
      id: 4,
      name: 'Twitch',
      svg: <SVG.TwitchS width={20} height={20} />,
    },
    {
      id: 5,
      name: 'X (Formerly Twitter)',
      svg: <SVG.XS width={20} height={20} />,
    },
    {
      id: 6,
      name: 'Snapchat',
      svg: <SVG.SnapchatS width={20} height={20} />,
    },
    {
      id: 7,
      name: 'Linkedin',
      svg: <SVG.LinkdinS width={20} height={20} />,
    },
    {
      id: 8,
      name: 'Facebook',
      svg: <SVG.FacebookS width={20} height={20} />,
    },
  ];

  const renderPlatformLogo = platform => {
    const platformInfo = platformName?.find(
      item => item?.name?.toLowerCase() === platform?.toLowerCase(),
    );

    if (platformInfo) {
      return platformInfo?.svg;
    } else {
      return <Text>No Logo Found</Text>;
    }
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {apiData?.map((item, index) => (
        <View style={{paddingRight: 5}} key={index}>
          {renderPlatformLogo(item?.platform_name)}
        </View>
      ))}
    </View>
  );
};

export default PlatformIcon;
