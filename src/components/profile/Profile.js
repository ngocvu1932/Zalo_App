import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from  'react-native-safe-area-context'
import { styles } from './style'
import { Text, View, TextInput, Pressable, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronLeft, faCircleCheck, faEllipsis, faGear, faMessage, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../../config/axios';
import Toast from 'react-native-easy-toast';
import { useSelector } from 'react-redux';
import { socket } from '../../config/io';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

export const Profile = ({navigation, route}) => {
  const user = useSelector(state => state.user);
  const {phoneNumber} = route.params;
  const [isFriend, setIsFriend] = useState(false);
  const friendList = useSelector(state => state.listFriend);
  const [isUser, setIsUser] = useState(false); 
  const toastRef = useRef(null);
  const [dataUser, setDataUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [idUserGet, setIdUserGet] = useState();
  const [sendRequestFriend, setSendRequestFriend] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  // console.log("dataUser: ", dataUser.id); 

  // kiểm tra user có phải là chính mình không
  useEffect(() => {
    if (phoneNumber === user?.user?.user?.phoneNumber) {
      setIsUser(true);
    } else {
      setIsUser(false); 
    }
  }, [phoneNumber, user?.user?.user?.phoneNumber]);

  // kiểm tra xem đã check lời mời chưa
  useEffect(()=>{

  }, [])

  // kiểm tra trạng thái bạn bè
  useEffect(() => {
    const getStatusFriend = async () => {
      try {
        const response = await axios.get(`/users/friendShip?userId=${idUserGet}`);
        if (response.errCode === 0) {
          if (response.data.status === 'RESOLVE') {
            setIsFriend(true);
            setIsLoading(false);
          } else if (response.data.status === 'PENDING') {
            setIsFriend(false);
            setSendRequestFriend(true);
            setIsLoading(false);
          } else if (response.data.status === 'REJECT') {
            setIsFriend(false);
            setIsLoading(false);
          }
        } else if (response.errCode === 1) {
          // chưa gửi kết bạn
          setIsFriend(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error x: ', error); 
      }
    }
    if (!isCheck && idUserGet) {
      getStatusFriend();
    }
  }, [idUserGet, isCheck]);

  // lấy thông tin user
  useEffect(() => {
    const getProlife = async () => {
      try {
        const response = await axios.get(`/users/detail?phoneNumber=${phoneNumber}`);
        if (response.errCode === 0) {
          setDataUser(response.data);
          setIdUserGet(response.data.id);
          setIsCheck(false);
        } else {
          console.log("err: ", response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProlife();
  }, [phoneNumber]);

  // gửi yêu cầu kết bạn
  const sendRequestAddFriend = async () => {
    try {
      const response = await axios.post(`/users/friendShip`, {
        userId: idUserGet,
        content: 'Xin chào, tôi muốn kết bạn với bạn'
      });
      if (response.errCode === 0) {
        if (response.data.status === 'PENDING') {
          setSendRequestFriend(true);
          socket.then(socket => {
            socket.emit('send-add-friend', response.data);
          });
        }
      } else {
        setSendRequestFriend(false);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  if (isLoading) {
    return false;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.btnHeader} onPress={()=>{
          navigation.goBack()
        }}>
          <FontAwesomeIcon style={{marginLeft: 15}} color='#FFFFFF' size={21} icon={faChevronLeft} />
        </Pressable>
        <View style={{flexDirection:'row', flex: 1, justifyContent: 'flex-end'}}>
          { !isUser ? 
            <View style={{flexDirection: 'row', marginRight: 20}}>
              <Pressable onPress={() => {}} style={styles.btnHeader}>
                <FontAwesomeIcon style={{marginRight: 20}} color='#FFFFFF' size={22} icon={faPhone} />
              </Pressable>

              <Pressable onPress={() => {}} style={styles.btnHeader}>
                <FontAwesomeIcon style={{marginRight: 0}} color='#FFFFFF' size={22} icon={faGear} />
              </Pressable>
            </View>
          :
            '' 
          }
          <Pressable style={styles.btnHeader} onPress={() => {navigation.navigate('ProfileOptions', {items: dataUser, isUser: isUser, isFriend: isFriend})}}>
            <FontAwesomeIcon style={{marginRight:15}} color='#FFFFFF' size={22} icon={faEllipsis} />
          </Pressable>
        </View>
      </View>

      <View style={{height:"30%", width: '100%', position: 'absolute', top: 0, left: 0, right: 0}}>
        <Image source={{uri: 'https://res.cloudinary.com/ngocvu1932/image/upload/v1713151081/s8kdgofytlvf9ylpybju.jpg'}} style={{height:"100%", width:"100%"}}></Image>
      </View> 

      {/* body */}
      <View style={{position: 'absolute', top: '23%', alignSelf: 'center', width: '100%', height: '100%', alignItems: 'center'}}>
        <View style={{alignItems: 'center'}} > 
          { dataUser?.avatar.includes('rgb') ?
            <View style={{height: 120, width: 120, borderRadius: 70, backgroundColor: dataUser?.avatar, borderWidth: 3, borderColor: '#FFFFFF'}}></View>      
            : 
            '' 
          }
          
          <Text style={{fontWeight:'bold', fontSize: 18, marginBottom: 20}}> {dataUser?.userName} </Text>
        </View>

        { !isUser ? 
          isFriend ? (
            <View style={{width: '100%', alignItems: 'center', height: '100%'}}>
              <View style={{flexDirection: 'row'}}>
                <Pressable>
                  <Text> Ảnh</Text>
                </Pressable>

                <Pressable>
                  <Text> Video</Text>
                </Pressable>
              </View>

              <View style={{position: 'absolute', bottom: 600, right: '10%'}}>
                <Pressable style={[styles.btnChat]}>
                  <FontAwesomeIcon icon={faCommentDots} color='#0763EA' size={18} />
                  <Text style={{color: '#0763EA', fontSize: 16, fontWeight: '500', marginLeft: 10}}>Nhắn tin</Text> 
                </Pressable>
              </View>

            </View>
          ) : (
            <View style={{width: '100%', alignItems: 'center'}} >
              <View style={{width: '80%', alignItems: 'center'}}>
                {sendRequestFriend ? 
                  <Text style={{marginBottom: 10, textAlign: 'center'}}>Lời mời kết bạn đã được gửi đi. Hãy để lại tin nhắn cho {dataUser?.userName} trong lúc đợi chờ nhé!</Text>
                : 
                ''
                }
              </View>

              <View style={{width: '85%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable style={[styles.btnChat, sendRequestFriend ? {width: '48%'} : {width: '78%'}]}>
                  <FontAwesomeIcon icon={faCommentDots} color='#0763EA' size={18} />
                  <Text style={{color: '#0763EA', fontSize: 16, fontWeight: '500', marginLeft: 10}}>Nhắn tin</Text> 
                </Pressable>

                <Pressable style={[styles.btnAddFriend, sendRequestFriend ? {width: '48%'} : {width: '18%'}]} onPress={()=> sendRequestAddFriend()}>
                  { sendRequestFriend ? 
                    <Text style={{fontSize: 16, fontWeight: '500'}}>Hủy lời mời</Text> 
                  :
                    <FontAwesomeIcon icon={faUserPlus} size={21} />
                  }
                </Pressable>
              </View>
            </View>
          ) 
        : 
          (
            <View><Text>Cập nhật giới thiệu bản thân</Text></View>
          )
        }
      </View>
      <Toast style={{backgroundColor: 'green'}} ref={toastRef} position='center' />
    </SafeAreaView>
  )
}
