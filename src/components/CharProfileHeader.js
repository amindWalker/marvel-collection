import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import ImageOverlay from 'react-native-image-overlay'
const ProfileHeader = ({ name, thumbnail }) => {
  const { 
    textBaseStyles, 
    titleStyles,
    bgImgStyles, 
    thumbnailStyles,
    topInnerStyles,
    shadowStyles
  } = styles
  let thumbnailUrl = thumbnail.path + '.' + thumbnail.extension
  return (
    <ImageOverlay 
        source={require('../assets/marvel_detail_bg.jpg')} 
        containerStyle={bgImgStyles} 
        overlayColor="#000" 
        blurRadius={2}
        overlayAlpha={.55}>
      <View style={topInnerStyles}>
        <View style={shadowStyles}>
          <Image
            source={{uri: thumbnailUrl}}
            style={thumbnailStyles} />
         </View> 
        <Text style={[textBaseStyles, titleStyles]}>{name}</Text>
      </View>  
    </ImageOverlay>
  )
}
const styles = StyleSheet.create({
  textBaseStyles: {
    color: '#fff',
  },
  titleStyles: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center'
  },
  topInnerStyles: {
    flex: 1, 
    width: 250,
    justifyContent: 'center'
  },
  shadowStyles: {
    shadowColor: '#000',
    shadowOffset: {
      height: 2
    },
    shadowOpacity: .75,
    shadowRadius: 5
  },
  bgImgStyles: {
    flex: 1,
    width: '100%',
    height: 325,
    justifyContent: 'flex-end',
    overflow: 'visible',
    paddingTop: 20,
    paddingBottom: 20
  },
  thumbnailStyles: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'rgba(224, 224, 224,0.33)',
    resizeMode: 'cover',
    alignSelf: 'center',
    zIndex: 999
  }
})
export default ProfileHeader
