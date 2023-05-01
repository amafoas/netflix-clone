const BASE = 'https://api.themoviedb.org/3'
const API_KEY = '336b28b2aecd07e1e8599f89dd89c64c'

interface objRequests {
  [key: string]: string
}

export const firstRequests: objRequests = {
  trending: `${BASE}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  topRated: `${BASE}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `${BASE}/discover/tv?api_key=${API_KEY}&with_networks=213`
}

interface Genre {
  id: number
  name: string
}
const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
]

function * yieldGenresUrl (genreArr: Genre[]) {
  let index = 0
  while (index < genreArr.length) {
    const { id, name } = genreArr[index++]
    const url = `${BASE}/discover/movie?api_key=${API_KEY}&with_genres=${id}`
    yield { name, url, id }
  }
}

export const getMoviesRequestUrl = yieldGenresUrl(genres)
