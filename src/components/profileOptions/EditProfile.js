import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View, Keyboard } from 'react-native';
import { styles } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { faCircle, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import axios from "../../config/axios";
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userInfoSlice';
import { setUser } from '../../redux/userSlice';
import Toast from 'react-native-easy-toast';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EditProfile = ({navigation}) => {
    const userInfo = useSelector(state => state.userInfo);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [genderMale, setGenderMale] = useState(true);
    const [genderFemale, setGenderFemale] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState();
    const [userUpdate, setUserUpdate] = useState({
        id: userInfo.userInfo?.id,
        userName: userInfo.userInfo?.userName,
        birthdate: userInfo.userInfo?.userInfo.birthdate,
        gender: userInfo.userInfo?.userInfo.gender,
    });
    const [isCheck, setIsCheck] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const toastRef = useRef(null);
 
    // kiểm tra thông tin mới 
    useEffect(() => {
        var userUpdateBirth = moment.utc(new Date(userUpdate.birthdate)).utcOffset('+07:00').format('DD/MM/YYYY');
        var userInfoBirth = moment.utc(new Date(userInfo.userInfo?.userInfo.birthdate)).utcOffset('+07:00').format('DD/MM/YYYY');

        if (userUpdate.userName !== userInfo.userInfo?.userName || userUpdateBirth !== userInfoBirth || userUpdate.gender !== userInfo.userInfo?.userInfo.gender) {
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, [userUpdate]);

    // kiểm tra giới tính
    useEffect(() => {
        if ( userInfo.userInfo?.userInfo?.gender) {
            setGenderMale(true);
            setGenderFemale(false);
        } else {
            setGenderMale(false);
            setGenderFemale(true);
        }
    }, [userInfo]);

    // dispatch thoon tin moiw
    useEffect(() => {
        const setData = async () => {
            if (isCheck) {
                const userInfoCus = {
                    ...userInfo.userInfo,
                    avatar: userInfo.userInfo.avatar,
                    userInfo: {
                        ...userInfo.userInfo.userInfo,
                        birthdate: newUserInfo.info.birthdate,
                        gender: newUserInfo.info.gender,
                    },
                    userName: newUserInfo.userName,
                }
                
                const userCus = {
                    ...user.user,
                    user: {
                        ...user.user.user,
                        userName: newUserInfo.userName,
                    }
                };
                
                try {
                    await AsyncStorage.setItem('dataUser', JSON.stringify(userCus));
                    dispatch(setUserInfo(userInfoCus));
                    dispatch(setUser(userCus));
                    setIsCheck(false);
                } catch (error) {
                    console.log('Error saving data:', error);
                }
            }
        }

        setData();
    }, [newUserInfo, isCheck]);

    const handleGenderMale = () => {
        if (genderMale === false) {
            setGenderMale(true);
            setGenderFemale(false);
            setUserUpdate(pre => ({...pre, gender: 1}))
        }
    };

    const handleGenderFemale = () => {
        if (genderFemale === false) {
            setGenderMale(false);
            setGenderFemale(true);
            setUserUpdate(pre => ({...pre, gender: 0}))
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        setUserUpdate(pre => ({...pre, birthdate: date}));
        hideDatePicker();
    };

    const updateInfo = async () => {
        try {
            const response = await axios.put('/users/updateInfor', userUpdate)
            if (response.errCode === 0) {
                setNewUserInfo(response.data);
                setIsCheck(true);
                setIsUpdate(false);
                toastRef.current.show('Cập nhật thông tin thành công!', 1000);
                Keyboard.dismiss();
            } else {
                console.log('error ', response); 
            }
        } catch (error) {
            console.log('error', error); 
        }
    }

    const checkBox = (state, text) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[{height: 22, width: 22, borderRadius: 15, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}, state ? {backgroundColor: 'blue', borderColor: 'blue'} : {backgroundColor: '#FFFFFF', borderColor: '#C2C5CA',}]}>
                    {state ? <FontAwesomeIcon size={8} color='#FFFFFF' icon={faCircle} /> : null}
                </View>
                <Text style={{fontSize: 14}}>  {text}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <LinearGradient style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#008BFA', '#00ACF4']}>
                <View style={{height: '55%', justifyContent: 'center'}}>
                    <Pressable style={{flexDirection: 'row', alignItems: 'center', height: 30}} onPress={()=>{navigation.goBack()}}>
                        <FontAwesomeIcon icon={faXmark} style={{marginLeft: 10}} color='#FFFFFF' size={20} />
                        <Text style={styles.txtInHeader}>Thông tin cá nhân</Text>
                    </Pressable> 
                </View>
            </LinearGradient>

            <View style={styles.body}>
                <View style={{width: '100%', flexDirection: 'row', backgroundColor: '#FFFFFF'}}>
                    {typeof userInfo.userInfo.avatar === 'string' ? 
                    <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                        <View style={{height: 55, width: 55, borderRadius: 30, backgroundColor: userInfo.userInfo?.avatar}}></View>
                    </View> : ''}

                    <View style={{flex: 3}}>
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', height: 55}}>
                            <TextInput value={userUpdate.userName} onChangeText={(text)=> setUserUpdate(pre => ({...pre, userName: text}))} style={{width: '95%', height: 40, fontSize: 17, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', zIndex: 10}}></TextInput>
                            <FontAwesomeIcon color='#707070' style={{marginLeft: -20}} size={18} icon={faPencil} />
                        </View> 

                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                            <Pressable style={{ width: '95%', height: 40, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E5E5', zIndex: 10}} onPress={showDatePicker}> 
                                {!userUpdate.birthdate ? 
                                    selectedDate ? 
                                        <Text style={{ fontSize: 17}}>{moment.utc(selectedDate).utcOffset('+07:00').format('DD/MM/YYYY')}</Text> : 
                                        <Text style={{ fontSize: 17, opacity: 0.7}}>Chưa thiết lập</Text>
                                :
                                <Text style={{ fontSize: 17}}>{moment.utc(userUpdate.birthdate).utcOffset('+07:00').format('DD/MM/YYYY')}</Text>}
                            </Pressable>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker} 
                            />
                            <FontAwesomeIcon color='#707070' style={{marginLeft: -20}} size={18} icon={faPencil} />
                        </View>

                        <View style={{flexDirection: 'row', width: '50%', height: 40, alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                            <Pressable style={{}} onPress={()=> handleGenderMale()}>
                                {checkBox(genderMale, 'Nam')}
                            </Pressable>

                            <Pressable style={{}} onPress={()=> handleGenderFemale()}>
                                {checkBox(genderFemale, 'Nữ')}
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={{width: '100%', height: 80, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
                    <Pressable disabled={!isUpdate} style={[{width: '90%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20}, isUpdate ? {backgroundColor: 'blue',} : {backgroundColor: '#C1D4E3'}]} onPress={()=> updateInfo()}>
                        <Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: '500'}}>Lưu</Text>
                    </Pressable>
                </View>
            </View>
            <Toast style={{backgroundColor: 'green'}} ref={toastRef} position='center' />
        </View>
    )
};