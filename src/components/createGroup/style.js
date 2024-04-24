import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009AFA',
    },
    header: {
        flexDirection: 'row',
        width: "100%",
        height: 55,
        alignItems: "center",
        backgroundColor: '#009AFA',
        justifyContent: 'flex-start',
    },

    body: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },

    txtInHeader: {
        color: '#F1FFFF',
        marginLeft: 15,
        color: "white",
        fontSize: 18,
        fontWeight: '500'
    },
    footerWrapper:{
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
})