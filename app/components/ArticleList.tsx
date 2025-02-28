import { Article } from "../types";

interface ArticleListProps {
  articles: Article[]
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <article key={article.id} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-4">{article.content}</p>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {article.category}
          </span>
        </article>
      ))}
    </div>
  )
}

