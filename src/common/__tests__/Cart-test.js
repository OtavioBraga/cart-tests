import Cart from '../Cart'

describe('Cart tests', () => {
    const products = [
        {
            name: 'Produto 1',
            price: 12999,
            id: 1
        },
        {
            name: 'Produto 2',
            price: 9999,
            id: 2
        }
    ]

    const setCart = jest.fn()

    const calculateFreight = {
        calculate: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    it('returns 0 if the cart is empty', () => {
        const cart = {
            products: [],
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: ''

        }

        const cartManager = new Cart(
            cart,
            setCart, 
            calculateFreight
        )
        expect(cartManager.total).toBe("0.00")
    })

    it('returns the correct price if the cart contains products', () => {
        const cart = {
            products: [
                {
                    ...products[0],
                    quantity: 2
                },
                {
                    ...products[1],
                    quantity: 2
                }
            ],
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: ''

        }

        const cartManager = new Cart(
            cart,
            setCart, 
            calculateFreight
        )

        expect(cartManager.total).toBe("459.96")
    })

    it('should increment the quantity of a product if already on cart', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[0],
                    quantity: 2
                },
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        cartManager.addProduct(products[0])

        expect(setCart).toBeCalledTimes(2)

        const [, [secondCall]] = setCart.mock.calls

        expect(secondCall(cart)).toEqual({
            ...cart,
            products: [
                {
                    ...products[1],
                    quantity: 2
                },
                {
                    ...products[0],
                    quantity: 3
                },
            ]
        })

    })

    it('should add the product to cart if not in the list', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        cartManager.addProduct(products[0])

        expect(setCart).toBeCalledTimes(2)

        const [, [secondCall]] = setCart.mock.calls

        expect(secondCall(cart)).toEqual({
            ...cart,
            products: [
                {
                    ...products[1],
                    quantity: 2
                },
                {
                    ...products[0],
                    quantity: 1
                },
            ]
        })

    })

    it('should reset the freight when a new product is added', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[0],
                    quantity: 2
                },
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        cartManager.addProduct(products[0])

        expect(setCart).toBeCalledTimes(2)

        const [[firstCall]] = setCart.mock.calls

        expect(firstCall(cart)).toEqual({
            ...cart,
            freightValue: ''
        })
    })

    it('should reset the freight when a product is removed', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[0],
                    quantity: 2
                },
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        cartManager.removeProduct(products[0])

        expect(setCart).toBeCalledTimes(2)

        const [[firstCall]] = setCart.mock.calls

        expect(firstCall(cart)).toEqual({
            ...cart,
            freightValue: ''
        })
    })

    it('should decrement the quantity of a product if already on cart', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[0],
                    quantity: 2
                },
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        cartManager.removeProduct(products[0])

        expect(setCart).toBeCalledTimes(2)

        const [, [secondCall]] = setCart.mock.calls

        expect(secondCall(cart)).toEqual({
            ...cart,
            products: [
                {
                    ...products[1],
                    quantity: 2
                },
                {
                    ...products[0],
                    quantity: 1
                },
            ]
        })
    })

    it('should remove a product of the list when quantity === 1 and removeProduct is called', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[0],
                    quantity: 1
                },
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        cartManager.removeProduct(products[0])

        expect(setCart).toBeCalledTimes(2)

        const [, [secondCall]] = setCart.mock.calls

        expect(secondCall(cart)).toEqual({
            ...cart,
            products: [
                {
                    ...products[1],
                    quantity: 2
                },
            ]
        })
    })

    it('should return the correct quantity of a product ', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )
        expect(
            cartManager.getProductQuantity(products[1])
        ).toEqual(2)
    })

    it('should return 0 if a product isn`t on cart and getProductQuantity is called', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: [
                {
                    ...products[1],
                    quantity: 2
                }
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )
        expect(
            cartManager.getProductQuantity(products[0])
        ).toEqual(0)
    })

    it('should format values correctly fixed(2)', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: []
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )
        expect(
            cartManager.formatValue(1000)
        ).toEqual("10.00")
    })

    it('should call calculateFreightMethod total < 100', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '',
            products: []
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        calculateFreight.calculate.mockImplementationOnce(() => ({ value: 100 }))
        
        cartManager.calculateFreight('80050370')

        expect(calculateFreight.calculate).toBeCalledTimes(1)

        expect(calculateFreight.calculate).toBeCalledWith(cart)
    })

    it('shouldn`t call calculateFreightMethod and set freight value to 0 if total >= 100', () => {
        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '',
            products: [
                {
                    ...products[0],
                    quantity: 2
                },
            ]
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        cartManager.calculateFreight('80050370')

        const [[firstCall]] = setCart.mock.calls
        
        expect(calculateFreight.calculate).toBeCalledTimes(0)

        expect(firstCall(cart)).toEqual({
            ...cart,
            freightValue: 0
        })
    })

    it('should return the list o products correctly', () => {
        const productsList = [
            {
                ...products[0],
                quantity: 2
            },
            {
                ...products[1],
                quantity: 2
            }
        ]

        const cart = {
            user: {
                name: 'Otavio Braga',
                postalCode: '80050370'
            },
            freightValue: '129.00',
            products: productsList
        }
        
        const cartManager = new Cart(
            cart, 
            setCart,
            calculateFreight
        )

        expect(cartManager.products).toBe(productsList)

        expect(cartManager.products.length).toBe(2)
    })

    it('should throw if a cart state isn`t provided', () => {
        expect(() => {
            new Cart(undefined, undefined, jest.fn())
        }).toThrow('A cart state is required')
    })

    it('should throw if a method to calc the freight isn`t provided', () => {
        expect(() => {
            new Cart({}, jest.fn())
        }).toThrow('A method to calculate the freight is required')
    })

})