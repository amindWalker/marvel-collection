import md5 from 'md5'
import { 
  FETCH_COMICS_SUCCESS,
  FETCH_COMICS_ERROR,
  FETCH_COMICS_BEGIN
 } from './fetching'
export const fetchComicsError = (error) => {
  return {
    type: FETCH_COMICS_ERROR,
    payload: error
  }
}
export const fetchComicsBegin = () => {
  return {
    type: FETCH_COMICS_BEGIN
  }
}
export const fetchComicsSuccess = (data) => {
  return {
    type: FETCH_COMICS_SUCCESS,
    payload: data
  }
}
export const getHeroComics = (heroId) => {
  // Fetch Marvel API
  const PUBLIC_KEY = '171e1910640a20fe5dd9db069ebb5d51'
  const PRIVATE_KEY = '0e82bfd01428234895b37da5f108278344fbd8d1'
  const baseUrl = 'http://gateway.marvel.com/v1/public/characters'
  let ts = new Date().getTime()
  let hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`)
  let requestUrl = `${baseUrl}/${heroId}/comics?orderBy=-modified&limit=6&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}` 
  return (dispatch) => {
    dispatch(fetchComicsBegin()) 
    fetch(requestUrl)
      .then(response => response.json())
      .then(jsonData => dispatch(fetchComicsSuccess(jsonData['data']['results'])))
      .catch(error => dispatch(fetchComicsError(error)))
  }
}
