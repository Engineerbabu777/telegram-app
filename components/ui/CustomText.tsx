import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// import { Container } from './styles';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h4' | 'h5' | 'h6';
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  numberOfLines?: any;
}
const CustomText = ({ children, style, numberOfLines, variant }: Props) => {
  let computedFonSize = RFValue(12)

  switch (variant) {
    case 'h1':
      computedFonSize = RFValue(24)
      break
    case 'h2':
      computedFonSize = RFValue(22)
      break
    case 'h3':
      computedFonSize = RFValue(20)
      break
    case 'h4':
      computedFonSize = RFValue(18)
      break

    case 'h5':
      computedFonSize = RFValue(16)
      break

    case 'h6':
      computedFonSize = RFValue(14)
      break

    default:
      computedFonSize = RFValue(12)
      break
  }

  return (
    <Text
      style={{ fontSize: computedFonSize, ...styles.text, ...style }}
      numberOfLines={numberOfLines ? numberOfLines : undefined}
    >
      {children}
    </Text>
  )
}

export default CustomText

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center'
  }
})
