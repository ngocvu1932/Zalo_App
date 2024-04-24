import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from  'react-native-safe-area-context'
import { styles } from './style'
import { Text, View, Pressable, Switch, Modal, Button } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronLeft, faClock, faEllipsis, faGear, faLock, faMagnifyingGlass, faMessage, faPencil, faPhone, faRing, faStar, faTrash, faUser, faUserLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../../config/axios';
import Toast from 'react-native-easy-toast';

export const ProfileOptions = ({navigation, route}) => {
  const {items, isUser, isFriend } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toastRef = useRef(null);
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  }; 

  const handleUnfriend = async (userId) => {
    console.log(userId,"hihi");
    setModalVisible(false);
    console.log(userId,"hihiê");

    const payload = {
        userId: userId
    }
    try {
        const response = await axios.put(`users/friendShip/unfriend`, payload)
        console.log(response);
        if(response.errCode === 0){
            toastRef.current.show('Xóa bạn bè thành công!', 2000);
            setTimeout(() => {
                navigation.navigate('Messages')
            }, 2000)
        }
    } catch (error) {

    }
  }

  const renderLine = () => (
    <View style={styles.line}>
      <View style={styles.line1} >
        <Text> </Text>
      </View>
      <View style={styles.line2}>
        <Text> </Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.btnHeader} onPress={()=>{navigation.goBack()}}>
          <FontAwesomeIcon style={{ marginLeft: 15 }} color='#F1FFFF' size={21} icon={faChevronLeft} />
        </Pressable>
        <Text style={{fontSize:18, fontWeight:'500', color:'white', marginLeft: 10}}>{items.userName}</Text>
      </View>

      <View style={styles.body}>
        {isUser ? ( 
            <View style={{width: '100%'}}>
              <Pressable style={[styles.btnOption]} onPress={()=> alert('Thoong tin')}>
                <Text style={styles.txt}>Thông tin</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Đổi ảnh đại diện')}>
                <Text style={styles.txt}>Đổi ảnh đại diện</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Đổi ảnh bìa')}>
                <Text style={styles.txt}>Đổi ảnh bìa</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Cập nhật giới thiệu bản thân')}>
                <Text style={styles.txt}>Cập nhật giới thiệu bản thân</Text>
              </Pressable>

              <View style={{height: 75, backgroundColor: '#FFFFFF', justifyContent: 'flex-end', marginTop: 5}}>
                <Text style={{marginLeft: 20, fontSize: 17, color: '#1B91F3'}}>Cài đặt</Text>
                <Pressable style={[styles.btnOption]} onPress={()=> navigation.navigate('Privacy')}>
                  <Text style={styles.txt}>Quyền riêng tư</Text>
                </Pressable>
              </View>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> navigation.navigate('AccountAndSecurity')}>
                <Text style={styles.txt}>Quản lý tài khoản</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> navigation.navigate('Setting')}>
                <Text style={styles.txt}>Cài đặt chung</Text>
              </Pressable>

              {renderLine()}

            </View>
          ) : isFriend ? (
            <View style={{width: '100%'}}>
              <Pressable style={[styles.btnOption]} onPress={()=> alert('Thoong tin')}>
                <Text style={styles.txt}>Thông tin</Text>
              </Pressable>

              {renderLine()}
              
              <Pressable style={[styles.btnOption]} onPress={()=> alert('Đổi tên gợi nhớ')}>
                <Text style={styles.txt}>Đổi tên gợi nhớ</Text>
              </Pressable>

              {renderLine()}

              <View style={[styles.btnOption, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                <Text style={styles.txt}>Đánh dấu bạn thân</Text>
                <Pressable style={[styles.button, isToggled && styles.toggledButton]} onPress={handleToggle}>
                  <View style={[styles.circleButton, isToggled ? styles.circleButton1 : styles.circleButton]}></View>
                </Pressable> 
              </View>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Giới thiệu cho bạn')}>
                <Text style={styles.txt}>Giới thiệu cho bạn</Text>
              </Pressable>

              <View style={{height: 58, justifyContent: 'flex-end'}}>
                <Pressable style={[styles.btnOption]} onPress={()=> alert('Giới thiệu cho bạn')}>
                  <Text style={styles.txt}>Báo xấu</Text>
                </Pressable>
              </View>
                            
              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Giới thiệu cho bạn')}>
                <Text style={[styles.txt, {color: 'red'}]}>Xóa bạn</Text>
              </Pressable>
            </View>
          ) : (
            <View style={{width: '100%'}}>
              <Pressable style={[styles.btnOption]} onPress={()=> alert('Kết bạn')}>
                <Text style={styles.txt}>Kết bạn</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Thoong tin')}>
                <Text style={styles.txt}>Thông tin</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Đổi tên gợi nhớ')}>
                <Text style={styles.txt}>Đổi tên gợi nhớ</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Báo xấu')}>
                <Text style={styles.txt}>Báo xấu</Text>
              </Pressable>

              {renderLine()}

              <Pressable style={[styles.btnOption]} onPress={()=> alert('Quản lý chặn')}>
                <Text style={styles.txt}>Quản lý chặn</Text>
              </Pressable>

              {renderLine()}
            </View>
          )
        }
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bạn có chắc muốn xóa khỏi danh sách bạn bè?</Text>
            <View style={styles.modalButtons}>
              <Button
                title="Hủy bỏ"
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Xác nhận"
                // onPress={() => handleUnfriend(items.userId)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Toast style={{backgroundColor: 'green'}} ref={toastRef} position='center' />
    </SafeAreaView>
  )
}
