import { combineReducers, configureStore} from '@reduxjs/toolkit';
import  useReducer  from '../features/user';
import tradeReducer from '../features/trade';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage: storage,
  };

const reducers = combineReducers({
   user: useReducer,
   trade:tradeReducer
  });
  
  const persistedReducer = persistReducer(persistConfig, reducers);



export const store = configureStore({
    reducer:persistedReducer
  })