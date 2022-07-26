import {
    INITIALIZE_USER_PAGES,
    INITIALIZE_USER_PAGES_COMPLETE
} from "../actions/types"

const INITIAL_STATE = {
    initializing_user_page: false,
    header_categories: []
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INITIALIZE_USER_PAGES_COMPLETE:
            return{
                ...state,
                initializing_user_page: false,
                header_categories: action.payload.header_categories
            };
        case INITIALIZE_USER_PAGES:
            return{
                ...state,
                initializing_user_page: true
            };
        default:
            return state;
    }
};