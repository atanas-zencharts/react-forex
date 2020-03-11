import types from './action-types';
import networkClient from '../network/network-client';



export function setMajorIndex (indexes) {
    return {type: types.SET_MAJOR_INDEX, payload: indexes}
}
export function setError (error) {
    return { type: types.SET_ERROR, payload: error };
}

export const getMajorIndex = () => async dispatch => {
    try {
        const response = await networkClient.get("https://financialmodelingprep.com/api/v3/majors-indexes");
        dispatch(setMajorIndex(response.majorIndexesList));
    } catch (ex) {
        dispatch(setError({message: 'There was an error!'}));
    }

}

export function setCompanyInfo (companies) {

    console.log(companies);
    
    return {type: types.SET_COMPANIES_INFO, payload: companies}
}

export const getCompanyInfo = () => async dispatch => {
    let companyInfos = {};
    try {
        for (const companyId in companies) {
            let response;
                if (companies.hasOwnProperty(companyId)) {
                    response = await networkClient.get("https://financialmodelingprep.com/api/v3/company/profile/" + companyId);
            }
            companyInfos[companyId] = response;
        }
        dispatch(setCompanyInfo(companyInfos));
    } catch (ex) {
        dispatch(setError({message: 'There was an error while pulling the companies data'}));
    }
}

/** List with companies containing company code for key and company name for value */
const companies = {
    "KMI": "Kinder Morgan Inc.",
    "INTC": "Intel Corporation",
    "MU": "Micron Technology Inc.",
    "GE": "General Electric Company",
    "BAC": "Bank of America Corporation",
    "EEM": "iShares MSCI Emerging Index Fund",
    "XLF": "SPDR Select Sector Fund - Financial",
    "AAPL": "Apple Inc.",
    "MSFT": "Microsoft Corporation",
    "SIRI": "Sirius XM Holdings Inc.",
    "HPQ": "HP Inc.",
    "F": "Ford Motor Company",
    "AMD": "Advanced Micro Devices Inc.",
    "FB": "Facebook Inc.",
    "MS": "Morgan Stanley",
    "AKS": "AK Steel Holding Corporation",
    "JPM": "JP Morgan Chase & Co.",
    "ORCL": "Oracle Corporation",
    "NKE": "Nike Inc.",
    "XOM": "Exxon Mobil Corporation",
    "CSCO": "Cisco Systems Inc.",
    "USO": "United States Oil Fund",
    "V": "Visa Inc.",
    "BABA": "Alibaba Group Holding Limited"
};

