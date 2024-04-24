import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faChevronRight, faCircleCheck, faLock,  faMobilePhone,  faMobileScreenButton,  faPhone, faQrcode, faShieldVirus, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

export const AccountAndSecurity = ({navigation}) => {
  const user = useSelector(state => state.user);
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.header}>
        <Pressable style={styles.pressBack} onPress={()=> {navigation.goBack()}}>
          <FontAwesomeIcon icon={faChevronLeft} style={{marginLeft: 10}} color='#F5F8FF' size={20} />
          <Text style={styles.txtInHeader}>Tài khoản và bảo mật</Text> 
        </Pressable>
      </View>

      <ScrollView style={styles.body}>   
        <View style={styles.viewAccount}>
          <Text style={styles.txtTitle}>Tài khoản</Text>
          <View style={{alignItems: 'center'}} >
            <Pressable style={styles.pressAccount} onPress={()=> {alert('Thông tin cá nhân')}}>
              { user.user?.user?.avatar.includes('rgb') ?  
                <View style={[styles.avatar, {backgroundColor: `${user.user?.user?.avatar}`}]} ></View> 
              :  
                <Image source={require('../../../assets/img/avt.jpg')} style={styles.avatar}></Image>
              }    
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={styles.txtAllOne}>Thông tin cá nhân</Text>
                <Text style={styles.txtName}>{user.user?.user.userName}</Text>
              </View>
              <FontAwesomeIcon style={{marginRight: 15}} size={15} color='#6E6E6E' icon={faChevronRight}/>
            </Pressable>
          </View> 

          <Pressable style={styles.pressNumberPhone} onPress={()=> {alert('Số điện thoại')}}>
            <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faPhone} />
            <View style={styles.viewChild}>
              <Text style={styles.txtChild}>Số điện thoại</Text>
              <Text style={{fontSize: 16}}>{user.user?.user.phoneNumber}</Text>
            </View>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
          </Pressable>
        </View>

         {/* Làm màu kẻ vạch ngang */}
         <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressPrivacy} onPress={()=> {alert('Định danh tài khoản')}}>
            <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faUserCheck} />
            <Text style={[styles.txtChild, {}]}>Định danh tài khoản</Text>
            <View style={{flexDirection: "row", alignItems: 'center'}} >
              <FontAwesomeIcon icon={faCircleCheck} size={14} color='#288443'/>
              <Text style={{fontSize: 15, color: '#288443'}} > Đã định danh</Text> 
            </View>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
        </Pressable>

        {/* Làm màu kẻ vạch ngang */}
        <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressPrivacy} onPress={()=> {alert('Mã QR')}}>
            <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faQrcode} />
            <Text style={[styles.txtChild, {marginLeft: -167}]}>Mã QR của tôi</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
        </Pressable>

        <View style={styles.viewSecutity}>
          <Text style={styles.txtTitle}>Bảo mật</Text>
          <Pressable style={styles.pressNumberPhone} onPress={()=> {alert('Kiểm tra bảo mật')}}>
            <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faShieldVirus} />
            <View style={{marginLeft: -40}}>
              <Text style={styles.txtChild}>Kiểm tra bảo mật</Text>
              <Text style={{fontSize: 16, color: '#288443'}}>Không có vấn đề bảo mật nào</Text>
            </View>
            <FontAwesomeIcon icon={faCircleCheck} style={{marginRight: -40}} size={14} color='#288443'/>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
          </Pressable>
        </View>

        {/* Làm màu kẻ vạch ngang */}
        <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressPrivacy} onPress={()=> {alert('Khóa Zalo')}}>
            <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faMobileScreenButton} />
            <Text style={[styles.txtChild, {marginLeft: -134}]}>Khóa Zalo</Text>
            <Text style={{fontSize: 15, marginRight: -140}}>Đang tắt</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
        </Pressable>

        <View style={styles.viewLogin}>
          <Text style={styles.txtTitle}>Đăng nhập</Text>
          <Pressable style={styles.pressSecurityTow} onPress={()=> {alert('Bảo mật 2 lớp')}}>
            <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faShieldVirus} />
            <View style={{marginLeft: -25}}>
              <Text style={styles.txtChild}>Bảo mật 2 lớp</Text>
              <Text style={{fontSize: 15}}>Thêm hình thức xác nhận để bảo</Text>
              <Text style={{fontSize: 15}}>vệ tài khoản khi đăng nhập trên</Text>
              <Text style={{fontSize: 15}}>thiết bị mới</Text>
            </View>

            <Pressable style={[styles.button, isToggled && styles.toggledButton]} onPress={handleToggle}>
              <View style={[styles.circleButton, isToggled ? styles.circleButton1 : styles.circleButton]}></View>
            </Pressable>
          </Pressable>
        </View>

         {/* Làm màu kẻ vạch ngang */}
         <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressNumberPhone} onPress={()=> {alert('Thiết bị đăng nhập')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faMobilePhone} />
          <View style={{marginLeft: -40}}>
            <Text style={styles.txtChild}>Thiết bị đăng nhập</Text>
            <Text style={{fontSize: 15}}>Quản lý các thiết bị bạn sử dụng để</Text>
            <Text style={{fontSize: 15}}>đăng nhập Zalo</Text>
          </View>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
        </Pressable>

        {/* Làm màu kẻ vạch ngang */}
        <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressPrivacy} onPress={()=> {navigation.navigate('ChangePassword')}}>
            <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#6E6E6E' icon={faLock} />
            <Text style={[styles.txtChild, {marginLeft: -196}]}>Mật khẩu</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
        </Pressable>

        <Pressable style={[styles.pressPrivacy, {marginTop: 9}]} onPress={()=> {alert('Xóa tài khoản')}}>
            <Text style={[styles.txtChild, {marginLeft: 20}]}>Xóa tài khoản</Text>
            <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginRight: 20}} icon={faChevronRight}/>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

