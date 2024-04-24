import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faMagnifyingGlass, faQrcode } from '@fortawesome/free-solid-svg-icons'

export const Discovery = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text>Discovery</Text> */}
        <FontAwesomeIcon style={{marginLeft: 15}} color='#F1FFFF' size={27} icon={faMagnifyingGlass} />
        <TextInput style={styles.txtInHeader} placeholder='Tìm kiếm'></TextInput>
        <Pressable>
          <FontAwesomeIcon style={{marginLeft: 60}} color='#F1FFFF' size={22} icon={faQrcode} />
        </Pressable>
      </View>

      <ScrollView style={styles.body}>
        <Pressable style={styles.pressZaloVideo} >
          <Image source={require('../../../assets/img/zaloVideo.png')} style={{height: 50, width: 50, marginLeft: 15}}></Image>
          <Text style={{marginLeft: -180 , fontSize: 18}}>Zalo Video</Text>
          <FontAwesomeIcon size={20} color='#6E6E6E' style={{marginRight: 15}} icon={faChevronRight}/>
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

