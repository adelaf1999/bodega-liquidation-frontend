import {
    SEARCH_PRODUCT_ROUTE,
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE,
    CLEAR_PRODUCT_NAME_SEARCH,
    PRODUCT_NAME_CHANGED,
    CLEAR_SEARCH_PRODUCT_STATE,
    SEARCH_RESULTS_FOUND_CHANGED
} from "./types";
import axios from "axios";
import { getFormData } from "../helpers";
import _ from "lodash";



export const clearSearchProductState = () => {

    return{
      type: CLEAR_SEARCH_PRODUCT_STATE
    };

};

export const productNameChanged = (product_name) => {

    return{
      type: PRODUCT_NAME_CHANGED,
      payload: product_name
    };

};

export const clearProductNameSearch = () => {

    return{
      type: CLEAR_PRODUCT_NAME_SEARCH
    };

};

export const searchProduct = (product_name) => {

    return(dispatch) => {

        if(product_name !== null && product_name !== undefined){

            // sanity check, product name initialize product name as string in reducer

            product_name = product_name.trim();

            if(!_.isEmpty(product_name)){

                dispatch({type: SEARCH_PRODUCT});


                console.log(`Fetching results for ${product_name}`);


                const config = {
                    headers: {
                        "Accept": "application/json"
                    }
                };

                let bodyFormData = getFormData({
                    name: product_name
                });


                axios.post(SEARCH_PRODUCT_ROUTE, bodyFormData, config)
                    .then(response => {

                        const data = response.data;

                        const success = data.success;

                        const message = data.message;

                        const products = data.products;

                        if(success){

                            console.log(products);

                            dispatch({type: SEARCH_PRODUCT_SUCCESS, payload: {
                                products: products
                            }});

                            if(products.length > 0){

                                dispatch({type: SEARCH_RESULTS_FOUND_CHANGED, payload: true});

                            }else{

                                dispatch({type: SEARCH_RESULTS_FOUND_CHANGED, payload: false});

                            }


                        }else{

                            console.log(message);

                            dispatch({type: SEARCH_PRODUCT_FAILURE});

                        }



                    }).catch(error => {

                        dispatch({type: SEARCH_PRODUCT_FAILURE});

                        console.log(error);

                });


            }


        }



    }

};