import React, {useState} from 'react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
} from 'recharts';
import './diagrampauz.css'
import {NavLink} from "react-router-dom";

const DiagramWork = () => {
    const [numberOfEmployee, setNumberOfEmoloyee] = useState('')

    const data = [
        {
            name: 'Юридич', кол_тех: 2,
        },
        {
            name: 'Производ', кол_тех: 7,
        },
        {
            name: ' Бух', кол_тех: 22,
        },
        {
            name: 'Плем', кол_тех: 5,
        },

    ];
    return (
        <div className="chartchart">
            <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5"/>
                <XAxis type="number"/>
                <YAxis dataKey="name" type="category"/>
                <Tooltip/>
                <Legend/>
                <Area dataKey="кол_тех" fill="dark" stroke="slategray"/>
                <Bar dataKey="кол_тех" barSize={15} fill="#F0FFFF"/>
            </ComposedChart>
            <NavLink to="/home">
                <button className="btnBack">Назад</button>
            </NavLink>
        </div>
    );
};

export default DiagramWork;