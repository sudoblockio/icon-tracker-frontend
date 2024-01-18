import React from 'react'
import { convertNumberToText, convertToExponentialText } from '../../utils/utils'

const AmountCell = ({ amount, decimal, symbol, noEllipsis }) => {
    amount = convertNumberToText(amount || '0', decimal || 4)
    amount = amount.length < 20 ? amount : convertToExponentialText(amount, decimal || 4)
    return (
        <td>
            <span>{amount}</span>
            <em className={!(symbol === 'ICX' || symbol === 'USD' || noEllipsis) ? 'ellipsis' : ''}>
                {symbol}
            </em>
        </td>
    )
}

export default AmountCell
