import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getHeroComics } from '../backend'
import { withNavigation } from 'react-navigation'
import Header from '../components/commons/Header'
import ProfileHeader from '../components/CharProfileHeader'
import ProfileDetail from '../components/CharProfileDetail'
import Ionicons from '@expo/vector-icons/Ionicons'
class Profile extends Component {
  state ={
    heroId: '',
    name: '',
    prices: '',
    description: '',
    thumbnail: '',
    wikiUrl: '',
    visible: false
  }
  componentDidMount() {
    const { navigation, getHeroComics } = this.props
    let heroId = navigation.getParam('heroId', 'No ID')
    let name = navigation.getParam('name', 'No name')
    let prices = navigation.getParam('prices', 'No prices')
    let description = navigation.getParam('description', 'No description')
    let thumbnail = navigation.getParam('thumbnail', 'No thumbnail')
    let wiki = navigation.getParam('wiki', 'No wiki')
    let rawUrl = wiki[0]['url']
    let strToRemove = rawUrl.indexOf('?utm_campaign')
    let newUrl = rawUrl.slice(0, strToRemove)
    this.setState({
      heroId,
      name,
      prices,
      description,
      thumbnail,
      wikiUrl: newUrl 
    })
    getHeroComics(heroId)
  }
  renderToast = () => {
    this.setState({
      visible: true
    }, () => {
      setTimeout(() => {
        this.setState({
          visible: false
        })
      }, 1000)

    })
  }
  render() {
    const { navigation, comicData, isComicsLoading, fetchingComicsError } = this.props
    const { heroId, name, description, thumbnail, wikiUrl, visible } = this.state
    const { 
      containerStyles, 
      scrollViewStyles,
      headerInnerStyles, 
      btnStyles, 
      btnWrapperStyles 
    } = styles
    return (
      <View style={containerStyles}>
        <Header>
          <View style={headerInnerStyles}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Home')}
              style={btnWrapperStyles}>
              <Ionicons name="md-arrow-back" size={24} color="#fff" />
              <Text style={btnStyles}></Text>
            </TouchableOpacity>
          </View>
        </Header>
        <ScrollView style={scrollViewStyles}>
          <ProfileHeader name={name} thumbnail={thumbnail} />
          <ProfileDetail
            thumbnail={thumbnail}
            // description={description}
            wikiUrl={wikiUrl}
            comicData={comicData}
            prices={comicData}
            isComicsLoading={isComicsLoading}
            fetchingComicsError={fetchingComicsError}
            visible={visible} renderToast={this.renderToast} />            
        </ScrollView>        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  scrollViewStyles: {
    paddingBottom: 20,
    flex: 1
  },
  btnWrapperStyles: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnStyles: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 4
  },
  headerInnerStyles: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30
  }
})
const mapStateToProps = state => {
  return {
    comicData: state.comicList.data,
    prices: state.comicList.data,
    isComicsLoading: state.comicList.isLoading,
    fetchingComicsError: state.comicList.error
  }
}
export default connect(mapStateToProps, { getHeroComics })(withNavigation(Profile))