import { StatusBar } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Colors } from '@/utils/Constants'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'


SplashScreen.preventAutoHideAsync();

export default function RootLayout () {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.tertiary}
        translucent
      />

      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='(auth)' />
      </Stack>
    </>
  )
}
