import { 
  FETCH_DATA_SUCCESS, 
  FETCH_DATA_BEGIN, 
  FETCH_DATA_ERROR,
  FILTER_HERO_LIST
 } from '../backend/fetching'
const INITIAL_STATE = {
  initialData: null,
  data: null,
  isLoading: false,
  error: null,
  searchTerm: ''
}
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        initialData: action.payload,
        data: action.payload,
        isLoading: false
      }
    case FETCH_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        initialData: null,
        data: null
      }
    case FILTER_HERO_LIST:
      let term = action.payload.toLowerCase()
      let initialData = state.initialData
      let newData = initialData.filter( hero => hero.name.toLowerCase().includes(term))
      return {
        ...state,
        data: newData,
        searchTerm: action.payload
      }  
    default:
      return state  
  }
}