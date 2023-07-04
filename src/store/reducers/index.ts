import { combineReducers } from "redux";
import TransactionReducer from "../features/transaction/TransactionSlice";
import ModalReducer from "../features/modal/ModalSlice";

export const Reducers = combineReducers({
    transactionState: TransactionReducer,
    modalState: ModalReducer
})