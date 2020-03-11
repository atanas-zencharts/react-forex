import React, { Component } from 'react';
import Axios from "axios";
import TickerItem from './TickerItem';

const majorIndexes = {};

class Ticker extends Component {

    render() {
        return (
            <>
                <div id="ticker-template">
                    <div className="tcontainer">
                        <div className="ticker-wrap">
                            <TickerItem />
                        </div>
                    </div>
                </div>
                <hr />
            </>
        );
    }
}

export default Ticker;