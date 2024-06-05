import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #800080; /* Purple color */
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  width: 100%;
  background-color: #800080; /* Purple color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
`;

const Link = styled.a`
  display: block;
  margin-top: 10px;
  color: #800080;
  text-decoration: none;
`;

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5006/api/users/login', { email, password });
            console.log("response login",response);
            if (response.status === 200) {
                const user = {
                    token: response.data.token,
                    name: response.data.name,
                    email: response.data.email
                };
                onLogin(user);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/'); 
                alert('Login successful');
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login</Title>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin}>Log In</Button>
                {error && <Error>{error}</Error>}
                <Link href="/forgot-password">Forgot Password?</Link>
            </FormWrapper>
        </Container>
    );
}

export default Login;
