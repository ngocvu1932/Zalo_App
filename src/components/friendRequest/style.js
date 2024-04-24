import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009AFA', 
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#009AFA',
        justifyContent: 'space-between'
    },

    txtInHeader: {
        fontSize: 18,
        color: '#F1FFFF',
        marginLeft: 15,
        fontWeight: '500',
    },
})