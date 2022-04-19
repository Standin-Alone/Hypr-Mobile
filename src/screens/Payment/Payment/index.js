import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import constants from '../../../constants';
import Components from '../../../components';
import getConfig from '../../../utils/config';
import {getUserIdFromStorage} from '../../../utils/asyncstorage';
import {placeOrder,getCartListm,successPayment,stripeSuccess} from '../../../actions/marketPlace';
import base64 from 'react-native-base64';
import StripeCheckout from 'react-native-stripe-checkout-webview';

let   stripeAPI =  { STRIPE_PUBLIC_KEY: 'pk_test_51KnhTJGAX1ovFy7T69BpTV76q40QV7DyAf5tByH9atqDmS5beGItM2pghqHLagZ0KF5NpU5nlP0WjAKGZnq9m8Gs00Q39c6UTV'  };



const Payment = (props) => {
    const [userid,setUserId] = useState("")
    useEffect(()=>{
     
        getUserIdFromStorage().then(id=>{
            setUserId(id)
        })
        
       
    })
    
    const [visible, setVisiblity] = useState(true);

    const handleNavigationStateChange=(navState)=>{
        
        const {url,title} = navState;
        
        // console.log("navState",navState);
        if(title === "Payment Success | Paypal"){
            console.log("url",url);
            let spliturl = url.split('?');
            console.log("spliturl",spliturl);
            let splitotherhalf = spliturl[1].split('&');
            console.log("splitotherhalf",splitotherhalf);
            let paymentId = splitotherhalf[0].replace("paymentId=","");
            let token = splitotherhalf[1].replace("token=","");
            let lastValue = url.split('/')
            console.log("lastValue",lastValue);
            const payload={
                paymentMode:"Paypal",
                orderId:props.route.params.orderId
            }
            setTimeout(() => {
                props.dispatch(placeOrder(payload))
            }, 2000);
        }else if(title === "Payment Success | Stripe"){
            
            let payload = {
                checkoutSessionId:props.route.params.checkoutSessionId,
                paymentId:props.route.params.checkoutSessionId,
                payerId:props.route.params.orderId,
                cart:props.route.params.cart,
                _id:userid,
                totalAmount:props.route.params.cart.reduce((prev, current) => prev + parseFloat(current.f_totalAmount), 0)

            }   
            props.dispatch(successPayment(payload));
                
        }

        if(title === "Payment Cancelled | Paypal"){
            // setTimeout(() => {
            //     props.navigation.goBack()
            // }, 2000);
        }else if (title === "Payment Cancelled | Stripe"){
            setTimeout(() => {
                props.navigation.goBack()
            }, 2000);
        }
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: constants.Colors.white
            }}>
                <View style={{
                    paddingHorizontal: 15
                }}>
                    {/* <Components.PrimaryHeader
                onPress={() => props.navigation.goBack()}
                title="Payment"
                />
                   */}
                </View>
                
                
                {props.route.params.modeOfPayment == 'Paypal' ?(
                    // PAYPAL PAYMENT
                    <View style={{ 
                        height: Dimensions.get('window').height, 
                        width: Dimensions.get('window').width,
                        overflow:'hidden',
                        flex:1
                        }}>
                        <WebView
                            scalesPageToFit={true}
                            //source={{ uri: `${getConfig().accesspoint}${constants.EndPoint.PAYMENT_CHECKOUT}/${props.auth.totalPayingAmount}/${userid}` }}
                            source={{ uri: `${getConfig().accesspoint}${constants.EndPoint.PAYMENT_CHECKOUT}/${userid}/${base64.encode(JSON.stringify(props.route.params.cart))}`}}
                            onNavigationStateChange={handleNavigationStateChange}
                            startInLoadingState={true}
                            renderLoading={() => <Components.ProgressView 
                                                        isProgress={true}
                                                        title={constants.AppConstant.Bando}
                                                />}

                        />
                    </View>
                    )
                    :
                    // STRIPE 
                        (
                        <StripeCheckout
                                stripePublicKey={stripeAPI.STRIPE_PUBLIC_KEY}   
                                checkoutSessionInput={{
                                sessionId: props.route.params.checkoutSessionId,                                
                                // successURL: `${getConfig().accesspoint}successPayment?sc_checkout=success&sc_sid=${props.route.params.checkoutSessionId}&paymentId=${props.route.params.orderId}&payerId=${props.route.params.orderId}&paymentTitle=Stripe`,
                                // cancelURL: `${getConfig().accesspoint}cancelledPayment?sc_checkout=cancel&sc_sid=${props.route.params.checkoutSessionId}`,
                                }}
                                onSuccess={({ checkoutSessionId }) => {     
                                    
                                    // let payload = {                                        
                                    //     paymentId:props.route.params.checkoutSessionId,
                                    //     payerId:props.route.params.orderId,                                                                                
                                    // }   

                                    // props.dispatch(stripeSuccess(payload));


                                    let payload = {
                                        checkoutSessionId:props.route.params.checkoutSessionId,
                                        paymentId:props.route.params.checkoutSessionId,
                                        payerId:props.route.params.orderId,
                                        cart:props.route.params.cart,
                                        _id:userid,
                                        totalAmount:props.route.params.cart.reduce((prev, current) => prev + parseFloat(current.f_totalAmount), 0)
                        
                                    }   
                                    props.dispatch(successPayment(payload));
                                        
                                }}
                                
                                onCancel={() => {
                                    // setTimeout(() => {
                                    //     props.navigation.goBack()
                                    // }, 500);
                                }}

                                
                                onLoadingComplete={() => {
                                            console.log(`loading done`);
                                }}

                                webViewProps={{ onNavigationStateChange: handleNavigationStateChange }}
                                renderOnComplete= {()=>{
                                    return (<View style={{backgroundColor:'transparent'}}></View>)
                                }}
                        />
                        )

                }
           
            </SafeAreaView>
        </>
    )
}


function mapStateToProps(state) {
    const { auth } = state
    return {
        auth
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payment)
