import md5 from 'md5'
import _ from 'lodash'
import { 
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  FETCH_DATA_BEGIN,
  FILTER_HERO_LIST
 } from './fetching'
export const fetchDataError = (error) => {
  return {
    type: FETCH_DATA_ERROR,
    payload: error
  }
}
export const fetchDataBegin = () => {
  return {
    type: FETCH_DATA_BEGIN
  }
}
export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  }
}
export const getAllHeroes = () => {
  const PUBLIC_KEY = '171e1910640a20fe5dd9db069ebb5d51'
  const PRIVATE_KEY = '0e82bfd01428234895b37da5f108278344fbd8d1'
  const baseUrl = 'http://gateway.marvel.com/v1/public'
  let ts = new Date().getTime()
  let hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`)
  let requestUrl = `${baseUrl}/characters?orderBy=-modified&offset=0&limit=33&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}` 
  return (dispatch) => {
    dispatch(fetchDataBegin()) 
    fetch(requestUrl)
      .then(response => response.json())
      .then(jsonData => {
        let rawData = jsonData['data']['results']
        let filteredData = _.filter(rawData, (o) => {
          let imgName = o['thumbnail']['path']
          return imgName.indexOf('image_not_available') === -1 && imgName.indexOf('4c002e0305708') === -1
        })
        dispatch(fetchDataSuccess(filteredData))
      })
      .catch(error => dispatch(fetchDataError(error)))
  }

}
export const filterHeroList = (term) => {
  return {
    type: FILTER_HERO_LIST,
    payload: term
  }
}