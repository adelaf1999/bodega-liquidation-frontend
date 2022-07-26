import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initializeHomePage} from "../actions";
import {Navbar, Form, FormControl, Offcanvas, Button, Accordion, Card, Image} from "react-bootstrap";
import {List as HamburgerIcon, ChevronRight} from 'react-bootstrap-icons';
import _ from "lodash";
import {ScrollMenu} from "react-horizontal-scrolling-menu";


class Landing extends Component {

    constructor(props) {

        const history = props.history;

        const params = props.match.params;

        super(props);

        const width = window.innerWidth;

        const height = window.innerHeight;

        const side_menu_visible = false;


        this.state = {
            history,
            params,
            width,
            height,
            side_menu_visible
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);


    }


    updateWindowDimensions() {

        this.setState({width: window.innerWidth, height: window.innerHeight});

    }


    componentWillUnmount() {

        window.removeEventListener('resize', this.updateWindowDimensions);

    }


    componentDidMount() {

        this.updateWindowDimensions();

        window.addEventListener('resize', this.updateWindowDimensions);

        this.props.initializeHomePage();

    }


    showSideMenu() {
        this.setState({side_menu_visible: true});
    }


    renderSubcategories(subcategories){

        return _.map(subcategories, (subcategory) => {

            return(

                <Card
                    key={subcategory.id}
                    style={{marginBottom: '10px'}}
                    onClick={() => {
                        console.log(`${subcategory.name} was clicked!`)
                    }}
                >

                    <div className="category-items-container">

                        <Card.Body>{subcategory.name}</Card.Body>

                        <ChevronRight color="royalblue" size={20} className="category-chevron-icon"/>

                    </div>




                </Card>

            );

        });

    }

    renderParentCategory(category){

        if(category.has_products){

            return(


                <Card
                    key={category.id}
                    style={{marginBottom: '10px'}}
                    onClick={() => {
                        console.log(`${category.name} was clicked`)
                    }}
                >
                    <div className="category-items-container">

                        <Card.Body>View All {category.name}</Card.Body>

                        <ChevronRight color="royalblue" size={20} className="category-chevron-icon"/>

                    </div>


                </Card>


            );

        }

    }

    renderCategoriesList(){

        const { categories } = this.props;

        return _.map(categories, (category) => {

            const subcategories = category.subcategories;

            if(subcategories !== null && subcategories !== undefined && !_.isEmpty(subcategories)){

                return(

                    <Card key={category.id} style={{marginBottom: '10px'}}>

                        <Accordion.Item eventKey={category.id}>

                            <Accordion.Header>{category.name}</Accordion.Header>

                            <Accordion.Body>

                                {this.renderSubcategories(subcategories, category)}

                                {this.renderParentCategory(category)}

                            </Accordion.Body>

                        </Accordion.Item>


                    </Card>


                );


            }else{

                return(

                    <Card
                        key={category.id}
                        style={{marginBottom: '10px'}}
                        onClick={() => {
                            console.log(`${category.name} was clicked`)
                        }}
                    >

                        <div className="category-items-container">

                            <Card.Body>{category.name}</Card.Body>

                            <ChevronRight color="royalblue" size={20} className="category-chevron-icon"/>

                        </div>


                    </Card>

                );


            }

        });


    }

    renderCategories(){

        const { categories } = this.props;

        if(categories !== null && categories !== undefined && !_.isEmpty(categories)){


            return(

                <Accordion>

                    {this.renderCategoriesList()}

                </Accordion>

            );


        }else{

            return <div/>;

        }





    }

    sideMenu() {

        const {side_menu_visible} = this.state;

        if (side_menu_visible) {

            return (

                <Offcanvas
                    show={side_menu_visible}
                    onHide={() => this.setState({side_menu_visible: false})}
                >

                    <Offcanvas.Header closeButton>

                        <Offcanvas.Title>Categories</Offcanvas.Title>

                    </Offcanvas.Header>

                    <Offcanvas.Body>

                        {this.renderCategories()}

                    </Offcanvas.Body>

                </Offcanvas>

            );

        }

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

                <Card key={topic.id} style={{marginBottom: '2rem', width: this.state.width / 1.8}}>

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


    render() {

        // show bars on the left if on mobile device or smaller screen


        return (

            <div>

                <Navbar style={{backgroundColor: '#000080', marginBottom: '2.5rem'}}>

                    <div>

                        <Navbar.Brand
                            onClick={() => {
                                this.state.history.push("/");
                            }}
                            style={{
                                color: "#fff",
                                fontWeight: 'bold',
                                fontSize: 18,
                                marginLeft: '1rem',
                                marginRight: '50px'
                            }}
                        >
                            Bodega Liquidation
                        </Navbar.Brand>

                    </div>


                    <HamburgerIcon
                        color="#fff" size={20}
                        onClick={() => {
                            this.showSideMenu();
                        }}
                        style={{
                            marginRight: '2px'
                        }}
                    />

                    <Button
                        style={{
                            color: '#fff',
                            fontSize: 20,
                            border: 'None',
                            background: 'None',
                            margin: '0',
                            padding: '0'
                        }}
                        onClick={() => {
                            this.showSideMenu();
                        }}
                        id="lading-menu-button"
                    >
                        Menu
                    </Button>


                    <Form className="searchbar-container">

                        <FormControl
                            type="text"
                            placeholder="Search Bodega Liquidation"
                            className="mr-sm-2 searchbar"
                            style={{
                                marginRight: this.state.width / 5
                            }}
                        />

                    </Form>


                    <div>

                    </div>


                </Navbar>


                {this.renderTopics()}

                {this.sideMenu()}


            </div>

        );

    }


}


const mapStateToProps = (state) => {

    const {
        initializing_page,
        categories,
        topics
    } = state.landing;


    return {
        initializing_page,
        categories,
        topics
    };


};


export default connect(mapStateToProps, {
    initializeHomePage
})(Landing);