import authService from "../../services/authService";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'


function Logout() {
    let navigate = useNavigate()
    let { userInfo,userLogout } = useContext(UserContext)
    authService.logout(userInfo.accessToken)
        .then(result => {
            console.log(result,'123')
            navigate('/')
            userLogout()
        })


    return (null)
}

export default Logout