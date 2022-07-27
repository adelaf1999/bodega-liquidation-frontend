import {
    VIEW_CATEGORY_ROUTE,
    FETCH_CATEGORY_DATA,
    FETCH_CATEGORY_DATA_COMPLETE,
    CLEAR_CATEGORY_PAGE_STATE
} from "./types";
import axios from "axios";
import { getFormData } from "../helpers";
import _ from "lodash";

export const clearCategoryPageState = () => {

    return{
      type: CLEAR_CATEGORY_PAGE_STATE
    };

};

export const fetchCategoryData = (category_id, history) => {

    return(dispatch) => {

        dispatch({type: FETCH_CATEGORY_DATA});

        console.log(`fetching category data for category_id ${category_id}`);

        const config = {
            headers: {
                "Accept": "application/json"
            }
        };

        let bodyFormData = getFormData({
            id: category_id
        });

        axios.post(VIEW_CATEGORY_ROUTE, bodyFormData, config)
            .then(response => {

                const data = response.data;

                console.log(data);

                const success = data.success;

                if(success){

                    const category_name = data.category_name;

                    const subcategories = data.subcategories;

                    const products = data.products;

                    if( (products.length === 0 && subcategories.length > 0) || (products.length === 0 && subcategories.length === 0)){

                        history.push("/");

                        dispatch({type: CLEAR_CATEGORY_PAGE_STATE});


                    }else{

                        dispatch({type: FETCH_CATEGORY_DATA_COMPLETE, payload: {
                            category_name: category_name,
                            subcategories: subcategories,
                            products: products
                        }})

                    }

                }else{

                    const message = data.message;

                    console.log(message);

                    history.push("/");

                    dispatch({type: CLEAR_CATEGORY_PAGE_STATE});


                }


            }).catch(error => {

            history.push("/");

            dispatch({type: CLEAR_CATEGORY_PAGE_STATE});

            console.log(error);

        });



    };

};