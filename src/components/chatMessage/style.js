import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009AFA',
    },

    headerWrapper: {
        flexDirection: 'row',
        width: "100%",
        height: 70,
        alignItems: "center",
        backgroundColor: '#009AFA',
        justifyContent: 'space-between', // Thêm thuộc tính justifyContent
    },

    body: {
        flex: 1,
        backgroundColor: '#E2E9F1',
        width: "100%",
        height: 400,
        // backgroundColor: 'blue'
    },

    icon: {
        color: "white",
    },


    nameTxt: {
        color: "white",
        fontSize: 18,
        fontWeight: '500'
    },

    stateTxt: {
        color: "white",
        fontSize: 15,
        opacity: 0.8
    },
  
    // body
    footerWrapper: {
        flexDirection: 'row',
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF',
        zIndex: 0,
    },
   
    messageTxt:{
        color:"black",
        fontSize:22, // Loại bỏ dấu nháy kép ở giá trị số
        opacity:0.8,
        lineHeight:48,
    },

    viewEnd: {
        alignItems: 'flex-end', 
        width: '100%',
        // backgroundColor: 'orange'
    },

    viewStart: {
        alignItems: 'flex-start', 
        width: '100%',
        // backgroundColor: 'blue'
    },

    messsagePressEnd: { 
        backgroundColor: '#D0F0FD', 
        borderColor: '#D8DCDD', 
        borderWidth: 1 ,
        maxWidth: '80%', 
        borderRadius: 10, 
        marginRight: 10,  
        marginBottom: 5
    },

    messsagePressStart: { 
        backgroundColor: '#FEFEFE', 
        borderColor: '#D8DCDD', 
        borderWidth: 1 ,
        maxWidth: '80%',
        borderRadius: 10, 
        marginLeft: 30, 
        marginBottom: 5
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
       
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        height: 250,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },

    textMessagePress: {
        flexWrap: 'wrap', 
        paddingTop: 10, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 10,
        fontSize: 18
    },

    dateTime: {
        paddingLeft: 10, 
        paddingRight: 5, 
        paddingBottom: 5, 
        marginTop: -5,
        fontSize: 12,
        opacity: 0.5
    },

    longPress: {
        height: 55, 
        width: '25%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 2
    },

    name: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        fontSize: 12,
        opacity: 0.8
    }
})
