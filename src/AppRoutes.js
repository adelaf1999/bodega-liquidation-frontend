import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Landing from "./components/Landing";


export default function AppRoutes() {

    return(

        <Router>

            <Routes>

                <Route exact path="/" element={<Landing/>} />


            </Routes>

        </Router>

    );

}