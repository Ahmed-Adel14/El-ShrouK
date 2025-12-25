import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";

import BestOffer from "./components/BestOffer";
import Carts from "./Pages/Carts";
import ProductDetails from "./Pages/ProductDetails";
import AllProduct from "./Pages/AllProduct";
import ProductsByCat from "./Pages/ProductsByCat";
export default function App() {
    const routing = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "cart",
                    element: <Carts />,
                },
                {
                    path: "/product/:id",
                    element: <ProductDetails />,
                },
                {
                    path: "all-products",
                    element: <AllProduct />,
                },
                {
                    path: "productbycat/:id",
                    element: <ProductsByCat />,
                },
            ],
        },
        {
            path: "/best-offer",
            element: <BestOffer />,
        },
    ]);
    return <RouterProvider router={routing} />;
}
