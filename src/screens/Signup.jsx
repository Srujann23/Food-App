import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();

            console.log(data);

            if (!data.success) {
                alert("Enter Valid Credentials!");
            } else {
                alert("SignUp Successful! Go to Login Page!")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getLocation = async () => {
        try {
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            const location = `${data.city}, ${data.regionName}, ${data.country}`;
            setCredentials({ ...credentials, location });
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <div className="container mt-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" id="name" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress1" className="form-label">Location</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} id="exampleInputAddress1" />
                            <button className="btn btn-outline-secondary" type="button" onClick={getLocation}>Get Location</button>
                        </div>
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-primary'>Already a User?</Link>
                </form>
            </div>
        </div>
    );
}
