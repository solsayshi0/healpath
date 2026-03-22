import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export default function AppButton({
  title,
  onPress,
  color = colors.primary,
  textColor = colors.white,
  outline = false,
  style = {},
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: outline ? 'transparent' : color },
        outline && { borderWidth: 2, borderColor: color },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});