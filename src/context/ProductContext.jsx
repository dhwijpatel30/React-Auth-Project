import React, { createContext, useEffect, useState } from 'react'
import { productData } from '../data/productData'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

    const [toggle, setToggle] = useState(false)

    const [editUser, setEditUser] = useState(null)

    const [users, setUsers] = useState(() => {

        const savedProducts = localStorage.getItem("products")

        return savedProducts
            ? JSON.parse(savedProducts)
            : productData
    })

    const [search, setSearch] = useState("")

    const [cartItems, setCartItems] = useState(() => {

        const savedCart = localStorage.getItem("cartItems")

        return savedCart
            ? JSON.parse(savedCart)
            : []
    })

    useEffect(() => {

        localStorage.setItem(
            "products",
            JSON.stringify(users)
        )

    }, [users])

    useEffect(() => {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        )

    }, [cartItems])



    const addToCart = (product) => {
        setCartItems((prevItems) => {

            const existingProduct = prevItems.find(
                (item) => item.id === product.id
            )

            if (existingProduct) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                )
            }

            return [
                ...prevItems,
                {
                    ...product,
                    quantity: 1
                }
            ]
        })
    }

    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        )
    }

    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity > 1
                            ? item.quantity - 1
                            : 1
                    }
                    : item
            )
        )
    }

    const deleteUser = (id) => {
        setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
        )
    }

    const filteredProducts = users.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    )

    const removeFromCart = (id) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        )
    }


    return (
        <ProductContext.Provider
            value={{
                toggle,
                setToggle,

                users,
                setUsers,

                deleteUser,

                editUser,
                setEditUser,

                search,
                setSearch,
                filteredProducts,

                cartItems,
                setCartItems,

                addToCart,

                increaseQuantity,
                decreaseQuantity,

                removeFromCart
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider