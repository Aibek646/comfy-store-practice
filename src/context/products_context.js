import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
    FEATURED_OPEN,
    FEATURED_CLOSE
} from "../actions";
import { SingleProduct } from "../pages";

const initialState = {
    isSidebarOpen: false,
    products_loading: false,
    product_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: [],
    featured_link: false
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const featured_link_open = () => {
        dispatch({ type: FEATURED_OPEN });
    };

    const featured_link_close = () => {
        dispatch({ type: FEATURED_CLOSE });
    };

    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN });
    };

    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE });
    };

    const fetchProducts = async (url) => {
        dispatch({ type: GET_PRODUCTS_BEGIN });
        try {
            const response = await axios.get(url);
            const products = response.data;

            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
        } catch {
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    };

    const fetchSingleProduct = async (url) => {
        dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
        try {
            const response = await axios.get(url);
            const singleProduct = response.data;
            console.log(singleProduct);

            dispatch({
                type: GET_SINGLE_PRODUCT_SUCCESS,
                payload: singleProduct
            });
        } catch (error) {
            dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
        }
    };

    useEffect(() => {
        fetchProducts(url);
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                ...state,
                openSidebar,
                closeSidebar,
                fetchSingleProduct,
                featured_link_open,
                featured_link_close
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
// make sure use
export const useProductsContext = () => {
    return useContext(ProductsContext);
};
