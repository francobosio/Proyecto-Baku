import react from 'react';
import {useAuth0} from '@auth0/auth0-react'
import CardMedia from '@material-ui/core/CardMedia'

const Profile = () => {
    const {user,isAuthenticated} = useAuth0();

    return(
        isAuthenticated && <div>
            <CardMedia
              title=""
              image=""
            />
            <img src={user.picture} alt={user.name}></img>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <pre>
                {JSON.stringify(user)}
            </pre>
        </div>
    )
}

export default Profile;