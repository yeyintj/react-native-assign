import { ArrowLeft, LogOut, MoonStar, SunMoon, User } from 'lucide-react-native'
import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MoviesContext from './MoviesContext'




export default function Setting({navigation}) {
  
  const {signOutBtn, theme, darkTheme, lightTheme} = useContext(MoviesContext);


  return (
    <View style={{flex: 1,backgroundColor: theme ? '#000' : '#fff'}}>
          <View style={styles.header}>
             <Pressable style={{alignItems: 'center'}} onPress={() => navigation.navigate('Home')}>
                <ArrowLeft color={theme?'#fff':'#fff'} size={25}/>
            </Pressable>
            <Text style={{color: theme?'#fff':'#fff', fontSize: 18, fontWeight: 'bold', }}>Settings</Text> 
            <Text style={{opacity: 0}}>title</Text>
            </View>
            <View style={styles.settingContainer}>
              <View style={{alignItems: 'center', rowGap: 15}}>
                <User color={theme?'#fff':'#000'} size={50}/>
                <Text style={{color: theme?'#fff':'#000', fontSize: 20, fontWeight: 'bold'}}>Alice</Text>
              </View>
              <Pressable onPress={signOutBtn} style={{flexDirection: 'row', alignItems: 'center',gap: 10,}}>
                <Text style={{color: theme?'#fff':'#000', fontSize: 12}}>Log Out</Text>
                <LogOut color={theme?'#fff':'#000'} size={20}/>
              </Pressable>
              <View style={styles.theme}>
                <Text style={{color: theme?'#fff':'#000', fontSize: 20, fontWeight: 'bold'}}>Themes</Text>
                {theme ? (
                    <Pressable onPress={lightTheme}>
                      <SunMoon color={theme?'#fff':'#000'} size={30}/>
                    </Pressable>
                  )
                  :
                  (
                    <Pressable onPress={darkTheme}>
                      <MoonStar color={theme?'#fff':'#000'} size={30}/>
                    </Pressable>
                  )
                }
              </View>
              
            </View>
    </View>
  )
}

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
  settingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 15,
    paddingTop: 20
  },
  theme: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: 'red',
    width: '100%',
  }
})