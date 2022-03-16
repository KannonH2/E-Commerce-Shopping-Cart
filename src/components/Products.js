/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import formatCurrency from '../util'

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className='products'>
                    {
                    this.props.products.map(product => (
                        <li key={
                            product._id
                        }>
                            <div className='product'>
                                <a href={"#" + product._id}>
                                    <img src={product.image} alt={product.name}/>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <p className='product-price'>
                                    {formatCurrency(product.price)}
                                    <button className='button primary'>
                                        Add to cart
                                    </button>
                                </p>
                            </div>
                        </li>
                    ))
                } </ul>
            </div>
        )
    }
}
