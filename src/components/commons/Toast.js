import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const Toast = ({ text }) => {
  const { containerStyles, textStyles } = styles
  return (
    <View style={containerStyles}>
      <Ionicons name="md-checkmark-circle-outline" size={20} color="#fff" />
      <Text style={textStyles}>{text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  containerStyles: {
    height: 125,
    width: '40%',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, .85)',
    position: 'absolute',
    bottom: '50%',
    left: '30%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyles: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 6
  }
})
export default Toast