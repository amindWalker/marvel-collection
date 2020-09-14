import { 
  FETCH_COMICS_BEGIN,
  FETCH_COMICS_SUCCESS,
  FETCH_COMICS_ERROR
} from '../backend/fetching'
const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null
}
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_COMICS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FETCH_COMICS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    case FETCH_COMICS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: null
      }
    default: 
      return state
  }
}