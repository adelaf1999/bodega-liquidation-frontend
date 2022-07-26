import React, { Component } from 'react';
import { connect } from 'react-redux';
import {initializeHomePage}  from "../actions";
import { Navbar, Form, FormControl, Offcanvas, Button} from "react-bootstrap";


class Landing extends Component{

    constructor(props) {

        const history = props.history;

        const params = props.match.params;
        
        super(props);

        const width = window.innerWidth;

        const height = window.innerHeight;


        this.state = {
            history,
            params,
            width,
            height
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);


    }


    updateWindowDimensions() {

        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }


    componentWillUnmount() {

        window.removeEventListener('resize', this.updateWindowDimensions);

    }


    componentDidMount(){

        this.updateWindowDimensions();

        window.addEventListener('resize', this.updateWindowDimensions);

        this.props.initializeHomePage();

    }




    render(){

        // show bars on the left if on mobile device or smaller screen

        return(

            <div>

                <Navbar style={{backgroundColor: '#000080'}}>

                    <div>

                        <Navbar.Brand
                            onClick={() => {
                                this.state.history.push("/");
                            }}
                            style={{
                                color: "#fff",
                                fontWeight: 'bold',
                                fontSize: 18,
                                marginLeft: '1rem'
                            }}
                        >
                            Bodega Liquidation
                        </Navbar.Brand>

                    </div>


                    <Form className="searchbar-container">

                        <FormControl
                            type="text"
                            placeholder="Search Bodega Liquidation"
                            className="mr-sm-2 searchbar"
                            style={{
                                marginRight: this.state.width / 5.5
                            }}
                        />

                    </Form>





                <div>

                </div>


                </Navbar>


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