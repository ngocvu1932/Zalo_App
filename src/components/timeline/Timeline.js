import { FlatList, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBell, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'

export const Timeline = () => {
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#008BFA', '#00ACF4']}>
        <View style={{flexDirection: 'row', height: '55%', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <FontAwesomeIcon style={{marginLeft: 10}} color='#F1FFFF' size={22} icon={faMagnifyingGlass} />
          <TextInput style={styles.txtInHeader} placeholder='Tìm kiếm' placeholderTextColor={'#FFFFFF'}></TextInput>

          <View style={{width: '22%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesomeIcon style={{}} color='#F1FFFF' size={22} icon={faPenToSquare} />
            </Pressable>

            <Pressable style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center', marginRight: 6}}>
              <FontAwesomeIcon style={{}} color='#F1FFFF' size={22} icon={faBell} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

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
        <View style={{width: '100%', height: 300}}></View>   
      </ScrollView>
    </View>
  )
}

