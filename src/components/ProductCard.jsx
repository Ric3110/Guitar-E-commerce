import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ProductCard({ product, onAddToCart }) {
  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(product.price)

  return (
    <article className="flex h-full flex-col rounded-lg bg-[#f7f7f7] p-4">
      <Link to={`/product/${product.id}`} className="block">
        <div className="flex h-40 items-center justify-center rounded-md bg-white p-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>

        <h3 className="mt-4 min-h-12 text-base font-medium leading-snug text-slate-900">
          {product.name}
        </h3>
      </Link>

      <p className="mt-2 text-sm text-slate-600">
        {product.description}
      </p>

      <div className="mt-auto pt-3">
        <p className="font-bold text-slate-950">{formattedPrice}</p>
        <p className="mt-1 text-xs text-emerald-600">In Stock</p>

        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-800 bg-white text-lg text-red-500 hover:bg-red-50"
            aria-label={`Add ${product.name} to favorites`}
          >
            ♡
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="grid h-9 w-9 place-items-center rounded-md border border-[#6f622d] bg-[#a6903e] text-base text-white hover:bg-[#8e7a35]"
            aria-label={`Add ${product.name} to cart`}
          >
            🛒
          </button>
        </div>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductCard
