import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions";

class TickerItem extends Component {

    getTickerOptions () {
        const tickerOption = this.props.majorIndex.map(element => {
            
            let changes;
            let percent = this.calculatePercentage(element.price, element.changes);
            if (element.changes > 0) {
                changes = <span className='positive-values'>{element.changes} ({percent})</span>
            } else {
                changes = <span className='negative-values'>{element.changes} ({percent})</span>
            }
            return <div key={element.ticker} className="ticker-item">{element.indexName} {element.price} {changes}</div>;
        })
        return tickerOption;
    }

    calculatePercentage(value, change) {
        let percent = Number.parseFloat((change / value * 100)).toPrecision(3);
    
        if (percent > 0) {
            return '+' + percent + '%';
        } else {
            return percent + '%';
        }
    }

    componentDidMount() {
        this.props.getMajorIndex();
    }

    render() {
        return (
            <div className="ticker-move">
                {this.getTickerOptions()}
            </div>
        );
    }    
}

const mapStateToProps = state => {
    return {
        majorIndex: state.majorIndex,
    }
};


const mapStateToDispatch = dispatch => {
    return bindActionCreators({
        getMajorIndex: actions.getMajorIndex,
        setMajorIndex: actions.setMajorIndex,
    }, dispatch)
};

export default connect(mapStateToProps, mapStateToDispatch)(TickerItem)