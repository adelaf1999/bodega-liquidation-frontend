import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {initializeHomePage} from "../actions";
import {Navbar, Form, FormControl, Offcanvas, Button, Accordion, Card, Image, Spinner} from "react-bootstrap";
import {List as HamburgerIcon, ChevronRight} from 'react-bootstrap-icons';
import _ from "lodash";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {isMobile, isDesktop, isTablet} from 'react-device-detect';
import TopHeader from "./TopHeader";


class Landing extends Component {

    constructor(props) {

        super(props);

        const history = props.history;

        const params = props.match.params;


        const width = window.innerWidth;

        const height = window.innerHeight;


        this.state = {
            history,
            params,
            width,
            height
        };
        

    }




    componentDidMount() {


        this.props.initializeHomePage();

    }


    renderTopicMenu(topic){

        const products = topic.products;

        return(


            <ScrollMenu key={topic.id}>

                {products.map(product => (
                    <Card
                        key={product.id}
                        style={{
                            margin: '15px'
                        }}
                        onClick={() => {
                            console.log(`${product.name} was clicked!`)
                        }}
                    >

                        <Image
                            src={product.main_picture_url}
                            className="product-image"
                        />

                        <Card.Footer>{product.name}</Card.Footer>

                    </Card>
                ))}


            </ScrollMenu>

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

                    <TopHeader history={this.state.history} params={this.state.params}/>

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