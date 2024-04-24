import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faMagnifyingGlass, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { faBell, faPenToSquare } from '@fortawesome/free-regular-svg-icons'

export const Timeline = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text>Discovery</Text> */}
        <FontAwesomeIcon style={{marginLeft: 15}} color='#F1FFFF' size={27} icon={faMagnifyingGlass} />
        <TextInput style={styles.txtInHeader} placeholder='Tìm kiếm'></TextInput>

        <Pressable>
          <FontAwesomeIcon style={{marginLeft: 15}} color='#F1FFFF' size={22} icon={faPenToSquare} />
        </Pressable>

        <Pressable>
          <FontAwesomeIcon style={{marginLeft: 22}} color='#F1FFFF' size={22} icon={faBell} />
        </Pressable>
      </View>

      <ScrollView style={styles.body}>
        <Pressable style={styles.pressTodayFeel} >
          <Image source={require('../../../assets/img/zaloVideo.png')} style={{height: 50, width: 50, marginLeft: 15}}></Image>
          <Text style={{marginLeft: 10 , fontSize: 18, opacity: 0.8}}>Hôm nay bạn thế nào?</Text>
        </Pressable>

        <View>
          

        </View>

        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        <Text> hehe </Text>
        
      </ScrollView>
    </SafeAreaView>
  )
}

