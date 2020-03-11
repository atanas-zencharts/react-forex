import {combineReducers} from "redux";
import types from "./action-types";

function majorIndex(state = [], action) {
    switch (action.type) {
        case types.SET_MAJOR_INDEX: {
            return [...action.payload];
        }

        default:
            return state;
    }
}

function companyInfo(state = [], action) {


    switch (action.type) {
        case types.SET_COMPANIES_INFO: {
            return {...action.payload};
        }

        default:
            return state;
    }
}



function error(state = {}, action) {
    switch (action.type) {
        case types.SET_ERROR: {
            return {...action.payload};
        }
        default:
            return state;
    }
}

function currentPage(state = 1, action) {
    switch (action.type) {
        case types.SET_CURRENT_PAGE: {
            return action.payload;
        }
        default:
            return state;
    }
}

function totalPages(state = 0, action) {
    switch (action.type) {
        case types.SET_TOTAL_PAGES: {
            return action.payload;
        }
        default:
            return state;
    }
}


export default combineReducers({
    majorIndex, 
    companyInfo,
    error, 
    currentPage,
    totalPages
});