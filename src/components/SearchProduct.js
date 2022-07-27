import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect'
import TopHeader from "./TopHeader";
import {Spinner} from "react-bootstrap";
import {
    searchProduct,
    clearProductNameSearch
} from "../actions";

class SearchProduct extends Component{

    constructor(props){

        super(props);

        const history = props.history;

        const params = props.match.params;

        const location = props.location;

        const width = window.innerWidth;

        const height = window.innerHeight;


        this.state = {
            history,
            params,
            location,
            width,
            height
        };

    }


    componentWillUnmount(){

        this.props.clearProductNameSearch();

    }


    renderBody(){

        const { searching_product, initializing_user_page} = this.props;


        if(searching_product || initializing_user_page){

            return(

                <div>

                    <Spinner animation="border" variant="primary" className="spinner" />

                </div>

            );

        }else{

            return(

                <div>

                    <TopHeader
                        history={this.state.history}
                        params={this.state.params}
                        location={this.state.location}
                    />


                </div>

            )
        }

    }


    render() {


        return (

            <Fragment>

                {this.renderBody()}

            </Fragment>

        );

    }

}

const mapStateToProps = (state) => {

    const {
        initializing_user_page
    } = state.user_pages;

    const {
        searching_product,
        products,
        product_name
    } = state.search_product;


    return {
        initializing_user_page,
        searching_product,
        products,
        product_name
    };


};

export default connect(mapStateToProps, {
    searchProduct,
    clearProductNameSearch
})(SearchProduct);