import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';


import LandingReducer from "./LandingReducer";
import UserPagesReducer from "./UserPagesReducer";
import SearchProductReducer from "./SearchProductReducer";
import CategoryReducer from "./CategoryReducer";


const appReducer = combineReducers({
    landing: LandingReducer,
    user_pages: UserPagesReducer,
    search_product: SearchProductReducer,
    category: CategoryReducer
});


const rootReducer = ( state, action ) => {

    return appReducer(state, action);

};


export default rootReducer;