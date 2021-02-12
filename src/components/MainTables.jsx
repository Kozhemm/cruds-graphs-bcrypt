import React from 'react';
import Admin from "./admin/Admin";
import Division from "./division/Division";
import Client from "./client/Client";
import TypeOfWork from "./type_of_work/TypeOfWork";
import TypeOfBreakage from "./type_of_breakage/TypeOfBreakage";
import Hardware from "./hardware/Hardware";
import Breakage from "./breakage/Breakage";
import ResultOfWork from "./result_of_work/ResultOfWork";

const MainTables = () => {
    return (
        <div>
            <div className="main__tables">
                <ul className="components">
                    <li className="comp_li">
                        <Admin/>
                    </li>
                    <li className="comp_li">
                        <Division/>
                    </li>
                    <li className="comp_li">
                        <Client/>
                    </li>
                    <li className="comp_li">
                        <TypeOfWork/>
                    </li>
                    <li className="comp_li">
                        <TypeOfBreakage/>
                    </li>
                    <li className="comp_li">
                        <Hardware/>
                    </li>
                    <li className="comp_li">
                        <Breakage/>
                    </li>
                    <li className="comp_li">
                        <ResultOfWork/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MainTables;