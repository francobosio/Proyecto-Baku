import react from 'react';
import {useAuth0} from '@auth0/auth0-react'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'

function Profile() {
    const {user,isAuthenticated} = useAuth0();

    return(
        isAuthenticated && <div>
            <Container size="100%">

                
                <pre>
                    {JSON.stringify(user)}
                </pre>
            </Container>
                
        </div>
    )
}

export default Profile;