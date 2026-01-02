let navigate = null;

export const setNavigate = (navigateFunction) => {
    navigate = navigateFunction;
};

export const redirectToLogin = () => {
    if (navigate) {
        navigate('/login');
    } else {
        // Fallback to window.location
        window.location.href = '/login';
    }
};
