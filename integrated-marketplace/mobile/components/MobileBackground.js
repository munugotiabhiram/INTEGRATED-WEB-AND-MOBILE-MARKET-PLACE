import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MobileBackground = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* 3D-Themed Glowing Orbs in Background */}
      <View style={styles.glowCyan} />
      <View style={styles.glowMagenta} />
      <View style={styles.glowPurple} />

      {/* Main Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070314',
    position: 'relative',
    overflow: 'hidden',
  },
  glowCyan: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: 'rgba(0, 245, 212, 0.12)',
  },
  glowMagenta: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: 'rgba(255, 0, 127, 0.12)',
  },
  glowPurple: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: 'rgba(121, 40, 202, 0.15)',
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
});

export default MobileBackground;
