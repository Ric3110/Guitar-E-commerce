import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function Navbar({ cartCount }) {
  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-black text-white'
        : 'text-slate-800 hover:bg-[#e5d38b] hover:text-black'
    }`

  return (
    <header className="border-b border-[#bca95d] bg-[#efe0a2]">
      <div className="border-b border-[#d8c77d] bg-[#f6f1dc]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <p>Guitars for every player</p>
          <p className="hidden sm:block">Simple. Reliable. Ready to play.</p>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="flex shrink-0 items-center">
          <img
            src="/images/logo.png"
            alt="String & Fret"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            <span className="sm:hidden">🛒 {cartCount}</span>
            <span className="hidden sm:inline">Cart ({cartCount})</span>
          </NavLink>

          <NavLink to="/checkout" className={linkClass}>
            Checkout
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
}

export default Navbar
