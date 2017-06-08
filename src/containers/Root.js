import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserActions from '../actions/User';
import List from '../components/List';

import './Root.css';

class Root extends Component {

    constructor(props) {
        super(props);

        this.startOneDrive = this.startOneDrive.bind(this);
    }

    startOneDrive() {
        const { userActions } = this.props;
        userActions.login();
    }

    render() {

        const { userInfo, oneDrive } = this.props;

        if ( !userInfo.loggedIn ) {
            return (
                <div className='root-container'>
                    <h1> One Drive API Sample </h1>
                    <button onClick={this.startOneDrive} >
                        Continue to One Drive
                    </button>
                </div>
            );
        }

        if ( oneDrive.fetching ) {
            return (
                <div className='root-container'>
                    <h1> One Drive API Sample </h1>
                    Loading Data...
                </div>
            );
        }

        const items = [...oneDrive.folders, ...oneDrive.files];

        return (
            <div className='root-container'>
                <h1> One Drive API Sample </h1>
                <List items={items} />
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        userInfo: {
            loggedIn: state.users.loggedIn
        },
        oneDrive: {
            files: state.oneDrive.files.ids.map( id => {
                return state.oneDrive.files.entities[id];
            }),
            folders: state.oneDrive.folders.ids.map( id => {
                return state.oneDrive.folders.entities[id];
            }),
            fetching: state.oneDrive.fetching
        }
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        userActions: {
            login: () => {
                dispatch(UserActions.login());
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);
