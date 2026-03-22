import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen    from './screens/WelcomeScreen';
import LoginScreen      from './screens/LoginScreen';
import HomeScreen       from './screens/HomeScreen';
import JournalScreen    from './screens/JournalScreen';
import BreathingScreen  from './screens/BreathingScreen';
import MoodChartScreen  from './screens/MoodChartScreen';
import SobrietyScreen   from './screens/SobrietyScreen';
import RiskTestScreen   from './screens/RiskTestScreen';
import CommunityScreen  from './screens/CommunityScreen';
import CrisisScreen     from './screens/CrisisScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome"    component={WelcomeScreen} />
        <Stack.Screen name="Login"      component={LoginScreen} />
        <Stack.Screen name="Home"       component={HomeScreen} />
        <Stack.Screen name="Journal"    component={JournalScreen} />
        <Stack.Screen name="Breathing"  component={BreathingScreen} />
        <Stack.Screen name="MoodChart"  component={MoodChartScreen} />
        <Stack.Screen name="Sobriety"   component={SobrietyScreen} />
        <Stack.Screen name="RiskTest"   component={RiskTestScreen} />
        <Stack.Screen name="Community"  component={CommunityScreen} />
        <Stack.Screen name="Crisis"     component={CrisisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
