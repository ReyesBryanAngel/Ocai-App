import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import secureLocalStorage from "react-secure-storage";
import { useGlobalData } from '../contexts/GlobalDataProvider';
import { decodeToken } from '../utils/decodeToken';
import { loginUser } from '../services/apiService';

const Login = () => {
    const { setRole, setGlobalData } = useGlobalData();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:8000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser(username, password);

            if (response?.status === 200) {
                const token = response?.data?.token;
                const decodedToken = decodeToken(token);
                const userRole = decodedToken?.role;
                const firstName = decodedToken?.firstName;
                const lastName = decodedToken?.lastName;
                secureLocalStorage?.setItem('firstName', firstName);
                secureLocalStorage?.setItem('lastName', lastName);
                secureLocalStorage?.setItem('userRole', userRole);
                secureLocalStorage?.setItem('accessToken', token);


                setRole(userRole);
                if (userRole === 'Admin') {
                    navigate('/admin');
                } else if (userRole === 'Teacher') {
                    navigate('/teacher');
                } else {
                    navigate('/unauthorized');
                }
            }
        } catch (err) {
            setError(err?.response?.data?.message);
        }
    };

    return (
        <div className='flex flex-col h-screen justify-center'>
            <Container
                component={Paper}
                elevation={3}
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    padding: 3,
                    backgroundColor: '#f5f5f5',
                    
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Welcome
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default Login;
