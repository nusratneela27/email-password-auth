import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    // 1. prevent page refresh
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('')
        setError('')

        // 2. collect from data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value
        console.log(name, email, password);

        // 3. validate
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add at least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9].[0-9])/.test(password)) {
            setError('please add at least two numbers')
            return
        }
        else if (password.length < 6) {
            setError('please add at least 6 characters in your password')
            return
        }

        // 4. create user firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('')
                event.target.reset()
                setSuccess('User has been created successfully')
                sendVerificationEmail(result.user)
                updateUserData(result.user, name)
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message)
            })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPass(event.target.value)
    }

    // 5. verify email address
    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your email address')
            })
    }

    // 6. update user name
    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('user name updated');
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded p-2' type="text" name="name" id="name" placeholder='Your Name' required />
                <br />
                <input className='w-50 mb-4 rounded p-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your email' required />
                <br />
                <input className='w-50 mb-4 rounded p-2' onBlur={handlePassword} type="password" name="password" id="password" placeholder='Your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already have an account? Please <Link to="/login">Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;