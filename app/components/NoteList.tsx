import { Note } from '../types'
import { Button } from "./ui/button"

interface NoteListProps {
  notes: Note[]
  onDelete: (id: number) => void
  onEdit: (note: Note) => void
}

export default function NoteList({ notes, onDelete, onEdit }: NoteListProps) {
  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <article key={note.id} className="bg-card text-card-foreground shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary">{note.title}</h2>
          <div className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: note.content }} />
          <span className="bg-accent text-accent-foreground text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {note.category}
          </span>
          <div className="mt-4 space-x-2">
            <Button variant="outline" onClick={() => onEdit(note)}>Editar</Button>
            <Button variant="destructive" onClick={() => onDelete(note.id)}>Eliminar</Button>
          </div>
        </article>
      ))}
    </div>
  )
}

