import { Text, View } from "react-native";
import { Settings, ShoppingCart, ChevronRight, Store, Heart, ListMusic } from "lucide-react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Libary(){
    return(
        <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', rowGap: 20, marginTop: 20,marginBottom: 'auto'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingHorizontal: 10}}>
                <Text style={{color: '#fff', fontSize: '2rem', fontWeight: 'bold'}}>Libary</Text>
                <Settings color='#fff' size={25}/>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', rowGap: 30}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingHorizontal: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                        <ShoppingCart color='#fff' size={25}/>
                        <Text style={{color: '#fff', fontSize: '1.2rem'}}>Purchased Tracks</Text>
                    </View>
                    <ChevronRight color='#deddd5' size={25}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingHorizontal: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                        <FontAwesomeIcon icon={faCartShopping} color='#fff' size={25}/>
                        <Text style={{color: '#fff', fontSize: '1.2rem'}}>Purchased Albums</Text>
                    </View>
                    <ChevronRight color='#deddd5' size={25}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingHorizontal: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                        <Heart color='#fff' size={25}/>
                        <Text style={{color: '#fff', fontSize: '1.2rem'}}>Favourite Tracks</Text>
                    </View>
                    <ChevronRight color='#deddd5' size={25}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingHorizontal: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                        <FontAwesomeIcon icon={faHeart} color='#fff' size={25}/>
                        
                        <Text style={{color: '#fff', fontSize: '1.2rem'}}>Favourite Albums</Text>
                    </View>
                    <ChevronRight color='#deddd5' size={25}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingHorizontal: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                        <ListMusic color='#fff' size={25}/>
                        <Text style={{color: '#fff', fontSize: '1.2rem'}}>playlists</Text>
                    </View>
                    <ChevronRight color='#deddd5' size={25}/>
                </View>
            </View>
        </View>
    )
}