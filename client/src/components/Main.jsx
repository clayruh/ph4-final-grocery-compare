import ProductList from "./ProductList";
import CartList from "./CartList";
import SupermarketList from "./SupermarketList";
import { Outlet } from "react-router-dom";


function Main() {

    return (
        <div>
            <Outlet/>
            {/* <ProductList/>
            <CartList/>
            <SupermarketList/> */}
        </div>
    )
}

export default Main;
