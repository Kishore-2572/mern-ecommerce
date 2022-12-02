import React from 'react'
import { useParams } from 'react-router-dom'


export default function ProductScreen() {
    const params=useParams();
    const {slug}=params;
    // console.log(slug);
  return (
    <div>ProductScreen</div>
  )
}
