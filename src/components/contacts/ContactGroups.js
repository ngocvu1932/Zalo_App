import { Image, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { faMessage, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from '../../config/axios'
import { useState } from 'react'
import { socket } from '../../config/io';

export const ContactGroups = ({navigation}) => {
  const [dataGroups, setDataGroups] = useState([])
  const [loadAgain, setLoadAgain] =useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadAgain(new Date());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchListGroups()
  },[dataGroups])

  // useEffect(() => {
  //   socket.then(socket => {
  //       socket.emit('setup');
  //       socket.on('connected', () => {
  //           console.log('Connected to server');
  //       });
  //       socket.on('new-group-chat', (data)=> {
  //         if(data!= null){
  //           setDataGroups(dataGroups => [...dataGroups, data])
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

  async function fetchListGroups() {
    try {
      const res = await axios.get(`/chat/pagination?page=1&limit=100`);
      if(res.errCode === 0){
        const dataGroups = res.data.filter(item => item.type == "GROUP_CHAT")
        setDataGroups(dataGroups)
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  const joinChatWithGroup = async (item) => {
    const newItem = {
      _id: item._id,
      userName: item.name,
      avatar: item.groupPhoto,
      updatedAt: item.updatedAt,
      type: "GROUP_CHAT"
    }
    console.log("newItem group", newItem);
    navigation.navigate('ChatMessage', {items: newItem})
  }
  return (
    <ScrollView style={{backgroundColor:"white", height:"100%"}}>
      <View style={{backgroundColor: 'red'}}>
        <Pressable style={{flexDirection:"row", alignItems:'center', marginLeft:20, paddingTop:20, paddingBottom:10}} onPress={()=>{
          navigation.navigate('CreateGroup')
        }}>
          <View style={{width:40, height:40, borderRadius:50, backgroundColor:"#0091FF", alignItems:'center', justifyContent:'center'}}>
            <FontAwesomeIcon size={20} color={"#FFFFFF"} icon={faUserGroup} />
          </View>
          <Text style={{color:"black", fontSize:16, marginLeft:15, fontWeight:'500'}}>Tạo nhóm mới</Text>
        </Pressable>
      </View>
      <Text style={{padding:16, fontSize:14, fontWeight:'500', fontStyle:'italic'}}>Nhóm đang tham gia {`(${dataGroups.length})`}</Text>
      {dataGroups.map((group, index)=>(
        <Pressable key={index} style={{ width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:10, paddingLeft:20, paddingRight:20}} onPress={()=>{
          joinChatWithGroup(group)
        }}>
          <Image source={{uri : group.groupPhoto}} style={{height:45, width:45, borderRadius:50}}></Image>
          <Text style={{fontWeight:"bold", paddingRight:25, width:"56%"}}>{group.name}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text>2h</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  )
}