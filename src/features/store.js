import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { artWorkSlice } from "./artworks/ArtworksSlice";
import { cartsSlice } from "./carts/CartsSlice";
import { usersSlice } from "./users/UsersSlice";
import { topicsSlice } from './topics/TopicsSlice';
import {commentSlice} from "./FeaturesComment";

const rootReducer = combineReducers({
    artworks: artWorkSlice.reducer,
    carts: cartsSlice.reducer,
    users: usersSlice.reducer,
    topics: topicsSlice.reducer,
    comments:commentSlice.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store
export { store };
