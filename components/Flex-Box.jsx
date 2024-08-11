import { Text, View } from "react-native";
import { Clock, CircleUser, Trash, Heart } from "lucide-react-native";

export default function FlexBox(){
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log("Hour: ",hours);
    return(
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', width: '90%', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8}}>
            <View style={{alignItems: 'center', justifyContent: 'center', gap: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <Clock size={20} color="green"/>
                        <Text style={{color: 'green'}}> {hours}:{minutes} {hours > 12 ? "PM" : "AM"}</Text>
                    </View>
                        <Trash color='gray' size={20}/>
                </View>
                    <Text style={{color: 'white', paddingHorizontal: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
                    <View style={{flexDirection: 'row', gap: 10}}>
                        <CircleUser color="blue" size={20}/>
                        <Text style={{color: 'white'}}>Jazmyle Kling</Text>
                    </View>
                    <View style={{flexDirection: 'row',gap: 10}}>
                        <Heart color='red' size={20}/>
                        <Text style={{color: 'white'}}>1</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}