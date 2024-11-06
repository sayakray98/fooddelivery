import React, { useState,} from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import './Login.css';

export default function Login() {
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        password: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Hook to navigate

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
        window.location.reload();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/auth/createuser',
                JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/auth/login',
                JSON.stringify(loginData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Login successful:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);

            // Redirect to home page or any other page
            navigate('/'); // Redirect to the home page or another route
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    // const [latitude, setLatitude] = useState('');
    // const [longitude, setLongitude] = useState('');
  
    // const API_key = "ed131ad1-ed8c-4b1a-9ccb-156a11656840";
  
    // useEffect(() => {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log(position);
    //     const lat = position.coords.latitude;
    //     const lon = position.coords.longitude;
        
    //     setLatitude(lat);
    //     setLongitude(lon);
  
    //     console.log(lat, lon);
  
    //     // Make API call after coordinates are set
    //     const finalApiEndPoint = `https://api.ipfind.com/me?lat=${lat}&lon=${lon}&auth=${API_key}`;
  
    //     axios.get(finalApiEndPoint)
    //       .then((response) => {
    //         console.log(response.data);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   });
    // }, [API_key])



    return (
        <div className="logincompo">
            <div className={`container logincomposub ${isActive ? 'active' : ''}`} id="container">
                <div className={`form-container sign-up ${isActive ? 'active' : ''}`}>
                    <form onSubmit={handleRegisterSubmit}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="/" className="icon"><i className="fa-brands fa-google"></i></a>
                            <a href="/" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="/" className="icon"><i className="fa-brands fa-youtube"></i></a>
                            <a href="/" className="icon"><i className="fa-brands fa-x-twitter"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            name="name" // Ensure this matches the backend field name
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className="addressloc">
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            /> <i class="fa-solid fa-location-crosshairs locTab"></i>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className={`form-container sign-in ${!isActive ? 'active' : ''}`}>
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="/" className="icon"><i className="fa-brands fa-google"></i></a>
                            <a href="/" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="/" className="icon"><i className="fa-brands fa-youtube"></i></a>
                            <a href="/" className="icon"><i className="fa-brands fa-x-twitter"></i></a>
                        </div>
                        <span>or use your email and password</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                        <a href="/">Forgot Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of the site features.</p>
                            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>

                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Subscriber!</h1>
                            <p>Register with your personal details to use all of the site features.</p>
                            <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
