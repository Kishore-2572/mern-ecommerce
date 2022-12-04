import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {  useNavigate } from 'react-router-dom'
import CheckOutSteps from '../components/checkout'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button'
import { Store } from '../Store'

export default function PaymentScreen() {
    const navigate=useNavigate();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart:{shippingAddress,cartItems,paymentMethod}} =state;
    const [paymentMethodName,setPaymentMethodName]=useState(paymentMethod || 'PayPal') 
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])
    const submitHandler=(e)=>{
        e.preventDefault();
        ctxDispatch({typr:"SAVE_PAYMENT_METHOD",payload:paymentMethodName})
        localStorage.setItem('paymentMethod',paymentMethodName)
        navigate('/placeorder')
    }
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <Helmet> <title>Payment</title> </Helmet>
      <h1 className='my-3'>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <div className='mb-3'>
            <Form.Check 
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName==='PayPal'}
                onChange={(e)=>setPaymentMethodName(e.target.value)}
            />
        </div>
        <div className='mb-3'>
            <Form.Check 
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={paymentMethodName==='Stripe'}
                onChange={(e)=>setPaymentMethodName(e.target.value)}
            />
        </div>
        <div className='mb-3'>
            <Button type='submit'>Continue</Button>
        </div>
      </Form>
    </div>
  )
}
