import React from 'react';
import { Audio } from 'expo-av'
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import rootReducer from './src/reducers'
import HomeScreen from './src/navigation/Home'
import ProfileScreen from './src/navigation/CharProfile'
const AppNavigator = createAppContainer(createStackNavigator(
  {
    Home: {screen:HomeScreen},
    Profile: {screen:ProfileScreen}
  },
  {
    headerMode: 'none'
  }
))
class App extends React.Component {
  async componentWillMount() {
  this.backgroundMusic = new Audio.Sound();
  try {
    await this.backgroundMusic.loadAsync(
      require("./src/assets/MarvelInfinityThemes.mp3")
    );
    await this.backgroundMusic.setIsLoopingAsync(true);
    await this.backgroundMusic.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  }
}
  render() {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    const { containerStyles } = styles
    return (
      <Provider store={store}>
        <View style={containerStyles} >
          <StatusBar barStyle="light-content" />
         <AppNavigator />
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  containerStyles: {
    flex: 1
  }
});
export default App
