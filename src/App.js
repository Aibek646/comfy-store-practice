import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route
} from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
    Home,
    SingleProduct,
    Cart,
    Checkout,
    About,
    Error,
    Products,
    PrivateRoute,
    AuthWrapper
} from "./pages";

function App() {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="cart" element={<Cart />} />
                <Route path="products" element={<Products />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
