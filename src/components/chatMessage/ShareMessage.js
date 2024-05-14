import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export const ShareMessage = ({navigation, route}) => {
    const {data} = route.params
    // console.log(data);
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
        </View>
    )
}