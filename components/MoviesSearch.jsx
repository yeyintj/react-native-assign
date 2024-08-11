import { Popcorn, Search } from 'lucide-react-native';
import React, { useContext, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import MoviesContext from './MoviesContext';
import { getRequest } from './Api';

const MoviesSearch = () => {
  const {
    setMovies,
    search,
    setSearch,
    fetchMovieLists} = useContext(MoviesContext)

  const handleSearch = async (text) => {
        setSearch(text);
        if (!text) {
          setTimeout(()=>{
            fetchMovieLists();
          }, 1000)
        } else {
          setTimeout(async () => {
            
            const response = await getRequest(`/3/search/movie?query=${text}&include_adult=false&language=en-US&page=1`)
            // const responJson = await response.json();
            const apiData = response.data.results;
            setMovies(apiData);
          },1000)
          
        }
        
      };

  
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <View style={styles.brand}>
          <Popcorn color="#fa1b1b" size={35} style={{transform: [{ rotate: '45deg' }]}}/>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
            Moveflix
          </Text>
        </View>
        <View style={styles.inputBar}>
          <Search color="#fff" size={25}/>
          <TextInput style={styles.inputBox}
            value={search}
            onChangeText={(text) => handleSearch(text)}
            cursorColor={"#fff"}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MoviesSearch;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    columnGap: 10,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  brand: {
    alignItems: "center", 
    justifyContent: "center",
  },
  inputBar: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: 'center', 
    columnGap: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    width: 230,
  },
  inputBox: {
    flex: 1,
    paddingVertical: 5,
    color: "#fff",
  }
})
