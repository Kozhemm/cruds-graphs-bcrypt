import React from 'react';
import {NavLink} from "react-router-dom";
import PresentationDialogProc from "./presendtationdialog/PresentationDialogProc";

const ListHardQuestions = () => {
    return (
        <div className="list_queries_charts_plots">
            <div className="hard_queries">
                <NavLink to="/listqhardware">
                    <button>Получить список оборудования <br/>и привязанного к нему администратора</button>
                </NavLink>
                <NavLink to="/urgentrepairs">{/**/}
                    <button>Получить технику которая нуждается в срочном устранении неисправностей</button>
                </NavLink>
                <NavLink to="/hardwarenotfixed">
                    <button>Получить технику которая находится в состоянии неисправности</button>
                </NavLink>
                <NavLink to="/diagramwork">
                    <button>Получить линейчататую диаграмму соотношения количества техники в отделах.</button>
                </NavLink>
                <NavLink to="/diagrambreakage">
                    <button>Получить диаграмму соотношения неисправностей различной техники</button>
                </NavLink>
            </div>
            <div className="presentationDiagProc">
                <PresentationDialogProc/>
            </div>
        </div>
    );
};

export default ListHardQuestions;