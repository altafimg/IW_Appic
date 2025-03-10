import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import MainStack from './src/navigations/MainStack';
import Colors from './src/theme/Colors';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';
import {TranslatorProvider} from 'react-native-translator';
import {store} from './src/redux/store/store';
import {persistor} from './src/redux/store/store';

const App = () => {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TranslatorProvider>
            <SafeAreaView style={{flex: 1}}>
              <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.White}
              />
              <MainStack />
            </SafeAreaView>
          </TranslatorProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
