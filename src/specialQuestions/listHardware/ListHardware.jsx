import React, {useState} from 'react';
import './listhardware.css'
import axios from "axios";
import {NavLink} from "react-router-dom";

const ListHardware = () => {
    const [questListHardware, setQuestListHardware] = useState([])

    const getAdminOfHardware = () => {
        axios.get("http://localhost:3001/listqhardware").then((responce) => {
            setQuestListHardware(responce.data)
            console.log(responce)
            console.log(responce.data)
        })
    }
    return (
        <div className="list_overflow">
            <div className="list_questions_hardware">
                {getAdminOfHardware()}
                <div className="list_questions_hardware_params">
                    <table className="title_admin_hardware">
                        <p>Администратор</p>
                        <p>Оборудование</p>
                    </table>
                    {questListHardware.map((val, key) => {
                        return <div className="admin_hardware_flex">
                            <p>{val.фамилия} </p>
                            <p>{val.наименование}</p>
                        </div>
                    })}
                </div>
                <NavLink to="/home">
                    <button className="btnBack">Назад</button>
                </NavLink>
            </div>
        </div>
    );
};

export default ListHardware;