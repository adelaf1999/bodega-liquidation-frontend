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

        const category_id = parseInt(params.category_id);

        this.state = {
            history,
            params,
            location,
            width,
            height,
            category_id
        };

    }

    initializePage(category_id){

        const {fetchCategoryData} = this.props;

        const { history } = this.state;

        fetchCategoryData(category_id, history);


    }


    componentDidUpdate(prevProps){

        const { history, category_id } = this.state;

        const { clearCategoryPageState } = this.props;

        const current_category_id = parseInt(category_id);

        const new_category_id = parseInt(history.location.pathname.split("=")[1]);


        if(current_category_id !== new_category_id){

            console.log("reinitialize category page");

            clearCategoryPageState();

            this.setState({category_id: new_category_id});

            this.initializePage(new_category_id);


        }



    }

    componentWillUnmount(){

        this.props.clearCategoryPageState();

    }



    componentDidMount() {

        this.initializePage(this.state.category_id);


    }

    renderBody(){

        const { fetching_category_data, initializing_user_page, category_name } = this.props;

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


                    <p style={{textAlign: 'center', fontSize: '38px'}}>
                        {category_name}
                    </p>



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