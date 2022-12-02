import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './rating';

export default function Product(props) {
    const {product}=props;
  return (
    <Card  className='product'>
      <Link to={`/product/${product.slug}`}>
        <img className='card-img-top' src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
      <Card.Text>${product.price}</Card.Text>
      <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
