import { Fragment, useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import {ReactComponent as Crown} from "../../assets/crown.svg"
import { userContext } from "../../components/contexts/user.context"
import './navigation.styles.scss' 
import { SignOutUser } from "../../utilities/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from '../../components/contexts/cart.context'

const Navigation = () => {

    const {isCartOpen} = useContext(CartContext);

    const { currentUser } = useContext(userContext);
    return(
    <Fragment>
        <div className="navigation">
                <Link className="logo-container" to='/'><Crown className='logo'/></Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>Shop</Link>

                { currentUser ? (
                    <span className="nav-link" onClick={SignOutUser}>
                        Sign Out
                    </span>
                ) : (
                    <Link className="nav-link" to='/sign-in'>Sign In</Link>
                    
                ) }
                <CartIcon />
            </div>
           {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
    </Fragment>
    )
}

export default Navigation