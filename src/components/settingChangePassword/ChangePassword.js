import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import Toast, { DURATION } from 'react-native-easy-toast';
import axios from '../../config/axios'
import { useSelector } from 'react-redux'

export const ChangePassword = ({navigation}) => {
  const user = useSelector(state => state.user);
  const toastRef = useRef(null);
  const [isShow, setIsShow] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [newData, setNewData] = useState({
    oldpassword: null,
    newPassword: null ,
  });

  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');

  useEffect(() => {
    setNewData({...newData, newPassword: newPassword, oldPassword: oldPassword});
  }, [newPassword, oldPassword]);

  useEffect(() => {
    if (newPassword === '' || oldPassword === '' || newPasswordAgain === '') {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  }, [newData, newPasswordAgain]);

  const changePassword = async(newPassword) => {
    try {
      const response = await axios.put('/auth/change-password', { 
        oldPassword: newPassword.oldPassword,
        newPassword: newPassword.newPassword
       });
      return response;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  
  const handleSave = async () => {
    try {
      if (checkNewPassword()) {
        const response = await changePassword(newData);
        if (response.errCode === 0) {
          toastRef.current.show('Đổi mật khẩu thành công', 2000);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        } else if (response.errCode === 3)  {
          toastRef.current.show('Mật khẩu hiện tại không chính xác', 2000);
        } else {
          toastRef.current.show('Đổi mật khẩu thất bại', 2000);
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const checkNewPassword = () => {
    if (newPassword !== newPasswordAgain) {
      toastRef.current.show('Mật khẩu mới không trùng khớp', 2000);
      return false;
    } else {
      return true;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.pressBack} onPress={()=> {navigation.goBack()}}>
          <FontAwesomeIcon icon={faChevronLeft} style={{marginLeft: 10}} color='#F5F8FF' size={20} />
          <Text style={styles.txtInHeader}>Đổi mật khẩu</Text> 
        </Pressable>
      </View>

      <View style={styles.body}>   
        <View style={{height: 40, backgroundColor: '#F1F2F4', justifyContent: 'center'}}>
          <Text style={{fontSize: 15, marginLeft: 20}}>Mật khẩu phải gồm chữ, số hoặc kí tự đặc biệt</Text>
        </View>

        <View style={{width:'95%', alignSelf: 'center', marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: '#07439B'}}>Mật khẩu hiện tại</Text>
            <Pressable onPress={()=>setIsShow(!isShow)}>
              <Text style={{fontSize: 16}}>{isShow ? 'Hiện' : 'Ẩn'}</Text>
            </Pressable>
          </View>
          <TextInput onChangeText={(text)=> setOldPassword(text)} secureTextEntry={isShow} style={{height: 40, fontSize: 18, borderBottomWidth: 1}} placeholder='Nhập mật khẩu hiện tại'></TextInput>
        </View>
        
        <View style={{width:'95%', alignSelf: 'center', marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: '#07439B'}}>Mật khẩu mới</Text>
          </View>
          <TextInput onChangeText={(text)=> {setNewPassword(text)}} secureTextEntry={isShow} style={{height: 40, fontSize: 18, borderBottomWidth: 1}} placeholder='Nhập mật khẩu mới'></TextInput>
          <TextInput onChangeText={(text)=> setNewPasswordAgain(text)} secureTextEntry={isShow} style={{height: 40, fontSize: 18, borderBottomWidth: 1, marginTop: 10}} placeholder='Nhập lại mật khẩu mới'></TextInput>
        </View>


        <View style={{alignItems: 'center', marginTop: 50}}> 
          <Pressable disabled={!isDone} onPress={()=>handleSave()} style={[styles.btnDone, isDone ? {backgroundColor: '#008FFF'} : {backgroundColor: '#C1D4E3'}]}>
            <Text style={{fontSize: 18}}>Cập nhật</Text>
          </Pressable>
        </View>

        <Toast ref={toastRef} position='top' />
      </View>
    </SafeAreaView>
  )
}

