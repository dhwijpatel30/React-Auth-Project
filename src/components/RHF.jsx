
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ProductValidation } from '../validation/ProductValidation.js'
import { ProductContext } from '../context/ProductContext.jsx'

const RHF = () => {

    const {
        setUsers,
        setToggle,
        editUser,
        setEditUser
    } = useContext(ProductContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onChange"
    })


    // Load selected product data into form
    useEffect(() => {

        if (editUser) {

            reset({
                productName: editUser.title,
                productPrice: editUser.price,
                category: editUser.category,
                imageUrl: editUser.image
            })

        } else {

            reset()

        }

    }, [editUser, reset])


    const onSubmit = (data) => {

        // UPDATE PRODUCT
        if (editUser) {

            const updatedProduct = {
                ...editUser,
                title: data.productName,
                price: data.productPrice,
                category: data.category,
                image: data.imageUrl
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editUser.id
                        ? updatedProduct
                        : user
                )
            )

        }

        // ADD PRODUCT
        else {

            const newProduct = {
                id: Date.now(),
                title: data.productName,
                price: data.productPrice,
                category: data.category,
                image: data.imageUrl
            }

            setUsers((prevUsers) => [
                ...prevUsers,
                newProduct
            ])

        }

        reset()
        setEditUser(null)
        setToggle(false)
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
            >

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                        <span className="text-2xl">🛍️</span>
                    </div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        {editUser ? "Update Product" : "Add Product"}
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        {editUser
                            ? "Update product details below"
                            : "Enter product details below"
                        }
                    </p>

                </div>


                {/* Product Name */}
                <div className="mb-5">

                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Product Name
                    </label>

                    <input
                        {...register(
                            "productName",
                            ProductValidation.productName
                        )}
                        type="text"
                        placeholder="Enter product name"
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition
                            ${errors.productName
                                ? "border-red-400"
                                : "border-slate-300 focus:border-indigo-500"
                            }
`}
                    />

                    {errors.productName && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.productName.message}
                        </p>
                    )}

                </div>


                {/* Product Price */}
                <div className="mb-5">

                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Product Price
                    </label>

                    <input
                        {...register(
                            "productPrice",
                            ProductValidation.productPrice
                        )}
                        type="number"
                        placeholder="Enter product price"
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition
                            ${errors.productPrice
                                ? "border-red-400"
                                : "border-slate-300 focus:border-indigo-500"
                            }
`}
                    />

                    {errors.productPrice && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.productPrice.message}
                        </p>
                    )}

                </div>


                {/* Category */}
                <div className="mb-5">

                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Category
                    </label>

                    <select
                        {...register(
                            "category",
                            ProductValidation.category
                        )}
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition
                            ${errors.category
                                ? "border-red-400"
                                : "border-slate-300 focus:border-indigo-500"
                            }
`}
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="shoes">Shoes</option>
                        <option value="beauty">Beauty</option>
                        <option value="furniture">Furniture</option>
                        <option value="food">Food</option>
                    </select>

                    {errors.category && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.category.message}
                        </p>
                    )}

                </div>


                {/* Image URL */}
                <div className="mb-7">

                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Image URL
                    </label>

                    <input
                        {...register(
                            "imageUrl",
                            ProductValidation.imageUrl
                        )}
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition
                            ${errors.imageUrl
                                ? "border-red-400"
                                : "border-slate-300 focus:border-indigo-500"
                            }
`}
                    />

                    {errors.imageUrl && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.imageUrl.message}
                        </p>
                    )}

                </div>


                {/* Buttons */}
                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="flex-1 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
                    >
                        {editUser ? "Update Product" : "Add Product"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            reset()
                            setEditUser(null)
                            setToggle(false)
                        }}
                        className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                    >
                        Back to Home
                    </button>

                </div>

            </form>

        </div>
    )
}

export default RHF
