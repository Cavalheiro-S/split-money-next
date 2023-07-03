import { combineReducers } from "redux";
import ServiceApiReducer from "../features/service-api/ServiceApiSlice";
import TransactionReducer from "../features/transaction/TransactionSlice";

export const Reducers = combineReducers({
    transactionState: TransactionReducer,
    serviceApiState: ServiceApiReducer
})