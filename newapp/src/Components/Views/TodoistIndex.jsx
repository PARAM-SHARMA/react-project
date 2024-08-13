import React, { useState } from 'react';
// import { Footer } from '../../Components/Layout/Footer.jsx';
import { Header } from "../../Components/Layout/Header.jsx";
import { InsertTodo } from "../InsertTodo.jsx";
import { Sidebar } from "../Sidebar.jsx";

export function TodoistIndex() {

    const [newTaskInputVisiblilty, setNewTaskInputVisiblity] = useState(false);

    function changeInputVisibility() {
        setNewTaskInputVisiblity(!newTaskInputVisiblilty);
    }


    return (
        <>
            <Header />
            <div id='todoist-content' className="row g-0">
                <div className="col-3">
                    <Sidebar vis={() => changeInputVisibility()} />
                </div>
                <div className="col-9">
                    <InsertTodo visibility={newTaskInputVisiblilty} vis={() => changeInputVisibility()} />
                    {/* <Footer /> */}
                </div>
            </div>

        </>
    )
}