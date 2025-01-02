import { Colors } from '@/utils/Constants'
import { StyleSheet, ViewStyle } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
    flex: 1,
    backgroundColor: Colors.secondary,
  }
})
