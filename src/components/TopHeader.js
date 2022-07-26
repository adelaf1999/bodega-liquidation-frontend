import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Navbar, Form, FormControl, Offcanvas, Button, Accordion, Card, Image} from "react-bootstrap";
import {List as HamburgerIcon, ChevronRight} from 'react-bootstrap-icons';
import _ from "lodash";
import {isMobile, isDesktop, isTablet} from 'react-device-detect';


class TopHeader extends Component{

    constructor(props) {

        super(props);

        const history = this.props.history;

        const params = this.props.params;


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


    }


    renderLogo(){

        return(
            <Image
                src={require("../images/icon.png")}
                style={
                    isMobile ? { width: '100px', height: '100px'} : {  width: '75px', height: '75px', marginLeft: '10px' }
                }
                className="logo"
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

        return(

            <Form className="searchbar-container">

                <FormControl
                    type="text"
                    placeholder="Search Bodega Liquidation"
                    className="mr-sm-2 searchbar"
                    style={{
                        marginRight: isMobile ? 0 : this.state.width / 4,
                        borderRadius: '20px',
                        width: isMobile ? this.state.width / 1.2 : '50%',
                    }}
                />

            </Form>

        );

    }

    renderCompanyName(){
        return(
            <Navbar.Brand
                onClick={() => {
                    this.state.history.push("/");
                }}
                style={{
                    color: "#fff",
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginRight: '50px'
                }}
            >
                Bodega Liquidation
            </Navbar.Brand>

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


                        {this.renderCompanyName()}

                    </div>


                    {this.renderMenu()}


                    {this.renderSearchBar()}



                </Navbar>

            );

        }

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

        const { header_categories } = this.props;

        return _.map(header_categories, (category) => {

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


    return {
        header_categories
    };


};


export default connect(mapStateToProps)(TopHeader);