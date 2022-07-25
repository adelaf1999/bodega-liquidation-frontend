import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import AppRoutes from "./AppRoutes";
import reducers from "./reducers";
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from "redux-thunk";
import { Provider } from 'react-redux';
import { persistStore} from 'redux-persist' // only add persist code when persisted reducer present, else app wont render
import { PersistGate } from 'redux-persist/integration/react'; // only add persist code when persisted reducer present, else app wont render


export default function App() {

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return(

        <Provider store={store}>

            <AppRoutes/>

        </Provider>

    );


}
