import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link to="/" className="mt-3 inline-block text-sm underline">
        Back to Home
      </Link>
    </section>
  )
}

export default NotFound
