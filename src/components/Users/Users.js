import React, { useContext } from 'react'
import UserItem from './UserItem';
import Spinner from '../Layout/spinner';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Users = ({users, loading}) => {
    const githubContext = useContext(GithubContext)
        if(githubContext.loading) {
            return <Spinner />
        } else {
            return (
                <div style={userStyle}>
                    {githubContext.users.map((item) => <UserItem user={item} key={item.id} />)}
                    
                </div>
            )
        }
}

Users.prototype = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns:'repeat(3, 1fr)'
}

export default Users
