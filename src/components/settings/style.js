import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        backgroundColor: '#009AFA',
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        height: 55,
        alignItems: 'center',
        backgroundColor: '#009AFA',
        justifyContent: 'space-between'
    },

    pressBack: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        height: 40,
    },

    txtInHeader: {
        fontSize: 21,
        color: '#F1FFFF',
        marginLeft: 12,
        marginBottom: 2
    }, 
    
    body: {
        flex: 1,
        backgroundColor: '#F1F2F4',
        paddingBottom: 100,
    },

    viewShiled: {
        marginLeft: 20,
        // justifyContent: 'center',
    },

    txtViewShiled: {
        fontSize: 18,
        flex: 1,
        marginLeft: 20
    },

    pressShield: {
        // marginTop: 10,
        height: 55, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    txtViewData: {
        fontSize: 15,
        opacity: 0.8
    },

    line1: {
        height: 2,
        backgroundColor: '#FFFFFF',
        width: '15%'
        
    },

    line2: {
        height: 2,
        backgroundColor: '#F1F2F4',
        width: '85%'
    },

    line: {
        flexDirection: 'row'
    },
 
    pressSwitchAcc: {
        marginTop: 9,
        height: 55, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewLogout: {
        height: 70, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },

    pressLogout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '85%',
        backgroundColor: '#F1F2F4',
        borderRadius: 25
    }
})