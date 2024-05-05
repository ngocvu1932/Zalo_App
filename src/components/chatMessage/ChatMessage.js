import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Keyboard,  Modal,  Pressable,  Text, TextInput, View } from "react-native";
import { styles } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faVideo, faList, faEllipsis,  faLaughWink, faChevronLeft, faPaperPlane, faTrashCan, faRotateRight, faCheckDouble, faCheck, faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { faImage} from '@fortawesome/free-regular-svg-icons';
import { socket } from '../../config/io';
import { useDispatch, useSelector } from 'react-redux';
import axios, { setAuthorizationAxios } from '../../config/axios';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import { setIsCreateGroup, setisCreateGroup } from '../../redux/stateCreateGroupSlice';
import {CLOUD_NAME, UPLOAD_PRESET} from '@env'
import { LinearGradient } from 'expo-linear-gradient';
import { Video, Audio } from 'expo-av';

export const ChatMessage = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [isText, setIsText] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { items, flag } = route.params;
    const user = useSelector(state => state.user);
    const device = useSelector(state => state.device);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const flatListRef = useRef();
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [isUserChoose, setIsUserChoose] = useState(false);
    const [messageIsChooseId, setMessageIsChooseId] = useState('');
    const [loadAgain, setLoadAgain] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [textInputHeight, setTextInputHeight] = useState(30);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const videoRefs = useRef([]);
    const [isControl, setIsControl] = useState(false);
    const delayTime = 300;

    console.log('Flag: ', items);
