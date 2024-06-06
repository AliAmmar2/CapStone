import { useContext } from 'react';
import './checkout-item.styles.scss'
import { CartContext } from '../contexts/cart.context';

const CheckoutItem = ({item}) => {

    const {name, price, quantity, imageUrl} = item;
    const { addItemToCart, removeItemFromCart, clearCartItems} = useContext(CartContext);

    const addHandler = () => {
        addItemToCart(item);
    }

    const removeHandler = () => {
        removeItemFromCart(item);
    }

    const clearHandler = () => {
        clearCartItems(item);
    }


    return (
    <div className='checkout-item-container'>
        <div className='image-container'><img src={imageUrl} alt={`${name}`} /></div>
                    <span className='name'>{name}</span>
                    <span className='quantity'>
                        <div className='arrow' onClick={removeHandler}>&#10094;</div>
                        <span>{quantity}</span>
                        <div className='arrow' onClick={addHandler}>&#10095;</div>
                        </span>
                    <span className='price'>{price}</span>
                    <div className='remove-button' onClick={clearHandler}>&#10005;</div>
                    <div>
                    </div>
    </div>
    )
}

export default CheckoutItem;