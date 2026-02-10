import { createContext, useEffect, useState } from "react";
import backendUrl from "../api/url";

export const NoteContext = createContext()

export const NoteProvider = ({children})=>{
   const [notes,setNotes] = useState([])
   const [loading,setLoading] = useState(false)

  async function getNotes(){
    setLoading(true)
    try{
       const response = await backendUrl.get("/get-notes")
       setNotes(response.data)
    }
    catch(error){
        console.error("Error fetching notes:", error);
    }
    finally{
        setLoading(false);
    }
   }

   const createNote = async(note) => {
    const res=await backendUrl.post("/create-note",note)
    setNotes([res.data,...notes])
}

   const updateNote = async(id, data) => {
    const res=await backendUrl.put(`/update-note/${id}`,data)
    setNotes(notes.map((note)=>(note._id===id ? res.data : note)))
}

const deleteNote = async(id) => {
    await backendUrl.delete(`/delete-note/${id}`)
    setNotes(notes.filter((note)=>(note._id!==id)))
}

   useEffect(()=>{
    getNotes()
   },[])
   
    return(
        <NoteContext.Provider value={{notes,loading,updateNote,deleteNote,createNote}}>
        {children}
        </NoteContext.Provider>
    )
}

