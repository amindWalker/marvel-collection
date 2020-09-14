import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
const ComicItem = ({ title, thumbnail, prices }) => {
  const { containerStyles, shadowStyles, imgStyles, titleStyles, priceStyles } = styles
  let pricesId = prices[0]['price']
  let thumbnailUrl = thumbnail.path + '.' + thumbnail.extension
  return(
    <View style={containerStyles}>
      <View style={shadowStyles}>
        <Image 
          source={{uri: thumbnailUrl}}
          style={imgStyles}
           />
      </View>  
      <Text style={titleStyles}>{title}</Text>
      <Text style={priceStyles}>${pricesId}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  priceStyles: {
    color: 'green',
    width: 100,
    fontSize: 13,
    textAlign: 'center'
  },
  containerStyles: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 0,
    marginLeft: 0,
    alignItems: 'center'
  },
  imgStyles: {
    width: 210,
    height: 320,
    resizeMode: 'cover',
    marginBottom: 5
  },
  shadowStyles: {
    shadowColor: '#000',
    shadowOffset: {
      height: 2
    },
    shadowOpacity: .75,
    shadowRadius: 5
  },
  titleStyles: {
    color: '#fff',
    width: 200,
    fontSize: 13,
    textAlign: 'center'
  }
})
export default ComicItem