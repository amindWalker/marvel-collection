import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import ImageOverlay from 'react-native-image-overlay'
import { withNavigation } from 'react-navigation'
class HeroCard extends Component {
  render() {
    const { name, thumbnail, navigation, heroId, description, wiki } = this.props
    const { cardStyles, imgStyles, titleStyles, heroIdStyles } = styles
    let thumbnailUrl = thumbnail.path + '.' + thumbnail.extension
    return (
      <TouchableHighlight
      activeOpacity={.75} 
      underlayColor={'transparent'}
        onPress={() => navigation.navigate('Profile', { heroId, name, description, thumbnail, wiki })}>
        <View style={cardStyles}>
          <ImageOverlay 
            source={{ uri: thumbnailUrl }} 
            containerStyle={imgStyles} 
            overlayColor="#000" 
            overlayAlpha={0.20}
            rounded={0}>
          <Text style={heroIdStyles}>HeroID: {heroId}</Text>
          </ImageOverlay>
          <Text style={titleStyles}>{name.toUpperCase()}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  heroIdStyles: {
    flex: 1,
    color:'rgba(255,255,255,0.75)',
    fontSize: 12,
    width: '85%',
    textAlign: 'left',
    textAlignVertical: 'bottom'
  },
  cardStyles: {
    marginBottom: 180,
    marginLeft: 40,
    marginRight: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: .75,
    shadowRadius: 8,
  },
  imgStyles: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    height: 400,
    paddingLeft: 10,
    paddingBottom: 5,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: 'rgba(0,0,0, 0.35)',
  },
  titleStyles: {
    fontFamily: 'sans-serif-condensed',
    flex: 1,
    color:'rgba(255,255,255,0.75)',
    fontSize: 30,
    fontWeight: 'bold',
    width: '90%',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'bottom'
  }
});
export default withNavigation(HeroCard)