import authService from "../../services/authService"
import { useNavigate, Link } from 'react-router-dom'
import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"

function Login() {
    let navigate = useNavigate()
    let { userLogin } = useContext(UserContext)
    let [error, setError] = useState('')

    async function onSubmit(e) {
        e.preventDefault()
        let userData = Object.fromEntries(new FormData(e.target))
        try {
            let result = await authService.login(userData)
            setError('')
            userLogin(result)
            navigate('/')

        } catch (err) {
            setError(err.message)
            console.log(err.message)
        }

    }


    return (
        < section id="login-page" className="auth" >
            <form id="login" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    {error && <div style={{color:'red'}}>{error}</div>}
                    <p>peter@abv.bg,123456</p>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="emailOne" name="email" placeholder="Sokka@gmail.com" />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" defaultValue="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section >
    )
}

export default Login