import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pending from '../../molecules/pending/Pending';

export class PendingRequests extends Component {
    render() {
        return (
            <div className='pending-requests-component'>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequests)
