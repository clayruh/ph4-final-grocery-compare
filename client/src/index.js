import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// COMPONENTS //
import App from './components/App';
import Home from './components/Home';
import ProductList from './components/ProductList'
import About from './components/About';
import SupermarketList from './components/SupermarketList';

// LOADER 
import { getProducts } from './loaders'

import { getSupermarketLoader } from './loaders';

const router = createBrowserRouter([

  {
    path:"/",
    element: <App/>,
    children: [
      {
        index: true, // this indicates default route
        element: <Home/>
      },
      {
        path:"/products",
        element: <ProductList/>,
        loader: getProducts
      },
      {
        path:"/about",
        element: <About/>
      },
      {
        path:"/supermarket",
        element: <SupermarketList/>,
        loader: getSupermarketLoader
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