//   console.log("videoRefs: ", videoRefs);


    //get permissions
    useEffect(() => {
        const getPermission = async () => {
          await Audio.setAudioModeAsync({
            // allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
        };
    
        getPermission();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setIsKeyboardOpen(true);
            setKeyboardHeight(event.endCoordinates.height)
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false);
            setKeyboardHeight(0);
        });
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    
    useEffect(() => {
        if (textMessage !== '') {
            setIsText(true);
        } else {
            setIsText(false);
        }
    }, [textMessage]);

    useEffect(() => {
        setAuthorizationAxios(user.user?.access_token);
    }, [user])

    // cập nhật cuộn flatlist
    useEffect(() => {
        if ( messages.length > 0 && isKeyboardOpen) {
            setTimeout(() => scrollToBottomWithOffset(80), 100);
        }
    }, [messages, isLoadingMessages, isKeyboardOpen]);

    useEffect(() => {
        setTimeout(()=> {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({animated: true});
            }
        }, 500);
    }, []);

    // Lấy tin nhắn từ server
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/chat/message/pagination?chatId=${items._id}&limit=50`);
                if (response.errCode === 0) {
                    const filteredMessages = response.data.map(item => ({
                        _id: `${item._id}`,
                        chat: `${item.chat._id}`,
                        sender: item.sender,
                        content: item.content,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        isDelete: item.isDelete,
                        unViewList: item.unViewList,
                        urls: item.urls,
                        type: item.type,
                    }));
                    setMessages(filteredMessages);
                    setIsLoadingMessages(false);
                    setLoadAgain(false);
                    setIsMessage(true);
                    setIsLoading(false);
                } else if (response.errCode === 1) {
                    setIsMessage(false);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log("Error x: ", error);
                resetToScreen(navigation, 'Login');
            }
        };

        fetchMessages();
    }, [items._id, loadAgain]);

    // socket
    useEffect(() => {
        socket.then(socket => {
            socket.emit('setup', items._id); 
            socket.on('connected', (data) => {
                console.log('Connected to server chat');
            });

            socket.on('receive-message', (data) => {
                if (data.type.includes('TEXT')) {
                    console.log("Receive messgae: ", data.content, "|", data.chat);
                    setIsMessage(true);
                    setMessages(premessages => [...premessages, data]);
                } else if (data.type.includes('IMAGES')) {
                    console.log("Receive messgae: ", data.urls, "|", data.chat);
                    setIsMessage(true);
                    setMessages(premessages => [...premessages, data]);
                } else if (data.type.includes('VIDEO')) {
                    console.log("Receive messgae: ", data.urls, "|", data.chat);
                    setIsMessage(true);
                    setMessages(premessages => [...premessages, data]);
                }
            });

            socket.on('receive-modify-message', (data) => {
                if (data) {
                    setLoadAgain(true);
                }
            });

            socket.on('receive-issend-message', (data) => {
                if (data) {
                    setIsSend(true);
                }
            });
        });

        return () => {
            socket.then(socket => {
                socket.off('connected');
                socket.off('receive-message');
                socket.off('receive-modify-message');
                socket.off('receive-issend-message');
            });
        };
    }, []);

    useEffect(() => {

    }, [isSend]);

    // phát video
    const handleVideoPress = (index) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index].playAsync();
            console.log("videoRefs: ", videoRefs.current[index]);
        }
    };

    const handleContentSizeChange = (event) => {
        const { height } = event.nativeEvent.contentSize;
        if (height < 75 && height > 30) { 
            setTextInputHeight(height);
        } else if (height <= 30 ){
            setTextInputHeight(30);
        }
    }; 

    //cuộn xuống phần tử cuối cùng trong FlatList
    const scrollToBottomWithOffset = (offset) => {
        if (flatListRef.current) {
            const itemCount = messages.length;
            const itemHeight = 50;
            const listHeight = itemCount * itemHeight;
            const bottomOffset = listHeight + offset;
            flatListRef.current.scrollToOffset({ offset: bottomOffset, animated: true });
        }
    };

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            console.log("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: 20,
            videoExportPreset: ImagePicker.VideoExportPreset.Passthrough,
            videoMaxDuration: 10
        });

        if (!pickerResult.canceled) {
            const formData = new FormData();
            formData.append('upload_preset', UPLOAD_PRESET);
            formData.append("cloud_name", CLOUD_NAME);
            for (const asset of pickerResult.assets) {
                if (asset.type === 'image') {
                    const fileName = asset.uri.split('/').pop();
                    formData.append('file', {
                        uri: asset.uri,
                        name: fileName,
                        type: 'image/*',
                    });
                    // console.log("formData: ", JSON.stringify(formData));
                    sendToCloud('IMAGES', formData);
                } else if (asset.type === 'video') {
                    const fileName = asset.uri.split('/').pop();
                    formData.append('file', {
                        uri: asset.uri,
                        name: fileName,
                        type: 'video/mp4',
                    });
                    // console.log("formData: ", JSON.stringify(formData));
                    sendToCloud('VIDEO', formData);
                }
            }
        }
    }

    const sendToCloud = async (type, formData) => {
        let typesend = ''
        if (type.includes('IMAGES')) {
            typesend = 'image';
        } else if (type.includes('VIDEO')) {
            typesend = 'video';
        }
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/ngocvu1932/${typesend}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            });
            const data = await response.json();

            if (data.secure_url) {
                const ObjectId = objectId();
                const dataSend = {
                    _id: ObjectId,
                    chat: items._id,
                    type: type,
                    sender: user.user?.user,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    unViewList: [],
                    isDelete: false,
                    urls: data.secure_url,
                    reactions: []
                }

                console.log("Data send: ", dataSend);
                setMessages(premessages => [...premessages, dataSend]);
                dispatch(setIsCreateGroup());

                const res = await axios.post('/chat/message', {
                    ...dataSend,
                    sender: user.user?.user.id,
                });

                if (res.errCode === 0) {
                    socket.then(socket => {
                        socket.emit('send-message', dataSend);
                        socket.emit('issend-message', dataSend);
                    });

                    setIsMessage(true);
                    setTextMessage('');
                    console.log("Send message:", dataSend.urls, "|", dataSend.chat);
                } else {
                    console.log("Error 3: ", res);
                }
            } else {
                console.log("Error 2: ", data);
            }
            // console.log('Upload success 2:', data);
        } catch (error) {
            console.log("Error 1: ", error);
        }
    };

    // Gửi message tới máy chủ khi nhấn button
    const sendMessage = async () => {
        const ObjectId = objectId();
        const dataSend = {
            _id: ObjectId,
            chat: items._id,
            type: 'TEXT',
            sender: user.user?.user,
            content: `${textMessage}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            unViewList: [],
            isDelete: false,
            reactions: []
        }

        try {
            // console.log("Data send: ", dataSend);
            setMessages(premessages => [...premessages, dataSend]);
            dispatch(setIsCreateGroup());
            const res = await axios.post('/chat/message', {
                ...dataSend,
                sender: user.user?.user.id,
            });

            if (res.errCode === 0) {
                socket.then(socket => {
                    socket.emit('send-message', dataSend);
                    socket.emit('issend-message', dataSend);
                });
                setIsMessage(true);
                setTextMessage('');
                console.log("Send message:", dataSend.content, "|", dataSend.chat);
            } else {
                console.log("Error: ", res);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const deleteMessageForMe = async () => {
        try {
            const res = await axios.put('/chat/message/recall', {
                messageId: messageIsChooseId,
            });

            if (res.errCode === 0) {
                setLoadAgain(true);
                setModalVisible1(false);
            } else {
                console.log("Error: ", res);
            }

        } catch (error) {

        }
    };

    const deleteMessage = async () => {
        try {
            const res = await axios.put('/chat/message/deleteMessage', {
                messageId: messageIsChooseId,
            });

            if (res.errCode === 0) {
                setLoadAgain(true);
                setModalVisible(false);
                socket.then(socket => {
                    socket.emit('modify-message', res.data);
                });

            } else {
                console.log("Error: ", res);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    // render tin nhắn qua FlatList
    const renderItem = ({ item }) => { 
        // console.log("Item: ", JSON.stringify(item._id));
        const firstIduserPositions = {};
        let lastSenderId = null;

        messages.forEach((item, index) => {
            if (item.sender.id !== lastSenderId) {
                if (!firstIduserPositions[item.sender.id]) {
                    firstIduserPositions[item.sender.id] = [item._id];
                } else {
                    firstIduserPositions[item.sender.id].push(item._id);
                }
            }
            lastSenderId = item.sender.id;
        });

        const firstPositionsInCluster = Object.values(firstIduserPositions);
        const flattenedData = firstPositionsInCluster.concat.apply([], firstPositionsInCluster);
        const firstItemBySender = flattenedData.includes(item._id);

        // Kiểm tra tin nhắn cuối cùng của mỗi user
        const lastItemBySender = {};
        messages.forEach(msg => {
            lastItemBySender[msg.sender.id] = msg;
        });
        const isLastItem = item === lastItemBySender[item.sender.id];

        // kiểm tra xem tin nhắn có phải là tin nhắn riêng tư không
        if (items.type.includes('PRIVATE_CHAT')) {
            //so sánh phòng chat
            if (item.chat.includes(items._id)) {
                //kiểm tra xem tin nhắn đã thu hồi chưa
                if (!item.isDelete) {
                    // kiểm tra xem người dùng có xóa tin nhắn không
                    if (!item.unViewList.includes(user.user?.user?.id)) {
                        if (item.type.includes('TEXT')) {
                            if (item.sender?.id === user.user?.user?.id) {
                                return (
                                    <View style={styles.viewEnd}>
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} style={styles.messsagePressEnd}>
                                            <Text style={[styles.textMessagePress]}>{item.content}</Text>
                                            {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                        </Pressable>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={[styles.viewStart, firstItemBySender ? { flexDirection: 'row' } : {}]}>
                                        {firstItemBySender && <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>}
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} style={[styles.messsagePressStart, firstItemBySender ? { marginLeft: 5 } : {}]}>
                                            <Text style={[styles.textMessagePress]}>{item.content}</Text>
                                            {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                        </Pressable>
                                    </View>
                                )
                            }
                        } else if (item.type.includes('IMAGES')) {
                            if (item.sender?.id === user.user?.user?.id) { 
                                return (
                                    <View style={styles.viewEnd}>
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} style={styles.messsagePressEnd}>
                                            <Image source={{ uri: `${item.urls}` }} style={{ width: 200, height: 200, borderRadius: 10 }} resizeMode='contain' />
                                        </Pressable>
                                        {isLastItem && 
                                            <View style={{marginRight: 10, height: 20, width: 50, backgroundColor: '#B0B0B0', alignItems: 'center', borderRadius: 25, justifyContent: 'center' }}>
                                                <Text style={{fontSize: 12, color: '#ffffff'}}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>
                                            </View>
                                        }
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={[styles.viewStart]}>
                                        <View style={firstItemBySender ? { flexDirection: 'row' } : {}}>
                                            {firstItemBySender && <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>}
                                            <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} style={[styles.messsagePressStart, firstItemBySender ? { marginLeft: 5 } : {}]}>
                                                <Image source={{ uri: `${item.urls}` }} style={{ width: 200, height: 200, borderRadius: 10 }} resizeMode='contain' />
                                            </Pressable>
                                        </View>
                                        {isLastItem && 
                                            <View style={{marginLeft: 30, height: 20, width: 50, backgroundColor: '#B0B0B0', alignItems: 'center', borderRadius: 25, justifyContent: 'center' }}>
                                                <Text style={{fontSize: 12, color: '#ffffff'}}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>
                                            </View>
                                        }
                                    </View>
                                )
                            }
                        } else if (item.type.includes('VIDEO')) { 
                            if (item.sender?.id === user.user?.user?.id) {
                                return (
                                    <View style={styles.viewEnd}>
                                        <Pressable style={styles.messsagePressEnd} delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} onPress={()=> {
                                            alert('video');
                                            console.log(isControl);
                                            
                                            if (!isControl) {
                                                handleVideoPress(item._id);
                                                setIsControl(true);
                                            }
                                        }} >
                                            <Video
                                                ref={(videoRef) => (videoRefs.current[item._id] = videoRef)}
                                                style={{height: 300, width: 200, borderRadius: 10}}
                                                source={{uri: `${item.urls}`}}
                                                useNativeControls={true}
                                                resizeMode="contain"
                                                isLooping
                                            />
                                        </Pressable>
                                        {isLastItem && 
                                            <View style={{marginRight: 15, height: 20, width: 50, backgroundColor: '#B0B0B0', alignItems: 'center', borderRadius: 25, justifyContent: 'center' }}>
                                                <Text style={{fontSize: 12, color: '#ffffff'}}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>
                                            </View>
                                        }
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={[styles.viewStart]}>
                                        <View style={firstItemBySender ? { flexDirection: 'row' } : {}}>
                                            {firstItemBySender && <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>}
                                            <Pressable style={[styles.messsagePressStart, firstItemBySender ? { marginLeft: 5 } : {}]} delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} onPress={()=> {
                                                if (!isControl) {
                                                    handleVideoPress(item._id);
                                                    setIsControl(true);
                                                }
                                            }} >
                                                <Video
                                                    ref={(videoRef) => (videoRefs.current[item._id] = videoRef)}
                                                    style={{height: 300, width: 200, borderRadius: 10}}
                                                    source={{uri: `${item.urls}`}}
                                                    useNativeControls={true}
                                                    resizeMode="contain"
                                                    isLooping
                                                />
                                            </Pressable>
                                        </View>

                                        {isLastItem && 
                                            <View style={{marginLeft: 30, height: 20, width: 50, backgroundColor: '#B0B0B0', alignItems: 'center', borderRadius: 25, justifyContent: 'center' }}>
                                                <Text style={{fontSize: 12, color: '#ffffff'}}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>
                                            </View>
                                        }
                                    </View>
                                )
                            }
                        }
                    }
                } else {
                    // chỗ này la tin nhắn đã thu hồi
                    if (!item.unViewList.includes(user.user?.user?.id)) {
                        //so sánh người gửi
                        if (item.sender?.id === user.user?.user?.id) {
                            return (
                                <View style={styles.viewEnd}>
                                    {firstItemBySender && <Text style={styles.name}></Text>}
                                    <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} style={styles.messsagePressEnd}>
                                        <Text style={[styles.textMessagePress, { opacity: 0.7 }]}>Tin nhắn đã được thu hồi</Text>
                                        {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                    </Pressable>
                                </View>
                            )
                        } else {
                            return (
                                <View style={[styles.viewStart, firstItemBySender ? { flexDirection: 'row' } : {}]}>
                                    {firstItemBySender && <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>}
                                    <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} style={[styles.messsagePressStart, firstItemBySender ? { marginLeft: 5 } : {}]}>
                                        <Text style={[styles.textMessagePress, { opacity: 0.7 }]}>Tin nhắn đã được thu hồi</Text>
                                        {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                    </Pressable>
                                </View>
                            )
                        }
                    }
                }
            }
        } else { // khúc này là public chat
            if (item.chat.includes(items._id)) {
                //kiểm tra xem tin nhắn đã thu hồi chưa
                if (!item.isDelete) {
                    // kiểm tra xem người dùng có xóa tin nhắn không
                    if (!item.unViewList.includes(user.user?.user?.id)) {
                        //so sánh người gửi
                        if (item.type.includes('TEXT')) {
                            if (item.sender?.id === user.user?.user?.id) {
                                return (
                                    <View style={styles.viewEnd}>
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} style={styles.messsagePressEnd}>
                                            <Text style={[styles.textMessagePress]}>{item.content}</Text>
                                            {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                        </Pressable>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={[styles.viewStart, firstItemBySender ? { flexDirection: 'row' } : {}]}>
                                        {firstItemBySender && <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>}
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} style={[styles.messsagePressStart, firstItemBySender ? { marginLeft: 5 } : {}]}>
                                            {firstItemBySender && <Text style={styles.name}>{item.sender.userName}</Text>}
                                            <Text style={[styles.textMessagePress, firstItemBySender ? { paddingTop: 5 } : {}]}>{item.content}</Text>
                                            {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                        </Pressable>
                                    </View>
                                )
                            }
                        } else if (item.type.includes('IMAGES')) {
                            if (item.sender?.id === user.user?.user?.id) {
                                return (
                                    <View style={[styles.viewEnd, {}]}>
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} style={styles.messsagePressEnd}>
                                            <Image source={{ uri: `${item.urls}` }} style={{ width: 200, height: 200, borderRadius: 10 }} resizeMode="contain" />
                                        </Pressable>
                                        {isLastItem && 
                                            <View style={{marginRight: 10, height: 20, width: 50, backgroundColor: '#B0B0B0', alignItems: 'center', borderRadius: 25, justifyContent: 'center' }}>
                                                <Text style={{fontSize: 12, color: '#ffffff'}}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>
                                            </View>
                                        }
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={[styles.viewStart, firstItemBySender ? { flexDirection: '' } : {}]}>
                                        {firstItemBySender &&
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                                <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>
                                                <View style={{ backgroundColor: '#FFFFFF', marginLeft: 5, padding: 2, borderRadius: 25 }}>
                                                    <Text style={{ fontSize: 12, opacity: 0.8, paddingLeft: 4, paddingRight: 4 }}>{item.sender.userName}</Text>
                                                </View>
                                            </View>
                                        }
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} style={[styles.messsagePressStart]}>
                                            <Image source={{ uri: `${item.urls}` }} style={{ width: 200, height: 200, borderRadius: 10 }} resizeMode='contain' />
                                        </Pressable>
                                        {isLastItem && 
                                            <View style={{marginLeft: 30, height: 20, width: 50, backgroundColor: '#B0B0B0', alignItems: 'center', borderRadius: 25, justifyContent: 'center' }}>
                                                <Text style={{fontSize: 12, color: '#ffffff'}}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>
                                            </View>
                                        }
                                    </View>
                                )
                            } 
                        } else if (item.type.includes('VIDEO')) {
                            if (item.sender?.id === user.user?.user?.id) {
                                return (
                                    <View style={styles.viewEnd}>
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} style={styles.messsagePressEnd}>
                                            {/* <Text style={[styles.textMessagePress]}>{item.content}</Text>
                                            {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>} */}
                                            {/* <Image source={{uri: `${item.urls}`}} style={{width: 200, height: 200, borderRadius: 10}} resizeMode="contain"  /> */}
                                            {/* <Video></Video> */}
                                            {/* <Video source={{uri: `${item.urls}`}} controls={true} /> */}
                                            {/* <Text> {item.urls}</Text>  */}
                                            {/* <Video source={{uri: `${item.urls}`}} style={{width: 200, height: 200, borderRadius: 10}} resizeMode="contain" /> */}

                                            {/* <Video source={{uri: `${item.urls}`}}></Video> */}
                                            {/* <Video
                                                source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
                                                rate={1.0}
                                                volume={9.0}
                                                isMuted={false}
                                                resizeMode="contain"
                                                shouldPlay
                                                // isLooping
                                                style={{ width: 300, height: 300 }}
                                                controls="true"
                                                />   */}

                                        </Pressable>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={[styles.viewStart, firstItemBySender ? { flexDirection: '' } : {}]}>
                                        {firstItemBySender &&
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                                <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>
                                                <View style={{ backgroundColor: '#FFFFFF', marginLeft: 5, padding: 2, borderRadius: 25 }}>
                                                    <Text style={{ fontSize: 12, opacity: 0.8, paddingLeft: 4, paddingRight: 4 }}>{item.sender.userName}</Text>
                                                </View>
                                            </View>
                                        }
                                        <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} style={[styles.messsagePressStart]}>
                                            {/* <Text style={[styles.textMessagePress]}>{item.content}</Text>
                                        {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>} */}
                                            {/* <Image source={{uri: `${item.urls}`}} style={{width: 200, height: 200, borderRadius: 10}} resizeMode='contain' /> */}

                                        </Pressable>
                                    </View>
                                )
                            }
                        }
                    }
                } else {
                    if (!item.unViewList.includes(user.user?.user?.id)) {
                        //so sánh người gửi
                        if (item.sender?.id === user.user?.user?.id) {
                            return (
                                <View style={styles.viewEnd}>
                                    <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(true); setMessageIsChooseId(item._id) }} style={styles.messsagePressEnd}>
                                        <Text style={[styles.textMessagePress, { opacity: 0.7 }]}>Tin nhắn đã được thu hồi</Text>
                                        {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                    </Pressable>
                                </View>
                            )
                        } else {
                            return (
                                <View style={[styles.viewStart, firstItemBySender ? { flexDirection: 'row' } : {}]}>
                                    {firstItemBySender && <View style={{ height: 20, width: 20, backgroundColor: item.sender.avatar, borderRadius: 20, marginLeft: 5 }}></View>}
                                    <Pressable delayLongPress={delayTime} onLongPress={() => { setModalVisible(true); setIsUserChoose(false); setMessageIsChooseId(item._id) }} style={[styles.messsagePressStart, firstItemBySender ? { marginLeft: 5 } : {}]}>
                                        {firstItemBySender && <Text style={styles.name}>{item.sender.userName}</Text>}
                                        <Text style={[styles.textMessagePress, { opacity: 0.7 }]}>Tin nhắn đã được thu hồi</Text>
                                        {isLastItem && <Text style={styles.dateTime}>{moment.utc(item.updatedAt).utcOffset('+07:00').format('HH:mm')}</Text>}
                                    </Pressable>
                                </View>
                            )
                        }
                    }
                }
            }
        }
    }

    function objectId() {
        return hex(Date.now() / 1000) +
            ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16))
    }

    function hex(value) {
        return Math.floor(value).toString(16)
    }

    const resetToScreen = (navigation, routeName) => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: routeName }],
        }));
    };

    const onlineTime = (timeOffline) => {
        const now = moment();
        const createdAt = moment(timeOffline);
        const duration = moment.duration(now.diff(createdAt));
        return duration.days() > 0 ? `Truy cập ${duration.days()} ngày trước  ` : duration.hours() > 0 ? `Truy cập ${duration.hours()} giờ trước  ` : duration.minutes() > 0 ? `Truy cập ${duration.minutes()} phút trước  ` : duration.seconds() > 0 ? `Truy cập ${duration.seconds()} giây trước  ` : 'Vừa mới truy cập';
    }

    return (
        <View style={[styles.container]}>
            <LinearGradient colors={['#008BFA', '#00ACF4']} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <View style={{flexDirection: 'row', height: '55%', alignItems: 'center'}}>
                    <Pressable style={{ height: 40, justifyContent: 'center', width: 40}} onPress={() => {
                        if (flag === 'Messages') {
                            navigation.goBack();
                        } else if (flag === 'CreateGroup') {
                            resetToScreen(navigation, 'MainScreen');
                        }
                    }}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ marginLeft: 10 }} color='#F5F8FF' size={20} />
                    </Pressable>

                    <Pressable style={{ flex: 1, marginLeft: 5 }} onPress={() => navigation.navigate('ChatMessageOptions', { items: items })}>
                        <Text style={styles.nameTxt}>{items.userName}</Text>
                        <Text style={[styles.stateTxt]}>{items.type.includes('GROUP_CHAT') ? 'Bấm để xem thông tin' : !items.lastedOnline ? 'Vừa mới truy cập' : onlineTime(items.lastedOnline)}</Text>
                    </Pressable>

                    <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'space-between', marginRight: 10 }}>
                        <Pressable style={styles.btnOptsIcon} >
                            <FontAwesomeIcon size={20} style={styles.icon} icon={faPhone} />
                        </Pressable>

                        <Pressable style={styles.btnOptsIcon} >
                            <FontAwesomeIcon size={21} style={styles.icon} icon={faVideo} />
                        </Pressable>

                        <Pressable style={styles.btnOptsIcon} onPress={() => {navigation.navigate('ChatMessageOptions', { items: items })}}>
                            <FontAwesomeIcon size={20} style={styles.icon} icon={faList} />
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>

            <View style={[styles.body, device.device.includes('ios') ? isKeyboardOpen ? {paddingBottom: keyboardHeight + 85 + 90 }: {paddingBottom: 90 + 85} : '']}>
                {isLoading ? 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                : 
                    isMessage ? (
                        <View>
                            <FlatList
                                ref={flatListRef}
                                data={messages}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                onContentSizeChange={() => scrollToBottomWithOffset(80)}
                                onLayout={() => scrollToBottomWithOffset(80)}
                                style={{height: '100%'}}
                            ></FlatList>
                            
                        </View>
                    ) : (
                        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 100}}>
                            <View style={{backgroundColor: '#FFFFFF', height: '25%', width: '80%', borderRadius: 20, justifyContent: 'center'}}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        {items.avatar.includes('rgb')? 
                                            <View style={{height: 40, width: 40, backgroundColor: items.avatar, borderRadius: 20}}></View> 
                                            : 
                                            <Image style={{height: 60, width: 60, borderRadius: 30}} source={{uri: items.avatar}}></Image> 
                                        }
                                        <Text style={{marginLeft: 20}}>{items.userName}</Text>
                                    </View>
                                    <Text style={{marginTop: 20}}>Chưa có tin nhắn, hãy trò chuyện ngay nào!</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>

            <View style={[styles.footer, device.device.includes('ios') ? isKeyboardOpen ? {height: keyboardHeight + 85 }: {height: 85} : '']}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 64, backgroundColor: '#FFFFFF', width: '100%'}}>
                    <Pressable style={{ marginLeft: 10 }}>
                        <FontAwesomeIcon size={22} color="#5E5E5E" icon={faLaughWink} />
                    </Pressable>

                    <TextInput onContentSizeChange={handleContentSizeChange} value={textMessage} multiline={true} onChangeText={(text) => { setTextMessage(text) }} style={[styles.messageTxt, {height: textInputHeight}]} placeholder="Tin nhắn" placeholderTextColor={'#5E5E5E'}/>
                    
                    {isText ? (
                        <View>
                            <Pressable style={{ paddingLeft: 10, height: 40, width: 45, justifyContent: 'center' }} onPress={() => sendMessage()}>
                                <FontAwesomeIcon size={22} color="#0085FF" icon={faPaperPlane} />
                            </Pressable>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-between' }}>
                            <Pressable style={[styles.btnOpts, {}]}>
                                <FontAwesomeIcon size={22} color="#5E5E5E" icon={faEllipsis} />
                            </Pressable>

                            <Pressable style={styles.btnOpts}>
                                <FontAwesomeIcon size={22} color="#5E5E5E" icon={faMicrophoneLines} />
                            </Pressable>

                            <Pressable style={styles.btnOpts} onPress={() => {openImagePickerAsync()}}>
                                <FontAwesomeIcon size={22} color="#5E5E5E" icon={faImage} />
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
            
            {/* Overlay và Modal */}
            {modalVisible && (
                <View style={styles.overlay}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={[styles.modalContainer, { position: 'absolute' }]}>
                            <View style={styles.modalContent}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable onPress={() => { setModalVisible1(true); setModalVisible(false) }} style={styles.longPress}>
                                        <FontAwesomeIcon size={20} color='red' icon={faTrashCan} />
                                        <Text style={{ fontSize: 15, marginTop: 5 }}>Xóa</Text>
                                    </Pressable>

                                    {isUserChoose ? (
                                        <Pressable onPress={() => { deleteMessage() }} style={styles.longPress}>
                                            <FontAwesomeIcon size={21} color='orange' icon={faRotateRight} />
                                            <Text style={{ fontSize: 15, marginTop: 5 }}>Thu hồi</Text>
                                        </Pressable>
                                    ) : (
                                        <View></View>
                                    )}
                                </View>

                                <Pressable onPress={() => setModalVisible(false)} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}

            {modalVisible1 && (
                <View style={styles.overlay}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible1}
                        onRequestClose={() => setModalVisible1(false)}
                    >
                        <View style={[styles.modalContainer, { position: 'absolute' }]}>
                            <View style={styles.modalContent}>
                                <View style={{ flex: 3, justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 600 }}>Xóa tin nhắn cho riêng bạn?</Text>
                                    <Text style={{ fontSize: 15 }}>Để xóa cho mọi người, hãy thu hồi tin nhắn</Text>
                                    <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }}><Text> </Text></View>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                    <Pressable onPress={() => setModalVisible1(false)} style={{ height: 30, width: 50, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 17, fontWeight: 500 }}>Hủy</Text>
                                    </Pressable>

                                    <Pressable onPress={() => deleteMessageForMe()} style={{ height: 30, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'red', fontSize: 17, fontWeight: 500 }}>Xóa</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
}

