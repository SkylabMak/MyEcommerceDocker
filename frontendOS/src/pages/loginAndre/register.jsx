import React, { useState, useEffect } from 'react';
// import ShopLogo from '/imgRegister/icons8-shop-64.png';
const ShopLogo = import.meta.env.BASE_URL + 'imgRegister/icons8-shop-64.png';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const fetchDataFromApi = async () => {
        try {
            // const usernameRegex = /^[^\s]+$/;
            // const passwordRegex = /^[^\s]+$/;
            // const englishUsernameRegex = /^[A-Za-z0-9]+$/; 
            // const englishPasswordRegex = /^[A-Za-z0-9]+$/; 
            const englishUsernamePasswordRegex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/;

            if (!englishUsernamePasswordRegex.test(username) || !englishUsernamePasswordRegex.test(password)) {
                setError('Username and password can only contain English letters, numbers, or specific special characters.');
                return;
            }


            // if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
            //     setError('Username and password can only contain letters, numbers, or special characters.');
            //     return;
            // }

            const trimmedUsername = username.trim();
            const trimmedPassword = password.trim();

            if (!trimmedUsername || !trimmedPassword) {
                setError('Username and password are required.');
                return;
            }
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData('Register success');
                navigate('/login');
            } else if (!responseData.success) {
                setData('Register failed, username already exists');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // useEffect(() => {
    //     fetchDataFromApi();
    // }, []);

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="./login" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src={ShopLogo} alt="logo" />
                        <span>Go to login</span>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register your account
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                    <input type="text" name="userName" id="userName" value={username} onChange={handleUsernameChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <button type="button" onClick={fetchDataFromApi} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                            </form>
                            {error && <div>{error}</div>}
                            {data && <div>{data}</div>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;
