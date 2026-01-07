import { Navigate } from "react-router-dom";

const Admin_Protected_Route = ({children}) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("activeRole");

    if(!token || role !== "admin") {
        return <Navigate to="/" replace/>
    }

    return children;
}

export default Admin_Protected_Route;