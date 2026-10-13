export const ProductValidation = {

    productName: {
        required: "Product name is required",
        minLength: {
            value: 3,
            message: "Product name must be at least 3 characters"
        }
    },

    productPrice: {
        required: "Product price is required",
        min: {
            value: 1,
            message: "Price must be greater than 0"
        }
    },

    category: {
        required: "Category is required"
    },

    imageUrl: {
        required: "Image URL is required",
        pattern: {
            value: /^https?:\/\/.+/i,
            message: "Enter a valid image URL"
        }
    }
}