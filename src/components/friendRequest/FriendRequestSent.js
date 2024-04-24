import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export const FriendRequestSent = ({ navigation }) => {
  return (
    <ScrollView style={{height:"100%", backgroundColor:'white'}}>
      <Pressable style={{backgroundColor:"white"}}>
        <View style={{flexDirection:'row', width:"100%", alignItems:"center", paddingLeft:20, paddingRight:20}}>
          <View style={{height: 45, width: 45, borderRadius: 30, backgroundColor: `green`}}></View>
          <View style={{flex:1, flexDirection :"column", marginLeft:15, padding:10}}>
            <Text style={{fontWeight:"bold"}}>Trần Minh Thuận</Text>
            <Text>Muốn kết bạn</Text>
          </View>
          <Pressable style={{backgroundColor:'#EAEDF0', justifyContent:'center', padding:8, borderRadius:10, borderBlockColor:"black", borderWidth:1}}>
            <Text style={{color:'black', fontWeight:"bold"}}>Thu hồi</Text>
          </Pressable>
        </View>
      </Pressable>
    </ScrollView>
  );
};