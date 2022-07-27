import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect'
import TopHeader from "./TopHeader";
import {Spinner, Card, Image} from "react-bootstrap";
import {
    fetchCategoryData,
    clearCategoryPageState
} from "../actions";

class Category extends Component{

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

        this.props.clearCategoryPageState();

    }

    componentDidMount() {

        const {fetchCategoryData} = this.props;

        const { history, params } = this.state;

        const category_id = params.category_id;

        fetchCategoryData(category_id, history);


    }

    renderBody(){

        const { fetching_category_data, initializing_user_page } = this.props;

        if(fetching_category_data || initializing_user_page){

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
        fetching_category_data,
        category_name,
        subcategories,
        products
    } = state.category;


    return {
        initializing_user_page,
        fetching_category_data,
        products,
        category_name,
        subcategories
    };


};

export default connect(mapStateToProps, {
    fetchCategoryData,
    clearCategoryPageState
})(Category);