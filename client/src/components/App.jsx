import { Outlet } from "react-router-dom";
import Header from './Header'
import Main from "./Main";


export default function App() {
    
    return (
        <div className='App'>
            <Main/>
            <Header/>
            <Outlet/>
        </div>
    )
}

