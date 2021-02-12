import React, {useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import './listHardwareNotFixed.css'

const HardwareNotFixed = () => {
    const [hardwareListNotFixed, setHardwareListNotFixed] = useState([])

    const getHardwareNofFixed = () => {
        axios.get("http://localhost:3001/hardwarenotfixed").then((responce) => {
            setHardwareListNotFixed(responce.data)
            console.log(responce)
            console.log(responce.data)
        })
    }
    return (
        <div className="list_overflow_hardware_notFixed">
            <div className="list_questions_hardware_notFixed">
                {getHardwareNofFixed()}
                <div className="list_questions_hardware_notFixed_params">
                    <table className="title_hardware_notfixed">
                        <p>Статус</p>
                        <p>Номер поломки</p>
                        <p>Наименование работы</p>
                        <p>Описание поломки</p>
                        <p>Наименование поломки</p>
                    </table>
                    {hardwareListNotFixed.map((val, key) => {
                        return <div className="hardware_notfixed_flex">
                            <p>{val.статус}</p>
                            <p>{val.id_поломки}</p>
                            <p>{val.Наименование_Работы}</p>
                            <p>{val.Описание_Поломки}</p>
                            <p>{val.Наименование_Поломки}</p>
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

export default HardwareNotFixed;