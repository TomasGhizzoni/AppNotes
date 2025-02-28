interface SearchBarProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    categories: string[]
  }
  
  export default function SearchBar({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
  }: SearchBarProps) {
    return (
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full md:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  