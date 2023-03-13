import { HiUser, HiKey, HiEye, HiEyeOff, HiMail } from "react-icons/hi";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from "../api/axios";

export default function Signup() {

    const [passVisibility, setPassVisibility] = useState(<HiEye />);

    const changePassVisibility = () => {
        if (passVisibility.type === HiEye) {
            setPassVisibility(<HiEyeOff />)
            document.getElementById('password').type = 'text';
        } else {
            setPassVisibility(<HiEye />)
            document.getElementById('password').type = 'password';
        }
    }

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [fullname, setFullname] = useState();
    const [password, setPassword] = useState();
    const [usernameError, setUsernameError] = useState();
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate();

    const onSignup = async (e) => {
        e.preventDefault();
        axios.post("/signup", {
            fullname,
            username,
            email,
            password
        }).then((response) => {
            if (response.data.success) {
                navigate('/signin');
            } else {
                if(response.data.error === 'email') {
                    setEmailError(true);
                    setUsernameError("username: "+username)
                    return;
                } else if(response.data.error === 'username'){
                    setUsernameError('username already taken!')
                    setEmailError(false)
                    return;
                }
                else {
                    setUsernameError('username already taken!')
                    setEmailError(true);
                }
            }
        }).catch();
    };

    return (
        <div className="signup-page" style={{width: '100%'}}>

            <div className="logo-container">
                <img src={process.env.PUBLIC_URL + "/logo_w.png"} alt="..." />
            </div>
            <div className="card auth-card shadow col-10 col-sm-7 col-md-7 col-lg-4 py-3">
                <form onSubmit={onSignup}>
                    <h3>Sign up</h3>
                    <p>Create a new account</p>
                    <div class="input-wrapper mb-3">
                        <input
                            type="text"
                            class="form-control"
                            name="fullname"
                            id="fullname"
                            placeholder="Fullname"
                            required
                            onChange={(e) => setFullname(e.target.value)} />
                        <i className="input-icons"><HiUser /></i>
                    </div>
                    <div class="input-wrapper mb-3">
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                        <i className="input-icons"><HiMail /></i>
                        {emailError ? <p style={{ color: 'red' }}>Email already taken! try to sign in</p> : ''}
                    </div>
                    <div class="input-wrapper mb-3">
                        <input
                            type="text"
                            class="form-control"
                            name="username"
                            id="username"
                            placeholder="Username"
                            required
                            onChange={(e) => {
                                setUsername(e.target.value.replace(/\s+/g, '_'))
                                setUsernameError('username: '+e.target.value.replace(/\s+/g, '_'))
                            }} />
                        <i className="input-icons"><HiUser /></i>
                        {username ? <p style={{ color: usernameError === 'username already taken!' ? 'red' : 'darkgray' }}>{usernameError}</p> : ''}
                    </div>
                    <div class="input-wrapper mb-3">
                        <input
                            type="password"
                            class="form-control"
                            name="password"
                            id="password"
                            placeholder="Create password"
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                        <i className="input-icons"><HiKey /></i>
                        <i className="pass-visibility" onClick={changePassVisibility}>{passVisibility}</i>
                    </div>
                    <button type="submit" class="btn">Create account</button>
                </form>
            </div>
            <div className="outside-card">
                <p>Already have an account? <span><Link to="/signin">Sign in</Link></span></p>
            </div>
        </div>
    )
}