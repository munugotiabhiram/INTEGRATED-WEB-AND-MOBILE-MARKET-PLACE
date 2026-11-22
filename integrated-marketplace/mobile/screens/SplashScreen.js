import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MobileBackground from '../components/MobileBackground';

const SplashScreen = ({ onGetStarted }) => {
  return (
    <MobileBackground>
      <View style={styles.container}>
        {/* Holographic Glowing 3D Brand Badge */}
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>✦</Text>
        </View>

        <Text style={styles.appName}>NEXUS 3D</Text>
        <Text style={styles.tagline}>INTEGRATED MARKETPLACE</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unified Web &amp; Mobile</Text>
          <Text style={styles.cardDesc}>
            Shared MySQL Database • Synchronized Cart &amp; Orders • Real-Time Order Tracking
          </Text>
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={onGetStarted}>
          <Text style={styles.btnText}>Enter Marketplace ➔</Text>
        </TouchableOpacity>
      </View>
    </MobileBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#00f5d4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#00f5d4',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  logoIcon: {
    fontSize: 40,
    color: '#070314',
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00f5d4',
    letterSpacing: 3,
    marginBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  btnPrimary: {
    backgroundColor: '#00f5d4',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#00f5d4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  btnText: {
    color: '#070314',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default SplashScreen;
