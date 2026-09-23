import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

import productsData from './data/products'

function App() {
  const [products] = useState(productsData)
  const [cart, setCart] = useState([])
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id,
      )

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })

    setToastMessage(`${product.name} added to cart.`)
    setToastOpen(true)
  }

  function increaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    )
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    )
  }

  function clearCart() {
    setCart([])
  }

  function closeToast(_, reason) {
    if (reason === 'clickaway') {
      return
    }

    setToastOpen(false)
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onClearCart={clearCart}
            />
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2200}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeToast}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
