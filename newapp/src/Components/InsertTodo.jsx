import React, { useState, useEffect } from 'react';
import '../App.css'


export function InsertTodo({ visibility, vis }) {

    const [Task, setTask] = useState('');
    const [message, setMessage] = useState([]);

    const taskItems = message.map(data => <li key={data.id} className={data.status === '0' ? 'crossed' : null}>{' '}{data.task}{' '}<button className='btn btn-primary bg-transparent border-0' onClick={() => handleComplete(data.status, data.id)}>{data.status === "1" ? "✅" : "❌"}</button></li>);
    /* <input type="checkbox" onChange={handleComplete} value={data.id} checked={data.status === '1' ? true : false} /> */

    function handleChange(e) {
        setTask(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setTask(Task);
        fetch('http://localhost:3001/todoist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: Task
            })
        }).then(function (response) {
            console.log(response)
            return response.json();
        }).catch(function (error) {
            console.error('Error: ', error);
        });
        fetchAp();
    }

    async function handleComplete(status, id) {
        const newStatus = status === '0' ? '1' : '0';
        try {
            await fetch('http://localhost:3001/todoist', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    status: newStatus
                })
            })
            await fetchAp();
        } catch (error) {
            console.log('Error updating task: ', error);
        }
    }

    const fetchAp = async () => {
        const response = await fetch(`http://localhost:3001/todoist`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await response.json();
        setMessage(data);
    }

    useEffect(() => {
        fetchAp();

        return () => {
            setMessage([]);
            setTask('');
        }
    }, []);


    return (
        <>
            <section id='insertTodo' className="insert py-5 ps-5">
                <form className='' id='enterTask' onSubmit={handleSubmit} style={visibility ? { display: "block", opacity: 1 } : { display: "none", opacity: 0 }}>
                    <label className="border-0 row">
                        New Task {' '}
                        <input className='col-4 mx-1' type="text" onChange={handleChange} />
                        <input className="btn btn-primary col-2 mx-1" type="submit" value={"submit"} />
                        <input className="btn btn-danger col-1 mx-1" type="button" value={"X"} onClick={vis} />
                    </label>
                </form>
                <ul style={{ listStyle: 'number' }}>{taskItems}</ul>
            </section>
        </>
    )
}
