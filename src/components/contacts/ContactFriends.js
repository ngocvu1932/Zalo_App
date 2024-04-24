import React, { useEffect, useState } from "react";
import { faCakeCandles, faCalculator, faList, faMessage, faUserPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, Pressable, ScrollView, StyleSheet} from "react-native";
import axios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setListFriend } from "../../redux/friendSlice";
import {socket} from '../../config/io';
import { styles } from "./style";


export const ContactFriends = ({ navigation }) => {
  // const user = useSelector(state => state.user);
  // const currentId = user.user.user.id;
  // // const [friendList, setFriendList] = useState([])
  // const dispatch = useDispatch();
  // const listFriend = useSelector(state => state.listFriend);
  // const [friendList, setFriendList] = useState(listFriend.listFriend);
  // var acceptFriend = useSelector(state => state.isAddFriend.isAddFriend);

  // useEffect(() => {
  //   fetchFriendList()
  // },[acceptFriend])
  
  // useEffect(() => {
  //   socket.then(socket => {
  //       socket.emit('setup');
  //       socket.on('connected', () => {
  //           console.log('Connected to server');
  //       });
  //       socket.on('new-group-chat', (data)=> {
  //         if(data!=null){
  //           fetchFriendList()
  //         }
  //       });
  //   });
  //   return () => {
  //       socket.then(socket => {
  //           socket.off('connected');
  //           socket.off('new-group-chat');
  //       });
  //   };
  // }, []); 

  // useEffect(() => {
  //   // fetchFriendList();
  // }, [navigation, friendList])
  
  // useEffect(() => {
  //   fetchFriendList()
  // },[])


  // async function fetchFriendList() {
  //   try {
  //     const res = await axios.get(`/users/friends?page=${1}&limit=${100}`);
  //     if(res.errCode === 0){
  //       const currentUserFriends = res.data.map(item => {
  //         if (item.user1Id === currentId) {
  //             return item.user2
  //         } else if (item.user2Id === currentId) {
  //             return item.user1
  //         }
  //       });
  //       setFriendList(currentUserFriends)
  //       dispatch(setListFriend(currentUserFriends))
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

  // const joinChatWithFriend = async (friendId) => {
  //   try {
  //     const response = await axios.get(`/chat/private?userId=${friendId}`);
  //     if(response.errCode === 0){
  //       if(response.data.participants[0].id === currentId){
  //         const newItem = {
  //           _id : response.data._id,
  //           avatar: response.data.participants[1].avatar,
  //           phoneNumber: response.data.participants[1].phoneNumber,
  //           updatedAt: response.data.updatedAt,
  //           userId: response.data.participants[1].id,
  //           userName: response.data.participants[1].userName,
  //           type:"PRIVATE_CHAT"
  //         }
  //         navigation.navigate('ChatMessage', {items: newItem}) 
  //       } else {
  //         const newItem = {
  //           _id : response.data._id,
  //           avatar: response.data.participants[0].avatar,
  //           phoneNumber: response.data.participants[0].phoneNumber,
  //           updatedAt: response.data.updatedAt,
  //           userId: response.data.participants[0].id,
  //           userName: response.data.participants[0].userName,
  //           type:"PRIVATE_CHAT"
  //         }
  //         navigation.navigate('ChatMessage', {items: newItem}) 
  //       }
  //     }
  //     else if(response.errCode === -1){
  //       const payload = {
  //         type: "PRIVATE_CHAT",
  //         participants: [currentId, friendId],
  //         status: true
  //       }
  //       try {
  //         const response2 = await axios.post('/chat/access', payload);
  //         if(response2.errCode === 0){
  //           if(response.data.participants[0].id === currentId){
  //             const newItem = {
  //               _id : response.data._id,
  //               avatar: response.data.participants[1].avatar,
  //               phoneNumber: response.data.participants[1].phoneNumber,
  //               updatedAt: response.data.updatedAt,
  //               userId: response.data.participants[1].id,
  //               userName: response.data.participants[1].userName,
  //               type:"PRIVATE_CHAT"
  //             }
  //             navigation.navigate('ChatMessage', {items: newItem}) 
  //           } else {
  //             const newItem = {
  //               _id : response.data._id,
  //               avatar: response.data.participants[0].avatar,
  //               phoneNumber: response.data.participants[0].phoneNumber,
  //               updatedAt: response.data.updatedAt,
  //               userId: response.data.participants[0].id,
  //               userName: response.data.participants[0].userName,
  //               type:"PRIVATE_CHAT"
  //             }
  //             navigation.navigate('ChatMessage', {items: newItem}) 
  //           }
  //         }
  //       } catch (error) {
  //       }
  //     }
  //   } catch (error) {
  //   }
  // }

  const user = useSelector(state => state.user);
  const currentId = user.user.user.id;
  const [friendList, setFriendList] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFriendList();
  }, [navigation])
  
  const fetchFriendList = async () => {
    try {
      const res = await axios.get(`/users/friends?page=${1}&limit=${10}`);
      if(res.errCode === 0){
        const currentUserFriends = res.data.map(item => {
          if (item.user1Id === currentId) {
              return item.user2
          } else if (item.user2Id === currentId) {
              return item.user1
          }
        });
        setFriendList(currentUserFriends)
        dispatch(setListFriend(currentUserFriends))
      }
    } catch (error) {
    }
  }

  const joinChatWithFriend = async (friendId) => {
    try {
      const response = await axios.get(`/chat/private?userId=${friendId}`);
      if(response.errCode === 0){
        if(response.data.participants[0].id === currentId){
          const newItem = {
            _id : response.data._id,
            avatar: response.data.participants[1].avatar,
            phoneNumber: response.data.participants[1].phoneNumber,
            updatedAt: response.data.updatedAt,
            userId: response.data.participants[1].id,
            userName: response.data.participants[1].userName,
            type:"PRIVATE_CHAT"
          }
          navigation.navigate('ChatMessage', {items: newItem}) 
        } else {
          const newItem = {
            _id : response.data._id,
            avatar: response.data.participants[0].avatar,
            phoneNumber: response.data.participants[0].phoneNumber,
            updatedAt: response.data.updatedAt,
            userId: response.data.participants[0].id,
            userName: response.data.participants[0].userName,
            type:"PRIVATE_CHAT"
          }
          navigation.navigate('ChatMessage', {items: newItem}) 
        }
      }
      else if(response.errCode === -1){
        const payload = {
          type: "PRIVATE_CHAT",
          participants: [currentId, friendId],
          status: true
        }
        try {
          const response2 = await axios.post('/chat/access', payload);
          if(response2.errCode === 0){
            if(response.data.participants[0].id === currentId){
              const newItem = {
                _id : response.data._id,
                avatar: response.data.participants[1].avatar,
                phoneNumber: response.data.participants[1].phoneNumber,
                updatedAt: response.data.updatedAt,
                userId: response.data.participants[1].id,
                userName: response.data.participants[1].userName,
                type:"PRIVATE_CHAT"
              }
              navigation.navigate('ChatMessage', {items: newItem}) 
            } else {
              const newItem = {
                _id : response.data._id,
                avatar: response.data.participants[0].avatar,
                phoneNumber: response.data.participants[0].phoneNumber,
                updatedAt: response.data.updatedAt,
                userId: response.data.participants[0].id,
                userName: response.data.participants[0].userName,
                type:"PRIVATE_CHAT"
              }
              navigation.navigate('ChatMessage', {items: newItem}) 
            }
          }
        } catch (error) {
        }
      }
    } catch (error) {
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white"}}>
      <View style={{padding:10}}>
        <Pressable style={styles.btnWrapper} onPress={()=>{ navigation.navigate('FriendRequest') }}>
          <View style={styles.viewIcon}>
            <FontAwesomeIcon size={18} color={"#FFFFFF"} icon={faUserPlus} />
          </View>
          <Text style={styles.btnTxt}>Lời mời kết bạn</Text>
        </Pressable>

        <Pressable style={styles.btnWrapper}>
          <View style={styles.viewIcon}>
            <FontAwesomeIcon size={18} color={"#FFFFFF"} icon={faList} />
          </View>
          <Text style={styles.btnTxt}>Danh bạ máy</Text>
        </Pressable>

        <Pressable style={styles.btnWrapper}> 
          <View style={styles.viewIcon}>
            <FontAwesomeIcon size={18} color={"#FFFFFF"} icon={faCakeCandles} />
          </View>
          <Text style={styles.btnTxt}>Lịch sinh nhật</Text>
        </Pressable>
      </View>
      
      <View style={{flexDirection: 'row'}}>
        <Pressable style={styles.btnSelect}> 
          <Text style={{fontWeight:"bold", fontSize:14}}>Tất cả</Text>
          <Text style={{fontSize:16, marginLeft: 10}}>{friendList.length}</Text>
        </Pressable>
        
        <Pressable style={styles.btnSelect}> 
          <Text style={{fontWeight:"bold", fontSize:14}}>Tất cả</Text>
          <Text style={{fontSize:16, marginLeft: 10}}>{friendList.length}</Text>
        </Pressable>
      </View>
      
      {friendList.map((friend, index)=>(
        <Pressable key={index} style={{ width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:8, paddingLeft:20, paddingRight:20}} onPress={()=>{
          joinChatWithFriend(friend.id)
        }}>
          <View style={{height: 45, width: 45, borderRadius: 50, backgroundColor: friend.avatar}}></View>
          <Text style={{fontWeight:"bold", paddingRight:25, width:"56%"}}>{ friend.userName}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Pressable>
              <FontAwesomeIcon size={22} color={"#0091FF"} icon={faMessage} style={{padding:10}}/>
            </Pressable>
            <Pressable style={{marginLeft:20}}>
              <FontAwesomeIcon size={30} color={"#0091FF"} icon={faVideo} style={{padding:10}}/>
            </Pressable>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};
