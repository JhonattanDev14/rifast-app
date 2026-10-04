
import '../../global.css';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <AnimatedSplashOverlay />

            <Stack
                screenOptions={{
                    animation: 'fade',
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="talonario/[id]"
                    options={{
                        title: 'Talonario',
                    }}
                />

                <Stack.Screen
                    name="talonario/stats/[id]"
                    options={{
                        title: 'Estadísticas',
                    }}
                />
            </Stack>

            <Toast />
        </ThemeProvider>
    );
}


