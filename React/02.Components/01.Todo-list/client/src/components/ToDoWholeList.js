import OneList from "./OnlyOneList"
import LoadingContainer from "./Loading"
import { useEffect, useState } from 'react'

function ToDoList() {
    let [toDoList, setToDoList] = useState()

    useEffect(() => {
        (async function () {
            let resolve = await fetch('http://localhost:3030/jsonstore/todos')
            let result = await resolve.json()
            console.log(result)
            setToDoList(Object.values(result))
            console.log(toDoList)

        })()

    }, [])

    async function clickHandler(oneTask) {
        let id = oneTask._id


        await fetch(`http://localhost:3030/jsonstore/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isCompleted: !oneTask.isCompleted })
        })

        setToDoList(allTasks => allTasks.map(a => {
            if (a._id == id) {
                a.isCompleted = !a.isCompleted
                return a
            } else {
                return a
            }
        }))
    }

   

    return (
        <div className="table-wrapper">
            {toDoList ?
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-header-task">Task</th>
                            <th className="table-header-status">Status</th>
                            <th className="table-header-action">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {toDoList.map(oneList => <OneList key={oneList._id} {...oneList} clickHandler={clickHandler}
                         />)}
                    </tbody>

                </table>

                : <LoadingContainer />}
        </div>

    )
}

export default ToDoList