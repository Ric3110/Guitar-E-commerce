import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: 'Cash on Delivery',
}

function Checkout({ cart, onClearCart }) {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(price)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  function validateForm() {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneDigits = formData.phone.replace(/\D/g, '')

    if (formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.'
    }

    if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      nextErrors.phone = 'Please enter a complete phone number.'
    }

    if (formData.address.trim().length < 8) {
      nextErrors.address = 'Please enter your complete delivery address.'
    }

    if (formData.paymentMethod !== 'Cash on Delivery') {
      nextErrors.paymentMethod = 'Please select Cash on Delivery.'
    }

    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitted(true)
    setFormData(initialForm)
    onClearCart()
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-[#9c8b4f] bg-[#efe0a2] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f7a30]">
            Order Received
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-950">
            Thank you for your order.
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-700">
            Your checkout was submitted successfully. Payment will be made
            through Cash on Delivery.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded bg-black px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-[#f7f3e8] p-8 text-center">
          <h1 className="text-2xl font-black uppercase text-slate-950">
            No Items to Checkout
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Add at least one guitar to your cart before checking out.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded bg-[#a58f3d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#8f7a30]"
          >
            Browse Guitars
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="border-b border-slate-300 pb-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Complete your order
        </p>

        <h1 className="mt-1 text-2xl font-black uppercase text-[#9c8736]">
          Checkout
        </h1>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h2 className="text-lg font-bold text-slate-950">
            Delivery Information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                minLength="2"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full rounded border px-3 py-2.5 text-sm outline-none ${
                  errors.fullName
                    ? 'border-red-500'
                    : 'border-slate-300 focus:border-[#a58f3d]'
                }`}
              />

              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full rounded border px-3 py-2.5 text-sm outline-none ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-slate-300 focus:border-[#a58f3d]'
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                pattern="[0-9+() -]{10,18}"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09XXXXXXXXX"
                className={`w-full rounded border px-3 py-2.5 text-sm outline-none ${
                  errors.phone
                    ? 'border-red-500'
                    : 'border-slate-300 focus:border-[#a58f3d]'
                }`}
              />

              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Delivery Address
              </label>

              <textarea
                id="address"
                name="address"
                required
                minLength="8"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete delivery address"
                className={`w-full resize-none rounded border px-3 py-2.5 text-sm outline-none ${
                  errors.address
                    ? 'border-red-500'
                    : 'border-slate-300 focus:border-[#a58f3d]'
                }`}
              />

              {errors.address && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="paymentMethod"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Payment Method
              </label>

              <select
                id="paymentMethod"
                name="paymentMethod"
                required
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#a58f3d]"
              >
                <option value="Cash on Delivery">
                  Cash on Delivery
                </option>
              </select>

              {errors.paymentMethod && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.paymentMethod}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded bg-[#a58f3d] px-5 py-3 text-sm font-bold text-white hover:bg-[#8f7a30]"
          >
            Place Order
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-[#9c8b4f] bg-[#efe0a2] p-5">
          <h2 className="text-lg font-black uppercase text-slate-950">
            Order Summary
          </h2>

          <div className="mt-5 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b border-[#cbbb78] pb-4"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-white p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-950">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Qty: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-700">
                Shipping
              </span>
              <span className="font-medium">
                Free
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-[#cbbb78] pt-4">
              <span className="font-bold text-slate-950">
                Total
              </span>

              <span className="text-xl font-black text-slate-950">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <Link
            to="/cart"
            className="mt-5 block text-center text-sm font-medium text-[#776620] hover:underline"
          >
            Back to Cart
          </Link>
        </aside>
      </div>
    </main>
  )
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onClearCart: PropTypes.func.isRequired,
}

export default Checkout
