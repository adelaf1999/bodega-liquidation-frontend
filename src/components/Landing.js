import React, { Component } from 'react';
import { connect } from 'react-redux';
import {initializeHomePage}  from "../actions";

class Landing extends Component{

    constructor(props) {

        super(props);

        const history = props.history;

        this.state = {
            history
        };

    }


    componentDidMount(){

        this.props.initializeHomePage();

    }



    render(){

        return(

            <div>
                <p>Welcome to the landing page!</p>
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