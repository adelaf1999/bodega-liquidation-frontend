import {
    INITIALIZE_USER_PAGES,
    INITIALIZE_USER_PAGES_COMPLETE,
    GET_HEADER_CATEGORIES_ROUTE
} from "./types";

import axios from "axios";
import { getFormData } from "../helpers";
import _ from "lodash";

export const getHeaderCategories = () => {


    return(dispatch) => {

        console.log("fetching header categories");

        dispatch({type: INITIALIZE_USER_PAGES});

        const config = {
            headers: {
                "Accept": "application/json"
            }
        };

        axios.get(GET_HEADER_CATEGORIES_ROUTE, config)
            .then(response => {

                const data = response.data;

                const header_categories = data.header_categories;

                console.log(header_categories);

                dispatch({type: INITIALIZE_USER_PAGES_COMPLETE, payload: {
                    header_categories: header_categories
                }});



            }).catch(error => {

            console.log(error);

        });


    }

};
