import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8'
    },
    
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        height: 35, 
        width: 35, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
});
