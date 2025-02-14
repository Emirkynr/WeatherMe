import { Link } from "expo-router";
import { View, Text, StyleSheet, useColorScheme, SafeAreaView, StatusBar } from "react-native";
import Footer from "../../components/Footer";
import { lightTheme, darkTheme } from '../../theme';

export default function Settings() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View style={[styles.content, { borderBottomColor: theme.borderColor }]}>
        <Text style={{ color: theme.text }}>Settings Page</Text>
        <Link href="/" style={{ color: theme.text }}>Go to Home</Link>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
});
