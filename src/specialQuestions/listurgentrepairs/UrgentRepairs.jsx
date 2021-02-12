import React, {useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import "./listUrgentRepairs.css"

const UrgentRepairs = () => {
    const [urgentRepairListNotFixed, setUrgentRepairListNotFixed] = useState([])
    const getUrgentRepair = () => {
        axios.get("http://localhost:3001/urgentrepairs").then((responce) => {
            setUrgentRepairListNotFixed(responce.data)
            console.log(responce)
            console.log(responce.data)
        })
    }
    return (
        <div className="list_overflow_urgentRepairs">
            <div className="list_questions_urgentRepairs">
                {getUrgentRepair()}
                <div className="list_questions_hardware_params_urgentRepairs">
                    {urgentRepairListNotFixed.map((val, key) => {
                        return <div>
                            <ul>
                                <li>
                                    <l>Дата поломки:</l>
                                    {val.дата_поломки}</li>
                                <li>
                                    <l>Администратор:</l>
                                    {val.фамилия}</li>
                                <li>
                                    <l>Оборудование:</l>
                                    {val.наименование}</li>
                                <li>
                                    <l>Статус:</l>
                                    {val.статус}</li>
                            </ul>
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

export default UrgentRepairs;