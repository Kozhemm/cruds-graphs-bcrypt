import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Prewiew from "./Prewiew";
import Registration from "./components/registration/Registration";
import ListHardware from "./specialQuestions/listHardware/ListHardware";
import DiagramWork from "./specialQuestions/diagramwork/DiagramWork";
import DiagramBreakage from "./specialQuestions/diagrambreakage/DiagramBreakage";
import HardwareNotFixed from "./specialQuestions/listhardwarenotfixed/HardwareNotFixed";
import UrgentRepairs from "./specialQuestions/listurgentrepairs/UrgentRepairs";


const App = () => {

    return (
        <Router>
            <Route path="/" exact render={(props) => <Registration />} />{""}
            <Route path="/home" exact render={() => <Prewiew />} />
            <Route path="/listqhardware" render={() => <ListHardware />} />
            <Route path="/diagramwork" render={() => <DiagramWork />} />
            <Route path="/diagrambreakage" render={() => <DiagramBreakage />} />
            <Route path="/hardwarenotfixed" render={() => <HardwareNotFixed />} />
            <Route path="/urgentrepairs" render={() => <UrgentRepairs />} />
        </Router>
    )
};

export default App;