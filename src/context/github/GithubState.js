import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';


const GithubState = (props) => {
    const initialState = {
        users:[],
        user:{},
        repos:[],
        loading:false
    }

    //We call action and dispatch back to reducer
    const [state, dispatch] = useReducer(GithubReducer, initialState);
    
    //Search user
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
        dispatch({
            type:SEARCH_USERS,
            payload: res.data.items
        })
    }

    //Get user

    //Get Repos

    //Clear users

    const clearUser = () => dispatch({type: CLEAR_USERS})

    //Set loading
    const setLoading = () => {
        dispatch({type:SET_LOADING})
    }


    return <GithubContext.Provider
    value={{
        ...state,
        searchUsers,
        clearUser
    }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;