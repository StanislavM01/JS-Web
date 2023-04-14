import authService from "../../services/authService"
import UserContext from "../../contexts/UserContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"


function Register() {
    let navigate = useNavigate()
    let [error, setError] = useState()
    let { userLogin } = useContext(UserContext)


    function onSubmit(e) {
        e.preventDefault()
        let { email, password, confirmPassword } = Object.fromEntries(new FormData(e.target))


        try {
            if (password !== confirmPassword) {
                setError('the both passwords dont match')
                return
            }

            authService.register({ email, password })
                .then(result => {
                    userLogin(result)
                    navigate('/')
                })

        } catch (err) {
            setError(err.message)
        }


    }
    return (

        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    {error && <div style={{color:'red'}}>{error}</div>}
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="emailTwo" name="email" placeholder="maria@email.com" />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirmPassword" id="confirm-password" />
                    <input className="btn submit" type="submit" defaultValue="Register" />
                    <p className="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Register