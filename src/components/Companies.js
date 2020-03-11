import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions";

class Companies extends Component {

    sectorOptions = {};
    industryOptions = {};
    exchangeOptions = {};
    filteredInfo = {};
    selectedSector = null;
    selectedIndustry = null;
    selectedExchange = null;
    // filterShown = false;

    state = {
        filterShown: false
    };
    
    showFilters = (element) => {
        // console.log(element.target.hide());
        if (this.state.filterShown) {
            this.setState({
                filterShown: false
            });
        } else {
            this.setState({
                filterShown: true
            });
        }  
    }

    handleSectorChange = (element) => {
        this.selectedSector = (element.target.value == "Select sector" ? null : element.target.value);
        this.applyFilters(this.selectedSector, this.selectedIndustry, this.selectedExchange);
        this.forceUpdate()
    }

    handleIndustryChange = (element) => {
        this.selectedIndustry = (element.target.value == "Select industry" ? null : element.target.value);  
        this.applyFilters(this.selectedSector, this.selectedIndustry, this.selectedExchange);
        this.forceUpdate()
    }

    handleExchangeChange = (element) => {
        this.selectedExchange = (element.target.value == "Select exchange" ? null : element.target.value);
        this.applyFilters(this.selectedSector, this.selectedIndustry, this.selectedExchange);
        this.forceUpdate()
    }

    myStopInt(interval) {
        clearInterval(interval);
    }

    componentDidMount() {
        this.props.getCompanyInfo();

        let interval = setInterval(() => {
            if (Object.entries(this.props.companyInfo).length > 0) {
                this.myStopInt(interval);
            }
        }, 5000);
    };

