import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
        backgroundColor: '#F5F6F8'
    },
    
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 10,
        marginTop: 30,
    },

    txtInHeader: {
        fontSize: 18,
        color: '#F1FFFF',
        width: '60%',
        height: 30,
        marginLeft: 15,
    },

    btnChat: {
        height: 40,
        backgroundColor: '#DBEAFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },

    btnAddFriend: {
        height: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    btnHeader: {
        height: 40, 
        width: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
});
