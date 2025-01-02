import CustomSafeAreaView from '@/components/ui/CustomSafeAreaView'
import React from 'react'
import LottieView from 'lottie-react-native'
import { siginStyles } from '@/styles/signinStyles'
import CustomText from '@/components/ui/CustomText'
import { Image, TouchableOpacity } from 'react-native'

export default function SignIn () {
  const handleSignin = async () => {}
  return (
    <CustomSafeAreaView style={siginStyles.container}>
      <LottieView
        autoPlay
        loop
        style={siginStyles.animation}
        source={require('@/assets/animations/telegram.json')}
      />
      <CustomText variant='h3' style={siginStyles.title}>
        Welcome to Telegram
      </CustomText>
      <CustomText style={siginStyles.message}>
        Messages are heavily encrypted and chats are save
      </CustomText>

      <TouchableOpacity style={siginStyles.loginBtn} onPress={handleSignin}>
        <Image
          source={require('@/assets/icons/google.png')}
          style={siginStyles.googleIcon}
        />
        <CustomText style={siginStyles.loginBtnText}>
          Continue With Google
        </CustomText>
      </TouchableOpacity>
    </CustomSafeAreaView>
  )
}
