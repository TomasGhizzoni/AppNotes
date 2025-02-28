import { Button } from "./ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-2 mt-6">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        className="bg-secondary text-secondary-foreground"
      >
        Anterior
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={currentPage === page ? "default" : "outline"}
          className={currentPage === page ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        className="bg-secondary text-secondary-foreground"
      >
        Siguiente
      </Button>
    </div>
  )
}

