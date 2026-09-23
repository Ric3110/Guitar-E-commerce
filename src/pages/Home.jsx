import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../components/ProductCard'

function Home({ products, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(4)

  const categories = ['All', 'Acoustic', 'Electric', 'Bass', 'Classical']

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)

      const matchesCategory = category === 'All' || product.category === category

      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, category])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  function selectCategory(nextCategory) {
    setCategory(nextCategory)
    setVisibleCount(4)
  }

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-5">
        <div className="rounded-2xl bg-[#f7f3e8] p-3 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-3 py-2.5 sm:max-w-md">
            <span className="text-lg text-[#9c8736]" aria-hidden="true">
              ⌕
            </span>

            <span className="sr-only">Search guitars</span>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setVisibleCount(4)
              }}
              placeholder="Search here"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-0 sm:justify-end">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectCategory(item)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs sm:text-sm ${
                  category === item
                    ? 'bg-[#a58f3d] text-white'
                    : 'text-[#8f7a30] hover:bg-[#eee4bc]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-5 max-w-6xl px-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black md:grid md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex h-56 items-center justify-center bg-[#f5f5f5] p-6 sm:h-64 md:h-80 md:p-8">
            <img
              src="/images/guitar-acoustic-01.png"
              alt="Featured acoustic guitar"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center bg-black p-6 text-white md:p-8 lg:p-10">
            <p className="text-xs font-bold tracking-[0.18em] text-[#efe0a2]">
              STRING &amp; FRET
            </p>

            <h1 className="mt-3 max-w-md text-2xl font-black uppercase leading-tight sm:text-3xl">
              Play your first guitar with confidence
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Beginner-friendly guitars with simple choices for practice, lessons,
              and everyday playing.
            </p>

            <a
              href="#products"
              className="mt-5 w-fit rounded bg-[#efe0a2] px-5 py-2.5 text-sm font-bold text-black hover:bg-[#e5d38b]"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 grid max-w-6xl grid-cols-2 gap-3 px-4 lg:grid-cols-4">
        {[
          ['Fast & Free Shipping', 'Free delivery on qualifying orders.'],
          ['Reliable Delivery', 'Packed carefully for every order.'],
          ['Secure Checkout', 'Simple and clear checkout process.'],
          ['Easy Returns', 'Straightforward return support.'],
        ].map(([title, text]) => (
          <div
            key={title}
            className="border border-[#9c8b4f] bg-[#efe0a2] p-3 text-center"
          >
            <p className="text-sm font-bold">{title}</p>
            <p className="mt-1 text-xs text-slate-700">{text}</p>
          </div>
        ))}
      </section>

      <section id="products" className="mx-auto mt-7 max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between border-b border-slate-300 pb-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Guitar collection
            </p>

            <h2 className="mt-1 text-2xl font-black uppercase text-[#9c8736]">
              Best Sellers
            </h2>
          </div>

          <p className="text-xs text-slate-500">
            Showing {visibleProducts.length} of {filteredProducts.length}
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
            No guitars matched your search.
          </div>
        )}

        {visibleCount < filteredProducts.length && (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 4)}
              className="rounded border border-slate-900 bg-white px-6 py-2.5 text-sm font-semibold hover:bg-slate-100"
            >
              View More
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default Home
