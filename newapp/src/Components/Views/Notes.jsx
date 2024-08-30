import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/Footer';
import { NoteIdContext } from '../../Context/NoteId';

export function Notes() {

    const [notesById, setNotesById] = useState([]);
    const [note, setNote] = useState();
    const [title, setTitle] = useState();

    const NoteIdState = useContext(NoteIdContext);
    const id = NoteIdState.id;
    const notebookName = NoteIdState.name;



    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handleNote(e) {
        setNote(e.target.value);
    }

    function createNote(e) {
        e.preventDefault();
        fetch('http://localhost:3001/notebook/notebooknotes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                note: note,
                id: id
            })
        }).then(function (response) {
            console.log(response)
            return response.json();
        });
    }

    useEffect(() => {
        async function getNotesById() {
            const response = await fetch(`http://localhost:3001/notebook/notes/${id}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await response.json();
            console.log('hlo')
            setNotesById(data);
        }
        getNotesById();

        return () => {
            setNotesById([]);
        }

    }, [id]);

    //api runs infinite times without it


    return (

        <>
            <Header />
            <div className="container mt-5">
                <h4 className='mb-2 text-secondary'>{notebookName}</h4>
                <div className="row mb-5">
                    {
                        notesById.map((data) => {
                            return (
                                <>
                                    <div key={data.id} className="col-4 gy-4">
                                        <div className="card">
                                            <div className="card-header">
                                                {data.title}
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {data.note.substring(0, 40)}
                                                </p>
                                                {/* <button className="btn-sm btn-dark mx-1 text-white fs-7" data-bs-toggle="modal" data-bs-target="#viewNoteModal" onClick={() => handleViewNote(data.id, data.title, data.note)}><i className="fa fa-eye"></i></button>
                                            <button className="btn-sm btn-dark mx-1 text-white fs-7" onClick={() => handleDeleteNote(data.id)}><i className="fa fa-trash"></i></button> */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </div>
            <Footer />
            <button className='btn btn-dark' id='floatBtn1' data-bs-toggle="modal" data-bs-target="#createNoteModal"><i className="fa fa-plus"></i> {' '}Note</button>
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
        </>
    )
}