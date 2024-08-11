import { Image, Text, View } from "react-native";
import { Scan, Bell, Settings, Music, Facebook, Phone } from "lucide-react-native";

export default function Layout(){
    return(
        <>
            <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>Table</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                    <View style={{backgroundColor: '#333', padding: 10, borderRadius: 10}}>
                        <Scan size={30} color='#fff'/>
                    </View>
                    <View style={{backgroundColor: '#333', padding: 10, borderRadius: 10}}>
                        <Bell size={30} color='#fff'/>
                    </View>
                    <View style={{backgroundColor: '#333', padding: 10, borderRadius: 10}}>
                        <Settings size={30} color='#fff'/>
                    </View>
                </View>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', rowGap: 10}}>
                    <Music color='red' size={200}/>
                    <View style={{alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 22}}>Support Local Artist</Text>
                        <Text style={{color: '#fff', fontSize: 20}}>As you like</Text>
                    </View>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: 10, width: '90%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', columnGap: 30,borderWidth: 2, borderColor: '#333', width: '90%', borderRadius: 15, paddingHorizontal: 10 , paddingVertical: 8}}>
                    <Facebook color='blue' size={25}/>
                    <Text style={{color: '#fff', fontSize: 15}}>Continue With Facebook</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', columnGap: 30,borderWidth: 2, borderColor: '#333', width: '90%', borderRadius: 15, paddingHorizontal: 10 , paddingVertical: 2}}>
                    {/* <Facebook color='blue' size={10}/> */}
                    <Image source={require('../assets/google-removebg-preview.png')} style={{width: 35, height: 35}}/>
                    <Text style={{color: '#fff', fontSize: 15}}>Continue With Google</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', columnGap: 30,borderWidth: 2, borderColor: '#333', width: '90%', borderRadius: 15, paddingHorizontal: 25 , paddingVertical: 8}}>
                    <Phone color='#fff' size={25}/>
                    <Text style={{color: '#fff', fontSize: 15}}>Continue With Phone Number</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', columnGap: 30,width: '90%', paddingHorizontal: 10 , paddingVertical: 8}}>
                    <Text style={{color: '#fff', fontSize: 15}}>Log In</Text>
                </View>
            </View>
        </>
    )
}