import React from 'react';

export function Header() {
    return (
        <>
            <nav id='navbar' className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container">
                    <a className="navbar-brand" href="/auth">APPS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/notebook">Notes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/todoist">Todoist</a>
                            </li>


                        </ul>
                        <form className="d-flex">
                            <input id='search' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}