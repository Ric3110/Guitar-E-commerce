import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(price)

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-[#f7f3e8] p-10 text-center">
          <h1 className="text-2xl font-black uppercase text-slate-950">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Add a guitar from the shop to see it here.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded bg-[#a58f3d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#8f7a30]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="border-b border-slate-300 pb-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Shopping Cart
        </p>
        <h1 className="mt-1 text-2xl font-black uppercase text-[#9c8736]">
          View Cart
        </h1>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          {cart.map((item) => {
            const subtotal = item.price * item.quantity

            return (
              <article
                key={item.id}
                className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[120px_1fr]"
              >
                <div className="flex h-28 items-center justify-center rounded-lg bg-[#f7f7f7] p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#9c8736]">
                      {item.category}
                    </p>

                    <Link
                      to={`/product/${item.id}`}
                      className="mt-1 block text-lg font-bold text-slate-950 hover:underline"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-1 text-sm text-slate-500">
                      {formatPrice(item.price)} each
                    </p>

                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="mt-3 text-sm font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-end justify-between gap-5 sm:flex-col sm:items-end">
                    <div>
                      <p className="mb-2 text-xs text-slate-500">
                        Quantity
                      </p>

                      <div className="flex items-center rounded border border-slate-300">
                        <button
                          type="button"
                          onClick={() => onDecrease(item.id)}
                          className="h-9 w-9 text-lg hover:bg-slate-100"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span className="grid h-9 min-w-10 place-items-center border-x border-slate-300 px-2 text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onIncrease(item.id)}
                          className="h-9 w-9 text-lg hover:bg-slate-100"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        Subtotal
                      </p>
                      <p className="mt-1 font-bold text-slate-950">
                        {formatPrice(subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <aside className="h-fit rounded-xl border border-[#9c8b4f] bg-[#efe0a2] p-5">
          <h2 className="text-lg font-black uppercase text-slate-950">
            Order Summary
          </h2>

          <div className="mt-5 space-y-3 border-b border-[#cbbb78] pb-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-700">Items</span>
              <span className="font-medium">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-700">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-bold text-slate-950">
              Total
            </span>
            <span className="text-xl font-black text-slate-950">
              {formatPrice(total)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block w-full rounded bg-black px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="mt-3 block text-center text-sm font-medium text-[#776620] hover:underline"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Cart
