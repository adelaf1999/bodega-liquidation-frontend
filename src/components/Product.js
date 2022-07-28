import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect'
import TopHeader from "./TopHeader";
import {Spinner, Card, Image,  Accordion, Form} from "react-bootstrap";
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

    renderProductAttributes(){

        const { product } = this.props;

        if(!_.isEmpty(product)){

            // sanity check

            const attributes = product.attributes;

            if(attributes !== null && attributes !== undefined && !_.isEmpty(attributes)){

                return _.map(attributes, (attribute_value, attribute_name) => {

                    return(

                        <Form.Group key={attribute_name} className="product-attribute-container">

                            <Form.Label className="product-attribute-label" >
                                {attribute_name}
                            </Form.Label>


                            <Form.Control
                                readOnly
                                type="text"
                                value={attribute_value}
                                disabled
                                className="product-attribute-value"
                            />

                        </Form.Group>

                    );

                });


            }

        }

    }

    renderBody(){

        const { fetching_product_data, initializing_user_page, product} = this.props;

        if(fetching_product_data|| initializing_user_page){

            return(

                <div>

                    <Spinner animation="border" variant="primary" className="spinner" />

                </div>

            );

        }else{

            if(!_.isEmpty(product)){

                const product_name = product.name;

                const picture_urls = product.picture_urls;

                const description = product.description;

                const upc = product.upc;

                const sku = product.sku;

                const responsive = {
                    desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 1,
                        slidesToSlide: 1
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 1,
                        slidesToSlide: 1
                    },
                    mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                        slidesToSlide: 1
                    }
                };


                return(

                    <div>

                        <TopHeader
                            history={this.state.history}
                            params={this.state.params}
                            location={this.state.location}
                        />

                        <p style={{
                            fontSize: '22px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '3rem'
                        }}>
                            {product_name}
                        </p>


                        <div style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            marginLeft: '50px',
                            marginRight: '50px'
                        }}>




                            <div style={{
                                width: this.state.width / 3
                            }}>

                                <Carousel
                                    responsive={responsive}
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                >

                                    {picture_urls.map((url, index) => (
                                        <Card
                                            key={index}
                                        >

                                            <Image
                                                src={url}
                                                className="view-product-image"
                                            />

                                        </Card>
                                    ))}


                                </Carousel>

                            </div>



                            <div style={{
                                width: this.state.width / 1.8
                            }}>

                                <Accordion defaultActiveKey="0">

                                    <Accordion.Item eventKey="0">

                                        <Accordion.Header>Product Description</Accordion.Header>

                                        <Accordion.Body style={{fontSize: '18px'}}>
                                            {description}
                                        </Accordion.Body>


                                    </Accordion.Item>

                                    <Accordion.Item eventKey="1">

                                        <Accordion.Header>Product Details</Accordion.Header>

                                        <Accordion.Body>

                                            <Form>

                                                <Form.Group className="product-attribute-container">

                                                    <Form.Label className="product-attribute-label" >
                                                        UPC
                                                    </Form.Label>


                                                    <Form.Control
                                                        readOnly
                                                        type="text"
                                                        value={upc}
                                                        disabled
                                                        className="product-attribute-value"
                                                    />

                                                </Form.Group>

                                                <Form.Group className="product-attribute-container">

                                                    <Form.Label className="product-attribute-label" >
                                                        SKU
                                                    </Form.Label>


                                                    <Form.Control
                                                        readOnly
                                                        type="text"
                                                        value={sku}
                                                        disabled
                                                        className="product-attribute-value"
                                                    />

                                                </Form.Group>

                                                {this.renderProductAttributes()}

                                            </Form>

                                        </Accordion.Body>

                                    </Accordion.Item>


                                </Accordion>

                            </div>





                        </div>






                    </div>

                )


            }


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


