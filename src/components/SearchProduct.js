import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect'
import TopHeader from "./TopHeader";
import {Spinner, Card, Image} from "react-bootstrap";
import {
    searchProduct,
    clearSearchProductState
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

        this.props.clearSearchProductState();

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

        const products = this.getProducts();

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
                        style={{
                            flexBasis: this.state.width / 4,
                            margin: '15px'
                        }}
                    >

                        <Card.Img variant="top" className="product-image" src={product.picture_url} />

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

        const { products } = this.props;

        if(products !== null && products !== undefined && !_.isEmpty(products)){

            return(

                <div style={{
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
    clearSearchProductState
})(SearchProduct);