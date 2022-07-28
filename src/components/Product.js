import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect'
import TopHeader from "./TopHeader";
import {Spinner, Card, Image,  Button} from "react-bootstrap";
import {
    fetchProductData,
    clearProductPageState
} from "../actions";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class Product extends Component{

    constructor(props){

        super(props);

        const history = props.history;

        const params = props.match.params;

        const location = props.location;

        const width = window.innerWidth;

        const height = window.innerHeight;

        const product_id = parseInt(params.product_id);

        this.state = {
            history,
            params,
            location,
            width,
            height,
            product_id
        };

    }

    initializePage(product_id){

        const {fetchProductData} = this.props;

        const { history } = this.state;

        fetchProductData(product_id, history);


    }


    componentDidUpdate(prevProps){

        const { history, product_id } = this.state;

        const { clearProductPageState } = this.props;

        const current_product_id = parseInt(product_id);

        const new_product_id = parseInt(history.location.pathname.split("=")[1]);


        if(current_product_id !== new_product_id){

            console.log("reinitialize product page");

            clearProductPageState();

            this.setState({product_id: new_product_id});

            this.initializePage(new_product_id);


        }


    }



    componentDidMount() {

        this.initializePage(this.state.product_id);


    }


    componentWillUnmount(){

        this.props.clearProductPageState();

    }

    renderBody(){

        const { fetching_product_data, initializing_user_page} = this.props;

        if(fetching_product_data|| initializing_user_page){

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
        initializing_user_page,
        header_categories
    } = state.user_pages;

    const {
        fetching_product_data,
        product,
        similar_items
    } = state.product;


    return {
        initializing_user_page,
        header_categories,
        fetching_product_data,
        product,
        similar_items
    };


};


export default connect(mapStateToProps, {
    fetchProductData,
    clearProductPageState
})(Product);


