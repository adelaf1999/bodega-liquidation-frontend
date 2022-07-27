import {
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE,
    CLEAR_PRODUCT_NAME_SEARCH,
    PRODUCT_NAME_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
    searching_product: false,
    products: [],
    product_name: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
                searching_product: true
            };
        default:
            return state;
    }
};
