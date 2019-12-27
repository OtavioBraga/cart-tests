import Freight from '../Freight'

describe('Freight tests', () => {
    it('sould throw if a method to calculate the freight isn`t provided', () => {
        expect(() => {
            new Freight()
        }).toThrow('A instance of calculator is required to calculate the freigth')
    })

    it('sould throw if calculate is called but no cart is passed', () => {
        const freightManager = new Freight(jest.fn())
        
        expect(() => {
            freightManager.calculate()
        }).toThrow('A cart is required to calculate the freight')
    })

})