import React from 'react'

export const Alert = ({alert}) => {
    console.log(alert)
    return (
        alert !== null ? <div className={`alert-${alert.type}`}>
            <span>{alert.msg}</span>
        </div> :""
    )
}
