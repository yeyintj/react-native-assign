import React, {
  Component,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {useQuery} from "react-query";
import MoviesContext from "./MoviesContext";
import MoviesList from "./MoviesList";
import { getRequest } from "./Api";
import MovieDetails from "./MovieDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActorDetails from "./ActorDetails";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import SignIn from "./SignIn";
import Setting from "./Setting";

const Stack = createNativeStackNavigator();


export default function MoviesApp() {
  const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme);
  const [movies, setMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRate, setTopRate] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(1);
  const numRef = useRef(1);
  const [isLoding, setIsLoding] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();


  // const {title} = route.params
  console.log("Theme: ", theme);

  const getLoding = () => {
    return <View style={{
        flex: 1,
        backgroundColor: theme?"#000":'#fff',
        paddingVertical: '50%'
      }}>
        <ActivityIndicator color={theme?'#fff':'#000'} size='50'/>
    </View>
  }

  const darkTheme = () => {
    setTheme(true);
  }

  const lightTheme = () => {
    setTheme(false);
  }

  const signInBtn = () => {
      if(userName==='Alice'&&userPassword==='Password'){
        setIsSignedIn(true)
      }else{
        return alert('invalid user name or password');
      }
  }

  const signOutBtn = () => {
    setIsSignedIn(false)
  }

  useQuery('movies', 
    async () => {
      const responseNowPlaying = await getRequest(
        "/3/movie/now_playing?language=en-US&page=1"
      );
      setIsLoding(false);
      setNowPlaying(responseNowPlaying.data.results);
      const responsePopular = await getRequest('3/movie/popular?language=en-US&page=1');
      setPopular(responsePopular.data.results);
      const responseTopRated = await getRequest('3/movie/top_rated?language=en-US&page=1');
      setTopRate(responseTopRated.data.results);
      const responseUpComing = await getRequest('3/movie/upcoming?language=en-US&page=1');
      setUpComing(responseUpComing.data.results);
    }
  )

  

  // const fetchNowPlaying = async () => {
  //   const reponse = await getRequest('3/movie/now_playing?language=en-US&page=1');
  //   setIsLoding(false);
  //   setNowPlaying(reponse.data.results);
  // }
  
  console.log("Up Coming: ", upComing);

console.log("Movies List: ", nowPlaying)

  return (
    <NavigationContainer>
      <MoviesContext.Provider
        value={{
          theme,
          darkTheme,
          lightTheme,
          userName,
          setUserName,
          userPassword,
          setUserPassword,
          signInBtn,
          signOutBtn,
          isLoding,
          setIsLoding,
          getLoding,
          search,
          setSearch,
          isRefreshing,
          setIsRefreshing,
          numRef,
          nowPlaying,
          setNowPlaying,
          popular,
          setPopular,
          topRate,
          setTopRate,
          upComing,
          setUpComing,
          isLoding,
          setIsLoding,
          getLoding
        }}
      >
        {isSignedIn ? 
        (
          isLoding? getLoding() : 
            <Stack.Navigator>
                  <Stack.Screen name="Home" component={MoviesList} options={{headerShown: false}}/>
                <Stack.Screen name="Movie Details" component={MovieDetails} options={{headerShown: false}}/>
                <Stack.Screen name="Actor Details" component={ActorDetails} options={{headerShown: false}}/>
                <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}}/>
            </Stack.Navigator>
        )

        :
        (
          isLoding? getLoding() :
          <Stack.Navigator>
                  <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
          </Stack.Navigator>
        ) 
      }
      </MoviesContext.Provider>
    </NavigationContainer>
  );
}
