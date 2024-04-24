import { Pressable, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

export const SettingContact = ({navigation}) => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  }; 
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.pressBack} onPress={()=> {navigation.goBack()}}>
          <FontAwesomeIcon icon={faChevronLeft} style={{marginLeft: 10}} color='#F5F8FF' size={20} />
          <Text style={styles.txtInHeader}>Danh bạ</Text> 
        </Pressable>
      </View>

      <ScrollView style={styles.body}>   
        <Pressable style={[styles.pressBirthDay, {height: 70}]} onPress={()=> alert('Phân loại nhật ký')}>
          <View>
            <Text style={styles.textBirthDay}>Cập nhật danh bạ Zalo</Text>
            <Text style={{fontSize: 15, marginLeft: 15}}>Lần gần nhất: 01/01/2024 22:57</Text>
          </View>
          <Text style={{fontSize: 15, marginRight: 15}}>Thủ công</Text>
        </Pressable>

          {/* Làm màu kẻ vạch ngang */}
          <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={[styles.pressBirthDay]} onPress={()=> alert('Hiện liên hệ trong danh bạ')}>
          <Text style={styles.textBirthDay}>Hiện liên hệ trong danh bạ</Text>
          <Text style={{fontSize: 15, marginRight: 15}}>Tất cả liên hệ</Text>
        </Pressable>

        <View style={[styles.viewLogin]}>
          <Text style={styles.txtTitle}>Nguồn tìm kiếm và kết bạn</Text>
          
          <View style={[styles.pressBirthDay, {height: 75}]}>
            <View>
              <Text style={styles.textBirthDay}>Tự động kết bạn từ danh bạ máy</Text>
              <Text style={{fontSize: 15, marginLeft: 15}}>Thêm liên hệ vào danh bạ Zalo khi cả</Text>
              <Text style={{fontSize: 15, marginLeft: 15}}>2 đều lưu số nhau trên máy</Text>
            </View>
            <Pressable style={[styles.button, isToggled && styles.toggledButton]} onPress={handleToggle}>
              <View style={[styles.circleButton, isToggled ? styles.circleButton1 : styles.circleButton]}></View>
            </Pressable> 
          </View>
          
          {/* Làm màu kẻ vạch ngang */}
          <View style={styles.line}>
            <View style={styles.line1} >
              <Text> </Text>
            </View>
            <View style={styles.line2}>
              <Text> </Text>
            </View>
          </View>

          <Pressable style={[styles.pressBirthDay]} onPress={()=> alert('Quản lý nguồn tìm kiếm và kết bạn')}>
            <Text style={styles.textBirthDay}>Quản lý nguồn tìm kiếm và kết bạn</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 15}} icon={faChevronRight}/>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

