import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, SafeAreaView, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppButton from '../components/AppButton';
import { colors, fonts } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#1a0a2e', '#2d1b4e', '#1a0a2e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.inner}>

        {/* Logo animado */}
        <Animated.View style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}>
          {/* Cerebro simplificado con SVG-like shapes */}
          <View style={styles.brainCircle}>
            <Text style={styles.brainEmoji}>🧠</Text>
            {/* Línea de latido */}
            <View style={styles.heartlineContainer}>
              <View style={styles.heartlinePart} />
              <View style={styles.heartlinePeak} />
              <View style={styles.heartlinePart} />
            </View>
          </View>
        </Animated.View>

        {/* Nombre de la app */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.appName}>HealPath</Text>
          <Text style={styles.slogan}>Tu espacio seguro para sanar</Text>
        </Animated.View>

        {/* Botones */}
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
          <AppButton
            title="Iniciar Sesión"
            onPress={() => navigation.navigate('Login', { mode: 'login' })}
            color={colors.primary}
            style={{ width: width * 0.8 }}
          />
          <AppButton
            title="Registrarse"
            onPress={() => navigation.navigate('Login', { mode: 'register' })}
            outline
            color={colors.accent}
            textColor={colors.accent}
            style={{ width: width * 0.8 }}
          />
        </Animated.View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  brainCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  brainEmoji: {
    fontSize: 48,
  },
  heartlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 16,
    gap: 2,
  },
  heartlinePart: {
    width: 24,
    height: 2,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  heartlinePeak: {
    width: 16,
    height: 14,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: colors.accent,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  appName: {
    fontSize: 48,
    fontFamily: fonts.title,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  slogan: {
    fontSize: 18,
    color: colors.accent,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    gap: 4,
  },
});