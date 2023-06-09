import { Link } from "react-router-dom"

function Navigation() {
    return (
        <nav>
            <ul >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/starships">Starships</Link></li>

            </ul>
        </nav>
    )
}

export default Navigation