import { splashStyles } from '@/styles/splashStyles'
import { resetAndNavigate } from '@/utils/LibraryHelpers'
import { useEffect } from 'react'
import { View, Image } from 'react-native'

export default function Main () {
  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate('/(auth)/signin')
    }, 300)
  }, [])

  return (
    <>
      <View style={splashStyles.container}>
        <Image
          source={require('@/assets/images/adaptive-icon.png')}
          style={splashStyles.logo}
        />
      </View>
    </>
  )
}
