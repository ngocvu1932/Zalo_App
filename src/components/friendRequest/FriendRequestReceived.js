import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, LogBox, Pressable, ScrollView, Text, View } from "react-native";
import axios, { setAuthorizationAxios } from "../../config/axios";
import { socket } from '../../config/io';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styles } from './style'
import { useSelector } from "react-redux";

export const FriendRequestReceived = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [listFriendRequestReceived, setListFriendRequestReceived] = useState([]);
  const [loadAgainSocket, setLoadAgainSocket] =useState();
  const [loadAgain, setLoadAgain] =useState();
  const currentId = user.user?.user?.id;
   

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadAgainSocket(new Date());
      setLoadAgain(new Date());
    });

    return unsubscribe;
  }, [navigation]);

  // socket
  useEffect(() => {
    socket.then(socket => {
      // socket.emit('setup', currentId);
      socket.on('need-accept-addFriend', (data) => {
        setLoadAgain(data.createdAt);
        console.log('Is received FriendRequestReceived: ', data.createdAt);
      });
    });

    return () => {
      socket.then(socket => {
        socket.off('need-accept-addFriend');
      });
    };
  }, [loadAgainSocket]);

  useEffect(()=>{
    const getFriendRequestReceived = async () => {
      try {
        let listFriendRequest = null;
        const response = await axios.get(`/users/notifications/friendShip`);
        if(response.errCode ===0 ){
          listFriendRequest = response.data.map((item) => {
            return {
              id: item.id,
              content: item.content,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              sender: item.friendShip.sender,
            }
          });
        }
        setListFriendRequestReceived(listFriendRequest);
      } catch (error) { 
        console.log('error 1', error);
      }
    }

    getFriendRequestReceived();
  }, [loadAgain])

  const acceptFriendRequest = async (senderId) => {
    console.log('senderId', senderId);
    try {
      const response = await axios.put(`/users/friendShip`, {
        userId: senderId,
      });
      
      if (response.errCode === 0) {
        setLoadAgain(new Date());
        socket.then(socket => {
          socket.emit('send-add-friend', {createdAt: new Date()});
          console.log('send-add-friend', {createdAt: new Date()});
        });
      } else {
        console.log('Error', response);
      }

    } catch (error) {
      console.log('error 2', error);
    }
  }

  const rejectFriendRequest = async (senderId) => {
    try {
      const response = await axios.put(`/users/friendShip/reject`, {
        userId: senderId,
      });
      if (response.errCode === 0) {
        setLoadAgain(new Date());
        socket.then(socket => {
          socket.emit('send-add-friend', {createdAt: new Date()});
          console.log('send-add-friend', {createdAt: new Date()});
        });
      } else {
        console.log('Error', response);
      }
    } catch (error) {
      console.log('Error 3', error);
    }
  }

  const renderItem = ({item}) => {
    // console.log(`item`, item);
    const now = moment();
    const createdAt = moment(item.createdAt);
    const duration = moment.duration(now.diff(createdAt));
    // console.log('createdAt', createdAt.utcOffset('+07:00').format('HH:mm'));
    // console.log('days', duration.days(), 'hours', duration.hours(), 'minutes', duration.minutes(), 'seconds', duration.seconds());

    return (
      <View style={{height: 180, width: '100%', marginBottom: 10}}>
        <View style={{flexDirection: 'row', marginLeft: 15, marginTop: 10}}>
          {item.sender.avatar.includes('rgb') ? 
            <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: item.sender.avatar}}></View> 
          : ''   
          }
          <View style={{marginLeft: 10, width: '100%'}}>
            <Text style={{fontSize: 17}}>{item.sender.userName}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
            <Text style={{fontSize: 14}}>{duration.days() > 0 ? `${duration.days()} ngày trước  ` : duration.hours() > 0 ? `${duration.hours()} giờ trước  ` : duration.minutes() > 0 ? `${duration.minutes()} phút trước  ` : duration.seconds() > 0 ? `${duration.seconds()} giây trước  ` : 'Ngay bây giờ  ' }</Text>
              <FontAwesomeIcon icon={faCircle} size={5} />
              <Text style={{fontSize: 14}}>  Từ cửa sổ trò chuyện</Text> 
            </View>

            <View style={{width: '80%', height: 70, borderRadius: 8, borderWidth: 1, borderColor: '#E4E4E4', marginTop: 5}}>
              <Text style={{padding: 5, fontSize: 15}}>{item.content}</Text>
            </View>

            <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignItems: 'center'}}>
              <Pressable style={[styles.btn, {backgroundColor: '#F3F4F8'}]} onPress={()=> rejectFriendRequest(item.sender.id)}>
                <Text style={{fontSize: 16, color: '#232428'}}>Từ chối</Text>
              </Pressable>

              <Pressable style={[styles.btn, {backgroundColor: '#E9F6FF'}]} onPress={()=> acceptFriendRequest(item.sender.id)}>
                <Text style={{fontSize: 16, color: '#1680D9'}}>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{height:"100%", backgroundColor:'white'}}>
      <FlatList
        data={listFriendRequestReceived}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};
