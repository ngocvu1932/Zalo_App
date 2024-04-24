import { Pressable, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

export const SettingTimeline = ({navigation}) => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  }; 
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.pressBack} onPress={()=> {navigation.goBack()}}>
          <FontAwesomeIcon icon={faChevronLeft} style={{marginLeft: 10}} color='#F5F8FF' size={20} />
          <Text style={styles.txtInHeader}>Nhật ký</Text> 
        </Pressable>
      </View>

      <ScrollView style={styles.body}>   
        <View style={styles.viewAccount}>
          <Text style={styles.txtTitle}>Tiện ích</Text>

          <Pressable style={[styles.pressBirthDay]} onPress={()=> alert('Phân loại nhật ký')}>
            <Text style={styles.textBirthDay}>Phân loại nhật ký</Text>
            <Text style={{fontSize: 15, marginRight: 15}}>Đang tắt</Text>
          </Pressable>
        </View>

        <View style={styles.viewLogin}>
          <Text style={styles.txtTitle}>Tùy chọn</Text>
          
          <Pressable style={[styles.pressBirthDay]} onPress={()=> alert('Ptự động phát video')}>
            <Text style={styles.textBirthDay}>Tự động phát video</Text>
            <Text style={{fontSize: 15, marginRight: 15}}>Luôn tự động phát</Text>
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

          <Pressable style={[styles.pressBirthDay]} onPress={()=> alert('Ptự động phát video')}>
            <Text style={styles.textBirthDay}>Tự động phát bài hát</Text>
            <Text style={{fontSize: 15, marginRight: 15}}>Luôn tự động phát</Text>
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

          <View style={[styles.pressBirthDay]}>
            <Text style={styles.textBirthDay}>Gợi ý sticker khi bình luận</Text>
            <Pressable style={[styles.button, isToggled && styles.toggledButton]} onPress={handleToggle}>
              <View style={[styles.circleButton, isToggled ? styles.circleButton1 : styles.circleButton]}></View>
            </Pressable> 
          </View>
        </View>

        <View style={styles.viewSecutity}>
          <Text style={styles.txtTitle}>Quyền riêng tư</Text>

          <Pressable style={[styles.pressBirthDay]} onPress={()=>alert('Chặn xem nhật ký')}>
            <Text style={styles.textBirthDay}>Chặn xem nhật ký</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 15}} icon={faChevronRight}/>
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

          <Pressable style={[styles.pressBirthDay]} onPress={()=>alert('Chặn xem  khoảnh khắc')}>
            <Text style={styles.textBirthDay}>Chặn xem khoảnh khắc</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 15}} icon={faChevronRight}/>
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

          <Pressable style={[styles.pressBirthDay]} onPress={()=>alert('Ẩn khỏi nhật ký')}>
            <Text style={styles.textBirthDay}>Ẩn khỏi nhật ký</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 15}} icon={faChevronRight}/>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

