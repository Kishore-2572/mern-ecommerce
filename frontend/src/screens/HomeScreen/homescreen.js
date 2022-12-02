import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import data from '../../data.js';
import "./homescreen.css"
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer =(state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,products:action.payload,loading:false};
    case 'FETCH_FAIL':
      return {...state,loading:false,error:action.payload};
    default :
    return state;
  }
}
export default function HomeScreen() {
  const [{loading,error,products},dispatch]=useReducer(logger(reducer),{loading:true,error:'',products:[]})
  // const [products,setProducts]=useState([]);
  useEffect(() => {
    const getProducts=async ()=>{
      try{
        dispatch({type:"FETCH_REQUEST"});
        const result=await axios.get("/api/products");
        // setProducts(result.data);
        dispatch({type:"FETCH_SUCCESS",payload:result.data})
      }catch(err){
        dispatch({type:"FETCH_FAIL",payload:err.message})
        console.log(err);
      }
    }
    getProducts();
  },[])
  return (
    <div>
        <h1>Featured Products</h1>
        {
          loading?( <div>Loading...</div>):
          error ? (<div>{error}</div>):
        
          (<div className="products">
            {products.map((product) => (
              <div className="product" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <p>{product.name}</p>
                  <p>
                    <strong>$ {product.price}</strong>
                  </p>
                  <button>Add to cart</button>
                </div>
              </div>
            ))}
          </div>)
          }
    </div>
  )
}
