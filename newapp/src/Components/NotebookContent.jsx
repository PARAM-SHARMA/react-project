import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteIdContext } from '../Context/NoteId';


export function NotebookContent() {

    const [notes, setNotes] = useState([]);
    const [notebooks, setNotebooks] = useState([]);
    const [currentNote, setCurrentNote] = useState({ "id": "", "title": "", "note": "" })

    const nav = useNavigate();

    const NoteIdState = useContext(NoteIdContext);

    function handleViewNote(id, title, note) {
        setCurrentNote({ id, title, note });
    }

    function editNoteTitle(e) {
        setCurrentNote({ "id": currentNote.id, "title": e.target.value, "note": currentNote.note });
    }

    function editNoteDesc(e) {
        setCurrentNote({ "id": currentNote.id, "title": currentNote.title, "note": e.target.value });
    }


    const getNotes = async (e) => {
        const response = await fetch('http://localhost:3001/notebook', {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        })

        const data = await response.json();
        setNotes(data);
    }

    const getNotebooks = async (e) => {
        const response = await fetch('http://localhost:3001/notebook/fetchnotebooks', {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await response.json();
        setNotebooks(data);
    }


    function editNote(e) {
        e.preventDefault();
        fetch('http://localhost:3001/notebook/editNote', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: currentNote.id,
                title: currentNote.title,
                note: currentNote.note
            })
        }).then(function (response) {
            return response.json();
        });
    }

    function handleDeleteNote(id) {
        fetch('http://localhost:3001/notebook/deleteNote', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        }).then(function (response) {
            console.log(response)
            return response.json();
        });
    }

    function openNotebook(id, notebookname) {
        NoteIdState.setId(id);
        NoteIdState.setName(notebookname);
        nav('/notebook/notes')
    }

    useEffect(() => {
        getNotes()
        getNotebooks()

        return () => {
            setNotes([]);
            setNotebooks([]);
        }
    }, []);

    return (
        <>
            <div className="container mt-5">
                <h4 className='mb-2 text-secondary'>Notes</h4>
                <div className="row mb-5">
                    {
                        notes.map((data) => {
                            return (
                                <div key={data.id} className="col-4 gy-4">
                                    <div className="card">
                                        <div className="card-header">
                                            {data.title}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                {data.note.substring(0, 40)}
                                            </p>
                                            <button className="btn-sm btn-dark mx-1 text-white fs-7" data-bs-toggle="modal" data-bs-target="#viewNoteModal" onClick={() => handleViewNote(data.id, data.title, data.note)}><i className="fa fa-eye"></i></button>
                                            <button className="btn-sm btn-dark mx-1 text-white fs-7" onClick={() => handleDeleteNote(data.id)}><i className="fa fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <h4 className='mb-2 text-secondary'>Notebooks</h4>
                <div className="row mb-4">
                    {
                        notebooks.map((data) => {
                            return (
                                <div className="col-2 gy-4" key={data.id}>
                                    <button className="card border-0 py-2" onClick={() => openNotebook(data.id, data.title)}>
                                        <i className="fa fa-book text-dark notebookicon card-img-top text-center"></i>
                                        <div className="card-body">
                                            <input type="hidden" id='hid' value={data.id} />
                                            <p className="card-text text-center">{data.title}</p>
                                        </div>
                                    </button>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div className="modal fade" id="viewNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" value={currentNote.id} />
                            <h3><input className='form-control' type="text" value={currentNote.title} onChange={editNoteTitle} /></h3>
                            <p><textarea className='form-control' name="notedesc" cols="30" rows="10" value={currentNote.note} onChange={editNoteDesc}></textarea></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={editNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}