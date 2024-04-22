import { instance } from "../../../network/axios";

export default async function userLogin(values, setIsLoading, setApiError, navigate, SetToken) {
    setIsLoading(true);
    setApiError('');

    try {
        const response = await instance.post('/api/v1/auth/email/login', values);
        if (response.status === 200) {
            const { token } = response.data;
            setIsLoading(false);
            navigate('/');
            SetToken(token);
            localStorage.setItem('userToken', token);
        }
    } catch (error) {
        console.error('Login error:', error);
        setApiError(error.message || 'Login failed');
        setIsLoading(false);
    }
}

// *why we make the token in context