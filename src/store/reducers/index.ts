import { combineReducers } from "redux";
import TransactionReducer from "../features/transaction/TransactionSlice";
import ModalReducer from "../features/modal/ModalSlice";
import UserReducer from "../features/user/UserSlice";

export const Reducers = combineReducers({
    transactionState: TransactionReducer,
    modalState: ModalReducer,
    userState: UserReducer,
})