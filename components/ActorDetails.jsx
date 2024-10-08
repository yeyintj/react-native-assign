import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { getRequest } from "./Api";
import { ArrowLeft } from "lucide-react-native";
import MoviesContext from "./MoviesContext";
import { useQuery } from "@tanstack/react-query";

export default function ActorDetails({ navigation,route }) {
  const {theme, animatedLoding} = useContext(MoviesContext);
  const [actorDetails, setActorDetails] = useState([]);

  const { Id, name } = route.params;
  
  const fetchActorDetails = useQuery({
      queryKey: ['actor', Id],
      queryFn: async () => {
        const response = await getRequest(`3/person/${Id}?language=en-US`);
        const apiData = response.data;
        setActorDetails(apiData);
        return apiData;
      }
    }
  )




  const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fa1b1b',
        width: '100%',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20
      },
    actorContainer: {
        flex: 1,
        backgroundColor: theme?'#000':'#fff',
        padding: 20,
        
     }
    ,
  img: {
    flex: 1,
    width: 200,
    height: 250,
    borderWidth: 5,
    borderColor: '#deddd5',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 'auto'
  },
  actorCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10
  }
});


  return (
         fetchActorDetails.isLoading ? animatedLoding()
         :
         <View style={{flex: 1}}>
            <View style={styles.header}>
              <Pressable style={{alignItems: 'center'}} onPress={() => navigation.goBack()}>
                <ArrowLeft color='#fff' size={25}/>
                {/* <Text style={{color: '#fff'}}>Back</Text> */}
              </Pressable>
              <Text style={{color: theme?'#fff':'#fff', fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
              <Text style={{opacity: 0}}>title</Text>
            </View>
            <ScrollView scrollToOverflowEnabled style={styles.actorContainer}>
                <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${actorDetails.profile_path}`,
                }}
                style={styles.img}
                />
                <View style={styles.actorCard}>
                    <Text style={{color: theme?'#fff':'#000', fontSize: 18, fontWeight: 'bold'}}>{actorDetails.name}</Text>
                    <Text style={{color: theme?'#fff':'#000', fontWeight: 'bold'}}>{actorDetails.birthday}</Text>
                    <Text style={{color: theme?'#fff':'#000', fontWeight: 'bold'}}>{actorDetails.place_of_birth}</Text>
                    <Text style={{color: theme?'#fff':'#000', fontSize: 12, letterSpacing: 1, lineHeight: 20, textAlign: 'center'}}>{actorDetails.biography}</Text>
                </View>
                <Text style={{color: '#fa1b1b', fontWeight: 'bold', marginStart: 'auto', marginTop: 10}}>{actorDetails.deathday}</Text>
                
            </ScrollView>
         </View>
  );
}


