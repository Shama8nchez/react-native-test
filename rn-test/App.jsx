import React from 'react';

import { Provider } from 'react-redux';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { store } from './store/store';
import { Home } from './components/screens/home';

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Home />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}
