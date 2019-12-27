import { calculateFreight } from '../Correios'

describe('Correios tests', () => {
    it('sould return the correct calue when calculateFreight is called', () => {
        const postalCode = '80050370'

        const result = calculateFreight(postalCode)
        
        expect(result).toEqual({
            postalCode,
            value: 4567
        })
    })

})