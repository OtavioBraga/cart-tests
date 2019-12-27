
class Freight {
    constructor(calculateMethod) {
        if (!calculateMethod) {
            throw new Error('A instance of calculator is required to calculate the freigth')
        }

        this.calculateMethod = calculateMethod
    }

    calculate(cart) {
        if (!cart) throw new Error('A cart is required to calculate the freight')
        
        const { user: { postalCode }} = cart
        
        return this.calculateMethod(postalCode)
    }
}

export default Freight