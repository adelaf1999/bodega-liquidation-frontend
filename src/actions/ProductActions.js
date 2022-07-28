import {
    VIEW_PRODUCT_ROUTE,
    FETCH_PRODUCT_DATA,
    FETCH_PRODUCT_DATA_COMPLETE,
    CLEAR_PRODUCT_PAGE_STATE
} from "./types";

import axios from "axios";
import { getFormData } from "../helpers";
import _ from "lodash";

export const clearProductPageState = () => {

    return{
        type: CLEAR_PRODUCT_PAGE_STATE
    };

};

export const fetchProductData = (product_id, history) => {

    return(dispatch) => {

        dispatch({type: FETCH_PRODUCT_DATA});

        console.log(`Fetching product data for product with id ${product_id}`);

        const config = {
            headers: {
                "Accept": "application/json"
            }
        };

        let bodyFormData = getFormData({
            id: product_id
        });

        axios.post(VIEW_PRODUCT_ROUTE, bodyFormData, config)
            .then(response => {

                const data = response.data;

                console.log(data);

                const success = data.success;

                if(success){

                    const product = data.product;

                    const similar_items = data.similar_items;

                    dispatch({type: FETCH_PRODUCT_DATA_COMPLETE, payload: {
                        product: product,
                        similar_items: similar_items
                    }});


                }else{

                    const message = data.message;

                    console.log(message);

                    history.push("/");

                    dispatch({type: CLEAR_PRODUCT_PAGE_STATE});
                }


            }).catch(error => {

            history.push("/");

            dispatch({type: CLEAR_PRODUCT_PAGE_STATE});

            console.log(error);

        });

    };

};