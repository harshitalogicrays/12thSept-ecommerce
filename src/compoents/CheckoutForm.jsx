import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail, selectUserId } from "../redux/authSlice";
import { empty_cart, selectCartItems, selectTotalAmount } from "../redux/cartSlice";
import { selectcheckouts } from "../redux/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

let CheckoutForm=()=> {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) { return;  }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret" );

    if (!clientSecret) { return;  }
   }, [stripe]);

let userEmail=useSelector(selectUserEmail)
let userId=useSelector(selectUserId)
let cartItems=useSelector(selectCartItems)
let totalAmount=useSelector(selectTotalAmount)
let shippingAddress=useSelector(selectcheckouts)
const dispatch=useDispatch()
const navigate=useNavigate()
let saveorder=()=>{
    let today=new Date()
    let orderDate=today.toLocaleDateString()
    let orderTime=today.toLocaleTimeString()
    let orderConfig={userEmail,userId,cartItems,totalAmount,shippingAddress,orderDate,orderTime,orderStatus:"Order Placed",createdAt:Timestamp.now().toDate()}
    try{
        let docRef=collection(db,"orders")
        addDoc(docRef,orderConfig)
        dispatch(empty_cart())

        emailjs.send('service_06v6km4', 'template_eaf64yr', {user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,amount:orderConfig.totalAmount}, 'ouyyULNr1Fl9QYxiJ')
      .then((result) => {
        toast.success("order placed")
        navigate('/checkoutsuccess')
      }, (error) => {
          console.log(error.text);
      });        
    }
    catch(err){
        toast.error(err.message)
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
         return;
    }

        setMessage(null)
        setIsLoading(true)
        const confirmpayment=await stripe.confirmPayment({
                elements,
                confirmParams:{
                    return_url:"http://localhost:3000/checkout-success"  },
                redirect:"if_required"
        }).then((result)=>{
            if(result.error){
                toast.error(result.error.message)
                setMessage(result.error.message)
                return ;  }
            if(result.paymentIntent){
                if(result.paymentIntent.status=='succeeded'){
                    setIsLoading(false)
                    toast.success('payment success') 
                    saveorder()
                } }
        })
        setIsLoading(false)
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="row mt-5 shadow p-2">
        <div className="col-6">
            <CheckoutSummary/>
        </div>
        <div className="col-6">
            <h1>Stripe Checkout</h1><hr/>
         <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <div class="d-grid gap-2 mt-3">
            <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary">
            <span id="button-text">
                {isLoading ? <div class="spinner-border text-warning" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div> : "Pay now"}
            </span>
            </button>
            </div>         
           
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    </div>
   
  );
}
export default CheckoutForm