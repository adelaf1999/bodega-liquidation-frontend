import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {getHeaderCategories} from "./actions";
import {connect} from 'react-redux';
import Landing from "./components/Landing";
import SearchProduct from "./components/SearchProduct";
import Category from "./components/Category";
import Product from "./components/Product";


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

                    <Route exact path="/search-product" component={SearchProduct} />

                    <Route exact path="/category/category_id=:category_id" component={Category} />

                    <Route exact path="/product/product_id=:product_id" component={Product} />


                </Switch>

            </Router>

        );

    }

}


export default connect(null, {
    getHeaderCategories
})(AppRoutes);
