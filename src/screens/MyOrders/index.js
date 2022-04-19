import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Share
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from'react-native-vector-icons/Fontisto';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';
;
import constants from '../../constants';
import Components from '../../components';
import {styles} from './styles';
import Fonts from '../../constants/Fonts';
import {
        
    getMyOrders
} from '../../actions/marketPlace'
import { getUser } from '../../actions/auth';


const MyOrders = (props) => {
    const [state, setState] = useState({        
    });
  
    useEffect(() => {
        props.dispatch(getMyOrders()),
        props.dispatch(getUser())
    }, [])


    const renderMyOrders = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: 5,
                left:20
            }}>
                <Components.CardOrders
                    title={item.f_displayOrderId}

                />
                   
            </View>
        )
    }


    const renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",                
            }}>
                <MaterialIcons
                    name="remove-shopping-cart"
                    size={200}
                    color="#EAE9E9"
                />
                <Text style={{
                    fontSize: 18,
                    color: "#EAE9E9"
                }}>Your cart is empty.</Text>
            </View>
        )
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            
            <SafeAreaView style={styles.container}>                
            <View style={{ flex: 1, paddingVertical: 15 }}>
                    <FlatList
                        
                        data={props.market.myOrders}
                        renderItem={renderMyOrders}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmpty}
                    />           
            </View>
            <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
            />

            </SafeAreaView>

        </>
    )
}

function mapStateToProps(state) {
    let { auth,market } = state;
    return {
        auth,
        market
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);