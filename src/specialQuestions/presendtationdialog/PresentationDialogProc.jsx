import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const PresentationDialogProc = () => {
    const data = [
        {
            name: '1999', uv: 5,
        },
        {
            name: '2002', uv: 20,
        },
        {
            name: '2005', uv: 22,
        },
        {
            name: '2008', uv: 23,
        },
        {
            name: '2011', uv: 28,
        },
        {
            name: '2014', uv: 35,
        },
        {
            name: '2017', uv: 41,
        },
        {
            name: '2020', uv: 44,
        },
    ];
    return (
        <div>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="5 10"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="uv" stroke="whitesmoke" fill="#111"/>
            </AreaChart>
            <h1>Количество работников на предприятии</h1>
        </div>
    );
};

export default PresentationDialogProc;