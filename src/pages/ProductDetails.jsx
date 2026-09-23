import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

function ProductDetails({ products, onAddToCart }) {
  const { id } = useParams()

  const product = products.find(
    (item) => item.id === Number(id),
  )

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Product not found
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            The guitar you are looking for does not exist.
          </p>

          <Link
            to="/"
            className="mt-5 inline-block rounded bg-[#a58f3d] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(product.price)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/"
        className="text-sm font-medium text-[#8f7a30] hover:underline"
      >
        ← Back to guitars
      </Link>

      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center bg-[#f7f7f7] p-6 md:min-h-[500px]">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[430px] w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9c8736]">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-950">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-bold text-slate-950">
            {formattedPrice}
          </p>

          <div className="mt-4">
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              In Stock
            </span>
          </div>

          <p className="mt-6 leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-7 border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-500">Category</p>
            <p className="mt-1 font-semibold text-slate-900">
              {product.category}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="rounded bg-[#a58f3d] px-5 py-3 text-sm font-bold text-white hover:bg-[#8f7a30]"
            >
              🛒 Add to Cart
            </button>

            <Link
              to="/cart"
              className="rounded border border-slate-900 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 hover:bg-slate-100"
            >
              🛍 View Cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

ProductDetails.propTypes = {
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

export default ProductDetails
