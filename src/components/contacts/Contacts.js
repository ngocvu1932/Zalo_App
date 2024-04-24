import React, { useEffect } from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ContactFriends } from './ContactFriends'
import { ContactGroups } from './ContactGroups'
import { ContactOA } from './ContactOA'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { styles } from './style'

const Tab = createMaterialTopTabNavigator();

export const Contacts = ({ navigation }) => {
  // useEffect(() => {
  //   navigation.setOptions({});
  // }, [navigation]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesomeIcon style={{ marginLeft: 15 }} color='#F1FFFF' size={27} icon={faMagnifyingGlass} />
        <TextInput style={styles.txtInHeader} placeholder='Tìm kiếm' />
        <Pressable onPress={() => {navigation.navigate('AddFriend')}}>
          <FontAwesomeIcon style={{ marginRight: 15 }} color='#F1FFFF' size={22} icon={faUserPlus} />
        </Pressable>
      </View>
      <Tab.Navigator screenOptions={{
          tabBarLabelStyle: { textTransform: 'none', fontWeight: '500', fontSize: 14 }
        }}>
        <Tab.Screen name="Bạn bè" component={ContactFriends} />
        <Tab.Screen name="Nhóm" component={ContactGroups} />
        <Tab.Screen name="OA" component={ContactOA} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
