import Navigation from "./routes/Navigation/Navigation.component";
import SignIn from "./routes/Sign-In/Sign-In.component";
import Home from "./routes/home/home.component"
import { Route,Routes } from "react-router-dom";
import Shop from "./routes/shop/shop.component";
import Checkout from "./components/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route index element={<Home />} />
        <Route path='shop/*' element={ <Shop/>}/>
        <Route path='sign-in' element={ <SignIn />}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
