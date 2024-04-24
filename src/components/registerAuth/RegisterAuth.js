import { Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './style';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faChevronLeft, faCommentSms, faL} from '@fortawesome/free-solid-svg-icons'
import axios from '../../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { DURATION } from 'react-native-easy-toast';
import { CommonActions } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../../utils/firebase_config'


export const RegisterAuth = ({navigation, route}) => {
  const name = route.params.name;
  var phone = route.params.phone;
  const [confirm, setConfirm] = useState(route.params.confirm);
  var [code, setCode] = useState('');   

  // console.log("firebaseeee",firebase);
  if (phone.startsWith("+84")) {
    phone = "0" + phone.slice(3);
}
  const [isCode, setIsCode] = useState(true)
  const toastRef = useRef(null);


  const [userData, setUserData] = useState({
    userName: '',
    phoneNumber: '',
    password: '123456',
  });

  useEffect(() => {
    setUserData({userName: name, phoneNumber: phone, password: '123456'})
  }, [name, phone])

  const confirmCode = async () => {
    try {
      const credentials = firebase.auth.PhoneAuthProvider.credential(
        confirm,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then( async (result) => {

          // console.log('result: ', result);
          // console.log('register success');
          // navigation.navigate('Login');
          await successRegisterHandle();
        })
        .catch((error) => {
          console.log('Invalid code', error);
          setCode('')
        });

      // navigation.navigate('TabTwo', { code });
    } catch (error) {
      console.log('Invalid credentials', error);
    }
  };


  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`/auth`, userData);
      // console.log("Response data: ", response.data);
      // console.log("userData: ", userData);
      return response
    } catch (error) {
      console.error("Error register: ", error);
    }
  };

  async function successRegisterHandle(){
    const res = await registerUser(userData);
    // console.log('res: ', res);
    
    if (res.errCode === 0) {
      toastRef.current.show('Đăng kí thành công!', 1999);
      // dung render trong 2s
      setTimeout(() => {
        // navigation.replace('MainScreen');
        // Sử dụng hàm resetToScreen để chuyển đến màn hình mong muốn và xóa các màn hình trước đó
        resetToScreen(navigation, 'Login');
      }, 2000);
    } else {
      toastRef.current.show('Số điện thoại đã tồn tại!', 3000);
    }
  }
  // Trong một component hoặc bất kỳ nơi nào muốn thực hiện việc xóa các màn hình trước đó
  const resetToScreen = (navigation, routeName) => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    }));
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.pressBack} onPress={()=> {navigation.goBack()}}>
          <FontAwesomeIcon icon={faChevronLeft} style={{marginLeft: 10}} color='#F5F8FF' size={20} />
          <Text style={styles.txtInHeader}>Nhập mã xác thực</Text> 
          {/* <Text>{todo}</Text> */}
        </Pressable>
      </View>
      
      <View style={styles.body}>
        <View style={{backgroundColor: '#F9FAFE', width: '100%', height: 50, justifyContent: 'center'}} >
          <Text style={{fontSize: 15, marginLeft: 20}}>Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản</Text>
        </View>

        <View style={{alignItems: 'center', marginTop: 30}}>
          <FontAwesomeIcon size={70} color='gray' icon={faCommentSms} />
          <Text style={{fontSize: 18, fontWeight: 500, marginTop: 15}}>Đã gửi mã xác thực đến số {phone}</Text>
          <Text style={{fontSize: 15, marginTop: 10}}>Điền mã xác đã nhận vào ô bên dưới</Text>
        </View>

        <TextInput style={styles.inputt} placeholder='Mã xác thực' value={code} onChangeText={setCode} ></TextInput>

        <Pressable style={styles.btnReCode} onPress={()=>{alert('Gửi lại mã')}}>
          <Text style={{color: 'blue', fontSize: 15}}>Gửi lại mã</Text>
        </Pressable>

        <Pressable disabled={!isCode} style={[styles.btnRe, isCode ? styles.gray : styles.blue]} onPress={() => confirmCode() }>
          <Text style={{fontSize: 20}}>Tiếp tục</Text>
        </Pressable>
      </View>
      <Toast style={{backgroundColor: 'green'}} ref={toastRef} position='center' />
      
    </SafeAreaProvider>
  )
}

