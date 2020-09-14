import React from 'react'
import { ScrollView, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import ComicItem from './ComicItem'
const ComicList = ({ data, isLoading }) => {
  const { containerStyles, loadingWrapperStyles, loadingBoxStyles } = styles
  if(isLoading) {
    return (
      <View style={loadingWrapperStyles}>
        <View style={[loadingBoxStyles, {marginRight: 1}]}>
          <ActivityIndicator size="large" color="rgba(199, 199, 199, .25)"/>
        </View>
        <View style={[loadingBoxStyles, {marginRight: 0}]}>
          <ActivityIndicator size="large" color="rgba(199, 199, 199, .25)"/>
        </View>
      </View>  
    )
  }
  const FIXED_ITEM_HEIGHT = 330
      const NUM_COLUMNS = 3
  return(
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
        horizontal={true}
        renderItem={({ item }) => 
          <ComicItem 
            title={item.title}
            prices={item.prices}
            thumbnail={item.thumbnail}
            />
        } />
        </ScrollView>
  )
}
const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
  },
  loadingWrapperStyles: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 0
  },
  loadingBoxStyles: {
    width: 220, 
    height: 330, 
    backgroundColor:'rgba(0, 0, 0, .0)',
    justifyContent: 'center'
  }
})
export default ComicList