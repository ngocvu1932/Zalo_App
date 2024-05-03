import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  // header
  header: {
    width: '100%',
    height: 90,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
  },

  body: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  btnSelectChat: {
    backgroundColor: '#FFFFFF', 
    height: 80, 
    marginBottom: 1, 
    alignItems: 'center' ,
    justifyContent: 'center',
  },

  icon: {
    marginLeft: 10,
    color: 'white'
  },

  searchTxt: {
    color: "white",
    fontSize: 17,
    width: "70%",
    marginLeft: 10,
    height: 40,
  },

  searchBtnWrapper: {
    flexDirection: "row",
    marginLeft: 15,
    backgroundColor: 'red'
  },

  lastMessage_content: {
    fontSize: 16,
    color: 'grey',
    // fontWeight:200
  },

  time: {
    fontSize: 14,
    color: 'grey',
    marginTop: "10px",
    right: "10px",
    // fontWeight:500,
    color: "black"
  },

  actionIcons: {
    flexDirection: 'row',
    marginRight: 10
  },

  line1: {
    height: 1,
    backgroundColor: '#FFFFFF',
    width: '15%'
  },

  line2: {
    height: 1,
    backgroundColor: '#F1F2F4',
    width: '85%'
  },

  line: {
    flexDirection: 'row'
  },
});
