import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { styles } from './style'
import { Text, View, Pressable, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEllipsis, faGear, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../../config/axios';
import Toast from 'react-native-easy-toast';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../config/io';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { setUserInfo } from '../../redux/userInfoSlice';
import { Video, Audio } from 'expo-av';

export const Profile = ({navigation, route}) => {
  const user = useSelector(state => state.user);
  const userInfo = useSelector(state => state.userInfo);
  const currentId = user?.user?.user?.id;
  const dispatch = useDispatch();
  const {phoneNumber, isUser} = route.params;
  const [isFriend, setIsFriend] = useState(false);
  const toastRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idUserGet, setIdUserGet] = useState();
  const [sendRequestFriend, setSendRequestFriend] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [checkUserSendRequest, setCheckUserSendRequest] = useState(false);
  const [loadAgainSocket, setLoadAgainSocket] =useState();
  const [loadAgain, setLoadAgain] =useState();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const {width, height} = Dimensions.get('screen');
  const SCROLL_THRESHOLD = height * 0.3;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadAgain(new Date());
      setLoadAgainSocket(new Date());
    });

    return unsubscribe;
  }, [navigation]);

  // socket
  useEffect(() => {
    socket.then(socket => {
      // socket.emit('setup', currentId);
      socket.on('need-accept-addFriend', (data) => {
        setLoadAgain(data.createdAt);
        console.log('Is received', data.createdAt);
      });
    });

    return () => {
      socket.then(socket => {
        socket.off('need-accept-addFriend');
      });
    };
  }, [loadAgainSocket]);

  // kiểm tra trạng thái bạn bè
  useEffect(() => {
    const getStatusFriend = async () => {
      try {
        const response = await axios.get(`/users/friendShip?userId=${idUserGet}`);
        // console.log('response1 :', response);
        if (response.errCode === 0) {
          if (response.data.status === 'RESOLVE') {
            setIsFriend(true);
            setIsLoading(false);
          } else if (response.data.status === 'PENDING') {
            setIsFriend(false);
            setSendRequestFriend(true);
            setIsLoading(false);
          } else if (response.data.status === 'REJECT') {
            setSendRequestFriend(false);
            setIsFriend(false);
            setIsLoading(false);
          } else if (response.data.status === 'OLD_FRIEND') {
            setIsFriend(false);
            setIsLoading(false);
          }

          if (response.data.sender.id === currentId) {
            setCheckUserSendRequest(true);
            setIsLoading(false);
          } else {
            setCheckUserSendRequest(false);
            setIsLoading(false);
          }
        } else if (response.errCode === 1) {
          setIsFriend(false);
          setSendRequestFriend(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error 1: ', error); 
      }
    }
    
    if (isCheck && idUserGet) {
      getStatusFriend();
    }
    
  }, [idUserGet, isCheck, loadAgain]);

  // lấy thông tin user
  useEffect(() => {
    const getProlife = async () => {
      try {
        const response = await axios.get(`/users/detail?phoneNumber=${phoneNumber}`);
        if (response.errCode === 0) {
          setIsCheck(true);
          setIdUserGet(response.data.id);
          dispatch(setUserInfo(response.data));
        } else {
          console.log("Error 2: ", response);
        }
      } catch (error) {
        console.log("Error 3: ",error);
      } 
    }
      
    getProlife();
  }, [phoneNumber, isUser]);

  useLayoutEffect(() => {
    const scrollableHeight = scrollViewContentHeight - scrollViewHeight;
    if (scrollableHeight > 0) {
      setIsScrollable(true);
    } else {
      setIsScrollable(false);
    }
  }, [scrollViewContentHeight, scrollViewHeight]);

  // gửi yêu cầu kết bạn
  const sendRequestAddFriend = async () => {
    try {
      const response = await axios.post(`/users/friendShip`, {
        userId: idUserGet, 
        content: 'Xin chào, tôi muốn kết bạn với bạn'
      });

      // console.log('res', JSON.stringify(response));
      if (response.errCode === 0) {
        
        if (response.data.status === 'PENDING') {
          setLoadAgain(new Date()); 
          setSendRequestFriend(true);
          socket.then(socket => {
            socket.emit('send-add-friend', response.data);
          });
        }
      } else if (response.errCode === 3) {
        setSendRequestFriend(false);
        socket.then(socket => {
          socket.emit('send-add-friend', response);
        });
      } else {
        setSendRequestFriend(false);
      }
    } catch (error) {
      console.log('Error 4: ', error.message);
    }
  };

  const joinChat = async () => {
    try {
      const response = await axios.get(`/chat/private?userId=${idUserGet}`);
      if (response.errCode === 0) {
        if (response.data.participants[0].id === currentId) {
          const data = {
            _id: response.data._id,
            avatar: response.data.participants[1].avatar,
            phoneNumber: response.data.participants[1].phoneNumber,
            type: response.data.type,
            updatedAt: response.data.updatedAt,
            userId: response.data.participants[1].id,
            userName: response.data.participants[1].userName,
            lastedOnline: response.data.participants[1].lastedOnline,
          };
          navigation.navigate('ChatMessage', {items: data});
        } else if (response.data.participants[1].id === currentId) {
          const data = {
            _id: response.data._id,
            avatar: response.data.participants[0].avatar,
            phoneNumber: response.data.participants[0].phoneNumber,
            type: response.data.type,
            updatedAt: response.data.updatedAt,
            userId: response.data.participants[0].id,
            userName: response.data.participants[0].userName,
            lastedOnline: response.data.participants[0].lastedOnline,
          };
          navigation.navigate('ChatMessage', {items: data});
        }
      } else if (response.errCode === -1) {
        try {
          const response = await axios.post('/chat/access', {
            "type": "PRIVATE_CHAT",
            "participants": [currentId, idUserGet],
            "status": true
          })
          if (response.errCode === 0) {
            if (response.data.participants[0].id === currentId) {
              const data = {
                _id: response.data._id,
                avatar: response.data.participants[1].avatar,
                phoneNumber: response.data.participants[1].phoneNumber,
                type: response.data.type,
                updatedAt: response.data.updatedAt,
                userId: response.data.participants[1].id,
                userName: response.data.participants[1].userName,
                lastedOnline: response.data.participants[1].lastedOnline,
              };
              navigation.navigate('ChatMessage', {items: data});
            } else if (response.data.participants[1].id === currentId) {
              const data = {
                _id: response.data._id,
                avatar: response.data.participants[0].avatar,
                phoneNumber: response.data.participants[0].phoneNumber,
                type: response.data.type,
                updatedAt: response.data.updatedAt,
                userId: response.data.participants[0].id,
                userName: response.data.participants[0].userName,
                lastedOnline: response.data.participants[0].lastedOnline,
              };
              navigation.navigate('ChatMessage', {items: data});
            }
          }
        } catch (error) {
          console.log('Error 5: ', error);
        }
      }
    } catch (error) {
      console.log('Error 6: ', error);
    }
  }

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > SCROLL_THRESHOLD) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  if (isLoading) { 
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      {isScrolling ? 
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: '4.5%', backgroundColor: '#FFFFFF', zIndex: 9}}>
        </View> 
        :
        ''
      }
      <View style={[{position: 'absolute', top: '4.5%', left: 0, right: 0,  width: '100%', zIndex: 10}, isScrolling ? {backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#D4D4D4'}: '']} >
        <View style={{flexDirection: 'row'}}>
          <Pressable style={{marginLeft: 10, flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'flex-start', minWidth: 40}} onPress={()=>{navigation.goBack()}}>
            <FontAwesomeIcon style={[{marginLeft: 5}, isScrolling ? {color: 'black'} : {color: '#FFFFFF'}]} size={21} icon={faChevronLeft} />
            {isScrolling ? 
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    { typeof userInfo.userInfo?.avatar === 'string'? 
                      <View style={{height: 30, width: 30, backgroundColor: userInfo.userInfo?.avatar , borderRadius: 15}}></View>: 
                      
                      ''
                      // Image ở đây
                    }

                    <Text style={{fontWeight:'bold', fontSize: 18, marginLeft: 10}}>{userInfo.userInfo?.userName}</Text>
                  </View>
              </View> 
            : ''}
          </Pressable>

          <View style={{flexDirection:'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            { !isUser ? 
              <View style={{flexDirection: 'row', marginRight: 5, alignItems: 'center'}}>
                <Pressable onPress={() => {}} style={[styles.btnHeader, {marginRight: 5}]}>
                  <FontAwesomeIcon style={isScrolling ? {color: 'black'} : {color: '#FFFFFF'}} size={21} icon={faPhone} />
                </Pressable>

                <Pressable onPress={() => {}} style={[styles.btnHeader, {}]}>
                  <FontAwesomeIcon style={isScrolling ? {color: 'black'} : {color: '#FFFFFF'}} size={21} icon={faGear} />
                </Pressable>
              </View>
            :
              '' 
            }
            <Pressable style={[styles.btnHeader, {marginRight: 5}]} onPress={() => {navigation.navigate('ProfileOptions', {isUser: isUser, isFriend: isFriend})}}>
              <FontAwesomeIcon style={isScrolling ? {color: 'black'} : {color: '#FFFFFF'}}  size={21} icon={faEllipsis} />
            </Pressable>
          </View>
        </View>

        {!isScrolling ? 
        (<View>
          <Text>Ở đây là nhạc</Text>
        </View>): ''}
      </View>

      <ScrollView onScroll={handleScroll} scrollEventThrottle={70} showsVerticalScrollIndicator={false} >
        <View style={[styles.header, {width: '100%', height: height * 0.3}]}>
          <View style={{width: '100%', height: '100%', zIndex: 0}}>
            <Image source={{uri: 'https://res.cloudinary.com/ngocvu1932/image/upload/v1714486268/bgVsCode/kbdwbuprkwqyz54zovxu.jpg'}} style={{height:"100%", width:"100%"}}></Image>
          </View> 
        </View>

        <View style={{alignItems: 'center', marginTop: '-15%'}} >  
          {/* khúc này là ảnh đại diện và bio */}
          <View style={{alignItems: 'center'}}>
            {userInfo.userInfo?.avatar.includes('rgb') ?
              <View style={{height: 140, width: 140, borderRadius: 100, backgroundColor: userInfo.userInfo?.avatar, borderWidth: 3, borderColor: '#FFFFFF'}} /> 
            : 
              <Image source={{uri: userInfo.userInfo?.avatar }} style={{height: 140, width: 140, borderRadius: 100, borderWidth: 3, borderColor: '#FFFFFF'}} />
            }
            <Text style={{fontWeight:'bold', fontSize: 18, marginBottom: 20}}> {userInfo.userInfo?.userName} </Text>
          </View>
        
          {
            userInfo?.userInfo?.description ? 
              <Text>{userInfo.userInfo.description}</Text> : 
              isUser ? 
              <View>
                <Text>Cập nhật giới thiệu bản thân</Text>
              </View> 
              : '' 
          }
        </View>

        { !isUser ? 
          isFriend ? (
            // Không phải chính mình và là bạn bè
            <View style={{width: '100%', alignItems: 'center', height: '100%'}}>
              <View style={{flexDirection: 'row'}}>
                <Pressable>
                  <Text> Ảnh</Text>
                </Pressable>

                <Pressable>
                  <Text> Video</Text>
                </Pressable>
              </View>

              <View style={{}}>
                <Pressable style={[styles.btnChat]} onPress={()=> alert('re')}>
                  <FontAwesomeIcon icon={faCommentDots} color='#0763EA' size={18} />
                  <Text style={{color: '#0763EA', fontSize: 16, fontWeight: '500', marginLeft: 10}}>Nhắn tin</Text> 
                </Pressable>
              </View>

            </View>
          ) : (
            // Không phải chính mình và không là bạn bè
            <View style={{width: '100%', alignItems: 'center', backgroundColor: 'red'}} >
              <View style={{width: '80%', alignItems: 'center'}}>
                {sendRequestFriend ? 
                  checkUserSendRequest ? <Text style={{marginBottom: 10, textAlign: 'center'}}>Lời mời kết bạn đã được gửi đi. Hãy để lại tin nhắn cho {userInfo?.userName} trong lúc đợi chờ nhé!</Text> 
                  :
                  <Text style={{marginBottom: 10, textAlign: 'center'}}> {userInfo?.userName} đã gửi cho bạn lời mời kết bạn!</Text>
                : 
                ''
                }
              </View>

              <View style={{width: '85%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'violet' }}>
                <Pressable style={[styles.btnChat, sendRequestFriend ? {width: '48%'} : {width: '78%'}]} onPress={()=> joinChat()}>
                  <FontAwesomeIcon icon={faCommentDots} color='#0763EA' size={18} />
                  <Text style={{color: '#0763EA', fontSize: 16, fontWeight: '500', marginLeft: 10}}>Nhắn tin</Text> 
                </Pressable>

                <Pressable style={[styles.btnAddFriend, sendRequestFriend ? {width: '48%'} : {width: '18%'}]} onPress={()=> {sendRequestAddFriend()}}>
                  { sendRequestFriend ? 
                    checkUserSendRequest ? 
                      <Pressable style={[styles.btnAddFriend, {width: '100%'}]} onPress={()=> sendRequestAddFriend()}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Hủy lời mời</Text> 
                      </Pressable>
                      : 
                      <Pressable style={[styles.btnAddFriend, {width: '100%'}]} onPress={()=> alert('Chấp nhận')}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Chấp nhận</Text>
                      </Pressable>
                    :
                    <FontAwesomeIcon icon={faUserPlus} size={21} />
                  }
                </Pressable>
              </View>
              <View style={{marginBottom: 800}} ></View>
            </View>
          ) 
        : 
          (
            // Chính mình
            <View style={{ alignItems: 'center'}}>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Text>Cập nhật giới thiệu bản thân</Text>
              <Video
                source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}} // Đường dẫn đến video
                style={{width: 300, height: 200}}
                useNativeControls // Sử dụng controls mặc định của hệ thống
                resizeMode="contain" // Đặt chế độ hiển thị của video
              />
              <Text>Vũ đây nè</Text>
            </View>
          )
        }

       
      </ScrollView>
      <Toast style={{backgroundColor: 'green'}} ref={toastRef} position='center' />
    </View>
  )
}