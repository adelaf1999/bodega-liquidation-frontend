import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {initializeHomePage} from "../actions";
import { Card, Image, Spinner} from "react-bootstrap";
import {List as HamburgerIcon, ChevronRight} from 'react-bootstrap-icons';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect';
import TopHeader from "./TopHeader";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


class Landing extends Component {

    constructor(props) {

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




    componentDidMount() {


        this.props.initializeHomePage();

    }


    renderTopicMenu(topic){

        const products = topic.products;

        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 3 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        return(


            <Carousel
                key={topic.id}
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >

                {products.map(product => (
                    <Card
                        key={product.id}
                        style={{
                            margin: isMobile ? '10px' : '15px'
                        }}
                        onClick={() => {
                            console.log(`${product.name} was clicked!`)
                        }}
                    >

                        <Image
                            src={product.main_picture_url}
                            className="product-image"
                        />

                        <Card.Footer
                            style={{
                                height: '80px'
                            }}>
                            {product.name}
                        </Card.Footer>

                    </Card>
                ))}


            </Carousel>

        );

    }

    renderTopicsList(){

        const { topics } = this.props;

        return _.map(topics, topic => {

            return(

                <Card
                    key={topic.id}
                    style={{
                        marginBottom: '2rem',
                        width: isMobile ? this.state.width - 25 : this.state.width / 1.8
                    }}
                >

                    <Card.Header style={{
                        fontSize: '20px',
                        backgroundColor: '#000080',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        {topic.name}
                    </Card.Header>

                    <Card.Body>

                        {this.renderTopicMenu(topic)}

                    </Card.Body>

                </Card>

            );

        });


    }


    renderTopics(){

        const { topics } = this.props;

        if(topics !== null && topics !== undefined && !_.isEmpty((topics))){

            return(

                <div style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>

                    {this.renderTopicsList()}

                </div>

            );

        }

    }


    renderBody(){

        const { initializing_page, initializing_user_page} = this.props;


        if(initializing_page || initializing_user_page){

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

                    {this.renderTopics()}


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
        initializing_page,
        topics
    } = state.landing;

    const {
        initializing_user_page,
        header_categories
    } = state.user_pages;


    return {
        initializing_page,
        topics,
        initializing_user_page,
        header_categories
    };


};


export default connect(mapStateToProps, {
    initializeHomePage
})(Landing);