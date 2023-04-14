import React, { useInsertionEffect } from "react"

function Clicker() {
    let [clicks, editClicks] = React.useState(0)
    let [action, lastAction] = React.useState('none')


    function increaseHandler() {
        editClicks(countClicks => countClicks + 1)
        lastAction('increase')
    }

    function decreaseHandler() {
        editClicks(countClicks => countClicks - 1)
        lastAction('decrease')

    }
    function resetHandler() {
        editClicks(0)
        lastAction('reset')

    }

    

    return (
        <div>

            <div>last time action:{action}</div>

            <button onClick={decreaseHandler}>-</button>
            <button onClick={resetHandler}>Reset</button>
            <button onClick={increaseHandler}>+</button>

            <div>{clicks}</div>

        </div>


    )
}

export default Clicker