import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5F6F8',
        backgroundColor: '#FFFFFF',
    }, 

    header: {
        width: '100%',
        height: 90,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-end'
    },

    txtInHeader: {
        color: '#F1FFFF',
        marginLeft: 15,
        color: "white",
        fontSize: 18,
        fontWeight: '500'
    },
    
    body: {
        backgroundColor: '#F5F6F8',
        position: 'absolute',
        top: 90,
        left: 0,
        right: 0,
        height: '100%',
    },

    iconInPress: {
        justifyContent: 'center',
        alignItems: 'center', 
        height: 40,
        width: 40,
        backgroundColor: '#E6E6E6',
        borderRadius: 20
    },
    avtWrapper:{
        flexDirection: 'column',
        alignItems: 'center',
        height: 70,
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginTop: 15,
        marginBottom: 15,
        padding:10
    },
    img_avt:{
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems:'center',
        // borderBlockColor:'#0091FF',
    },

    pressbtnOP :{
        height: 90,
        width: '20%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    pressFindMessage:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },

    btnOpts:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 55,
        backgroundColor: '#ffffff'
    },

    txt:{
        fontSize: 17,
        marginLeft: 15
    },

    imageContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
    },

    img:{
        height: 70,
        width: 70,
        padding:10
    },

    line1: {
        backgroundColor: '#FFFFFF',
        width: '13%'
    },

    line2: {
        backgroundColor: '#F1F2F4',
        width: '87%'
    },

    line: {
        flexDirection: 'row'
    },
})