import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
import { socket } from '../../config/io';

export const CreateGroup = ({ navigation }) => {
    const friendList = useSelector(state => state.listFriend.listFriend);
    const [searchText, setSearchText] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const dispatch = useDispatch();
    const maxLength = 16;
    const [isConnected, setIsConnected] = useState(false);
    const toastRef = useRef(null);

    useEffect(() => {
        socket.then(socket => {
            socket.emit('setup');
            socket.on('connected', () => {
                console.log('Connected to server');
            });
            socket.on('new-group-chat', (data) => {
                console.log('New group chat:', data);
            });
        });
        return () => {
            socket.then(socket => {
                socket.off('connected');
                socket.off('new-group-chat');
            });
        };
    }, []);

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

    const createGroup = async () => {
        const payload = {
            // name: groupName ? (groupName.length < maxLength ? groupName : `${groupName.substring(0,maxLength)}...`) : `${selectedFriends.map(friend => friend.userName).join(', ').substring(0,maxLength)}...`, 
            name: groupName,
            type: "GROUP_CHAT",
            participants: selectedFriends.map(friend => friend.id),
            groupPhoto: "https://timchuyenbay.com/assets/uploads/2022/07/L%E1%BB%8Bch-bay.jpg",
            status: true,
        }
        try {
            if (selectedFriends.length > 1) {
                const response = await axios.post('/chat/group', payload);
                if (response.errCode === 0) {
                    console.log('Create group successfully:', response.data);
                    dispatch(setIsCreateGroup());
                    const data = response.data
                    socket.then(socket => {
                        socket.emit('new-group-chat', data);
                    })
                    navigation.navigate('Nhóm');
                }
            } else {
                toastRef.current.show('Thành viên tối thiểu là 2 người!', 2000);
            }
        } catch (error) {
            console.log('Error creating group:', error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => {
                    navigation.goBack()
                }}>
                    <FontAwesomeIcon style={{ marginLeft: 15 }} color='#F1FFFF' size={21} icon={faChevronLeft} />
                </Pressable>
                <Text style={styles.txtInHeader}>Nhóm mới</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 16 }}>
                <Pressable>
                    <FontAwesomeIcon style={{ marginLeft: 15 }} color='#37333A' size={30} icon={faCamera} />
                </Pressable>
                <TextInput style={{ marginLeft: 15, fontWeight: '500', fontSize: 17, color: 'black' }} placeholder='Đặt tên nhóm' onChangeText={setGroupName}></TextInput>
            </View>
            <Pressable style={{ flexDirection: 'row', padding: 16 }}>
                <FontAwesomeIcon style={{ marginLeft: 15 }} color='#37333A' size={30} icon={faSearch} />
                <TextInput style={{ marginLeft: 15, fontSize: 16 }} placeholder='Tìm tên hoặc số điện thoại'></TextInput>
            </Pressable>
            {/* load danh sách bạn bè */}
            <>
                <ScrollView>
                    {friendList.map((friend, index) => (
                        <Pressable key={index} style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8, paddingLeft: 20, paddingRight: 20 }}>
                            <View style={{ height: 45, width: 45, borderRadius: 50, backgroundColor: friend.avatar }}></View>
                            <View style={{ width: "70%" }}>
                                <Text style={{ fontWeight: "500", marginLeft: 0 }}>{friend.userName}</Text>
                            </View>
                            <Pressable style={styles.tick} onPress={() => {
                                handleFriendSelection(friend)
                            }}>
                                <View style={{ width: 24, height: 24, backgroundColor: '#F3F5F6', borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#37333A' }}>
                                    {isFriendSelected(friend) ? (
                                        <Pressable style={{ width: 24, height: 24, backgroundColor: '#0091FF', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} onPress={
                                            () => handleDeleteFriendSelected(friend)
                                        }>
                                            <FontAwesomeIcon color='white' size={18} icon={faCheck} />
                                        </Pressable>
                                    ) : (
                                        <View></View>
                                    )}
                                </View>
                            </Pressable>
                        </Pressable>
                    ))}
                    <View style={{ height: 100 }}></View>
                </ScrollView>
            </>
            <View style={styles.footerWrapper}>
                <Pressable style={{ backgroundColor: '#0091FF', width: '100%', height: 55, alignItems: 'center', justifyContent: 'center' }} onPress={createGroup}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Tạo nhóm</Text>
                </Pressable>
            </View>
            <Toast style={{ backgroundColor: 'green' }} ref={toastRef} position='center' />
        </SafeAreaView>
    )
}
