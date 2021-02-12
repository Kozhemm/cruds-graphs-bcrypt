import React, {PureComponent} from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import '../diagramwork/diagrampauz.css'
import {NavLink} from "react-router-dom";

const DiagramBreakage = () => {
    const data = [
        {
            name: 'Принтер', count: 2
        },
        {
            name: 'PC', count: 3
        },
        {
            name: 'Ноутбуки', count: 1
        },

    ];
    return (
        <div className="chartchart">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="count" stackId="1" stroke="greenyellow" fill="#A9A9A9"/>
                <Area type="monotone" dataKey="count" stackId="1" stroke="#00FFFF" fill="#2F4F4F"/>
            </AreaChart>
            <NavLink to="/home">
                <button className="btnBack">Назад</button>
            </NavLink>
        </div>
    );
};

export default DiagramBreakage;