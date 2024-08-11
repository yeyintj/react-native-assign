import React, { Component, createContext, useEffect, useRef,useState } from 'react'
import { Text, View } from 'react-native'
import MoviesContext from './MoviesContext';
import MoviesList from './MoviesList';
import MoviesSearch from './MoviesSearch';
import { getRequest } from "./Api";

export default function MoviesApp() {
    const data = [1,2,3,4,5,6,7,8,9,10]
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(1);
    const numRef = useRef(1);

    const fetchMovieLists = async () => {
      const response = await getRequest('/3/movie/now_playing?language=en-US&page=1');
      // const responJson = await response.json();
  
      setMovies(response.data.results);
    };

    useEffect(() => {
      fetchMovieLists();
    }, []);
    return (
      <MoviesContext.Provider value={{movies, setMovies, search, setSearch, isRefreshing, setIsRefreshing, fetchMovieLists, numRef}}>
        <MoviesSearch />
        <MoviesList />
      </MoviesContext.Provider>
    )
}
