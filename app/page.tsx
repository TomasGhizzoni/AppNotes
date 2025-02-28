'use client'

import { useState, useEffect } from 'react'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import SearchBar from './components/SearchBar'
import Pagination from './components/Pagination'
import AuthForm from './components/AuthForm'
import { Button } from "./components/ui/button"
import { Note } from "./types";


export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const notesPerPage = 5

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (note: Omit<Note, 'id'>) => {
    setNotes([...notes, { ...note, id: Date.now() }])
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note))
    setEditingNote(null)
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || note.category === selectedCategory)
  )

  const indexOfLastNote = currentPage * notesPerPage
  const indexOfFirstNote = indexOfLastNote - notesPerPage
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote)

  const categories = Array.from(new Set(notes.map((note) => note.category)))

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AuthForm onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Mis Notas Personales</h1>
        <Button onClick={handleLogout} variant="secondary">Cerrar sesión</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
          <NoteList 
            notes={currentNotes} 
            onDelete={deleteNote} 
            onEdit={setEditingNote} 
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredNotes.length / notesPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
        <div>
          <NoteForm 
            addNote={addNote} 
            editingNote={editingNote} 
            updateNote={updateNote} 
          />
        </div>
      </div>
    </main>
  )
}

