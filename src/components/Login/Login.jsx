import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef()

    const handleLogin = event => {
        event.preventDefault();

        const from = event.target;
        const email = from.email.value;
        const password = from.password.value;
        console.log(email, password);

        // 1. validation
        setError('')
        setSuccess('')
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at least two uppercase')
            return;
        }
        else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Please add special character')
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters long')
            return
        }

        // 2. verify email
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if (!loggedUser.emailVerified) {
                    setError('Please verified your email')
                }
                setSuccess('user login successful')
                setError('')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    // 3. Reset password
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address to reset password')
            return
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    return (
        <div className='w-25 mx-auto'>
            <h2>Please login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' ref={emailRef} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control" id="password" placeholder="Password" required />
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Forget password? Please<button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></small></p>
            <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;