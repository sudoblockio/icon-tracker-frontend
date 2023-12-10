import React from 'react'

const NoBox = ({ text }) => {
    return (
        <div className="contents">
            <table className="table-type">
                <tbody>
                    <tr>
                        <td colSpan="7" className="notrans">
                            {text}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NoBox
