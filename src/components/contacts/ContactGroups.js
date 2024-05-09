import { Image, Pressable, Text, View, ScrollView, FlatList, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import { faMessage, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from '../../config/axios'
import { useState } from 'react'
import { socket } from '../../config/io';
import { styles } from "./style";

export const ContactGroups = ({navigation}) => {
  const [dataGroups, setDataGroups] = useState([])
  const [loadAgain, setLoadAgain] =useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadAgain(new Date());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchListGroups() 
  },[loadAgain])

  const fetchListGroups = async() => {
    try {
      const res = await axios.get(`/chat/pagination?page=1&limit=100`);
      if(res.errCode === 0){
        const dataGroups = res.data.filter(item => item.type == "GROUP_CHAT")
        setDataGroups(dataGroups)
      } else {
        setDataGroups([])
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const joinChatWithGroup = (item) => {
    // console.log("item", item);
    const newItem = {
      _id: item._id,
      userName: item.name,
      avatar: item.groupPhoto,
      updatedAt: item.updatedAt,
      userId: item.participants[0]?.id,
      type: "GROUP_CHAT",
      lastedMessage: item.lastedMessage,
      administrator: item.administrator,
      participants: item.participants.map(participant => ({...participant}))
    }
    // console.log("newItem", newItem);
    navigation.navigate('ChatMessage', {items: newItem, flag: true})
  }

  const renderItem = (item) => {
    return (
      <View style={{}}>
        <Pressable style={styles.btnJoinGroupChat} onPress={()=> joinChatWithGroup(item.item)}>
          <View style={{height: 60, width: 60, marginLeft: 10}}>
              {item.item.groupPhoto ? 
                <Image source={{uri: item.item.groupPhoto}} style={{height: 60, width: 60, borderRadius: 30}} /> 
              : item.item.participants?.map((participant, index) => (
                  index < 4 ? 
                  item.item.participants?.length <= 3 ? // nhoms cos 3 nguowif
                      <View key={index} style={[
                        {height: 30, width: 30}, 
                        index === 0 ? styles.position0 :
                          index === 1 ? styles.position1 :
                            styles.position2
                        ]}
                      >
                        {participant.avatar.includes('rgb') ? 
                          <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                        : 
                          <Image source={{uri: participant.avatar}} style={styles.avtGroup} />
                        }
                      </View>
                    : item.item.participants?.length === 4 ? //nhoms cos 4 nguoi
                      <View key={index} style={[
                        {height: 30, width: 30}, 
                        index === 0 ? styles.position0_1 :
                          index === 1 ? styles.position1_1 : 
                            index === 2 ? styles.position2_1 :
                            styles.position3_1
                        ]}
                      >
                        {participant.avatar.includes('rgb') ? 
                          <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                        : 
                          <Image source={{uri: participant.avatar}} style={styles.avtGroup} />
                        }
                      </View>
                    : item.item.participants?.length > 4 ? // nhoms 5 nguoi tro len
                      <View key={index} style={[
                        {height: 30, width: 30}, 
                        index === 0 ? styles.position0_1 :
                          index === 1 ? styles.position1_1 : 
                            index === 2 ? styles.position2_1 :
                            [styles.position3_1, {backgroundColor: '#E9ECF3', justifyContent: 'center', alignItems: 'center', borderRadius: 15, height: 28, width: 28}]
                        ]}
                      >
                        {participant.avatar.includes('rgb') ? 
                          <View style={{}}>
                            {index === 3 ? 
                              <Text>{item.item.participants.length - index}</Text> 
                            : 
                              <View style={[styles.avtGroup, {backgroundColor: participant.avatar}]} /> 
                            }
                          </View>
                        : 
                          <View style={{}}>
                            {index === 3 ? 
                              <Text>{item.item.participants.length - index}</Text> 
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

          <View style={{flex: 1, marginLeft: 10, height: 45, justifyContent: 'space-between'}}>
            <Text numberOfLines={1} style={{fontSize: 17}}>{item.item?.name}</Text>
            <Text style={{fontSize: 14, opacity: 0.7}}>Content last</Text>
          </View>

          <View style={{paddingLeft: 10, alignSelf: 'flex-start', margin: 10}}>
            <Text>12 phút</Text>
          </View>
        </Pressable> 
        { renderLine('none')}
      </View>
    )
  };

  const renderLine = (style) => {
    return (
      <View>
        {style === "full" ? 
          <View style={{height: 8, backgroundColor: '#F5F6F8'}} ></View> 
          : 
          <View style={{width: '100%', height: 1, flexDirection: 'row'}}>
            <View style={{width: '19%', height: 1, backgroundColor: '#FFFFFF'}}></View>
            <View style={{width: '81%', height: 1, backgroundColor: '#DFDFDF'}}></View>
          </View>
        }
      </View>
    )
  }


  return ( 
    <View style={styles.container}>
      <ScrollView style={{backgroundColor: '#FFFFFF', height: '100%'}}>
        <Pressable style={{flexDirection: "row", alignItems: 'center', height: 70}} onPress={()=>{navigation.navigate('CreateGroup')}}>
          <View style={{width:40, height:40, borderRadius:50, backgroundColor: "#E9E9F1", alignItems:'center', justifyContent:'center', marginLeft: 20}}>
            <FontAwesomeIcon size={20} color={"#237AC1"} icon={faUserGroup} />
          </View>
          <Text style={{color: '#217CE1', fontSize: 17, marginLeft: 15 }}>Tạo nhóm mới</Text>
        </Pressable>

        { renderLine('full')}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 14, fontWeight:'500', margin: 10}}>Nhóm đang tham gia {`(${dataGroups.length})`}</Text>
          <Text style={{fontSize: 13, margin: 10}}>Hoạt động cuối</Text>
        </View>

        <FlatList
          data={dataGroups}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  )
}