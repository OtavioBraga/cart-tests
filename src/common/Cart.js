class Cart {
    constructor(cart, setCart, freightCalculator) {
        if (!cart || !setCart) {
            throw new Error('A cart state is required')
        }

        if (!freightCalculator) {
            throw new Error('A method to calculate the freight is required')
        }
        
        this.cart = cart
        
        this.setCart = setCart

        this.freightCalculator = freightCalculator
    }

    resetFreight () {
        this.setCart(prev => (
            {
                ...prev,
                freightValue: ''
            }
        ))
    }

    addProduct(newProduct) {
        this.resetFreight()

        const { products } = this.cart

        const product = products.find(product => product.id === newProduct.id)
        
        if (product) {
            this.setCart(prev => ({
                ...prev,
                products: [
                    ...prev.products.filter(product => product.id !== newProduct.id),
                    {
                        ...newProduct,
                        quantity: ++product.quantity
                    }
                ]
            }))
        } else {
            this.setCart(prev => ({
                ...prev,
                products: [
                    ...prev.products,
                    {
                        ...newProduct,
                        quantity: 1
                    }
                ]
            }))
        }
    }

    removeProduct(existingProduct) {
        this.resetFreight()

        const { products } = this.cart

        const product = products.find(product => product.id === existingProduct.id)

        if (product) {
            if (product.quantity > 1) {
                this.setCart(prev => ({
                    ...prev,
                    products: [
                        ...prev.products.filter(product => product.id !== existingProduct.id),
                        {
                            ...existingProduct,
                            quantity: --product.quantity
                        }
                    ]
                }))
            } else {
                this.setCart(prev => ({
                    ...prev,
                    products: [
                        ...prev.products.filter(product => product.id !== existingProduct.id),
                    ]
                }))
            }
        }
    }

    getProductQuantity(existingProduct) {
        const { products } = this.cart

        const product = products.find(product => product.id === existingProduct.id)

        if (product) return product.quantity

        return 0
    }

    calculateFreight(postalCode) {
        if (postalCode) {
            if (this.total < 100) {
                const { value } = this.freightCalculator.calculate(this.cart)

                const freightValue = this.formatValue(value)
    
                this.setCart(prev => ({
                    ...prev,
                    freightValue 
                }))
            } else {
                this.setCart(prev => ({
                    ...prev,
                    freightValue: 0 
                }))
            }
        }
    }

    formatValue(value) {
        return (value / 100).toFixed(2)
    }

    get total () {
        const { products } = this.cart

        const sum = products.reduce((acc, { price, quantity }) => acc + (price * quantity), 0)

        return this.formatValue(sum)
    }

    get freightValue () {
        return this.cart.freightValue
    }

    get products () {
        const { products } = this.cart

        return products
    }
}

export default Cart