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
import SignUp from "./SignUp";
import LottieView from "lottie-react-native";

const Stack = createNativeStackNavigator();


export default function MoviesApp({children}) {
  // const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  
  const signOutBtn = () => {

      setIsSignedIn(false)
      setIsLoding(true)
      setUserName('');
      setUserPassword('');

      setTimeout(() => {
        setIsLoding(false)
      }, 100)
  }

  const animatedLoding = () => {

    return  <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme?"#000":'#fff',
      paddingVertical: '50%'
    }}> 
              <LottieView source={require('./Loding.json')} autoPlay loop style={{width: 100, flex: 1,}}/>
            </View> 
  }

  
  // console.log("Popular: ", popular);

// console.log("Movies List: ", nowPlaying)

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
          getLoding,
          setIsSignedIn,
          animatedLoding
        }}
      >
        {isSignedIn ? 
        (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MoviesList} options={{headerShown: false}}/>
                <Stack.Screen name="Movie Details" component={MovieDetails} options={{headerShown: false}}/>
                <Stack.Screen name="Actor Details" component={ActorDetails} options={{headerShown: false}}/>
                <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}}/>
            </Stack.Navigator>
        )
        :
        (
          <Stack.Navigator>
                  <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
                  <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          </Stack.Navigator>
        ) 
      }
      {children}
      </MoviesContext.Provider>
    </NavigationContainer>
  );
}