    showCompanyCards(companyInfoForCards) {
        let companyCard = [];
        for (const companyCode in companyInfoForCards) {
            let card = <div className="card" key={companyCode}>
                <div className="row no-gutters">
                    <div className="col-md-2" id="info-left">
                        <img className="card-img" src={companyInfoForCards[companyCode]["profile"].image} />
                        <p className="card-title">{companyInfoForCards[companyCode]["profile"].companyName}</p>
                    </div>
                    <div className="col-md-10" id="info-right">
                        <div className="card-body">
                            <label htmlFor="ceo">CEO</label>
                            <p className="ceo">{companyInfoForCards[companyCode]["profile"].ceo}</p>
                            <label htmlFor="sector">Sector</label>
                            <p className="sector">{companyInfoForCards[companyCode]["profile"].sector}</p>
                            <label htmlFor="industry">Industry</label>
                            <p className="industry">{companyInfoForCards[companyCode]["profile"].industry}</p>
                            <label htmlFor="exchange">Exchange On</label>
                            <p className="exchange">{companyInfoForCards[companyCode]["profile"].exchange}</p>
                            <label htmlFor="price">Share Price</label>
                            <p className="price">{companyInfoForCards[companyCode]["profile"].price + ' ' +
                                companyInfoForCards[companyCode]["profile"].changes + ' ' +
                                companyInfoForCards[companyCode]["profile"].changesPercentage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>;
            companyCard.push(card);
        }
        
        return companyCard;
    }

    render() {

        if (Object.entries(this.props.companyInfo).length == 0) {
            return (
                <>
                    <div className="row cards-container justify-content-center">
                        Loading Data
                    </div>
                </>
            );
        }

        if ( this.filteredInfo.filteredInfo === undefined) {
            this.fillFilterOptions(this.props.companyInfo);
            this.filteredInfo["filteredInfo"] = this.props.companyInfo;
        }

        return (
            <>
                {this.filters()}
                <div className="row cards-container justify-content-center">
                    {this.showCompanyCards( this.filteredInfo.filteredInfo)}              
                </div>
            </>
        );
    }
    
    applyFilters(sectorValue, industryValue, exchangeValue) {
        
        this.filteredInfo.filteredInfo = {};
        let companyInfo = this.props.companyInfo;
        for (const companyCode in companyInfo) {
            if (sectorValue && industryValue && exchangeValue) {
                if ((companyInfo[companyCode]["profile"].sector == sectorValue) && 
                    (companyInfo[companyCode]["profile"].industry == industryValue) && 
                    (companyInfo[companyCode]["profile"].exchange == exchangeValue)
                ) {
                    this.filteredInfo["filteredInfo"][companyCode] = companyInfo[companyCode];
                }
            } else if (sectorValue && industryValue) {
                if ((companyInfo[companyCode]["profile"].sector == sectorValue) && 
                    (companyInfo[companyCode]["profile"].industry == industryValue)) {
                        this.filteredInfo["filteredInfo"][companyCode] = companyInfo[companyCode];
                }

            } else if (sectorValue && exchangeValue) {
                if ((companyInfo[companyCode]["profile"].sector == sectorValue) && 
                    (companyInfo[companyCode]["profile"].exchange == exchangeValue)) {
                        this.filteredInfo["filteredInfo"][companyCode] = companyInfo[companyCode];
                }
            } else if (exchangeValue && industryValue) {
                if ((companyInfo[companyCode]["profile"].industry == industryValue) && 
                    (companyInfo[companyCode]["profile"].exchange == exchangeValue)) {
                        this.filteredInfo["filteredInfo"][companyCode] = companyInfo[companyCode];
                }
            } else if (sectorValue && (companyInfo[companyCode]["profile"].sector == sectorValue)) {
                this.filteredInfo["filteredInfo"][companyCode] = companyInfo[companyCode];
            } else if (industryValue && (companyInfo[companyCode]["profile"].industry == industryValue)) {
                this.filteredInfo["filteredInfo"][companyCode] = companyInfo[companyCode];
            } else if (exchangeValue && (companyInfo[companyCode]["profile"].exchange == exchangeValue)) {
                this.filteredInfo["filteredInfo"][companyCode] = companyInfo[companyCode];
            }
        }

        if (!sectorValue && !industryValue && !exchangeValue) {
            this.filteredInfo["filteredInfo"] = companyInfo

        }
    }

    fillFilterOptions(companyInfo) {

        for (const companyCode in companyInfo) {

            if (companyInfo[companyCode]["profile"].sector &&
                (this.sectorOptions[companyInfo[companyCode]["profile"].sector] === undefined)) {
                this.sectorOptions[companyInfo[companyCode]["profile"].sector] = companyInfo[companyCode]["profile"].sector;
            }

            if (companyInfo[companyCode]["profile"].industry &&
                (this.industryOptions[companyInfo[companyCode]["profile"].industry] === undefined)) {
                this.industryOptions[companyInfo[companyCode]["profile"].industry] = companyInfo[companyCode]["profile"].industry;
            }

            if (companyInfo[companyCode]["profile"].exchange &&
                (this.exchangeOptions[companyInfo[companyCode]["profile"].exchange] === undefined)) {
                this.exchangeOptions[companyInfo[companyCode]["profile"].exchange] = companyInfo[companyCode]["profile"].exchange;
            }
        }
    }

    fillOptionsInHtml(options, name) {
        let opt = [];
        opt.push(<option key={name}>Select {name}</option>);
        for (const key in options) {
            opt.push(<option key={key}>{key}</option>);
        }
        return opt;
    }

    filters() {
        return <div className="row" id="filter-button">
            <div className="col-md-4 filter-options justify-content-center no-margin-padding">
                <div className="col-md-5 text-right">
                    <button className="btn btn-primary grey" id="toggle-grid"><i className="fas fa-bars"></i></button>
                </div>
                <div className="col-md-7 text-left .no-margin-padding">
                    <button className="btn btn-primary grey" id="show-filter-options" onClick={this.showFilters}>Show Filters</button>
                </div>
            </div>
            {this.state.filterShown ?
            (<div className="col-md-8 filter-options justify-content-start text-left no-margin-padding" id="filters">
                <div className="col-md-3">
                    <select className="browser-default custom-select" id="filter-sector" onChange={this.handleSectorChange}>
                        {this.fillOptionsInHtml(this.sectorOptions, "sector")}
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="browser-default custom-select" id="filter-industry" onChange={this.handleIndustryChange}>
                        {this.fillOptionsInHtml(this.industryOptions, "industry")}
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="browser-default custom-select" id="filter-exchange" onChange={this.handleExchangeChange}>
                        {this.fillOptionsInHtml(this.exchangeOptions, "exchange")}
                    </select>
                </div>
            </div>) : null}
        </div>
    }

}

const mapStateToProps = state => {
    return {
        companyInfo: state.companyInfo,
    }
};


const mapStateToDispatch = dispatch => {
    return bindActionCreators({
        getCompanyInfo: actions.getCompanyInfo,
        setCompanyInfo: actions.setCompanyInfo,
    }, dispatch)
};

export default connect(mapStateToProps, mapStateToDispatch)(Companies)