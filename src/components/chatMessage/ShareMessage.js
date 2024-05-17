import { View, Text, Pressable, FlatList, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from '../../config/axios'
import { useSelector } from 'react-redux'

export const ShareMessage = ({navigation, route}) => {
    const {data} = route.params;
    const [chatData, setChatData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(state => state.user.user.user);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await axios.get('/chat/pagination?limit=100');
                if (response.errCode === 0) { 
                    setChatData(response.data.map(item => ({
                        _id: item._id,
                        type: item.type,
                        name: item.name,
                        groupPhoto: item.groupPhoto,
                        participants: item.participants.map(participant => ({avatar: participant.avatar, userName: participant.userName, id: participant.id})),
                    })));
                    setIsLoading(false);
                } else if (response.errCode === 1) {
                    setChatData([]);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log('Error fetching chat  1:', error);
            }
        };

        fetchChat(); 
    }, []); 

    const renderItem = ({item}) => {
        return (
            <Pressable style={{backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                <View style={{height: 23, width: 23, borderRadius: 23, borderColor: '#C2C7C9',  borderWidth: 1, marginLeft: 15}} />
                {
                    item.type === 'PRIVATE_CHAT' ? 
                        item.participants[0].id === user.id ? 
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
                                {
                                    item.participants[1].avatar.substring(0, 3) === 'rgb' ? 
                                        <View style={{height: 50, width: 50, borderRadius: 30, backgroundColor: item.participants[1].avatar}} /> 
                                    : 
                                        <Image source={{uri: item.participants[1].avatar}} style={{height: 45, width: 45, borderRadius: 30}}/>
                                }
                                <Text style={{fontSize: 15, marginLeft: 15}}>{item.participants[1].userName}</Text>
                            </View> 
                        : 
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
                                {
                                    item.participants[0].avatar.substring(0, 3) === 'rgb' ? 
                                        <View style={{height: 50, width: 50, borderRadius: 30, backgroundColor: item.participants[0].avatar}} /> 
                                    : 
                                        <Image source={{uri: item.participants[0].avatar}} style={{height: 45, width: 45, borderRadius: 30}}/>
                                }
                                <Text style={{fontSize: 15, marginLeft: 15}}>{item.participants[0].userName}</Text>
                            </View>
                    : 
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
                            <View style={{height: 50, width: 50}}>
                                {
                                    item.groupPhoto !== null ? 
                                        <Image source={{uri: item.groupPhoto}} style={{height: 50, width: 50, borderRadius: 30}}/>
                                    : item.participants?.map((participant, index) => (
                                        index < 4 ? 
                                        item.participants?.length <= 3 ? // nhoms cos 3 nguowif
                                            <View key={index} style={[
                                                {height: 24, width: 24}, 
                                                index === 0 ? styles.position0_3 :
                                                    index === 1 ? styles.position1_3 :
                                                        styles.position2_3
                                                ]}
                                            >
                                                {participant.avatar.substring(0, 3)==='rgb' ? 
                                                    <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                                                : 
                                                    <Image source={{uri: participant.avatar}} style={styles.avtGroup} />
                                                }
                                            </View>
                                        : item.participants?.length === 4 ? //nhoms cos 4 nguoi
                                            <View key={index} style={[
                                            {height: 24, width: 24}, 
                                            index === 0 ? styles.position0_4 :
                                                index === 1 ? styles.position1_4 : 
                                                index === 2 ? styles.position2_4 :
                                                    styles.position3_4
                                            ]}
                                            >
                                            {participant.avatar.substring(0, 3)==='rgb' ? 
                                                <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                                            : 
                                                <Image source={{uri: participant.avatar}} style={styles.avtGroup} />
                                            }
                                            </View>
                                        : item.participants?.length > 4 ? // nhoms 5 nguoi tro len
                                            <View key={index} style={[
                                            {height: 24, width: 24}, 
                                            index === 0 ? styles.position0_4 :
                                                index === 1 ? styles.position1_4 : 
                                                index === 2 ? styles.position2_4 :
                                                [styles.position3_4, {backgroundColor: '#E9ECF3', justifyContent: 'center', alignItems: 'center', borderRadius: 15, height: 28, width: 28}]
                                            ]}
                                            >
                                            {participant.avatar.substring(0, 3)==='rgb' ? 
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
                            <Text style={{fontSize: 15, marginLeft: 15}}>{item.name}</Text>
                        </View>
                }
            </Pressable>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header1}>
                <View style={{flexDirection: 'row', alignItems: 'center', height: '55%'}}>
                    <Pressable onPress={() => {navigation.goBack()}}>
                        <FontAwesomeIcon style={{ marginLeft: 15 }} color='#363636' size={20} icon={faXmark} />
                    </Pressable>
                    <View style={{marginLeft: 15}}>
                        <Text style={{fontSize: 18, fontWeight: '500'}}>Chia sẻ</Text>
                        <Text style={{fontSize: 14, opacity: 0.8}}>Đã chọn: 0</Text>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor: '#FFFFFF', paddingBottom: 250}}>
                <View style={{backgroundColor: '#E8E8E8', flexDirection: 'row', width: '90%', height: 30 ,marginLeft: '5%', borderRadius: 5, alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                    <FontAwesomeIcon style={{marginRight: -25, zIndex: 1, marginLeft: 10}} size={18} icon={faSearch} />
                    <TextInput style={{width: '90%', height: 30, paddingLeft: 30}} placeholder='Tìm kiếm' />
                </View>
                <FlatList
                    data={chatData}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>

            <View style={styles.viewShareMess}>
                <Text>{data.content}</Text>

            </View>
        </View>
    )
}