import { Image, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { FastForward, Heart, Pause, Repeat, Rewind } from "lucide-react-native";


export default function MusicLayout(){
    return(
        <View style={{alignItems: 'center', justifyContent: 'center',width: '100%', rowGap: 20}}>
            <View>
                <Image source={require('../assets/Blackpink-Jennie-Hot-Featured-860x538.webp')} style={{width: '85vw', height: '40vh', borderRadius: 10, borderWidth: 5, borderColor: '#deddd5',}}/>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', rowGap: 20}}>
                <View style={{alignItems: 'center', justifyContent: 'center', width: '90%', rowGap: 10}}>
                    <Text style={{color: '#fff', fontSize: '1.5rem'}}>Song Name</Text>
                    <Text style={{color: '#deddd5', fontSize: '1rem'}}>Artist Name</Text>
                    <Text style={{color: '#deddd5', fontSize: '1rem'}}>Album Name</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', paddingHorizontal: 15}}>
                    <Slider
                    style={{width: '100%', height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#deddd5"
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10}}>
                        <Text style={{color: '#deddd5'}}>00:00</Text>
                        <Text style={{color: '#deddd5'}}>00:00</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', columnGap: 10, paddingHorizontal: 15}}>
                    <Repeat color={'#fff'} size={25}/>
                    <Rewind color={'#fff'} size={35}/>
                    <Pause color={'#fff'} size={45}/>
                    <FastForward color={'#fff'} size={35}/>
                    <Heart color={'#fff'} size={25}/>
                    
                </View>
            </View>
        </View>
    )
}