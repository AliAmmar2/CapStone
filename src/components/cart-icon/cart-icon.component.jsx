import './cart-icon.styles.scss';
import {ReactComponent as Icon} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

const CartIcon = () => {

    const { isCartOpen ,setIsCartOpen, cartItems} = useContext(CartContext);
    const quantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    const toggleDropdown = () => {
        setIsCartOpen(!isCartOpen);
    }
    return(
        <div onClick={toggleDropdown} className='cart-icon-container'>
            <Icon className='shopping-icon'/>
            <span className='item-count'>{quantity}</span>
        </div>
    )
    
}

export default CartIcon;