import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        backgroundColor: '#009AFA',
    },

    header: {
        width: '100%',
        height: 55,
        backgroundColor: '#009AFA',
        justifyContent: 'center'
    },

    pressBack: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 250,
        height: 40,
        // backgroundColor: 'red',
        // justifyContent: 'center'
    },

    txtInHeader: {
        fontSize: 21,
        color: '#F1FFFF',
        marginLeft: 10,
        marginBottom: 2
    }, 
    
    body: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingBottom: 200,
    },

    inputt: {
        width: '90%', 
        fontSize: 18 , 
        height: 40, 
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        color: 'black',
    },

    btnLogin: {
        height: 45, 
        marginTop: 40 ,
        width:200, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 25
    }, 

    blue: {
        backgroundColor: '#008FFF'
    },

    gray: {
        backgroundColor: '#C1D4E3'
    },
})