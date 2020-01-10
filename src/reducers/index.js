import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {combineReducers} from "redux"
//import authReducer from "./authReducer"
import {netWorthState} from "../Dashboard/NetWorth/reducers/netWorthReducers"
import incomePerYear_reducer from "../Dashboard/LifetimeIncome/reducers/incomePerYear_reducer"
import user_reducer from "../Dashboard/LifetimeIncome/reducers/user_reducer"
import pensionStartAges_reducer from "../Dashboard/LifetimeIncome/reducers/pensionStartAges_reducer"
import savings_reducer from "../Dashboard/SavingsPlan/reducers/savings_reducer"
import tax_reducer from "../Dashboard/Tax/reducers/tax_reducer"
import investmentReturns_reducer from "../Dashboard/SavingsPlan/reducers/investmentReturns_reducer"

const persistConfig = {
    key: "root",
    storage, 
    whitelist: ["netWorthState", 
    "tax_reducer",
    "incomePerYear_reducer",
    "user_reducer",
    "pensionStartAges_reducer",
    "savings_reducer",
    "investmentReturns_reducer"
]
}

const rootReducer = combineReducers({

    //   auth: authReducer,
       netWorthState,
       tax_reducer,
       incomePerYear_reducer,
       user_reducer,
       pensionStartAges_reducer,
       savings_reducer,
       investmentReturns_reducer
      
   })

export default persistReducer(persistConfig, rootReducer)


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// combines all reducers to create a global reducer which is then passed in the main index into the createStore function