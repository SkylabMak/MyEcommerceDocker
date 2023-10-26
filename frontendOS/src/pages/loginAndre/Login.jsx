import { useState } from 'react';
// import { useHistory } from 'react-router-dom';   //version เก่า
import { useNavigate } from 'react-router-dom';
const ShopLogo = import.meta.env.BASE_URL + 'imgRegister/icons8-shop-64.png';


function Login() {
    // const history = useHistory();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                const idUser = responseData.idUser;
                sessionStorage.setItem("idUser", `${idUser}`);
                sessionStorage.setItem("role", `${responseData.role}`);
                sessionStorage.setItem("username", `${username}`)
                if (responseData.role === "seller") {
                    navigate('/admin');
                    return;
                }
                navigate('/store', { state: { idUser: responseData.idUser } });
            } else {
                setError('Login failed. Please check your username and password.');
            }
        } catch (error) {
            setError('Error occurred while logging in. Please try again later.');
        }
    };

    function guestBTN(){
        navigate("/store");
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="./register" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src={ShopLogo} alt="logo" />
                        <span>Go to register</span>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login your account
                            </h1>
                            <div>
                                <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                <input type="text" name="userName" id="userName" value={username} onChange={handleUsernameChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>

                            <button type="button" onClick={handleLogin} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <button type="button" onClick={guestBTN} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">guest</button>
                            {error && <div>{error}</div>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
