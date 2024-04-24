import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009AFA',
  },
  // header
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    alignItems: 'center',
    backgroundColor: '#009AFA', 
    justifyContent: 'space-between',
  },

  body: {
    flex: 1,
    backgroundColor: '#F4F5F7', 
    // marginTop: 78,
  },

  btnSelectChat: {
    backgroundColor: '#FFFFFF', 
    height: 80, 
    marginBottom: 1, 
    alignItems: 'center' ,
    justifyContent: 'center'
  },

  icon: {
    color: "white",
  },

  searchTxt: {
    color: "white",
    fontSize: 20,
    width: "70%",
    marginLeft: 10,
  },

  searchBtnWrapper: {
    flexDirection: "row",
    marginLeft: 15,
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

  actionIconsWrapper: {
    flexDirection: 'row',
    marginRight: 10
  },
});
