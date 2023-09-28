import { Outlet } from "react-router-dom";
import ProductList from "./ProductList";
import CartList from "./CartList";
import SupermarketList from "./SupermarketList";


function Main() {

    return (
        <div>
            <Outlet/>
            
            

        </div>
    )
}

export default Main;