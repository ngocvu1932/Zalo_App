import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from  'react-native-safe-area-context'
import { styles } from './style'
import { Text, View, TextInput, Pressable, Image, ScrollView } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faCamera, faCheck, faChevronLeft, faMagnifyingGlass, faPersonCirclePlus, faPhone, faQrcode, faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../../config/axios';
import Toast from 'react-native-easy-toast';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { setIsCreateGroup, setisCreateGroup } from '../../redux/stateCreateGroupSlice';
import { set } from 'zod';
import {socket} from '../../config/io';

export const AddMember = ({navigation, route}) => {
    const {items} = route.params;
    const friendList = useSelector(state => state.listFriend.listFriend);
    const [searchText, setSearchText] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const dispatch = useDispatch();
    const maxLength = 16;

    const handleFriendSelection = (friend) => {
        if (selectedFriends.includes(friend)) {
          setSelectedFriends(prevState => prevState.filter(item => item.id !== friend.id));
        } else {
          setSelectedFriends(prevState => [...prevState, friend]);
        }
      };
    const isFriendSelected = (friend) => {
    return selectedFriends.includes(friend);
    };
    const handleDeleteFriendSelected = (friend) => {
        setSelectedFriends(selectedFriends.filter(item => item.id !== friend.id));
    }

    const handlDeleteMember = async () => {
        try {
          const response = await axios.put(`/chat/message/addMember`, {
            chatId: items._id,
            memberId: selectedFriends[0].id
          });
          if (response.errCode === 0) {
            console.log('Thêm thành công thành viên')

            socket.then(socket => {
                socket.emit('new-group-chat', response.data);
            })
            navigation.navigate('ChatMessage', {items: items})
          }
        } catch (error) {
          console.log('Error deleting member:', error)
        }
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Pressable onPress={()=>{
                navigation.goBack()
            }}>
                <FontAwesomeIcon style={{marginLeft: 15}} color='#F1FFFF' size={21} icon={faChevronLeft} />
            </Pressable>
            <Text style={styles.txtInHeader}>Thêm thành viên</Text>
        </View>

        <View style={styles.body}>
            <Pressable style={{flexDirection:'row', padding:16}}>  
                <FontAwesomeIcon style={{marginLeft: 15}} color='#37333A' size={30} icon={faSearch} />
                <TextInput style={{marginLeft:15, fontSize:16}} placeholder='Tìm tên hoặc số điện thoại'></TextInput>
            </Pressable>
        
            <ScrollView>
                {friendList.map((friend, index)=>(
                    <Pressable key={index} style={{ width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:8, paddingLeft:20, paddingRight:20}}>
                        <View style={{height: 45, width: 45, borderRadius: 50, backgroundColor:friend.avatar}}></View>
                        <View style={{width:"70%"}}>
                            <Text style={{fontWeight:"500", marginLeft:0}}>{friend.userName}</Text>   
                        </View>
                        <Pressable style={styles.tick} onPress={()=>{
                            handleFriendSelection(friend)
                        }}>
                            <View style={{width:24, height:24, backgroundColor:'#F3F5F6', borderRadius:50, alignItems:'center', justifyContent:'center', borderWidth: 1, borderColor: '#37333A'}}>
                                {isFriendSelected(friend)? (
                                    <Pressable style={{width:24, height:24, backgroundColor:'#0091FF', borderRadius:50, alignItems:'center', justifyContent:'center'}} onPress={
                                        () => handleDeleteFriendSelected(friend)
                                    }>
                                        <FontAwesomeIcon color='white' size={18} icon={faCheck} />
                                    </Pressable>      
                                ):(
                                    <View></View>
                                )}
                            </View>
                        </Pressable>
                    </Pressable>
                ))}
                <View style={{height:100}}></View>
            </ScrollView>
        </View>
        
        <View style={styles.footerWrapper}>
            <Pressable style={{backgroundColor:'#0091FF', width:'100%', height:55, alignItems:'center', justifyContent:'center'}} onPress={handlDeleteMember}>
                <Text style={{color:'white', fontSize:18, fontWeight:'500'}}>Thêm thành viên</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}
