import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';

// image
import downArrow from '../../../assets/images/downArrow.png';
import checked from '../../../assets/images/checked.png';
import unChecked from '../../../assets/images/unChecked.png';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const CreateNewPlatformModel = ({
  selectedPlatform,
  setSelectedPlatform,
  socialData,
}) => {
  const [platfromExpend, setPlatformExpend] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const togglePlatform = platform => {
    const isSelected = selectedPlatform.includes(platform.name);
    if (isSelected) {
      setSelectedPlatform(
        selectedPlatform.filter(plat => plat !== platform.name),
      );
    } else {
      setSelectedPlatform([platform.name]);
    }
  };

  const toggleService = (subName, platform) => {
    const isSelected = selectedPlatform.includes(subName);
    if (isSelected) {
      setSelectedPlatform(selectedPlatform.filter(plat => plat !== subName));
    } else {
      setSelectedPlatform([platform, subName]);
    }
  };
  const handleSelect = id => {
    setSelectedId(id);
  };
  return (
    <View style={styles.mainBoxStyle1}>
      <TouchableOpacity
        onPress={() => setPlatformExpend(!platfromExpend)}
        activeOpacity={0.6}
        style={styles.expendButton}>
        <Text style={styles.mainTitleStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.The_platform}
        </Text>
        <Image
          source={downArrow}
          style={{
            width: scale(24),
            height: scale(24),
            tintColor: platfromExpend ? Colors.Primary500 : null,
            transform: [{rotate: platfromExpend ? '180deg' : '0deg'}],
          }}
        />
      </TouchableOpacity>

      {platfromExpend && (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.Neutral300,
            paddingHorizontal: wp(3),
            paddingVertical: hp(2),
          }}>
          {socialData.map((platform, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => togglePlatform(platform)}
                activeOpacity={0.6}
                style={styles.platformItem}>
                <Image
                  source={
                    selectedPlatform.includes(platform.name)
                      ? checked
                      : unChecked
                  }
                  style={styles.checkImage}
                />
                <Image source={platform.image} style={styles.platformImage} />
                <Text style={styles.platformName}>{platform.name}</Text>
              </TouchableOpacity>
              {selectedPlatform.includes(platform.name) &&
                platform.subName.length > 0 && (
                  <View style={styles.subNamesContainer}>
                    {platform.subName.map((subName, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        onPress={() => toggleService(subName, platform.name)}
                        activeOpacity={0.6}
                        style={styles.subNameItem}>
                        <Image
                          source={
                            selectedPlatform.includes(subName)
                              ? checked
                              : unChecked
                          }
                          style={styles.checkImage}
                        />
                        <Text style={styles.subNameText}>{subName}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CreateNewPlatformModel;

const styles = ScaledSheet.create({
  mainBoxStyle1: {
    marginTop: '15@s',
    // borderWidth: 1,
    // borderRadius: '3@s',
    // borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
  },
  expendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '10@s',
  },
  mainTitleStyle: {
    fontWeight: '600',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  platformItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '10@s',
  },
  checkImage: {
    width: '24@s',
    height: '24@s',
  },
  platformImage: {
    width: '26@s',
    height: '25@s',
    marginHorizontal: '20@s',
  },
  platformName: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  subNamesContainer: {
    marginLeft: '50@s',
  },
  subNameItem: {
    paddingVertical: '5@s',
    flexDirection: 'row',
  },
  subNameText: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral700,
  },
});

// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, Image} from 'react-native';
// import {ScaledSheet, scale} from 'react-native-size-matters';
// import {AppLocalizedStrings} from '../../../localization/Localization';
// import Colors from '../../../theme/Colors';

// // image
// import downArrow from '../../../assets/images/downArrow.png';
// import checked from '../../../assets/images/checked.png';
// import unChecked from '../../../assets/images/unChecked.png';

// const CreateNewPlatformModel = ({
//   selectedPlatform,
//   setSelectedPlatform,
//   socialData,
// }) => {
//   const [platfromExpend, setPlatformExpend] = useState(false);
//   const [selectedService, setSelectedService] = useState();

//   const selectPlatform = platform => {
//     if (selectedPlatform.includes(platform.name)) {
//       setSelectedPlatform([]);
//       setSelectedService(null);
//     } else {
//       setSelectedPlatform([platform.name]);
//       setSelectedService(null);
//     }
//   };

//   const selectService = subName => {
//     if (selectedService === subName) {
//       setSelectedService(null);
//     } else {
//       setSelectedService(subName);
//       console.log(subName, '$$$$$$$$');
//     }
//   };
//   console.log(selectedService, ')))))))))))))))))');

//   return (
//     <View style={styles.mainBoxStyle1}>
//       <TouchableOpacity
//         onPress={() => setPlatformExpend(!platfromExpend)}
//         activeOpacity={0.6}
//         style={styles.expendButton}>
//         <Text style={styles.mainTitleStyle}>
//           {AppLocalizedStrings.quickAdsHomescreen.The_platform}
//         </Text>
//         <Image
//           source={downArrow}
//           style={{
//             width: scale(24),
//             height: scale(24),
//             tintColor: platfromExpend ? Colors.Primary500 : null,
//             transform: [{rotate: platfromExpend ? '180deg' : '0deg'}],
//           }}
//         />
//       </TouchableOpacity>

//       {platfromExpend && (
//         <View>
//           {socialData?.map((platform, index) => (
//             <View key={index}>
//               <TouchableOpacity
//                 onPress={() => selectPlatform(platform)}
//                 activeOpacity={0.6}
//                 style={styles.platformItem}>
//                 <Image
//                   source={
//                     selectedPlatform.includes(platform?.name)
//                       ? checked
//                       : unChecked
//                   }
//                   style={styles.checkImage}
//                 />
//                 <Image source={platform.image} style={styles.platformImage} />
//                 <Text style={styles.platformName}>{platform?.name}</Text>
//               </TouchableOpacity>
//               {selectedPlatform.includes(platform.name) &&
//                 platform.subName.length > 0 && (
//                   <View style={styles.subNamesContainer}>
//                     {platform.subName.map((subName, subIndex) => (
//                       <TouchableOpacity
//                         key={subIndex}
//                         onPress={() => selectService(subName)}
//                         activeOpacity={0.6}
//                         style={styles.subNameItem}>
//                         <Image
//                           source={
//                             selectedService === subName ? checked : unChecked
//                           }
//                           style={styles.checkImage}
//                         />
//                         <Text style={styles.subNameText}>{subName}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 )}
//             </View>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// export default CreateNewPlatformModel;

// const styles = ScaledSheet.create({
//   mainBoxStyle1: {
//     marginTop: '15@s',
//     borderWidth: 1,
//     borderRadius: '3@s',
//     borderColor: Colors.Neutral300,
//     paddingHorizontal: '10@s',
//   },
//   expendButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: '10@s',
//   },
//   mainTitleStyle: {
//     fontWeight: '600',
//     fontSize: '15@s',
//     color: Colors.Neutral900,
//   },
//   platformItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: '10@s',
//   },
//   checkImage: {
//     width: '24@s',
//     height: '24@s',
//   },
//   platformImage: {
//     width: '26@s',
//     height: '25@s',
//     marginHorizontal: '20@s',
//   },
//   platformName: {
//     fontWeight: '400',
//     fontSize: '14@s',
//     color: Colors.Neutral900,
//   },
//   subNamesContainer: {
//     marginLeft: '50@s',
//   },
//   subNameItem: {
//     paddingVertical: '5@s',
//     flexDirection: 'row',
//   },
//   subNameText: {
//     fontWeight: '400',
//     fontSize: '14@s',
//     color: Colors.Neutral700,
//   },
// });
