import React, { useState, useEffect } from 'react';
import '../App.css'


export function InsertTodo({ visibility, vis }) {

    const [Task, setTask] = useState('');
    const [message, setMessage] = useState([]);

    const taskItems = message.map(data => <li key={data.id} className={data.status === '1' ? 'crossed my-3' : 'my-3'}>{' '}{data.task}{' '}<button className='bg-transparent border-0' onClick={() => handleComplete(data.status, data.id)}>{data.status === "0" ? "✅" : "❌"}</button></li>);

    function handleChange(e) {
        setTask(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setTask(Task);
        if (Task !== '') {
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
        } else {
            // show error continue
        }
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
                <ul style={{ listStyle: 'number' }}>{taskItems}</ul>
                <form className='' id='enterTask' onSubmit={handleSubmit} style={visibility ? { display: "inline !important", opacity: 1 } : { opacity: 0 }}>
                    <label className="border-0">
                        New Task {' '}
                        <input className='mx-1 rounded border-1' type="text" onChange={handleChange} />
                        <input className="btn btn-primary btn-sm mx-1 px-4" type="submit" value={"↲"} />
                        <input className="btn btn-danger btn-sm mx-1" type="button" value={"✕"} onClick={vis} />
                    </label>
                </form>
            </section>
        </>
    )
}
