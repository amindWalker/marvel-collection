import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ComicList from './ComicList'
import Section from './commons/Section'
import * as WebBrowser from 'expo-web-browser'
import Toast from './commons/Toast'
import React, { Component } from 'react'
const ProfileDetail = ({
  thumbnail,
  description, 
  wikiUrl, 
  comicData, 
  prices,
  isComicsLoading, 
  fetchingComicsError, visible, renderToast }) => {
  const { 
    textBaseStyles, 
    titleSectionStyles,
    infoContainerStyles,
    btnStyles,
    btnInnerStyles,
    btnTextStyles
  } = styles
  if (fetchingComicsError) {
    console.log('Error while fetching ComicList data:', error)
  }
  getDescription = (content) => {
    if(content === '') {
      return <Text style={textBaseStyles}>No data</Text>
    } else {
      return <Text style={textBaseStyles}>{description}</Text>
    }
  }
  let thumbnailUrl = thumbnail.path + '.' + thumbnail.extension
  return (
    <View style={infoContainerStyles}>
      <Section title="LATEST COMICS ADDED TO DATABASE">
        <ComicList data={comicData} data={prices} isLoading={isComicsLoading} />
      </Section>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <TouchableHighlight
          underlayColor="rgba(255, 255, 255, .5)" 
          style={[btnStyles, {marginBottom: 20}]}
          onPress={() => WebBrowser.openBrowserAsync("https://www.google.com/maps/d/embed?mid=1KcvI56c1sT4xhaF6n0Di6jBkGLY&hl=en")}>
          <View style={btnInnerStyles}>
            <Ionicons name="md-locate" size={18} color="#fff" />
            <Text style={[textBaseStyles, btnTextStyles]}>FIND STORES NEARBY</Text>
          </View>
        </TouchableHighlight>
      </View>
      { visible && <Toast text="Saved"/> }
    </View>
  )
}
const styles = StyleSheet.create({
  textBaseStyles: {
    color: '#fff',
  },
  titleStyles: {
    fontSize: 20,
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
    height: 275,
    justifyContent: 'flex-end',
    overflow: 'visible',
    paddingTop: 20,
    paddingBottom: 20
  },
  thumbnailStyles: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
    alignSelf: 'center',
    zIndex: 999
  },
  infoContainerStyles: {
    paddingTop: 15,
    borderTopWidth: 4,
    borderColor: 'rgba(0, 0, 0, .44)',
  },
  btnStyles: {
    backgroundColor: 'rgba(224, 48, 48, .8)',
    padding: 4,
    borderRadius: 15,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 20
  },
  btnInnerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  btnTextStyles: {
    fontSize: 12,
    marginLeft: 4
  }
})
export default ProfileDetail