import React, { Component, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, FlatList, Pressable, ActivityIndicator } from "react-native";
import { getRequest } from "./Api";
import { ArrowLeft, Heart } from "lucide-react-native";
import MoviesContext from "./MoviesContext";
import { useQuery } from "react-query";

export default function MovieDetails({ navigation, route, }) {
  const {theme} = useContext(MoviesContext);
  const [detail, setDetail] = useState([]);
  const [movieList, setMovieLists] = useState([]);
  const [isLoding, setIsLoding] = useState(true)

  const { Id, title } = route.params;

  // console.log("Movie ID: ", Id);

  useQuery(['movies', Id], 
    async () => {
      fetchMovieDetail(Id)
    }
  )


  const fetchMovieDetail = async (movieId) => {
    const response = await getRequest(`3/movie/${movieId}/credits?language=en-US`);
    const responseImage = await getRequest(`3/movie/${movieId}?language=en-US`);
    setIsLoding(false);
    setDetail(response.data.cast);
    setMovieLists(responseImage.data);
  };
  // console.log("Movie Detail: ", detail);
  // console.log("Movie Data: ", data);
  
  

  const getLoding = () => {
    return <View style={{
        flex: 1,
        backgroundColor: theme?"#000":'#fff',
        paddingVertical: '50%'
      }}>
        <ActivityIndicator color={theme?'#fff':'#000'} size='50'/>
    </View>
  }

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fa1b1b',
      width: '100%',
      // height: 80,
      paddingTop: 50,
      paddingBottom: 20,
      paddingHorizontal: 20
    },
    cardImage: {
      width: 250,
      height: 350,
      borderRadius: 10,
      borderWidth: 5, 
      borderColor: theme?"#deddd5":'#deddd5', 
    },
    cardTitle: {
      color: theme?"#fff":'#000',
      fontSize: 20,
      fontWeight: "700",
      marginHorizontal: "auto",
      marginTop: 5,
    },
    cardOverview: {
      color: theme?"#fff":'#000',
      fontSize: 13,
      textAlign: "center",
      letterSpacing: 1,
      lineHeight: 20,
    },
    castImage: {
      width: 100,
      height: 150,
      borderRadius: 10,
    },
  });

  return (

      isLoding ? 
      
        getLoding()
         :
         <View style={{flex: 1,
          backgroundColor: theme?"#000":'#fff',
          alignItems: "center",
          }}>
            <View style={styles.header}>
              <Pressable style={{alignItems: 'center'}} onPress={() => navigation.goBack()}>
                <ArrowLeft color={theme?'#fff':'#fff'} size={25}/>
                {/* <Text style={{color: '#fff'}}>Back</Text> */}
              </Pressable>
              <Text style={{color: theme?'#fff':'#fff', fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
              <Text style={{opacity: 0}}>title</Text>
            </View>
            <View
            style={{
              flex: 1,
              backgroundColor: theme?"#000":'fff',
              alignItems: "center",
              padding: 20,
              // rowGap: 10,
            }}
          >
              <ScrollView>
                <View
                  style={{alignItems: "center",}}
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${movieList.poster_path}`,
                    }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle}>{movieList.original_title}</Text>
                  <Text style={styles.cardOverview}>{movieList.overview}</Text>
                </View>
                
                <Text style={{ color: theme?"#fff":'#000', fontSize: 20, marginEnd: 'auto', marginBottom: 10}}>Casts</Text>
                  
                <FlatList horizontal data={detail} renderItem={({item,index})=>{
                  return(
                    <Pressable key={index} onPress={() => navigation.navigate('Actor Details', {Id: item.id, name: item.name})} style={{alignItems: 'center', justifyContent: 'flex-start',marginLeft:15}}>
                      <Image
                          style={styles.castImage}
                          source={{
                              uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`,
                          }}
                          />
                          <Text style={{ color: theme?"#fff":'#000', fontSize: 10, fontWeight: 'bold',marginBottom: 10}}>{item.name}</Text>
                  </Pressable>
                  )
                }}/>
              </ScrollView>
              

              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Heart fill='#fa1b1b' size={17}/>
                  <Text style={{color: theme?'#fff':'#000', fontSize: 8}}>
                    {movieList.popularity}
                  </Text>
                </View>
                <Text style={{color: '#fa1b1b', marginStart: 'auto',}}>{movieList.status}</Text>
              </View>
            </View>
         </View>
          
      
  );
}


