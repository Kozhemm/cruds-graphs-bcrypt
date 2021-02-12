import Header from "./components/header/Header";
import Admin from "./components/admin/Admin";
import Footer from "./components/footer/Footer";
import Division from "./components/division/Division";
import Client from "./components/client/Client";
import './index.css'
import TypeOfWork from "./components/type_of_work/TypeOfWork";
import TypeOfBreakage from "./components/type_of_breakage/TypeOfBreakage";
import Hardware from "./components/hardware/Hardware";
import Breakage from "./components/breakage/Breakage";
import ResultOfWork from "./components/result_of_work/ResultOfWork";
import {NavLink} from "react-router-dom";
import ListHardQuestions from "./specialQuestions/ListHardQuestions";
import MainTables from "./components/MainTables";


const Prewiew = () => {
    return (
        <div className="main">
            <Header/>
            <MainTables/>
            <ListHardQuestions/>
            <Footer/>
        </div>
    )
};

export default Prewiew;