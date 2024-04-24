
import React, { useEffect, useState } from "react";
import { LogBox, Pressable, ScrollView, Text, View } from "react-native";
import axios, { setAuthorizationAxios } from "../../config/axios";
import { socket } from '../../config/io';

export const FriendRequestReceived = ({ navigation }) => {
  const [friendRequestReceived, setFriendRequestReceived] = useState([]);
  const [loadAgain, setLoadAgain] = useState(1);

  useEffect(() => {
    socket.then(socket => {
        socket.emit('setup'); 
        socket.on('connected', () => {
            console.log('Connected to server 1');
        });

        socket.on('need-accept-addFriend', (data) => {
            // console.log('data',data); 
            console.log('need-accept-addFriend', data);
            setLoadAgain(loadAgain + 1);
        });

    });

    return () => {
        socket.then(socket => {
            socket.off('connected');
            socket.off('need-accept-addFriend');
           
        });
    };
}, []);

console.log('1'); 

  useEffect(()=>{
    const getFriendRequestReceived = async () => {
      try {
        const response = await axios.get(`/users/notifications/friendShip`);
        console.log('response 1', response); 
        if(response.errCode ===0 ){
          setFriendRequestReceived(response.data.map(item=>item.sender))
        }
      } catch (error) { 
        
      }
    }

    getFriendRequestReceived();
    // console.log(1);
  }, [loadAgain])

  
  const acceptFriendRequest = async (senderId) => {
    const payload = {
      userId: senderId
    }

    try {
      const res = await axios.put(`/users/friendShip`, payload);
    } catch (error) {
    }
  }

  return (
    <ScrollView style={{height:"100%", backgroundColor:'white'}}>
      {friendRequestReceived.map((request, index)=> (
        <Pressable style={{backgroundColor:"white"}}>
          <View style={{flexDirection:'row', width:"100%", alignItems:"center", paddingLeft:20, paddingRight:20}}>
            <View style={{height: 45, width: 45, borderRadius: 30, backgroundColor: request.avatar }}></View>
            <View style={{flex:1, flexDirection :"column", marginLeft:15, padding:10}}>
              <Text style={{fontWeight:"bold"}}>{request.userName}</Text>
              <Text>Đã gửi cho bạn lời mời kết bạn</Text>
            </View>
            <Pressable style={{backgroundColor:'#009EF8', justifyContent:'center', padding:10, borderRadius:10}} onPress={()=>acceptFriendRequest(request.id)}>
              <Text style={{color:'white', fontWeight:"bold"}}>Chấp nhận</Text>
            </Pressable>
          </View>
        </Pressable>
      ))}
      
    </ScrollView>
  );
};

// import React, { useEffect, useState } from "react";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import axios, { setAuthorizationAxios } from "../../config/axios";
// import {socket} from "../../config/io";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsAddFriend } from "../../redux/stateAddfriendSlice";
// import { setListFriend } from "../../redux/friendSlice";

// export const FriendRequestReceived = ({ navigation }) => {
//   const [friendRequestReceived, setFriendRequestReceived] = useState([]);
//   const [renderedRequests, setRenderedRequests] = useState([]); 
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user);
//   // const currentId = user.user.user.id;

//   // useEffect(()=>{
//   //   socket.then(socket => {
//   //     socket.on('need-accept-addFriend', (data) => {
//   //       // fetchNotificationFriendShip();
//   //       fetchFriendList()
//   //     })
//   //   })
//   // }, [])

//   useEffect(() => {
//     socket.then(socket => {
//         socket.emit('setup');
//         socket.on('connected', () => {
//             console.log('Connected to server');
//         });
//         socket.then(socket => {
//           socket.on('need-accept-addFriend', (data) => {
//             fetchNotificationFriendShip();
//             fetchFriendList()
//           })
//         })
//     });
//     return () => {
//         socket.then(socket => {
//             socket.off('connected');
//             socket.off('new-group-chat');
//         });
//     };
//   }, []); 

//   useEffect(() => {
//     fetchNotificationFriendShip()
//     // fetchFriendList()
//   },[friendRequestReceived])
  
//   async function fetchFriendList() {
//     try {
//       const res = await axios.get(`/users/friends?page=${1}&limit=${100}`);
//       if(res.errCode === 0){
//         const currentUserFriends = res.data.map(item => {
//           if (item.user1Id === currentId) {
//               return item.user2
//           } else if (item.user2Id === currentId) {
//               return item.user1
//           }
//         });
//         dispatch(setListFriend(currentUserFriends))
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   }

//   // useEffect(() => {
//   //   socket.then(socket => {
//   //       socket.emit('setup');
//   //       socket.on('connected', () => {
//   //           console.log('Connected to server');
//   //       });
//   //       socket.on('send-add-friend', (data)=> {
//   //       });
//   //       socket.on('need-accept-addFriend', (data)=> {
//   //         fetchFriendList()
//   //       });
//   //   });
//   //   return () => {
//   //       socket.then(socket => {
//   //           socket.off('connected');
//   //           socket.off('new-group-chat');
//   //       });
//   //   };
//   // }, []);


//   const fetchNotificationFriendShip = async () => {
//     try {
//       const res = await axios.get(`/users/notifications/friendShip`);
//       if(res.errCode ===0 ){
//         const data= res.data.map(item=>item.sender)
//         // const uniqueArray = [...new Set(data)];
//         setFriendRequestReceived(data);
//       }
//     } catch (error) {
//     }
//   }

//   const acceptFriendRequest = async (senderId) => {
//     const payload = {
//       userId: senderId
//     }
//     try {
//       const res = await axios.put(`/users/friendShip`, payload);
//       if(res.errCode === 0){
//         dispatch(setIsAddFriend());
//       }
//     } catch (error) {
//     }
//   }
//   return (
//     <ScrollView style={{height:"100%", backgroundColor:'white'}}>
//       <>
//       {friendRequestReceived.map((request, index)=> (
//         <Pressable key={index} style={{backgroundColor:"white"}}>
//           <View style={{flexDirection:'row', width:"100%", alignItems:"center", paddingLeft:20, paddingRight:20}}>
//             <View style={{height: 45, width: 45, borderRadius: 30, backgroundColor: request.avatar }}></View>
//             <View style={{flex:1, flexDirection :"column", marginLeft:15, padding:10}}>
//               <Text style={{fontWeight:"bold"}}>{request.userName}</Text>
//               <Text>Đã gửi cho bạn lời mời kết bạn</Text>
//             </View>
//             {/* <Pressable style={{backgroundColor:'#009EF8', justifyContent:'center', padding:10, borderRadius:10}} onPress={()=>{
//               acceptFriendRequest(request.id)
//             }}></Pressable> */}
//             <Pressable style={{backgroundColor:'#009EF8', justifyContent:'center', padding:10, borderRadius:10}} onPress={()=>{
//               acceptFriendRequest(request.id)
//             }}>

//               <Text style={{color:'white', fontWeight:"bold"}}>Chấp nhận</Text>
//             </Pressable>
//           </View>
//         </Pressable>
//       ))}
//       </>
//     </ScrollView>
//   );
// };