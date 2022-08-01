import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Navbar, Form, FormControl, Offcanvas, Button, Accordion, Card, Image} from "react-bootstrap";
import {List as HamburgerIcon, ChevronRight} from 'react-bootstrap-icons';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect';
import {
    productNameChanged,
    clearProductNameSearch,
    searchProduct
} from "../actions";

class TopHeader extends Component{

    constructor(props) {

        super(props);

        const history = this.props.history;

        const params = this.props.params;

        const location = this.props.location;

        const width = window.innerWidth;

        const height = window.innerHeight;

        const side_menu_visible = false;


        this.state = {
            history,
            params,
            location,
            width,
            height,
            side_menu_visible
        };


    }


    componentDidMount(){

        const { location } = this.state;

        const { clearProductNameSearch } = this.props;

        if(location.pathname !== "/search-product"){

            // Clear product name for all components having a search bar when mounted

            // EXCEPT search product component

            clearProductNameSearch();


        }


    }

    renderLogo(){

        return(
            <Image
                src={require("../images/logo.png")}
                style={
                    isMobile ? {
                        width: '200px',
                        height: '100px',
                        marginTop: '10px'
                    } : {
                        width: '150px',
                        height: '100px',
                        marginLeft: '15px',
                        marginRight: '25px'
                    }
                }
                className="logo"
                onClick={() => {
                    this.state.history.push("/");
                }}
            />
        );

    }


    showSideMenu() {
        this.setState({side_menu_visible: true});
    }

    renderMenuTitle(){

        if(!isMobile){

            return(

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

            );

        }

    }

    renderMenu(){

        return(

            <Fragment>

                <HamburgerIcon
                    color="#fff"
                    size={isMobile ? 30 : 20}
                    onClick={() => {
                        this.showSideMenu();
                    }}
                    style={{
                        marginRight: isMobile ? '5px' :  '2px'
                    }}
                />

                {this.renderMenuTitle()}

            </Fragment>

        );

    }


    renderSearchBar(){

        const { productNameChanged, product_name, searchProduct } = this.props;

        const { history, location } = this.state;

        return(

            <Form className="searchbar-container">

                <FormControl
                    type="text"
                    placeholder="Search Bodega Liquidation"
                    className="mr-sm-2 searchbar"
                    style={{
                        marginRight: isMobile ? 0 : this.state.width / 6.5,
                        borderRadius: '20px',
                        width: isMobile ? this.state.width / 1.2 : '50%',
                    }}
                    onChange={(e) => {
                        e.preventDefault();
                        productNameChanged(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if(e.charCode === 13){

                            e.preventDefault();

                            searchProduct(product_name);

                            if(location.pathname !== "/search-product"){

                                console.log("go to search product page");

                                history.push("/search-product");

                            }

                        }
                    }}
                    value={product_name}
                />

            </Form>

        );

    }


    renderHeaderContent(){

        if(isMobile){

            return(

                <Navbar className="landing-navbar" style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>


                    <div>

                        {this.renderLogo()}

                    </div>


                    <div style={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>

                        {this.renderMenu()}

                        {this.renderSearchBar()}

                    </div>


                </Navbar>


            );



        }else{

            return(

                <Navbar className="landing-navbar" style={{ marginBottom: '2.5rem'}}>

                    <div>


                        {this.renderLogo()}



                    </div>


                    {this.renderMenu()}


                    {this.renderSearchBar()}



                </Navbar>

            );

        }

    }


    renderSubcategories(subcategories){

        const { history } = this.state;

        return _.map(subcategories, (subcategory) => {

            return(

                <Card
                    key={subcategory.id}
                    style={{marginBottom: '10px'}}
                    onClick={() => {
                        history.push(`/category/category_id=${subcategory.id}`);
                        this.setState({side_menu_visible: false});
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

        const { history } = this.state;

        if(category.has_products){

            return(


                <Card
                    key={category.id}
                    style={{marginBottom: '10px'}}
                    onClick={() => {
                        history.push(`/category/category_id=${category.id}`);
                        this.setState({side_menu_visible: false});
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

        const { header_categories } = this.props;

        const { history } = this.state;

        return _.map(header_categories, (category) => {

            const subcategories = category.subcategories;

            if(subcategories !== null && subcategories !== undefined && !_.isEmpty(subcategories)){

                return(

                    <Card
                        key={category.id}
                        style={{marginBottom: '10px'}}
                    >

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
                            history.push(`/category/category_id=${category.id}`);
                            this.setState({side_menu_visible: false});
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

        const { header_categories} = this.props;

        if(header_categories !== null && header_categories !== undefined && !_.isEmpty(header_categories)){


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


    render(){

        return(

            <Fragment>

                {this.renderHeaderContent()}

                {this.sideMenu()}

            </Fragment>


        );


    }



}

const mapStateToProps = (state) => {

    const {
        header_categories
    } = state.user_pages;

    const {
        product_name
    } = state.search_product;

    return {
        header_categories,
        product_name
    };


};


export default connect(mapStateToProps, {
    productNameChanged,
    clearProductNameSearch,
    searchProduct
})(TopHeader);