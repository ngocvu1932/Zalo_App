import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#E2E9F1',
    },

    header: {
        width: '100%',
        height: 90,
        justifyContent: 'flex-end',
    },

    txtInHeader: {
        flex: 1,
        fontSize: 17,
        color: '#F1FFFF',
        width: '60%',
        height: 30,
        marginLeft: 10,
    },

    btnWrapper: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        height: 50,
    },

    btnTxt: {
        fontSize: 17,
        fontWeight: '400', 
        marginLeft: 20,
    },

    viewIcon: {
        height: 35,
        width: 35,
        borderRadius: 15,
        backgroundColor: "#0091FF", 
        alignItems: "center",
        justifyContent: "center",
    },

    btnSelect: {
        flexDirection: 'row', 
        justifyContent: 'center',
        backgroundColor: "#E6E4EA",  
        width: 100, 
        height: 40, 
        borderRadius: 30, 
        marginLeft: 15, 
        marginBottom: 2,
        alignItems: 'center',
    },
    
    line: {
        flexDirection: 'row',
        backgroundColor: '#E1E1E1'
    },

    btnItem: {
        marginTop: 10, 
        height: 60, 
        width: '100%', 
        justifyContent: 'center'
    },

    btnIcon: {
        height: 40, 
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})