import { View, Text, FlatList, Modal, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable } from 'react-native'
import axios from '../../config/axios'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useSelector } from 'react-redux'
import {socket}  from '../../config/io'

export const AllMembers = ({navigation, items}) => {
  console.log("items abc", items);
  const [members, setMembers] = useState(null)
  const [leader, setLeader] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [isLeader, setIsLeader] = useState(false)
  const [idMember, setIdMember] = useState('')
  const currentId = useSelector(state => state.user.user.user.id);

  useEffect(() => {
    getListGroupChat()
  },[])

  // useEffect(() => {
  //   socket.then(socket => {
  //       socket.emit('setup');
  //       socket.on('connected', () => {
  //           console.log('Connected to server');
  //       });
  //       socket.on('new-group-chat', async (data)=> {
  //         if(data!= null){
  //           const response = await axios.get(`/chat/pagination?page=1&limit=1000`);
  //           if (response.errCode === 0) {
  //             const groupList = response.data.filter(item => item.type === "GROUP_CHAT");
  //             const group = groupList.find(item => item._id === items._id);
  //             const leaderId = group?.administrator;
          
  //             if (leaderId === currentId) {
  //               setIsLeader(true);
  //             } else {
  //               setIsLeader(false);
  //             }
  //             // const uniqueParticipantIds = new Set();
  //             // const uniqueParticipants = [];
  //             // group?.participants.forEach(participant => {
  //             //   if (!uniqueParticipantIds.has(participant.id)) {
  //             //     uniqueParticipantIds.add(participant.id)
  //             //     uniqueParticipants.push(participant)
  //             //   }
  //             // })
  //             setLeader(group.participants.find(item => item.id === leaderId))
  //             // setMembers(uniqueParticipants)
  //             setMembers(group.participants)}  
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

  const getListGroupChat = async () => {
    // try {
    //   const response = await axios.get(`/chat/pagination?page=1&limit=10`, {
    //   });
    //   if (response.errCode === 0) {
    //     const groupList = response.data.filter(item => item.type == "GROUP_CHAT")
    //     const group = groupList.find(item => item._id == items._id)
    //     const leaderId = groupList.find(item => item._id === items._id)?.administrator 
    //     if (leaderId === currentId) {
    //       setIsLeader(true)
    //     } else setIsLeader(false)
    //     const leaderInfo = group.participants.find(item => item.id === leaderId)
    //     setLeader(leaderInfo)
    //     setMembers(group.participants)
    //     setIsLoading(false)
    //   }
    // } catch (error) {
    //   console.log('Error fetching members:', error)
    // }

    try {
      const response = await axios.get(`/chat/pagination?page=1&limit=1000`);
      if (response.errCode === 0) {
        const groupList = response.data.filter(item => item.type === "GROUP_CHAT");
        const group = groupList.find(item => item._id === items._id);
        const leaderId = group?.administrator;
    
        if (leaderId === currentId) {
          setIsLeader(true);
        } else {
          setIsLeader(false);
        }
        // const uniqueParticipantIds = new Set();
        // const uniqueParticipants = [];
        // group?.participants.forEach(participant => {
        //   if (!uniqueParticipantIds.has(participant.id)) {
        //     uniqueParticipantIds.add(participant.id)
        //     uniqueParticipants.push(participant)
        //   }
        // })
        setLeader(group.participants.find(item => item.id === leaderId))
        // setMembers(uniqueParticipants)
        setMembers(group.participants)
    
        setIsLoading(false)
      } else {
        console.log('Error fetching chat:', response.message)
      }
    } catch (error) {
      console.log('Error fetching chat:', error)
    }
  }

  if (isLoading) { 
    console.log("members loading...", members);
    return(
      <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    ); 
  }

  const handlDeleteMember = async () => {
    try {
      const response = await axios.put(`/chat/message/deleteMemer`, {
        chatId: items._id,
        memberId: idMember
      });
      if (response.errCode === 0) {
        console.log('Xóa thành công thành viên')
        getListGroupChat()
      }
    } catch (error) {
      console.log('Error deleting member:', error)
    }
  }

  const handleGrantGroup = async () => {
    try {
      const response = await axios.put(`/chat/grantGroupLeader`, {
        chatId: items._id,
        memberId: idMember
      });
      if (response.errCode === 0) {
        console.log('Bổ nhiệm làm nhóm trưởng thành công')
        getListGroupChat()
      }
    } catch (error) {
      console.log('Error deleting member:', error)
    }
  }

  const renderItem = ({ item })=>{
    if(item.id === leader.id) return null
    return (
      <Pressable style={{paddingLeft:16, padding:8, flexDirection:'row', alignItems:'center'}} onPress={()=>{
        setModalVisible(true)
        setIdMember(item.id)
      }}>
        <View style={{width:45, height:45, backgroundColor:'green', borderRadius:50}}>
        </View>
        <Text style={{marginLeft:15, fontSize:16, fontWeight:'500'}}>{item.userName}</Text>
      </Pressable>
    )
  }
  return (
    <SafeAreaView style={{height:"100%"}}>
      <>
        {(leader != null) ? (
          <Pressable style={{paddingLeft: 16, padding: 8, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 45, height: 45, backgroundColor: 'green', borderRadius: 50}} />
            <View>
              <Text style={{marginLeft: 15, fontSize: 16, fontWeight: '500'}}>{leader.userName}</Text>
              <Text style={{marginLeft: 15, fontSize: 14, color: 'gray', fontStyle: 'italic'}}>Trưởng nhóm</Text>
            </View>
          </Pressable>
        ) : null}
      </>
      <FlatList
        data={members}
        renderItem={renderItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomColor:'black', borderBottomWidth:0.3 }}>
              <View style={{ flex: 1, paddingVertical: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 20, textAlign: 'center', lineHeight:40, paddingLeft:"15%" }}>Thông tin thành viên</Text>
              </View>
              <View style={{ padding: 10 }}>
                <Pressable style={{backgroundColor:'#fffff', borderRadius:50, padding:1}} onPress={() => setModalVisible(false)}>
                  <FontAwesomeIcon color='#BBAFA7' size={25} icon={faClose} />
                </Pressable>
              </View>
            </View>
            <View style={{padding:20}}>
              <Pressable style={{padding:10}}>
                <Text style={{fontSize:16, fontWeight:'500'}}>Xem trang cá nhân</Text>
              </Pressable>
              {isLeader && (
                <View>
                  <Pressable style={{ padding: 10 }} onPress={handleGrantGroup}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Bổ nhiệm làm trưởng nhóm</Text>
                  </Pressable>
                  <Pressable style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Chặn thành viên</Text>
                  </Pressable>
                  <Pressable style={{ padding: 10 }} onPress={() => {
                    handlDeleteMember();
                    setModalVisible(false);
                  }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'red' }}>Xóa khỏi nhóm</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
})