import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SVG from '../assets/svg';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../theme/Colors';
import ToDoHomeScreen from '../screens/nonAuth/ToDoList/ToDoHomeScreen';
import MainScreen from '../screens/nonAuth/QuickAds/MainScreen';
import {useSelector} from 'react-redux';

const ToDoBottomNavigation = () => {
  const Tab = createBottomTabNavigator();

  const userType = useSelector(
    state => state.loginReducer?.user?.data?.data?.user_role,
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {paddingBottom: 5},
          tabBarLabelStyle: {fontSize: 11},
        }}>
        <Tab.Screen
          name="QuickAds"
          component={MainScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: Colors.Primary500,
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  <SVG.Home
                    color={focused ? Colors.Primary500 : Colors.Neutral500}
                  />
                </View>
              );
            },
          }}
        />
        {(userType === 'influencer' || userType === 'kid_influencer') && (
          <Tab.Screen
            name="To do list"
            component={ToDoHomeScreen}
            options={{
              headerShown: false,
              tabBarActiveTintColor: Colors.Primary500,
              tabBarIcon: ({focused}) => {
                return (
                  <View>
                    <SVG.ToDoList
                      color={focused ? Colors.Primary500 : Colors.Neutral500}
                    />
                  </View>
                );
              },
            }}
          />
        )}
      </Tab.Navigator>
    </View>
  );
};

export default ToDoBottomNavigation;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
