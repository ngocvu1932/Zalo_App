import { Text, View, FlatList, Image, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faQrcode, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios, { setAuthorizationAxios } from '../../config/axios'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setListFriend } from '../../redux/friendSlice'; 

export const Messages = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [access_token, setAccess_Token] = useState('');
  const [chatInfo, setChatInfo] = useState([]);
  const dispatch = useDispatch();
  var isCreate = useSelector(state => state.isCreateGroup.isCreateGroup);

  useEffect(() => {
    setAccess_Token(user.user?.access_token);
    setAuthorizationAxios(user.user?.access_token);
  }, [user])

  // console.log('chatData:', chatData);

  // Load chat 
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get('/chat/pagination?page=1&limit=100');
        if (response.errCode === 0) {
          setChatData(response.data);
          setIsLoading(false);
        } else if (response.errCode === 1) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error fetching chat  1:', error);
        resetToScreen(navigation, 'Login');
      }
    };

    fetchChat();
  }, [access_token, isCreate]);

  useEffect(() => {
    const dataChat = chatData.map((item) => {
      if (item.type.includes('PRIVATE_CHAT')) {
        if (item.participants[0].id === user.user?.user?.id) {
          return {
            _id: item._id,
            userName: item.participants[1].userName,
            phoneNumber: item.participants[1].phoneNumber,
            avatar: item.participants[1].avatar,
            updatedAt: item.updatedAt,
            userId: item.participants[1].id,
            type: "PRIVATE_CHAT",
            lastedMessage: item.lastedMessage
          };
        } else {
          return {
            _id: item._id,
            userName: item.participants[0].userName,
            phoneNumber: item.participants[0].phoneNumber,
            avatar: item.participants[0].avatar,
            updatedAt: item.updatedAt,
            userId: item.participants[0].id,
            type: "PRIVATE_CHAT",
            lastedMessage: item.lastedMessage
          };
        }
      } else if (item.type.includes('GROUP_CHAT')) {
        return {
          _id: item._id,
          userName: item.name,
          avatar: item.groupPhoto,
          updatedAt: item.updatedAt,
          userId: item.participants[0].id,
          type: "GROUP_CHAT",
          lastedMessage: item.lastedMessage,
          administrator: item.administrator
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

  useEffect(() => {
    fetchFriendList();
  }, [])


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    console.log('item:', item.avatar);
    return (
      <Pressable style={styles.btnSelectChat} onPress={() => {
        navigation.navigate('ChatMessage', { items: item });
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
          {item.avatar.includes('rgb') ?
            <View style={{ height: 45, width: 45, borderRadius: 30, backgroundColor: item.avatar, justifyContent: 'center', alignItems: 'center' }}>
            </View>
            :
            <Image source={{uri: item.avatar}} style={{height: 45, width: 45, borderRadius: 30}}></Image>
          }

          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={{ fontSize: 20, marginBottom: 3 }}>{item.userName}</Text>
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
        <View></View>

      </Pressable>
    )
  };


  // thuan
  async function fetchFriendList() {
    try {
      const res = await axios.get(`/users/friends?page=${1}&limit=${10}`);
      if (res.errCode === 0) {
        const newItem = []
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].user1Id == user.user.user.id) {
            newItem.push(res.data[i].user2)
          } else {
            newItem.push(res.data[i].user1)
          }
        }
        dispatch(setListFriend(newItem));
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleAvatar = (item) => {
    const fullName = item.userName
    const words = fullName.split(' ');
    const lastWord = words[words.length - 1];
    const secondLastWord = words.length > 1 ? words[words.length - 2] : '';
    const [r, g, b] = item?.avatar?.match(/\d+/g)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return {
      initials: (secondLastWord.charAt(0) || '') + (lastWord.charAt(0) || ''),
      color: brightness > 125 ? 'black' : 'white'
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBtnWrapper}>
          <FontAwesomeIcon size={27} style={styles.icon} icon={faSearch} />
          <TextInput style={styles.searchTxt} placeholder="Tìm kiếm" />
        </View>

        <View style={styles.actionIconsWrapper}>
          <Pressable onPress={() => {
            navigation.navigate('QRCodeScanner');
          }}>
            <FontAwesomeIcon size={25} style={styles.icon} icon={faQrcode} />
          </Pressable>

          <Pressable onPress={() => {
            // navigation.navigate('QRReader');
          }}>
            <FontAwesomeIcon size={25} style={[styles.icon, { marginLeft: 10 }]} icon={faPlus} />
          </Pressable>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={chatInfo}
          renderItem={renderItem}
        // keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  );
};