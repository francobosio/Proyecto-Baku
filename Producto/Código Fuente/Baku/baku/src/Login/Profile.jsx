
import {useAuth0} from '@auth0/auth0-react'
import Container from '@material-ui/core/Container'

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