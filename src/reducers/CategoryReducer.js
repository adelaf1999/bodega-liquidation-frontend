import {
    FETCH_CATEGORY_DATA,
    FETCH_CATEGORY_DATA_COMPLETE,
    CLEAR_CATEGORY_PAGE_STATE
} from "../actions/types";

const INITIAL_STATE = {
    fetching_category_data: false,
    category_name: '',
    subcategories: [],
    products: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_DATA_COMPLETE:
            return{
                ...state,
                fetching_category_data: false,
                category_name: action.payload.category_name,
                subcategories: action.payload.subcategories,
                products: action.payload.products
            };
        case FETCH_CATEGORY_DATA:
            return{
                ...state,
                fetching_category_data: true
            };
        case CLEAR_CATEGORY_PAGE_STATE:
            return{
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};
