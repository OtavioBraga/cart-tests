import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from '../App';

describe('App tests', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
  });

  it('renders the correct number of products', () => {
    const { getAllByTestId } = render(<App />)

    const products = getAllByTestId('product-item')

    expect(products.length).toBe(4)
  })

  it('changes the total of the cart when a new product is added', () => {
    const { getByTestId, getAllByTestId } = render(<App />)

    const total = getByTestId('cart-total')

    const [firstAddButton] = getAllByTestId('product-item-add')

    fireEvent.click(firstAddButton)
    
    expect(total).toHaveTextContent('R$ 788.88')
  })

  it('changes the total of the cart when a new product is removed', () => {
    const { getByTestId, getAllByTestId } = render(<App />)

    const total = getByTestId('cart-total')

    const [firstRemoveButton] = getAllByTestId('product-item-remove')
    
    const [firstAddButton] = getAllByTestId('product-item-add')
    
    expect(total).toHaveTextContent('R$ 0.00')
    
    fireEvent.click(firstAddButton)
    
    expect(total).toHaveTextContent('R$ 788.88')

    fireEvent.click(firstRemoveButton)

    expect(total).toHaveTextContent('R$ 0.00')
  })

  it('calculates the freight value correctly', async () => {
      const { getByTestId } = render(<App />)

      const postalCodeInput = getByTestId('cart-postal-code-input')

      const calculateFreightButton = getByTestId('calculate-freight-button')

      fireEvent.change(postalCodeInput, { target: { value: '80050370' } })

      fireEvent.click(calculateFreightButton)

      const freightTotal = await waitForElement(() => getByTestId('cart-freight-total'))

      expect(freightTotal).toHaveTextContent('R$ 45.67')
  })

  it('calculates the freight value correctly if cart total > 100', async () => {
    const { getByTestId, getAllByTestId } = render(<App />)

    const postalCodeInput = getByTestId('cart-postal-code-input')

    const calculateFreightButton = getByTestId('calculate-freight-button')

    const [firstAddButton] = getAllByTestId('product-item-add')

    fireEvent.click(firstAddButton)

    fireEvent.change(postalCodeInput, { target: { value: '80050370' } })

    fireEvent.click(calculateFreightButton)

    const freightTotal = await waitForElement(() => getByTestId('cart-freight-total'))

    expect(freightTotal).toHaveTextContent('Frete grátis')
  })

  it('shows the correct number of products when added', async () => {
    const { getAllByTestId } = render(<App />)

    const [firstAddButton] = getAllByTestId('product-item-add')

    const [firstQuantityLabel] = getAllByTestId('product-item-quantity')

    fireEvent.click(firstAddButton)

    expect(firstQuantityLabel).toHaveTextContent('1')
  })
  
  it('shows the correct number of products when removed', async () => {
    const { getAllByTestId } = render(<App />)

    const [firstAddButton] = getAllByTestId('product-item-add')

    const [firstRemoveButton] = getAllByTestId('product-item-remove')

    const [firstQuantityLabel] = getAllByTestId('product-item-quantity')

    fireEvent.click(firstAddButton)
    
    expect(firstQuantityLabel).toHaveTextContent('1')

    fireEvent.click(firstRemoveButton)

    expect(firstQuantityLabel).toHaveTextContent('0')
  })

  it('blocks the add button if product quantity === 0', async () => {
    const { getAllByTestId } = render(<App />)
    
    const [firstRemoveButton] = getAllByTestId('product-item-remove')

    const [firstQuantityLabel] = getAllByTestId('product-item-quantity')

    fireEvent.click(firstRemoveButton)

    expect(firstQuantityLabel).toHaveTextContent('0')
  })
  
})