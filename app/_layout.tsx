import { Stack } from "expo-router";
import { useColorScheme, SafeAreaView, StatusBar } from "react-native";
import { lightTheme, darkTheme } from '../theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <Stack
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShown: route.name !== 'index', // Header'ı sadece 'index' sayfasında gizle
        })}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
      </Stack>
    </SafeAreaView>
  );
}