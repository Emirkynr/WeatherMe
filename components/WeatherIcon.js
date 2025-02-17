import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme, darkTheme } from '../theme';

const weatherConditions = {
  '01d': 'Clear Sky (Day)',
  '01n': 'Clear Sky (Night)',
  '02d': 'Few Clouds (Day)',
  '02n': 'Few Clouds (Night)',
  '03d': 'Scattered Clouds',
  '03n': 'Scattered Clouds',
  '04d': 'Broken Clouds',
  '04n': 'Broken Clouds',
  '09d': 'Shower Rain',
  '09n': 'Shower Rain',
  '10d': 'Rain (Day)',
  '10n': 'Rain (Night)',
  '11d': 'Thunderstorm',
  '11n': 'Thunderstorm',
  '13d': 'Snow',
  '13n': 'Snow',
  '50d': 'Mist',
  '50n': 'Mist',
};

const WeatherIcon = ({ iconCode, temperature }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const weatherDescription = weatherConditions[iconCode] || 'Unknown Weather';

  return (
    <LinearGradient
      colors={['#003973', '#000428']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <Text style={[styles.description, { color: theme.text }]}>{weatherDescription}</Text>
        <Text style={[styles.temperature, { color: theme.text }]}>{temperature}°C</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  description: {
    fontSize: 23,
    marginTop: 10,
  },
  temperature: {
    fontSize: 23,
    marginTop: 5,
  },
});

export default WeatherIcon;