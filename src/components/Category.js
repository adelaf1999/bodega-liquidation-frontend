import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect'
import TopHeader from "./TopHeader";
import {Spinner, Card, Image, Button} from "react-bootstrap";
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

    getProducts(){

        let products = this.props.products;

        if(products.length % 3 === 0) {

            return products;

        }else{

            let nearest_multiple_3 = products.length;

            while(nearest_multiple_3 % 3 !== 0){

                products.push({});

                nearest_multiple_3 += 1;


            }

            return products;

        }



    }


    renderProductsList(){

        const products = isMobile ? this.props.products : this.getProducts();

        return _.map(products, (product, index) => {


            if(_.isEmpty(product)){

                return(

                    <Card
                        key={index}
                        style={{
                            flexBasis: this.state.width / 4,
                            margin: '15px',
                            visibility: 'hidden'
                        }}
                    />


                );


            }else{

                return(

                    <Card
                        key={index}
                        style={
                            isMobile ?
                                {
                                    width: this.state.width - 35,
                                    margin: '15px'
                                } :
                                {
                                    flexBasis: this.state.width / 4,
                                    margin: '15px'
                                }}
                        onClick={() => {
                            this.state.history.push(`/product/product_id=${product.id}`);
                        }}
                    >

                        <Card.Img variant="top" className="product-image" src={product.main_picture_url} />

                        <Card.Footer style={{
                            height: '80px'
                        }}>
                            {product.name}
                        </Card.Footer>


                    </Card>

                );



            }



        });


    }


    renderProducts(){

        return(

            <div style={ isMobile ? {
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column'
            } : {
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>

                {this.renderProductsList()}

            </div>

        );

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


                    <p style={{
                        textAlign: 'center',
                        fontSize: isMobile ? '30px' : '38px'
                    }}>
                        {category_name}
                    </p>

                    {this.renderProducts()}


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