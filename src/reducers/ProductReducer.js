import {
    FETCH_PRODUCT_DATA,
    FETCH_PRODUCT_DATA_COMPLETE,
    CLEAR_PRODUCT_PAGE_STATE
} from "../actions/types";

const INITIAL_STATE = {
    fetching_product_data: false,
    product: {},
    similar_items: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_DATA_COMPLETE:
            return{
                ...state,
                fetching_product_data: false,
                product: action.payload.product,
                similar_items: action.payload.similar_items
            };
        case FETCH_PRODUCT_DATA:
            return{
                ...state,
                fetching_product_data: true
            };
        case CLEAR_PRODUCT_PAGE_STATE:
            return{
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};
