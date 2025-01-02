import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode,
  style?: ViewStyle
}
export default function CustomSafeAreaView ({ children, style }: Props) {
  return (
    <>
      <View style={[styles.container, style]}>
        <SafeAreaView />
        {children}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: 'red',
  }
})
