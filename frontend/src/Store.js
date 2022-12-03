import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((x) => x._id === newItem._id);
      const cartItems = existItem
        ? state.cart.cartItems.map((x) =>
            x._id === existItem._id ? newItem : x
          )
        : [...state.cart.cartItems, newItem];

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
      break;

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
