import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
const Header = ({children}) => {
  const { headerStyles } = styles
  let { height } = Dimensions.get('window')
  renderHeaderStyles = (height) => {
    if (height > 780) {
      // if the device is iPhone X
      return [headerStyles, { paddingTop: 40 }]
    } else {
      return [headerStyles, { paddingTop: 25 }]
    }
  }
  return (
    <View style={this.renderHeaderStyles(height)}>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
  headerStyles: {
    flexDirection: 'row',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: 'rgb(224, 48, 48)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: .35,
    shadowRadius: 2,
  }
})
export default Header