import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/Footer';
import { NotebookContent } from '../NotebookContent';

export function NotebookIndex() {

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [notebookTitle, setNotebookTitle] = useState('');

    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handleNote(e) {
        setNote(e.target.value);
    }

    function handleNotebookTitle(e) {
        setNotebookTitle(e.target.value);
    }


    setTimeout(() => {
        localStorage.clear('session');
    }, 60000);

    const nav = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('session')) {
            console.log('session does not exists')
            nav('/auth')
        }
    })

    function createNote(e) {
        e.preventDefault();
        fetch('http://localhost:3001/notebook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                note: note
            })
        }).then(function (response) {
            console.log(response)
            return response.json();
        });


    }

    function createNotebook(e) {
        e.preventDefault();
        fetch('http://localhost:3001/notebook/createnotebook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: notebookTitle
            })
        }).then(function (response) {
            console.log(response)
            return response.json();
        });
    }


    if (localStorage.getItem('session')) {
        return (
            <>
                <Header />
                <NotebookContent />
                <Footer />
                <button className='btn btn-dark' id='floatBtn1' data-bs-toggle="modal" data-bs-target="#createNoteModal"><i className="fa fa-plus"></i> {' '}Note</button>
                <button className='btn btn-dark' id='floatBtn2' data-bs-toggle="modal" data-bs-target="#createNotebookModal"><i className="fa fa-plus"></i> {' '}Notebook</button>
                {/* Modal  */}
                <div className="modal fade" id="createNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create a new Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={createNote}>
                                <div className="modal-body">
                                    <label htmlFor="title">Title: </label>
                                    <input id="title" type="text" className='form-control' onChange={handleTitle} required />
                                    <label htmlFor="note">Note: </label>
                                    <textarea id="note" type="text" className='form-control' rows={4} onChange={handleNote} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="createNotebookModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create a new Notebook</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={createNotebook}>
                                <div className="modal-body">
                                    <label htmlFor="notebooktitle">Title: </label>
                                    <input id="notebooktitle" type="text" className='form-control' onChange={handleNotebookTitle} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}