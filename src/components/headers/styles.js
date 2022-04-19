import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

import constants from '../../constants';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    headerWithSearchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
    },
    headerWithSearchInput: {
        width: constants.width_dim_percent *  60,
        paddingVertical: constants.vh(5),
        borderWidth: 1,        
        borderRadius: 10,
        color: constants.Colors.blue_primary,
        paddingHorizontal: constants.vw(10)
    },
    text12500: {
        fontSize: 12,
        color: constants.Colors.white
    },
    hitSlop: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    },
    searchButton:{
        alignItems:'center',
        backgroundColor:constants.Colors.blue_primary,
        padding:10,
        width: constants.width_dim_percent *  25,
        left:5,
        borderRadius:15,
    },
    searchText:{
        fontFamily:constants.Fonts.OpenSansBold,
        fontSize:14,
        color:constants.Colors.white
    }
})