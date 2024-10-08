import { Heart, Star,ArrowLeft, Home, User, ListMusic } from "lucide-react-native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import filter from "lodash.filter";
import MoviesContext from "./MoviesContext";
import { getRequest } from "./Api";
import { Popcorn, Search } from 'lucide-react-native';
import { useQuery } from "@tanstack/react-query";



export default function MoviesList({ navigation}) {
  const {
    theme,
    movies,
    setMovies,
    search,
    setSearch,
    numRef,
    nowPlaying,
    setNowPlaying,
    popular,
    setPopular,
    topRate,
    setTopRate,
    upComing,
    setUpComing,
    setIsLoding,
    animatedLoding,
  } = useContext(MoviesContext);
  //https://image.tmdb.org/t/p/w500/

  console.log("Popular: ", popular.length);
  
  const fetchNowPlaying = useQuery({
    
    queryKey: ['nowPlaying'],
    queryFn: async () => {
        const responseNowPlaying = await getRequest(
          "/3/movie/now_playing?language=en-US&page=1"
        );
        const apiData = responseNowPlaying.data.results;
        setNowPlaying(apiData);
        return apiData;
      },
      staleTime: 2000,
    }
  )

  
  const fetchPopular = useQuery({
    queryKey: ['popular'],
    queryFn: async () => {
          const responsePopular = await getRequest('/3/movie/popular?language=en-US&page=1');
          const popularData = responsePopular.data.results;
          setPopular(popularData);
          return popularData;
        },
        staleTime: 2000, 
      })

  const fetchTopRated =  useQuery({
        queryKey: ['topRate'],
        queryFn: async () => {
              const responsePopular = await getRequest('/3/movie/top_rated?language=en-US&page=1');
              const apiData = responsePopular.data.results;
              setTopRate(apiData);
              return apiData;
            },
            staleTime: 2000,
            // refetchInterval: 10000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
            // refetchOnReconnect: true,
          })

  const fetchUpComing = useQuery({
            queryKey: ['upComing'],
            queryFn: async () => {
                  const responsePopular = await getRequest('/3/movie/upcoming?language=en-US&page=1');
                  const apiData = responsePopular.data.results;
                  setUpComing(apiData);
                  return apiData;
                },
                staleTime: 2000,
              })


  const paginationNowPlaying = () => {
    numRef.current = numRef.current + 1;
    setTimeout(async () => {
      const response = await getRequest(
        `/3/movie/now_playing?language=en-US&page=${numRef.current}`
      );
      const apiData = response.data.results;
      // setMovies([...movies, ...apiData]);
      setNowPlaying([...nowPlaying, ...apiData]);
    }, 1000);

  };
  
  const paginationPopular = () => {
    numRef.current = numRef.current + 1;
    setTimeout( async () =>  {
      const response = await getRequest(`/3/movie/popular?language=en-US&page=${numRef.current}`);
      const apiData = response.data.results;
      setPopular([...popular, ...apiData])
    })
  }

  const paginationTopRate = () => {
    numRef.current = numRef.current + 1;
    setTimeout( async () => {
      const response = await getRequest(`/3/movie/top_rated?language=en-US&page=${numRef.current}`);
      const apiData = response.data.results;
      setTopRate([...topRate, ...apiData]);
    }, 1000);
  }

  const paginationUpComing = () => {
    numRef.current = numRef.current + 1;
    setTimeout( async () => {
      const response = await getRequest(`/3/movie/upcoming?language=en-US&page=${numRef.current}`);
      const apiData = response.data.results;
      setUpComing([...upComing, ...apiData]);
    }, 1000);
  }

  const handleSearch = async (text) => {
    setSearch(text);
    if (text=='') {
      setTimeout(() => {

        setNowPlaying(fetchNowPlaying.data);
        setPopular(fetchPopular.data);
        setTopRate(fetchTopRated.data);
        setUpComing(fetchUpComing.data);
      }, 2000);
    } else {
      setTimeout(async () => {
        const responseNowPlaying = await getRequest(
          `/3/search/movie?query=${text}&include_adult=false&language=en-US&page=1`
        );
        const nowPlayingData = responseNowPlaying.data.results;
        setNowPlaying(nowPlayingData);

        const responsePopular = await getRequest(
          `/3/search/movie?query=${text}&include_adult=false&language=en-US&page=2`
        );
        const popularData = responsePopular.data.results;
        setPopular(popularData);

        const responseTopRate = await getRequest(
          `/3/search/movie?query=${text}&include_adult=false&language=en-US&page=3`
        );
        const topRateData = responseTopRate.data.results;
        setTopRate(topRateData);

        const responseUpComing = await getRequest(
          `/3/search/movie?query=${text}&include_adult=false&language=en-US&page=4`
        );
        const upComingData = responseUpComing.data.results;
        setUpComing(upComingData);
      }, 1000);
    }
  };


  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fa1b1b',
      width: '100%',
      paddingTop: 50,
      paddingBottom: 20,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
      columnGap: 10,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: theme?"#fff":'#000',
      borderRadius: 10,
    },
    inputBox: {
      flex: 1,
      paddingVertical: 5,
      color: theme?"#fff":'#000',
    },
    
    cardContainer: {
      flex: 1,
      paddingVertical: 15,
      paddingLeft: 20,
      borderRadius: 10,
      // backgroundColor: 'red'
    },
    card: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderWidth: 1,
      borderColor: theme?"#deddd5":'#000',
      borderRadius: 10,
      rowGap: 10,
      marginEnd: 10,
      width: 120,
      
    },
    cardImage: {
      width: 100,
      height: 150,
      borderRadius: 10,
    },
    // cardTitle: {
    //   color: theme?"#fff":'#000',
    //   fontSize: 20,
    //   fontWeight: "700",
    //   marginHorizontal: "auto",
    //   marginTop: 5,
    // },
    // cardOverview: {
    //   color: "#fff",
    //   fontSize: 13,
    //   textAlign: "center",
    //   letterSpacing: 1,
    //   lineHeight: 20,
    // },
    // footerContainer: {
    //   alignItems: "center",
    //   justifyContent: "space-between",
    //   marginLeft: 10,
    //   width: "100%",
    // },
    // cardFooter: {
    //   flexDirection: "row",
    //   alignItems: "center",
    // },
    // cardFooter_popularity: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   color: "#fff",
    //   marginStart: 2,
    //   fontWeight: "700",
    //   fontSize: 8
    // },
    // cardFooter_voteAverage: {
    //   color: theme?"#fff":'#000',
    //   marginStart: 2,
    //   fontWeight: "700",
    //   fontSize: 8
    // },
    // cardFooter_releaseDate: {
    //   color: theme?"#fff":'#000',
    //   fontWeight: "bold",
    //   fontSize: 8
    // },
    bottomTapNagivator: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // borderWidth: 1,
      // borderTopColor: '#deddd5',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    }
  });

  // console.log("Up Coming: ", upComing);

  return (
          <>
            {fetchNowPlaying.isLoading? animatedLoding(): 
            
              <View style={{ flex: 1, backgroundColor: theme?'#000':'#fff'}}>
                <View style={styles.header}>
                  {/* <Pressable style={{alignItems: 'center'}} onPress={() => navigation.navigate('Home')}>
                    <ArrowLeft color='#fff' size={25}/>
                  </Pressable>
                  <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
                  <Text style={{opacity: 0}}>title</Text> */}
                </View>
                <View style={styles.searchContainer}>
                  <View style={styles.brand}>
                    <Pressable onPress={() => navigation.navigate('Home')}>
                      <Popcorn
                        color="#fa1b1b"
                        size={35}
                        style={{ transform: [{ rotate: "45deg" }] }}
                      />
                    </Pressable>
                    <Text style={{ color: theme?"#fff":'#000', fontSize: 18, fontWeight: 'bold' }}>
                      Movieflix
                    </Text>
                  </View>
                  <View style={styles.inputBar}>
                    <Search color={theme?"#fff":'#000'} size={25} />
                    <TextInput
                      style={styles.inputBox}
                      value={search}
                      onChangeText={(text) => handleSearch(text)}
                      cursorColor={theme?"#fff":'#000'}
                    />
                  </View>
                </View>

                {/* <FlatList
                  data={movies}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={index} style={styles.card}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                          }}
                          style={styles.cardImage}
                        />

                        <View>
                          <Text style={styles.cardTitle}>{item.title}</Text>
                          <Text style={styles.cardOverview}>{item.overview}</Text>

                          <View>
                            <View style={styles.footerContainer}>
                              <View style={styles.cardFooter}>
                                <Heart color="#fa1b1b" size={17} fill="red" />
                                <Text style={styles.cardFooter_popularity}>
                                  {item.popularity}
                                </Text>
                              </View>
                              <View style={styles.cardFooter}>
                                <Star color="#bed60b" size={17} fill="yellow" />
                                <Text style={styles.cardFooter_voteAverage}>
                                  {item.vote_average}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.footerContainer}>
                              <Text style={styles.cardFooter_releaseDate}>
                                Release Date: {item.release_date}
                              </Text>
                              <Pressable
                                onPress={() => navigation.navigate("Movie Details", {Id: item.id})}
                              >
                                <Text
                                  style={{
                                    color: "#fff",
                                    fontSize: 15,
                                    fontWeight: "700",
                                    borderWidth: 2,
                                    borderColor: "#fa1b1b",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 10,
                                  }}
                                >
                                  See Details
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  onEndReached={handleRefresh}
                /> */}
                <ScrollView>
                    <Text style={{color: theme?'#fff':'#000', fontSize: 15, fontWeight: 'bold', marginLeft: 20, paddingTop: 30}}>Now Playing</Text>
                  
                    <View style={styles.cardContainer}>
                      <FlatList horizontal data={nowPlaying} renderItem={({item, index}) => {
                        return(
                          <Pressable style={styles.card} onPress={() => navigation.navigate("Movie Details", {Id: item.id, title: item.title})}>
                            <Image
                                source={{
                                  uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                                }}
                                style={styles.cardImage}
                              />
                            <Text style={{color: theme?'#fff':'#000', fontSize: 8, fontWeight: 'bold', textAlign: 'center'}}>{item.title}</Text>
                          </Pressable>
                        )
                      }}
                      keyExtractor={i => i.id}
                      onEndReached={paginationNowPlaying}
                      />
                    </View>
                  
                      <Text style={{color: theme?'#fff':'#000', fontSize: 15, fontWeight: 'bold', marginLeft: 20}}>Popular</Text>
                      <View style={styles.cardContainer}>
                          <FlatList horizontal data={popular} renderItem={({item, index}) => {
                          return(
                                  <Pressable key={index} style={styles.card} onPress={() => navigation.navigate("Movie Details", {Id: item.id, title: item.title})}>
                                  <Image
                                      source={{
                                          uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                                      }}
                                      style={styles.cardImage}
                                      />
                                  <Text style={{color: theme?'#fff':'#000', fontSize: 8, fontWeight: 'bold', textAlign: 'center'}}>{item.title}</Text>
                                  </Pressable>
                              )
                              }}
                              onEndReached={paginationPopular}
                              />
                      </View>
                  
                        <Text style={{color: theme?'#fff':'#000', fontSize: 15, fontWeight: 'bold', marginLeft: 20}}>Top Rate</Text>
                        <View style={styles.cardContainer}>
                          <FlatList horizontal data={topRate} renderItem={({item, index}) => {
                          return(
                                  <Pressable key={index} style={styles.card} onPress={() => navigation.navigate("Movie Details", {Id: item.id, title: item.title})}>
                                  <Image
                                      source={{
                                          uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                                      }}
                                      style={styles.cardImage}
                                      />
                                  <Text style={{color: theme?'#fff':'#000', fontSize: 8, fontWeight: 'bold', textAlign: 'center'}}>{item.title}</Text>
                                  </Pressable>
                              )
                              }}
                              onEndReached={paginationTopRate}
                              />
                        </View>
                  
                        <Text style={{color: theme?'#fff':'#000', fontSize: 15, fontWeight: 'bold', marginLeft: 20}}>Up Coming</Text>
                        <View style={styles.cardContainer}>
                          <FlatList horizontal data={upComing} renderItem={({item, index}) => {
                          return(
                                  <Pressable key={index} style={styles.card} onPress={() => navigation.navigate("Movie Details", {Id: item.id, title: item.title})}>
                                  <Image
                                      source={{
                                          uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                                      }}
                                      style={styles.cardImage}
                                      />
                                  <Text style={{color: theme?'#fff':'#000', fontSize: 8, fontWeight: 'bold', textAlign: 'center'}}>{item.title}</Text>
                                  </Pressable>
                              )
                              }}
                              onEndReached={paginationUpComing}
                              />
                        </View>

                </ScrollView>
                <View style={styles.bottomTapNagivator}>
                  <Pressable onPress={() => alert("Home!")} style={{alignItems: 'center',}}>
                    <Home color={theme?'#fff':'#000'}/>
                    <Text style={{color: theme?'#fff':'#000', textAlign: 'center'}}>Home</Text>
                  </Pressable>
                  <Pressable onPress={() => alert("Favourite!")} style={{alignItems: 'center',}}>
                    <Heart color={theme?'#fff':'#000'}/>
                    <Text style={{color: theme?'#fff':'#000', textAlign: 'center'}}>Favourite</Text>
                  </Pressable>
                  <Pressable onPress={() => alert("Music List!")} style={{alignItems: 'center',}}>
                    <ListMusic color={theme?'#fff':'#000'}/>
                    <Text style={{color: theme?'#fff':'#000'}}>Lists</Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('Setting')}  style={{alignItems: 'center',}}>
                    <User color={theme?'#fff':'#000'}/>
                    <Text style={{color: theme?'#fff':'#000'}}>User</Text>
                  </Pressable>
                </View>
              </View>
            } 
          </>
  );
}


