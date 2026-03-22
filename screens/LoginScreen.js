import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, SafeAreaView,
  TouchableOpacity, KeyboardAvoidingView, Platform,
  ScrollView, ActivityIndicator, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import AppButton from '../components/AppButton';
import { colors, fonts } from '../constants/theme';

export default function LoginScreen({ navigation, route }) {
  const initialMode = route?.params?.mode || 'login';
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor llena todos los campos.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'register') {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        // Crear perfil en Firestore
        await setDoc(doc(db, 'users', userCred.user.uid), {
          email: userCred.user.email,
          createdAt: new Date(),
          sobrietyStart: null,
        });
        Alert.alert('¡Bienvenido/a!', 'Tu cuenta fue creada exitosamente.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigation.replace('Home');
    } catch (error) {
      let mensaje = 'Ocurrió un error. Intenta de nuevo.';
      if (error.code === 'auth/user-not-found')    mensaje = 'No existe una cuenta con ese correo.';
      if (error.code === 'auth/wrong-password')     mensaje = 'Contraseña incorrecta.';
      if (error.code === 'auth/email-already-in-use') mensaje = 'Ese correo ya está registrado.';
      if (error.code === 'auth/weak-password')      mensaje = 'La contraseña debe tener al menos 6 caracteres.';
      if (error.code === 'auth/invalid-email')      mensaje = 'El correo no es válido.';
      Alert.alert('Error', mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1a0a2e', '#2d1b4e', '#1a0a2e']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.inner}>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.brainCircle}>
                <Text style={styles.brainEmoji}>🧠</Text>
              </View>
              <Text style={styles.appName}>HealPath</Text>
            </View>

            {/* Título */}
            <Text style={styles.title}>
              {mode === 'login' ? 'Bienvenida de vuelta' : 'Crea tu cuenta'}
            </Text>

            {/* Campos */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Botón principal */}
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 16 }} />
            ) : (
              <AppButton
                title={mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                onPress={handleAuth}
                color={colors.primary}
                style={{ width: '100%' }}
              />
            )}

            {/* Cambiar modo */}
            <TouchableOpacity
              onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={styles.switchButton}
            >
              <Text style={styles.switchText}>
                {mode === 'login'
                  ? '¿No tienes cuenta? Regístrate'
                  : '¿Ya tienes cuenta? Inicia sesión'}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
    gap: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  brainCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainEmoji: {
    fontSize: 36,
  },
  appName: {
    fontSize: 28,
    fontFamily: fonts.title,
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    fontFamily: fonts.title,
    textAlign: 'center',
    marginBottom: 8,
  },
  formContainer: {
    width: '100%',
    gap: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: colors.white,
    fontSize: 16,
    width: '100%',
  },
  switchButton: {
    marginTop: 8,
    padding: 8,
  },
  switchText: {
    color: colors.accent,
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});