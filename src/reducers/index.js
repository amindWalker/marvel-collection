import { combineReducers } from 'redux'
import HeroListReducer from './HeroListReducer'
import ComicListReducer from './ComicListReducer'
export default combineReducers({
  heroList: HeroListReducer,
  comicList: ComicListReducer
})