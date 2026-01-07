import { Navigate } from "react-router-dom";

const Student_Protected_Route = ({children}) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("activeRole");

    if(!token || role !== "student") {
        return <Navigate to='/' replace/>
    }

    return children;
}

export default Student_Protected_Route;