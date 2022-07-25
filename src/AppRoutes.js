import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Landing from "./components/Landing";



export default function AppRoutes() {


    return(

        <Router>

            <Switch>

                <Route exact path="/" component={Landing} />


            </Switch>

        </Router>

    );

}