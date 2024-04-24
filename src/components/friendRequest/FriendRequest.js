import React, { useEffect } from 'react'
import { View, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { styles } from './style'
import { FriendRequestReceived } from './FriendRequestReceived'
import { FriendRequestSent } from './FriendRequestSent'

const Tab = createMaterialTopTabNavigator();
export const FriendRequest = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
    });
  }, [navigation]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={{flexDirection:"row", height: 55, alignItems:"center", justifyContent: 'center'}} onPress={() => { navigation.goBack()}}>
          <FontAwesomeIcon style={{ marginLeft: 15,  }} color='#F1FFFF' size={21} icon={faChevronLeft} />
          <Text style={styles.txtInHeader}>Lời mời kết bạn</Text>
        </Pressable>

        <Pressable onPress={() => {
          navigation.navigate('AddFriend')
        }}>
          <FontAwesomeIcon style={{ marginRight: 15 }} color='#F1FFFF' size={23} icon={faUserPlus} />
        </Pressable>

      </View>

      <Tab.Navigator screenOptions={{
          tabBarLabelStyle: { textTransform: 'none', fontWeight: '500', fontSize: 14 }
        }} >
        <Tab.Screen name="Đã nhận" component={FriendRequestReceived} />
        <Tab.Screen name="Đã gửi" component={FriendRequestSent} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
