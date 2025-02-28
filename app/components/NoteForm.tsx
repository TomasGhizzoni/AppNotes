'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Note } from '../types'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { QuillWrapper } from './QuillWrapper'
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from 'react-quill-new'

interface NoteFormProps {
  addNote: (note: Omit<Note, 'id'>) => void
  editingNote: Note | null
  updateNote: (note: Note) => void
}

export default function NoteForm({ addNote, editingNote, updateNote }: NoteFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const quillRef = useRef<ReactQuill>(null)

  // Módulos de Quill memoizados
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['list', 'bullet'],
      ['link']
    ]
  }), [])

  const formats = [
    'header',
    'bold', 
    'italic', 
    'underline', 
    'strike', 
    'list', 
    'link'
  ]

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
      setCategory(editingNote.category)
    } else {
      setTitle('')
      setContent('')
      setCategory('')
    }
  }, [editingNote])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title && content && category) {
      if (editingNote) {
        updateNote({ id: editingNote.id, title, content, category })
      } else {
        addNote({ title, content, category })
      }
      setTitle('')
      setContent('')
      setCategory('')
    }
  }

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6 space-y-4 border border-border">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        {editingNote ? 'Editar Nota' : 'Añadir Nota'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-foreground">Título</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
            className="bg-background text-foreground border-input focus:ring-2 focus:ring-primary/50"
            placeholder="Ingresa el título de tu nota"
            aria-label="Título de la nota"
          />
        </div>
        
        <div>
          <Label htmlFor="content" className="text-foreground">Contenido</Label>
          <div className="border border-input rounded-lg overflow-hidden">
            <QuillWrapper
              ref={quillRef}
              value={content}
              onChange={(value: string) => setContent(value)}
              modules={modules}
              formats={formats}
              theme="snow"
              className="bg-background text-foreground min-h-[200px] max-h-[400px]"
              placeholder="Escribe el contenido de tu nota aquí..."
              aria-label="Contenido de la nota"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="category" className="text-foreground">Categoría</Label>
          <Input
            type="text"
            id="category"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            required
            className="bg-background text-foreground border-input focus:ring-2 focus:ring-primary/50"
            placeholder="Asigna una categoría"
            aria-label="Categoría de la nota"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 ease-in-out"
        >
          {editingNote ? 'Actualizar Nota' : 'Añadir Nota'}
        </Button>
      </form>
    </div>
  )
}