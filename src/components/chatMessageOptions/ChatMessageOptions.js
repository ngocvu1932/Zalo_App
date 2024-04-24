import { Image, Pressable, ScrollView, Text, View, Switch } from 'react-native'
import React, {useRef, useState} from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faLock, faStar, faUser,faWandMagicSparkles, faBell, faPencil, faClock, faImage, faUserPlus, faPersonCirclePlus, faUserGroup, faThumbtack, faEyeSlash, faPhoneFlip, faTrash, faChevronLeft} from '@fortawesome/free-solid-svg-icons' 
import axios from '../../config/axios'
import Toast from 'react-native-easy-toast'
 
export const ChatMessageOptions = ({navigation, route}) => {
    const {items} = route.params; 
    const [isEnabled, setIsEnabled] = useState(false); 
    const toastRef = useRef(null);
    console.log( 'ddd',items);
    
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
    };
    // xóa bạn bè
    const handleUnfriend = async (userId) => {
        const payload = { 
            userId: userId
        }
        try {
            const response = await axios.put(`users/friendShip/unfriend`, payload)
            if(response.errCode === 0){
                toastRef.current.show('Xóa bạn bè thành công!', 2000);
                setTimeout(() => {
                    navigation.navigate('Messages')
                }, 1000)
            }
        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <SafeAreaView style={styles.container}>  
            <View style={styles.header}>
                <Pressable onPress={()=>{
                    navigation.navigate('ChatMessage', {items: items})
                }}>
                    <FontAwesomeIcon style={{marginLeft: 15}} color='#F1FFFF' size={21} icon={faChevronLeft} />
                </Pressable>
                <Text style={styles.txtInHeader}>Tùy chọn</Text>
            </View>

            <ScrollView style={styles.body}>
                <View>
                    <Pressable disabled={items.type.includes('GROUP_CHAT')} style={{alignItems: 'center', marginTop: 20}} onPress={()=>{
                        navigation.navigate('Profile', {phoneNumber: items.phoneNumber })
                    }}>
                        { items.avatar.includes('rgb') ?
                            <View style={{height: 100, width: 100, borderRadius: 55, backgroundColor: items.avatar}}></View>
                        : 
                            <Image source={{uri: items.avatar}} style={{height: 100, width: 100, borderRadius: 50}}></Image>
                        }
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>{items.userName}</Text>
                    </Pressable>

                    <View style={{ flexDirection: 'row', marginTop: 20}}>
                        <Pressable style={styles.pressbtnOP}>
                            <View style={styles.iconInPress}>
                                <FontAwesomeIcon color='#515152' size={22} icon={faMagnifyingGlass} />
                            </View>
                            <Text style={{marginTop:10}} >Tìm tin nhắn</Text>
                        </Pressable> 
                        
                        {items.type=="PRIVATE_CHAT" ? (
                            <Pressable onPress={()=> {navigation.navigate('Profile', {phoneNumber: items.phoneNumber })}} style={styles.pressbtnOP}>
                                <View style={styles.iconInPress}>
                                    <FontAwesomeIcon color='#515152' size={22} icon={faUser} />
                                </View>
                                <Text style={{marginTop:10}} >Xem thông tin</Text>
                            </Pressable>
                        ) : (
                            <Pressable onPress={()=> {navigation.navigate('AddMember', {items:items})}} style={styles.pressbtnOP}>
                                <View style={styles.iconInPress}>
                                    <FontAwesomeIcon color='#515152' size={22} icon={faUserPlus} />
                                </View>
                                <Text style={{marginTop:10}} >Thêm</Text>
                            </Pressable>
                        )}
                        
                        <Pressable style={styles.pressbtnOP}>
                            <View style={styles.iconInPress}>
                                <FontAwesomeIcon color='#515152' size={22} icon={faWandMagicSparkles} />
                            </View>
                            <Text style={{marginTop:10}} >Đổi hình nền</Text>
                        </Pressable>

                        <Pressable style={styles.pressbtnOP}>
                            <View style={styles.iconInPress}>
                                <FontAwesomeIcon color='#515152' size={22} icon={faBell} />
                            </View>
                            <Text style={{marginTop:10}} >Tắt thông báo</Text>
                        </Pressable>
                    </View>

                    <>
                    {items.type=="PRIVATE_CHAT" ? (
                        <View>
                            <Pressable style={styles.encodeEndWrapper}>
                            <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faLock} />
                            <Text style={styles.txt}>Mã hóa đầu cuối</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faPencil} />
                                <Text style={styles.txt}>Đổi tên gợi nhớ</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faStar} />
                                <Text style={styles.txt}>Đánh dấu bạn thân</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled} 
                                /> 
                                </View>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faClock} />
                                <Text style={styles.txt}>Nhật ký chung</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faImage} />
                                <Text style={styles.txt}>Ảnh, file, link đã gởi</Text>
                            </Pressable>
                            <View style={styles.bottomContainer}>
                                <View style={styles.imageContainer}>
                                <Image source={require("../../../assets/img/bg_pngtree-nature-background-sunset-wallpaer-with-beautiful-flower-farms-image_2592160.jpg")} style={styles.img}></Image>
                                <Image source={require("../../../assets/img/background_profile_2254d1bb0d6c084c65611d6dbdf8ba1d.jpg")} style={styles.img}></Image>
                                <Image source={require("../../../assets/img/background_infor_thumb-350-1331865.png")} style={styles.img}></Image>
                                <Image source={require("../../../assets/img/images.jpg")} style={styles.img}></Image>
                            </View>
                            </View>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faUserPlus} />
                                <Text style={styles.txt}>Tạo nhóm với Trần Minh Thuận</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faPersonCirclePlus} />
                                <Text style={styles.txt}>Thêm Trần Minh Thuận vào nhóm</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faUserGroup} />
                                <Text style={styles.txt}>Xem nhóm chung</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faThumbtack} />
                                <Text style={styles.txt}>Ghim trò chuyện</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faEyeSlash} />
                                <Text style={styles.txt}>Ẩn trò chuyện</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faPhoneFlip} />
                                <Text style={styles.txt}>Báo cuộc gọi đến</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='red' size={22} icon={faTrash} />
                                <Text style={[styles.txt, {color:'red', fontWeight:'600'}]}>Xóa đoạn chat</Text>
                            </Pressable> 
                        </View>
                    ) : items.type == "GROUP_CHAT" ?(
                        <View>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faPencil} />
                                <Text style={styles.txt}>Đổi tên nhóm</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faStar} />
                                <Text style={styles.txt}>Đánh dấu nhóm</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled} 
                                />
                                </View>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faClock} />
                                <Text style={styles.txt}>Nhật ký nhóm</Text>
                            </Pressable>
                            <Pressable style={styles.encodeEndWrapper}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faImage} />
                                <Text style={styles.txt}>Ảnh, file, link đã gởi</Text>
                            </Pressable>
                            <View style={styles.bottomContainer}>
                                <View style={styles.imageContainer}>
                                <Image source={require("../../../assets/img/bg_pngtree-nature-background-sunset-wallpaer-with-beautiful-flower-farms-image_2592160.jpg")} style={styles.img}></Image>
                                <Image source={require("../../../assets/img/background_profile_2254d1bb0d6c084c65611d6dbdf8ba1d.jpg")} style={styles.img}></Image>
                                <Image source={require("../../../assets/img/background_infor_thumb-350-1331865.png")} style={styles.img}></Image>
                                <Image source={require("../../../assets/img/images.jpg")} style={styles.img}></Image>
                            </View>
                            </View>
                            <Pressable style={styles.encodeEndWrapper} onPress={()=>{
                                navigation.navigate('ManagerGroupMembers', {items:items})
                            }}>
                                <FontAwesomeIcon style={{marginLeft: 15}} color='#515152' size={22} icon={faUserGroup} />
                                <Text style={styles.txt}>Xem thành viên</Text>
                            </Pressable>
                        </View>
                    ) : (<View></View>)}
                    </>
                </View>
            </ScrollView>
            <Toast style={{backgroundColor: 'green'}} ref={toastRef} position='center' />
        </SafeAreaView>
    )
}