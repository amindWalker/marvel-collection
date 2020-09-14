import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
const Section = ({ title, padding, children }) => {
  const { sectionStyles, paddingStyles, titleStyles } = styles
  return (
    <View style={[sectionStyles, padding && paddingStyles]}>
      <Text style={[titleStyles, !padding && paddingStyles]}>{title}</Text>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
  sectionStyles: {
    marginBottom: 15,
  },
  paddingStyles: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleStyles: {
    color: 'rgba(255, 255, 0, .9)',
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center'
  }
})
export default Section