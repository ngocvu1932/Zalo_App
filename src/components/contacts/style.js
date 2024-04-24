import { StyleSheet } from 'react-native'

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
        justifyContent: 'space-between'
       
    },
    txtInHeader: {
        flex: 1,
        fontSize: 18,
        color: '#F1FFFF',
        width: '60%',
        height: 30,
        marginLeft: 15,
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
    }
})