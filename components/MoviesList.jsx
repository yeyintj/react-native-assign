import { Heart, Star } from "lucide-react-native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import filter from "lodash.filter";
import { Popcorn } from "lucide-react-native";
import MoviesContext from "./MoviesContext";
import { getRequest } from "./Api";

export default function MoviesList() {
  const {
    movies,
    setMovies,
    numRef
  } = useContext(MoviesContext);
  //https://image.tmdb.org/t/p/w500/


  const handleRefresh = () => {
    numRef.current = numRef.current + 1;
    setTimeout(async () => {
      const response = await getRequest(`/3/movie/now_playing?language=en-US&page=${numRef.current}`)
    //   const responJson = await response.json();
      const apiData = response.data.results;
      setMovies([...movies, ...apiData]);

      // console.log("Refreshing Api: ", movies);
    }, 1000);

    // setIsRefreshing(isRefreshing+1);
  };
  

  // const handleQuary= (text)=>{
  //     setSearch(text)
  //     // const formatedQuary = text.toLowerCase();
  //     const filteredData = searchQuary.filter((list) =>{
  //         return list.title.replace(' ','').toLowerCase().includes(text.toLowerCase())
  //     });
  //     setMovies(filteredData)

  // );
  // setMovies(filteredData);
  // console.log("Filter Data", filteredData)
  // }

//   console.log("Api Text", numRef.current);
    console.log("Movie List: ", movies)
  // console.log("Search: ", search)
  // value={search} onChangeText={(text) => handleQuary(text)}

  return (
    <View style={{ flex: 1, width: '100%',marginTop: 20}}>

      <FlatList
        data={movies}
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={styles.card}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                }}
                style={styles.cardImage}
              />

              <View>
                <Text
                  style={styles.cardTitle}
                >
                  {item.title}
                </Text>
                <Text style={styles.cardOverview}>
                  {item.overview}
                </Text>

                <View>
                  <View style={styles.footerContainer}>
                    <View style={styles.cardFooter}>
                      <Heart color="#fa1b1b" size={20} fill="red" />
                      <Text style={styles.cardFooter_popularity}>
                        {item.popularity}
                      </Text>
                    </View>
                    <View style={styles.cardFooter}>
                      <Star color="#bed60b" size={20} fill="yellow" />
                      <Text style={styles.cardFooter_voteAverage}>
                        {item.vote_average}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.cardFooter_releaseDate}>
                    Release Date: {item.release_date}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        onEndReached={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        // backgroundColor: "#c1ccb6",
        borderWidth: 1,
        borderColor: "#deddd5",
        marginVertical: 10,
        marginHorizontal: 35,
        borderRadius: 10,
    },
    cardImage: {
        width: 200,
        height: 250, 
        borderRadius: 10
    },
    cardTitle: {
        color: "#333",
        fontSize: 20,
        fontWeight: "700",
        marginHorizontal: "auto",
        marginTop: 5,
    },
    cardOverview: { 
        color: "#333", 
        fontSize: 13,
        textAlign: 'center' 
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        width: "100%",
      },
    cardFooter: {
        flexDirection: "row", 
        alignItems: "center" 
    },
    cardFooter_popularity: {
        color: "#333",
        marginStart: 10,                  
        fontWeight: "700",
    },
    cardFooter_voteAverage: {
        color: "#333",
        marginStart: 10,     
        fontWeight: "700",
    },
    cardFooter_releaseDate: {
        color: "#333", 
        fontWeight: "bold" 
    }
})
