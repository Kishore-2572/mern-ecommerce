import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { Link, useLocation } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async';

export default function SignInScreen() {
const {search}=useLocation();
const redirectUrl=new URLSearchParams(search).get('redirect');
const redirect=redirectUrl?redirectUrl:'/';
  return (
    <Container className='small-container'>
        <Helmet>
            <title>SignIn</title>
        </Helmet>
        <h1 className='my-3'>
            SignIn
        </h1>
        <Form>
            <Form.Group className='mb-3' controlId="email">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" required/>
            </Form.Group>
            <Form.Group className='mb-3' controlId="password">
                <Form.Label>Password </Form.Label>
                <Form.Control type="password" require/>
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit">Sign In</Button>
            </div>
            <div className='mb-3'>
                New Customer{'  '}
                <Link className='route-link'  to={`/signup?redirect=${redirect}`} >Create an Account </Link>
            </div>
        </Form>

    </Container>

  )
}
