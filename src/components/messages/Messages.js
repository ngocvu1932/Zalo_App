import { Text, View, FlatList, Image, Pressable, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faQrcode, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios, { setAuthorizationAxios } from '../../config/axios'
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { socket } from '../../config/io';

export const Messages = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [access_token, setAccess_Token] = useState('');
  const [chatInfo, setChatInfo] = useState([]);
  const [loadAgain, setLoadAgain] =useState();
  const [loadAgainFocus, setLoadAgainFocus] =useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadAgainFocus(new Date());
    });

    return unsubscribe;
  }, [navigation]);

  // socket
  useEffect(() => {
    socket.then(socket => {
        socket.emit('setup'); 
        socket.on('connected', (data) => {
            console.log('Connected to server chat');
        });

        socket.on('receive-message', (data) => {
            console.log('receive-message', data);
        });

        // socket.on('re-sendMessageRe', (data) => {
        //   console.log('re-sendMessageRe', data);
        // });

        // socket.on('receive-modify-message', (data) => {
        //     if (data) {
        //         setLoadAgain(true);
        //     }
        // });

        // socket.on('receive-issend-message', (data) => {
        //     if (data) {
        //         setIsSend(true);
        //     }
        // });
    });

    return () => {
        socket.then(socket => {
            socket.off('connected');
            socket.off('receive-message');
            // socket.off('receive-modify-message');
            // socket.off('receive-issend-message');
        });
    };
}, []);

  useEffect(() => {
    setAccess_Token(user.user?.access_token);
    setAuthorizationAxios(user.user?.access_token);
  }, [user])

  // Load chat  
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get('/chat/pagination?page=1&limit=100');
        if (response.errCode === 0) { 
          setChatData(response.data);
          setIsLoading(false);
        } else if (response.errCode === 1) {
          setChatData([]);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error fetching chat  1:', error);
        resetToScreen(navigation, 'Login');
      }
    };

    fetchChat(); 
  }, [access_token, loadAgain, loadAgainFocus]); 

  useEffect(() => {
    const dataChat = chatData.map((item) => {
      if (item.type?.includes('PRIVATE_CHAT')) {
        if (item.participants[0]?.id === user.user?.user?.id) {
          return {
            _id: item._id,
            userName: item.participants[1]?.userName,
            phoneNumber: item.participants[1]?.phoneNumber,
            avatar: item.participants[1]?.avatar,
            updatedAt: item.updatedAt,
            userId: item.participants[1]?.id,
            type: "PRIVATE_CHAT",
            lastedMessage: item.lastedMessage,
            lastedOnline: item.participants[1]?.lastedOnline
          };
        } else {
          return {
            _id: item._id,
            userName: item.participants[0]?.userName,
            phoneNumber: item.participants[0]?.phoneNumber,
            avatar: item.participants[0]?.avatar,
            updatedAt: item.updatedAt,
            userId: item.participants[0]?.id,
            type: "PRIVATE_CHAT",
            lastedMessage: item.lastedMessage,
            lastedOnline: item.participants[0]?.lastedOnline
          };
        }
      } else if (item.type.includes('GROUP_CHAT')) {
        return {
          _id: item._id,
          userName: item.name,
          avatar: item.groupPhoto,
          updatedAt: item.updatedAt,
          userId: item.participants[0]?.id,
          type: "GROUP_CHAT",
          lastedMessage: item.lastedMessage,
          administrator: item.administrator,
          participants: item.participants.map(participant => ({...participant}))
        };
      }
      return null;
    });
    setChatInfo(dataChat);
  }, [chatData]);

  // Trong một component hoặc bất kỳ nơi nào muốn thực hiện việc xóa các màn hình trước đó
  const resetToScreen = (navigation, routeName) => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    }));
  };

  const renderItem = ({ item }) => {
    const { lastedMessage, ...rest } = item;
    return (
      <View style={{width: '100%'}}>
        <Pressable style={styles.btnSelectChat} onPress={() => {navigation.navigate('ChatMessage', { items: {...rest}, flag: false})}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
          {item.type?.includes('PRIVATE_CHAT') ? 
            item.avatar?.includes('rgb')? 
              <View style={{height: 60, width: 60, backgroundColor: item.avatar, borderRadius: 30}} />
            : 
              <Image style={{height: 60, width: 60, borderRadius: 30}} source={{uri: item.avatar}} />
          : 
          // group chat
            <View style={{height: 60, width: 60}}>
              {item.avatar ? 
                <Image source={{uri: item.avatar}} style={{height: 60, width: 60, borderRadius: 30}} /> 
              : item.participants?.map((participant, index) => (
                  index < 4 ? 
                    item.participants?.length <= 3 ? // nhoms cos 3 nguowif
                      <View key={index} style={[
                        {height: 30, width: 30}, 
                        index === 0 ? styles.position0 :
                          index === 1 ? styles.position1 :
                            styles.position2
                        ]}
                      >
                        {participant.avatar.includes('rgb') ? 
                          <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                        : 
                          <Image source={{uri: participant.avatar}} style={styles.avtGroup} />
                        }
                      </View>
                    : item.participants?.length === 4 ? //nhoms cos 4 nguoi
                      <View key={index} style={[
                        {height: 30, width: 30}, 
                        index === 0 ? styles.position0_1 :
                          index === 1 ? styles.position1_1 : 
                            index === 2 ? styles.position2_1 :
                            styles.position3_1
                        ]}
                      >
                        {participant.avatar.includes('rgb') ? 
                          <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                        : 
                          <Image source={{uri: participant.avatar}} style={styles.avtGroup} />
                        }
                      </View>
                    : item.participants?.length > 4 ? // nhoms 5 nguoi tro len
                      <View key={index} style={[
                        {height: 30, width: 30}, 
                        index === 0 ? styles.position0_1 :
                          index === 1 ? styles.position1_1 : 
                            index === 2 ? styles.position2_1 :
                            [styles.position3_1, {backgroundColor: '#E9ECF3', justifyContent: 'center', alignItems: 'center', borderRadius: 15, height: 28, width: 28}]
                        ]}
                      >
                        {participant.avatar.includes('rgb') ? 
                          <View style={{}}>
                            {index === 3 ? 
                              <Text>{item.participants.length - index}</Text> 
                            : 
                              <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                            }
                          </View>
                        : 
                          <View style={{}}>
                            {index === 3 ? 
                              <Text>{item.participants.length - index}</Text> 
                            : 
                              <Image source={{uri: participant.avatar}} style={styles.avtGroup} />
                            }
                          </View>
                        }
                      </View>
                    : ''
                  : ''
              ))
              }
            </View>
          }

            <View style={{ flex: 1, marginLeft: 15 }}> 
              <Text numberOfLines={1} style={{ fontSize: 20, marginBottom: 3 }}>{item?.userName}</Text>
              <Text style={{ marginTop: 3 }}>
                {
                  item.lastedMessage?.type === 'TEXT' ?
                    item.lastedMessage?.content
                    : item.lastedMessage?.type === 'IMAGE' ? 'Đã gửi 1 ảnh' : 'Đã gửi 1 video'
                }
              </Text>
            </View>
            <Text>{moment.utc(item.lastedMessage?.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>
          </View>
        </Pressable>
        {renderLine()}
      </View>
    )
  }; 

  const renderLine = () => (
    <View style={styles.line}>
      <View style={styles.line1} >
      </View>
      <View style={styles.line2}>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#008BFA', '#00ACF4']} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <View style={{height: '55%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <FontAwesomeIcon size={22} style={styles.icon} icon={faSearch} />
          <TextInput style={styles.searchTxt} placeholder="Tìm kiếm" placeholderTextColor={'#FFFFFF'}/>
          
          <View style={styles.actionIcons}>
            <Pressable onPress={() => {navigation.navigate('QRCodeScanner')}}>
              <FontAwesomeIcon size={22} style={styles.icon} icon={faQrcode} />
            </Pressable>

            <Pressable onPress={() => {}}>
              <FontAwesomeIcon size={22} style={[styles.icon, { marginLeft: 15 }]} icon={faPlus} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {isLoading ? 
            <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
              <ActivityIndicator size="large" color="black" />
            </View> 
          : 
          chatInfo.length !==0 ? 
            <FlatList
              data={chatInfo}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
            :
            <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
              <Text style={{fontSize: 18}}>Không có tin nhắn nào</Text>
            </View>
        }
      </View>
    </View>
  );
};