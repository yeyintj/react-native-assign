import { Pressable,  Text, View, } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { ChevronLeft, Circle } from "lucide-react-native";



export default function({theme,handleLightTheme, handleDarktTheme}){
    
    return(
        <View style={{width: '100%', gap: '3rem'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width: '100%', padding: 10}}>
                <ChevronLeft color={theme ? '#fff':'#000'} size={25} style={{}}/>
                <Text style={{color: theme ? '#fff':'#000', fontSize: '2rem'}}>Themes</Text>
                <Text style={{color: theme ? '#000':'#fff'}}>Text</Text>
            </View>
            <View style={{width: '100%', rowGap: '2rem'}}>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15}}>
                    <Text style={{color: theme ? '#fff':'#000', fontSize: '1.2rem'}}>Light Mode</Text>
                    <Pressable onPress={handleLightTheme}>
                        <Circle icon={faCircle} color="#fff" size={25} fill={theme ? '#fff':'green'}/>
                    </Pressable>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15}}>
                    <Text style={{color: theme ? '#fff':'#000', fontSize: '1.2rem'}}>Dark Mode</Text>
                    <Pressable onPress={handleDarktTheme}>
                        <Circle icon={faCircle} color={theme ? '#fff':'#000'} size={25} fill={theme ? 'green':'#fff'}/>
                    </Pressable>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15}}>
                    <Text style={{color: theme ? '#fff':'#000', fontSize: '1.2rem'}}>System Theme</Text>
                    <Pressable onPress={handleDarktTheme}>
                        <Circle icon={faCircle} color={theme ? '#fff':'#000'} size={25} fill={theme ? '#000':'#fff'}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

