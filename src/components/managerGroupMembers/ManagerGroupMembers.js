import { Image, Pressable, ScrollView, Text, View, Switch } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faArrowLeft, faLock, faStar, faUser,faWandMagicSparkles, faBell, faPencil
    ,faClock, 
    faImage,
    faUserPlus,
    faPersonCirclePlus,
    faUserGroup,
    faThumbtack,
    faEyeSlash,
    faPhoneFlip,
    faTrash,
    faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import axios from '../../config/axios'
import Toast from 'react-native-easy-toast'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AllMembers } from './AllMembers'
import { GroupManagers } from './GroupManagers'

const Tab = createMaterialTopTabNavigator();

function ManagerGroupMembers({navigation, route}){
    const {items} = route.params; 
    const toastRef = useRef(null);
    useEffect(() => {
        navigation.setOptions({
        });
      }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>  
        <View style={styles.header}>
            <Pressable onPress={()=>{
                navigation.goBack()
            }}>
                <FontAwesomeIcon style={{marginLeft: 15}} color='#F1FFFF' size={21} icon={faChevronLeft} />
            </Pressable>
            <Text style={styles.txtInHeader}>Quản lý thành viên</Text>
        </View>
        <Tab.Navigator>
            <Tab.Screen name="Tất cả">
                {() => <AllMembers items={items} />}
            </Tab.Screen>
            <Tab.Screen name="Người quản lý nhóm" component={GroupManagers} options={{ tabBarLabelStyle: { fontWeight: 'bold' } }} />
        </Tab.Navigator>
        </SafeAreaView>
    )
}
export default ManagerGroupMembers
