// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import {
    Button,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Profile from '../../components/Profile'

interface LoginViewProps {
    loginAction(userId: string): void;
}

const getUser = async (email: string) => {

    const body = {
        environment: 'development',
        vertical: 'retail',
        email: email,
    }

    const response = await fetch(
        ' ', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return {
        email: data.email,
        customerid: data.customerid,
    }    
}
 
const LoginView: React.FC<LoginViewProps> = ({ loginAction }) => {
    // Hardcoding user ID for demonstration purposes
    // const userId = 'MyHiggsId';
    const [email, setEmail] = useState(process.env.REACT_APP_MPARTICLE_EMAIL as string);

    return (
        <>
            <Grid
                item
                sx={{
                    mb: 2,
                }}
            >
                <FormControl>
                    <TextField
                        id='userId'
                        label='User Id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={() => loginAction(email)}
                >
                    Sign in *
                </Button>
            </Grid>
            <Grid item>
                <Typography variant='caption'>* Demonstration Only</Typography>
            </Grid>
        </>
    );
};

export default LoginView;
