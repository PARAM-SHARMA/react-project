import { createContext, useState } from "react";

export const NoteIdContext = createContext(null);

export const NoteIdProvider = (props) => {
    const [id, setId] = useState();
    const [name, setName] = useState();
    return (
        <NoteIdContext.Provider value={{id, setId, name, setName}}>
            { props.children }
        </NoteIdContext.Provider>
    )
}