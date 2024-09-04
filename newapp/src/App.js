import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notebook from './Apps/iNotebook';
import React from 'react';
import { Auth } from './Components/Views/Auth';
import { Notes } from './Components/Views/Notes';
import { TodoistIndex } from './Components/Views/TodoistIndex';
import Index from './Components/Views/Index';


export default function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<Index />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/notebook" element={<Notebook />} />
                        <Route path="/todoist" element={<TodoistIndex />} />
                        <Route path='/notebook/notes' element={<Notes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

