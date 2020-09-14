import React from 'react'
import { View, StyleSheet, TextInput, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const SearchBar = ({ onChangeText, value }) => {
  const { inputStyles, iconStyles } = styles
  return (
    <View style={{flex: 1, height: 40}}>
      <Ionicons name="md-flash" size={30} color="rgba(0,0,0,.15)" style={iconStyles} />
      <TextInput 
        underlineColorAndroid='transparent'
        style={inputStyles}
        placeholder="Find comics"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  inputStyles: {
    height: 50,
    borderBottomWidth: 0,
    backgroundColor: 'rgba(0,0,0,.15)',
    borderRadius: 40,
    paddingLeft: 35,
    paddingRight: 10,
    flex: 1
  },
  iconStyles: {
    position: 'absolute',
    top: 6,
    left: 15
  }
})
export default SearchBar