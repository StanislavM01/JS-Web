import userService from "../../services/userService"

import UserTableRow from "./UserTableRow"
import UserDetails from "./user-details/UserDetails"
import UserEdit from "./user-edit/UserEdit"
import UserDelete from "./user-delete/UserDelete"
import UserAdd from "./user-add/UserAdd"

import { useState, useEffect } from "react"

let userActions = {
    delete: 'delete',
    details: 'details',
    edit: 'edit',
    add: 'add'
}

function UserList() {

    let [users, setUsers] = useState([])
    let [selectedUser, changeSelectedUser] = useState({ user: null, action: null })

    console.log(users)
    useEffect(() => {
        (async function () {
            let allUsers = await userService.getAllUsers()
            setUsers(allUsers)
        })()
    }, [])

    function clickOnUserButtons(userId, actionType) {
        (async function () {
            if(userId){
                let userInfo = await userService.getOneUser(userId)
                changeSelectedUser({ user: userInfo, action: userActions[actionType] })
            }else{
                changeSelectedUser({ user: null, action: userActions[actionType] })
            }
           
        })()
    }

    function closeUser() {
        changeSelectedUser({ user: null, action: null })
    }

    
    function addButtonEvent(e) {
        e.preventDefault()
        let formData = new FormData(e.target)

        let { firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            ...address

        } = Object.fromEntries(formData)

        let userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            address

        }

        console.log(userData)
        userService.createOneUser(userData)
            .then(newUser => {
                setUsers(oldUsers => [...oldUsers, newUser])
                closeUser()

            })

    }

    function editButtonEvent(e) {
        e.preventDefault()
        let formData = new FormData(e.target)

        let { firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            ...address

        } = Object.fromEntries(formData)

        let userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            address

        }

        let { _id } = users.find(a => phoneNumber === a.phoneNumber)

        userService.editOneUser({ userId: _id, userData })
            .then(newUser => {
                setUsers(oldUsers => oldUsers.map(a => {
                    if (a._id === newUser._id) {
                        return newUser
                    } else {
                        return a
                    }
                }))
                closeUser()

            })

    }

    function deleteButtonEvent(userId) {
        console.log(userId)
        userService.deleteOneUser(userId)
        .then(user =>{
            console.log(user)
            setUsers(oldUsers => oldUsers.filter(a => a._id != userId))
            closeUser()
        })
        
    }


    return (
        <div className="table-wrapper">


            {selectedUser.action === userActions.details && <UserDetails closeUser={closeUser} user={selectedUser.user} />}
            {selectedUser.action === userActions.edit && <UserEdit closeUser={closeUser} user={selectedUser.user} editButtonEvent={editButtonEvent} />}
            {selectedUser.action === userActions.delete && <UserDelete closeUser={closeUser} user={selectedUser.user} deleteButtonEvent={deleteButtonEvent} />}
            {selectedUser.action === userActions.add && <UserAdd closeUser={closeUser} addButtonEvent={addButtonEvent} />}

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Image
                        </th>
                        <th>
                            First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Created
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map(user => <UserTableRow key={user._id} user={user} clickOnUserButtons={clickOnUserButtons} />)}
                </tbody>
            </table>
            <button className="btn-add btn" onClick={() => clickOnUserButtons(null,'add')}>Add new user</button>
        </div >
    )
}

export default UserList