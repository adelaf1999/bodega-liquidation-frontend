import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';


import LandingReducer from "./LandingReducer";


const appReducer = combineReducers({
    landing: LandingReducer
});


const rootReducer = ( state, action ) => {

    return appReducer(state, action);

};


export default rootReducer;