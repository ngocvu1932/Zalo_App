import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#009AFA',
  },

  header: {
      flexDirection: 'row',
      width: '100%',
      height: 55,
      alignItems: 'center',
      backgroundColor: '#009AFA',
  },

  body: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },

  txtInHeader: {
    fontSize: 18,
    color: '#F1FFFF',
    width: '60%',
    height: 30,
    marginLeft: 15,
  },

  btnHeader: {
    height: 40, 
    width: 40, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  line1: {
    height: 1,
    width: '5%',
    backgroundColor: '#FFFFFF',
  },

  line2: {
    height: 1,
    backgroundColor: '#E1E1E1',
    width: '95%'
  },

  line: {
    flexDirection: 'row'
  },

  btnOption:{
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
  },

  txt:{
    fontSize: 18,
    marginLeft: 20
  },

  button: {
    alignSelf: 'center',
    backgroundColor: '#A8ADB1',
    borderRadius: 15,
    height: 25,
    width: 45,
    marginRight: 15,
    justifyContent: 'center'
  },

  circleButton: {
    height: 20, width: 20, 
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginLeft: 2
  },

  circleButton1: {
    height: 20, width: 20, 
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginLeft: 23
  },

  toggledButton: {
    backgroundColor: 'blue',
  },



    OptionsAbove:{
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height:150,
    },
    pressFindMessage:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    
    
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      modalText: {
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },

});
