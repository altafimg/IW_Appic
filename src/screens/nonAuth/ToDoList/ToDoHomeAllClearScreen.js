// import React, {useState} from 'react';
// import {Image, Text, TouchableOpacity, View} from 'react-native';
// import SVG from '../../../assets/svg';
// import {ScaledSheet} from 'react-native-size-matters';
// import Colors from '../../../theme/Colors';
// import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
// import {useNavigation} from '@react-navigation/native';
// import UpcomingComponent from '../../../components/nonAuth/toDoList/FinishedComponent';
// import FinishedComponent from '../../../components/nonAuth/toDoList/UpcomingComponent';

// const ToDoHomeAllClearScreen = () => {
//   const [dataFound, setDataFound] = useState(true);
//   const navigation = useNavigation('');
//   const onCompleteJobHandler = () => {
//     navigation.navigate('JobDetailsScreen');
//   };
//   return (
//     <View style={styles.container}>
//       {dataFound ? (
//         <View>
//           <View style={styles.headerTitleView}>
//             <Text style={styles.dateTitle}>Monday 26 August 2022</Text>
//             <Text style={styles.dateTitle}>Today</Text>
//           </View>
//           <View style={styles.cardView}>
//             <View style={styles.cradImageView}>
//               <Image
//                 source={require('../../../assets/images/rr.png')}
//                 style={styles.image}
//               />
//               <View style={styles.cardTitleView}>
//                 <Text style={styles.cardHeaderTitle}>Epic Games</Text>
//                 <Text style={styles.cardHeaderSubTitle}>
//                   We have a new annual bundle that we’d like you to promote
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.barMainView}>
//               <View style={styles.barStyle}></View>
//               <View style={styles.barBottomView}>
//                 <Text style={styles.accepTitle}>Accepted</Text>
//                 <Text style={styles.waitingTitle}>
//                   Waiting for you to complete
//                 </Text>
//                 <Text style={styles.accepTitle}>Get Paid</Text>
//               </View>
//             </View>
//             <View>
//               <TouchableOpacity
//                 onPress={onCompleteJobHandler}
//                 style={styles.button}>
//                 <Text style={styles.buttonTitle}>Complete this job</Text>
//                 <Text style={styles.buttonSubTitle}>Due in 2 days</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.containerSec}>
//           <SVG.DontHaveID />
//           <View style={styles.titleView}>
//             <Text style={styles.text1}>All clear</Text>
//             <Text style={styles.text2}>Just checked There’s nothing here</Text>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default ToDoHomeAllClearScreen;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: wp(4),
//   },
//   containerSec: {
//     flex: 1,
//     marginBottom: hp(10),
//     paddingHorizontal: wp(4),
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   allClearView: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   titleView: {
//     marginTop: hp(4),
//   },
//   text1: {
//     color: Colors.Neutral900,
//     fontWeight: '600',
//     fontSize: '23@s',
//     lineHeight: 27,
//     marginVertical: hp(1),
//     textAlign: 'center',
//   },
//   text2: {
//     color: Colors.Neutral700,
//     fontWeight: '400',
//     fontSize: '13@s',
//     lineHeight: 18,
//   },
//   headerTitleView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: hp(2),
//     paddingBottom: hp(1),
//   },
//   dateTitle: {
//     color: Colors.Neutral500,
//     fontSize: '13@s',
//     fontWeight: '500',
//   },
//   cardView: {
//     borderWidth: 1,
//     borderColor: Colors.Neutral200,
//     borderRadius: 5,
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(2),
//     marginVertical: hp(2),
//   },
//   cradImageView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     borderBottomWidth: 1,
//     borderColor: Colors.Neutral200,
//     paddingBottom: hp(2),
//   },
//   image: {
//     width: '60@s',
//     height: '60@s',
//   },
//   cardTitleView: {
//     width: '60%',
//     marginHorizontal: wp(5),
//   },
//   cardHeaderTitle: {
//     color: Colors.Neutral800,
//     fontSize: '15@s',
//     fontWeight: '600',
//     lineHeight: '24@s',
//   },
//   cardHeaderSubTitle: {
//     color: Colors.Neutral500,
//     fontSize: '13@s',
//     fontWeight: '400',
//     lineHeight: '18@s',
//   },
//   barMainView: {
//     borderBottomWidth: 1,
//     borderColor: Colors.Neutral200,
//   },
//   barStyle: {
//     backgroundColor: Colors.Primary500,
//     borderRadius: 50,
//     width: '100%',
//     height: '9@s',
//     marginTop: hp(2),
//   },
//   barBottomView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: hp(1),
//   },
//   accepTitle: {
//     color: Colors.Neutral700,
//     fontSize: '10@s',
//     fontWeight: '400',
//     lineHeight: '20@s',
//   },
//   waitingTitle: {
//     color: Colors.Neutral900,
//     fontSize: '10@s',
//     fontWeight: '700',
//     lineHeight: '20@s',
//   },
//   button: {
//     backgroundColor: Colors.Primary500,
//     height: hp(6.5),
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginTop: hp(2),
//   },
//   buttonTitle: {
//     color: Colors.White,
//     textAlign: 'center',
//     fontSize: '14@s',
//     fontWeight: '600',
//   },
//   buttonSubTitle: {
//     color: Colors.White,
//     textAlign: 'center',
//     fontSize: '11@s',
//     fontWeight: '400',
//     paddingTop: hp(0.2),
//   },
// });
