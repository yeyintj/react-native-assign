import { Text, View, SafeAreaView, ScrollView,} from "react-native";
import { CircleUser, ChevronRight } from "lucide-react-native";

export default function Settings(){
    return(

        <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', rowGap: 10}}>
            <View style={{flex: 2,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', marginBottom: '2.5rem', marginTop: '1.5rem'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                    <CircleUser color='#fff' size={45}/>
                    <View>
                        <Text style={{color: '#fff', fontSize: 20}}>Name</Text>
                        <Text style={{color: '#bbc9c6', fontSize: 20}}>View Profile</Text>
                    </View>
                </View>
                <ChevronRight color='#fff' size={25}/>
            </View>

                    <View style={{alignItems: 'center', justifyContent: 'center',width: '100%', rowGap: 20}}>
                <ScrollView>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',  paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Purchased List</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',  paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Music Plates</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Payment</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Change Language</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Notifications</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Manage Account</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Feedback</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Feedback</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Feedback</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',   paddingVertical: 10, paddingHorizontal: 8}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Feedback</Text>
                            <ChevronRight color='#fff' size={25}/>
                        </View>
                </ScrollView>
                    </View>
        </View>
    )
}