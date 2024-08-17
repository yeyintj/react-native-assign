import { Popcorn } from 'lucide-react-native'
import React, { useContext } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View, } from 'react-native'
import MoviesContext from './MoviesContext'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function SignIn({navigation}) {
    const {
        theme,
        userName,
        setUserName,
        userPassword,
        setUserPassword,
        signInBtn,
        setIsSignedIn,
        isLoding,
        setIsLoding,
        animatedLoding
        } = useContext(MoviesContext);
    
  // const handleSignUp = async () => {
  //    try {
  //       await AsyncStorage.setItem('token', '123');
  //       await AsyncStorage.setItem('name', userName);
  //       await AsyncStorage.setItem('password', userPassword);
  //       setUserName('');
  //       setUserPassword('');
  //    } catch (err) {
  //     console.log('Storage Error: ', err);
  //    }
  //  }

  
  const handleSignIn =  async () => {
    try {
        
        const name = await AsyncStorage.getItem('name')
        const password = await AsyncStorage.getItem('password')
        if(name==userName&&password==userPassword){
          setIsSignedIn(true);
        }else{
          Alert.alert('Sign In','Invalid user name or password');
        }
    } catch (err) {
      console.log(err)
    }
   }
   

  return (
    <>
      {/* {isLoding ? animatedLoding():  */}
      
        <View style={{flex: 1,backgroundColor: theme?'#000':'#fff',}}>
            <View style={styles.header}>
            {/* <Pressable style={{alignItems: 'center'}} onPress={() => navigation.navigate('Home')}>
            <ArrowLeft color='#fff' size={25}/>
            </Pressable>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>{title}</Text>*/}
            <Text style={{color: theme?'#fff':'#fff', fontSize: 18, fontWeight: 'bold', }}>Sign In</Text> 
            </View>
            <View style={styles.signInContainer}>
                <View style={styles.brand}>
                    <Pressable onPress={() => navigation.navigate('Home')}>
                        <Popcorn
                        color="#fa1b1b"
                        size={80}
                        style={{ transform: [{ rotate: "45deg" }] }}
                        />
                    </Pressable>
                    <Text style={{ color: theme?"#fff":'#000', fontSize: 22, fontWeight: 'bold' }}>
                    Movieflix
                </Text>
                </View>
                <View style={styles.signInCard}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: theme?'#333':'#000'}}>Sign In</Text>
                    <TextInput value={userName} placeholder='Enter user name' onChangeText={(text) => setUserName(text)} style={styles.cardInPut} />
                    <TextInput value={userPassword} placeholder='Enter user password' onChangeText={(text) => setUserPassword(text)} style={styles.cardInPut} />
                        <Pressable style={styles.btn} onPress={handleSignIn}>
                            <Text style={{fontSize: 15, color: theme?'#fff':'#fff', fontWeight: 'bold'}}>Sign In</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{fontSize: 12, color: theme?'#000':'#000', fontWeight: 'bold'}}>Sign Up</Text>
                        </Pressable>
                </View>
            </View>
        </View>
      {/* } */}
    </>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fa1b1b',
        width: '100%',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20
      },
      brand: {
        alignItems: "center",
        justifyContent: "center",
        rowGap: 10
      },
      signInContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 40,
        paddingTop: 40,
        // borderWidth: 2,
        // borderColor: 'red',
        height: '80%',
      },
      signInCard: {
        alignItems: 'center',
        rowGap: 25,
        backgroundColor: '#E9E9E9',
        width: '90%',
        padding: 20,
        borderRadius: 10,
      },
      cardInPut: {
        borderWidth: 2,
        borderColor: '#333',
        width: '80%',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
      },
      btn: {
        borderWidth: 3,
        borderColor: '#fa1b1b',
        backgroundColor: '#fa1b1b',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
      }
})