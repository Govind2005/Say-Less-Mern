import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 