import {
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE,
    CLEAR_PRODUCT_NAME_SEARCH,
    PRODUCT_NAME_CHANGED,
    CLEAR_SEARCH_PRODUCT_STATE,
    SEARCH_RESULTS_FOUND_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
    searching_product: false,
    products: [],
    product_name: '',
    search_results_found: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_RESULTS_FOUND_CHANGED:
            return{
                ...state,
                search_results_found: action.payload
            };
        case CLEAR_SEARCH_PRODUCT_STATE:
            return{
                ...state,
                ...INITIAL_STATE
            };
        case PRODUCT_NAME_CHANGED:
            return{
                ...state,
                product_name: action.payload
            };
        case CLEAR_PRODUCT_NAME_SEARCH:
            return{
                ...state,
                product_name: ''
            };
        case SEARCH_PRODUCT_SUCCESS:
            return{
                ...state,
                searching_product: false,
                products: action.payload.products
            };
        case SEARCH_PRODUCT_FAILURE:
            return{
                ...state,
                searching_product: false
            };
        case SEARCH_PRODUCT:
            return{
                ...state,
                searching_product: true,
                search_results_found: null
            };
        default:
            return state;
    }
};
