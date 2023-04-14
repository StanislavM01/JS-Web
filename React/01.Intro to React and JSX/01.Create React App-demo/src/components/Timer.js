import React from 'react'

function Timer() {
    let [seconds, editSeconds] = React.useState(58)
    let [minutes, editMinutes] = React.useState(0)

    setTimeout(() => {
        editMinutes(seconds == 60 ? minutes + 1 : minutes)
        editSeconds(seconds + 1 > 60 ? seconds = 0 : seconds + 1)

    }, 1000)

    return (
        <div>Time: {seconds} seconds:{minutes} minutes</div>
    )
}

export default Timer