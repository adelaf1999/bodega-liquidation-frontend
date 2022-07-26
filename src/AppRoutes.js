import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {getHeaderCategories} from "./actions";
import {connect} from 'react-redux';


import Landing from "./components/Landing";


class AppRoutes extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getHeaderCategories();
    }

    render(){

        return(

            <Router>

                <Switch>

                    <Route exact path="/" component={Landing} />


                </Switch>

            </Router>

        );

    }

}


export default connect(null, {
    getHeaderCategories
})(AppRoutes);
