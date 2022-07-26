import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';


import LandingReducer from "./LandingReducer";
import UserPagesReducer from "./UserPagesReducer";


const appReducer = combineReducers({
    landing: LandingReducer,
    user_pages: UserPagesReducer
});


const rootReducer = ( state, action ) => {

    return appReducer(state, action);

};


export default rootReducer;