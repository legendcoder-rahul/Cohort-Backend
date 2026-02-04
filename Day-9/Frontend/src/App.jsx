import { useState, useEffect } from "react"
import axios from 'axios'

function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateDescription, setUpdateDescription] = useState("")

  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get('https://note-app-3uqe.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })

  }
  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    axios.post('https://note-app-3uqe.onrender.com/api/notes', {
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data)
        fetchNotes()
        e.target.reset()
      })


  }

  function handleDelete(noteId) {
    axios.delete('https://note-app-3uqe.onrender.com/api/notes/' + noteId)
      .then(res => {
        fetchNotes()
      })
  }

  function handleUpdate(note) {
    setShowPopup(true)
    setUpdateId(note._id)
    setUpdateTitle(note.title)
    setUpdateDescription(note.description)
    
  }
function handleUpdateDone() {
  axios.patch(`https://note-app-3uqe.onrender.com/api/notes/${updateId}`, {
    title: updateTitle,
    description: updateDescription
  })
  .then(res => {
    fetchNotes()
    setShowPopup(false)
  })
}


  return (

    <>
      <h1 className="heading">Note App</h1>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder="Enter title" />
        <input name='description' type="text" placeholder="Enter description" />
        <button>Create NOtes</button>
      </form>



      <div className={`notes ${showPopup ? 'blur-active' : ''}`}>
        {
          notes.map(note => {
            return <div className="note">
              <div className="noteContainer">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
              </div>
              <button onClick={() => handleUpdate(note)} className="update">
                Update
              </button>

              <button onClick={() => { handleDelete(note._id) }}>Delete</button>
            </div>

          })
        }



      </div>
      {showPopup && (
        <div className="Popup">
          <h3>Update Note</h3>
          <input
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <input
            type="text"
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />

          <button onClick={handleUpdateDone}>Done</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>

        </div>
      )}
    </>
  )
}

export default App
