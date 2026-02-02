import { Navigate } from "react-router-dom";

const Teacher_Protected_Route = ({children}) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("activeRole");

    if(!token || role !== "teacher") {
        return <Navigate to='/' replace/>
    }
    
    return children;
}

export default Teacher_Protected_Route;