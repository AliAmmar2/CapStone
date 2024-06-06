import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingItem){
        return cartItems.map((cartItem)=>
            cartItem.id===productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
    )}

    return [...cartItems, {...productToAdd, quantity: 1}]
};

const removeCartItem = (cartItems, productToRemove) => {
    const item = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if(item.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }
    return cartItems.map((cartItem)=>
            cartItem.id===productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
}

const clearCart = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearCartItems: () => {},
    total: 0,
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cartTotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0 );
        setTotal(cartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearCartItems = (productToRemove) => {
        setCartItems(clearCart(cartItems, productToRemove));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearCartItems, total};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}