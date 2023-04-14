import { useState } from "react"

function useLocalStorage(defaultValue) {
    let [value, setValue] = useState(() => {
        let auth = localStorage.getItem('auth')
        return auth ? JSON.parse(auth) : defaultValue
    })

    function changeLocalStorage(newValue) {
        if (JSON.stringify(newValue) !== '{}') {
            setValue(newValue)
            localStorage.setItem('auth', JSON.stringify(newValue))
        } else {
            setValue(newValue)
            localStorage.clear()
        }

    }

    return [value, changeLocalStorage]

}

export default useLocalStorage