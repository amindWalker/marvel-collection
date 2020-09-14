import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import ImageOverlay from 'react-native-image-overlay'
import { connect } from 'react-redux'
import { getAllHeroes, filterHeroList } from '../backend'
import Header from '../components/commons/Header'
import HeroList from '../components/CharList'
import SearchBar from '../components/SearchBar'
import AppDescription from './AppDescription'
class Home extends Component {
  componentDidMount() {
    this.props.getAllHeroes()
  }
  render() {
    const { data, isLoading, error, filterHeroList, searchTerm } = this.props
    const { containerStyles, logoStyles } = styles
    return (
      <View style={containerStyles}>
    <ImageBackground source={require("../assets/comics_bg.jpg")} style={styles.backgroundImage}>
        <Header>
          <SearchBar onChangeText={filterHeroList} value={searchTerm} />
        </Header>
        <ImageOverlay
          source={require('../assets/MarvelHeroes.png')}
         containerStyle={logoStyles} 
         overlayColor="#000" 
         overlayAlpha={0}
         contentPosition={'bottom'}
         rounded={0}/>                
        <HeroList data={data} isLoading={isLoading} error={error} searchTerm={searchTerm}
          />
        </ImageBackground>
        <View  style={styles.appDescription}>
        <AppDescription/>
      </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  logoStyles: {
    zIndex: 999,
    width: '100%',
    height: 180,
    marginTop: 90,
    position: 'absolute',
  },
  backgroundImage:{
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 1,
    alignSelf: "flex-start",

  },
  containerStyles: {
    flex: 1,
    backgroundColor: '#fff',
  }
})
const mapStateToProps = state => {
  return {
    data: state.heroList.data,
    isLoading: state.heroList.isLoading,
    error: state.heroList.error,
    searchTerm: state.heroList.searchTerm
  }
}
export default connect(mapStateToProps, { getAllHeroes, filterHeroList })(Home)