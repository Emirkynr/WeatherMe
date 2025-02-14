import { Link } from "expo-router";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../theme';

export default function Footer() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.footer, { backgroundColor: theme.footerBackground, borderTopColor: theme.borderColor }]}>
      <Link href="/" style={styles.icon}>
        <Ionicons name="home" size={24} color={theme.footerIcon} />
      </Link>
      <Link href="/settings" style={styles.icon}>
        <Ionicons name="settings" size={24} color={theme.footerIcon} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
  },
  icon: {
    alignItems: 'center',
  },
});