import React, { Component, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, FlatList, Pressable, ActivityIndicator } from "react-native";
import { getRequest } from "./Api";
import { ArrowLeft, Heart, Star } from "lucide-react-native";
import MoviesContext from "./MoviesContext";
import { useQueries, useQuery } from "@tanstack/react-query";

export default function MovieDetails({ navigation, route, }) {
  const {theme, animatedLoding} = useContext(MoviesContext);
  const [detail, setDetail] = useState([]);
  const [image, setImage] = useState([]);

  const { Id, title } = route.params;

  // console.log("Movie ID: ", Id);
  // console.log("Movie Image: ", image);

  const fetchDetail = useQuery({
        queryKey: ['movies', Id], 
        queryFn: async () => {
          const response = await getRequest(`/3/movie/${Id}/credits?language=en-US`);
          const apiData = response.data.cast;
          setDetail(apiData);
          return apiData;
        },
    });
  
  const fetchImage =   useQuery({
        queryKey: ['image', Id], 
        queryFn: async () => {
          const response = await getRequest(`3/movie/${Id}?language=en-US`);
          const apiData = response.data;
          setImage(apiData);
          return apiData;
        },
    });
  

 

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
      backgroundColor: '#deddd5'
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

      fetchDetail.isLoading&&fetchImage.isLoading? 
      
          animatedLoding()
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
              <Text style={{color: theme?'#fff':'#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{title}</Text>
              <Text style={{opacity: 0}}>title</Text>
            </View>
            <View
            style={{
              flex: 1,
              backgroundColor: theme?"#000":'fff',
              alignItems: "center",
              // padding: 20,
              // rowGap: 10,
            }}
          >
              <ScrollView>
                
                <View
                  style={{alignItems: "center", justifyContent: 'center', padding: 20}}
                >
                  {fetchImage.isLoading? animatedLoding(): 
                  
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/original/${image.poster_path}`,
                      }}
                      style={styles.cardImage}
                    />
                  }
                  <Text style={styles.cardTitle}>{image.original_title}</Text>
                  <Text style={styles.cardOverview}>{image.overview}</Text>
                </View>
                
                <Text style={{ color: theme?"#fff":'#000', fontSize: 20, marginLeft: 20, marginBottom: 10}}>Casts</Text>
                  
                <FlatList horizontal data={detail} renderItem={({item,index})=>{
                  return(
                    <Pressable key={index} onPress={() => navigation.navigate('Actor Details', {Id: item.id, name: item.name})} style={{alignItems: 'center', rowGap: 10, marginLeft: 20}}>
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
              

              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5}}>
                  <Heart fill='#fa1b1b' size={17}/>
                  <Text style={{color: theme?'#fff':'#000', fontSize: 8, fontWeight: 'bold'}}>
                    {image.popularity}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5}}>
                  <Star fill='#fa1b1b' size={18}/>
                  <Text style={{color: theme?'#fff':'#000', fontSize: 8, fontWeight: 'bold'}}>{image.vote_average}</Text>
                </View>
              </View>
            </View>
         </View>
          
      
  );
}


