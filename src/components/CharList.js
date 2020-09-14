import React from 'react'
import { ScrollView, Image, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import HeroCard from './CharCard'
const HeroList = ({ data, isLoading, error }) => {
  const { containerStyles, loadingStyles } = styles
  
  if (isLoading) {
    return (
      <View style={loadingStyles}>
        <ActivityIndicator size="large" color="rgba(255, 255, 255, .5)" />
      </View>
    )
  }
  if (error) {
    console.log('Error while fetching HeroList data:', error)
  }
  const FIXED_ITEM_HEIGHT = 400
      const NUM_COLUMNS = 3
  return (
    <ScrollView style={containerStyles}>
      <FlatList
      getItemLayout = {(data, index) => ({
        length: FIXED_ITEM_HEIGHT,
        offset: FIXED_ITEM_HEIGHT * Math.floor(index / NUM_COLUMNS),
        index
      })}
      windowSize={3}
      initialNumToRender={3}
      updateCellsBatchingPeriod={3} 
      maxToRenderPerBatch={3}
      removeClippedSubviews={true}
        keyExtractor={item => (item.id).toString()}
        data={data}
        renderItem={({ item }) => 
          <HeroCard 
            name={item.name} 
            thumbnail={item.thumbnail}
            // description={item.description}
            wiki={item.urls} 
            heroId={item.id} />
        }
      />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    paddingTop: 180
  },
  loadingStyles: {
    alignSelf: 'center',
    paddingTop: 200
  }
})
export default HeroList