import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, cleearCart } from '../app/cartSlice'
import './product.css'

const product = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.cart.products)
    const cart = useSelector((state) => state.cart.cart)
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    return (
        <div>
            <div className="cart-container">
                <h1 className="cart-title">🛒Shopping Cart</h1>

                {/* Product Section */}
                <div className="product-section">
                    <h2 className="product-title">Products</h2>
                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product.id} className="product-item">
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                                <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="divide"></div>

                {/* Cart Section */}
                <div className="cart-section">
                    <h2 className="cart-title">🛒Your Cart</h2>
                    {cart.length == 0 ? (
                        <p>Cart is empty</p>
                    ) : (
                        <div className="cart-list">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <h3>{item.name}</h3>
                                    <p>{item.price}</p>
                                    <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <p>Total Price: ${totalPrice}</p>
                    <button onClick={() => dispatch(cleearCart())}>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default product