import {
    INITIALIZE_LANDING_PAGE_ROUTE,
    INITIALIZE_LANDING_PAGE,
    INITIALIZE_LANDING_PAGE_COMPLETE
} from "./types";

import axios from "axios";
import { getFormData } from "../helpers";
import _ from "lodash";

export const initializeHomePage = () => {

    return(dispatch) => {

        dispatch({type: INITIALIZE_LANDING_PAGE});

        const config = {
            headers: {
                "Accept": "application/json"
            }
        };

        axios.get(INITIALIZE_LANDING_PAGE_ROUTE, config)
            .then(response => {

                const data = response.data;

                const categories = data.categories;

                const topics = data.topics;

                console.log(categories);

                console.log(topics);

                dispatch({type: INITIALIZE_LANDING_PAGE_COMPLETE, payload: {
                    categories: categories,
                    topics: topics
                }})

            }).catch(error => {

                console.log(error);

        });


    }

};
