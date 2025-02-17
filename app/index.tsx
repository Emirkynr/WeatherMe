import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import WeatherIcon from '../components/WeatherIcon';
import { lightTheme, darkTheme } from '../theme';

const apiKey = '';
const defaultCity = 'Istanbul';

export default function Home() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&appid=${apiKey}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getMinMaxTemp = (list, dayIndex) => {
    const dayData = list.slice(dayIndex * 8, (dayIndex + 1) * 8);
    const temps = dayData.map(item => item.main.temp);
    return {
      min: Math.min(...temps),
      max: Math.max(...temps),
    };
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View style={[styles.header, { borderBottomColor: theme.borderColor }]}>
        <TouchableOpacity onPress={fetchWeatherData} style={styles.iconButton}>
          <Ionicons name="refresh" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Weather</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={[styles.content, { borderBottomColor: theme.borderColor }]}>
        {weatherData && (
          <View style={styles.weatherContainer}>
            <WeatherIcon iconCode={weatherData.list[0].weather[0].icon} temperature={weatherData.list[0].main.temp} />
            <Text style={[styles.weatherText, { color: theme.text }]}>
              Current: {weatherData.list[0].main.temp}°C, {weatherData.list[0].weather[0].description}
            </Text>
            <Text style={[styles.weatherText, { color: theme.text }]}>
              Today: {getDayName(weatherData.list[0].dt_txt)} - Min: {getMinMaxTemp(weatherData.list, 0).min}°C, Max: {getMinMaxTemp(weatherData.list, 0).max}°C
            </Text>
            <Text style={[styles.weatherText, { color: theme.text }]}>
              Tomorrow: {getDayName(weatherData.list[8].dt_txt)} - Min: {getMinMaxTemp(weatherData.list, 1).min}°C, Max: {getMinMaxTemp(weatherData.list, 1).max}°C
            </Text>
            <Text style={[styles.weatherText, { color: theme.text }]}>
              Day After Tomorrow: {getDayName(weatherData.list[16].dt_txt)} - Min: {getMinMaxTemp(weatherData.list, 2).min}°C, Max: {getMinMaxTemp(weatherData.list, 2).max}°C
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={fetchWeatherData} style={styles.button}>
        <Text style={{ color: theme.text }}>Fetch Weather Data</Text>
      </TouchableOpacity>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  iconButton: {
    padding: 10,
  },
  title: {
    fontSize: 21,
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  weatherText: {
    fontSize: 18,
    marginVertical: 5,
  },
});