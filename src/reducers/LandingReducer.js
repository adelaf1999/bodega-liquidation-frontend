import {
    INITIALIZE_LANDING_PAGE,
    INITIALIZE_LANDING_PAGE_COMPLETE
} from "../actions/types"

const INITIAL_STATE = {
    initializing_page: false,
    categories: [],
    topics: []
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INITIALIZE_LANDING_PAGE_COMPLETE:
            return{
                ...state,
                initializing_page: false,
                categories: action.payload.categories,
                topics: action.payload.topics
            };
        case INITIALIZE_LANDING_PAGE:
            return{
                ...state,
                initializing_page: true
            };
        default:
            return state;
    }
};