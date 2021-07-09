import React, {useEffect, useState, useCallback} from 'react';
import User from '../User/User';

function UserList() {
    const API = "https://randomuser.me/api/?results=10";
    const [users, setUsers] = useState(null);

    const handleChange = useCallback((usersList) => {setUsers(usersList)},[]);

    useEffect(() => {
        if(users == null){
        let dataFromLocalStorage = localStorage.getItem('Users');
        if(JSON.parse(dataFromLocalStorage) != null){
            setUsers(JSON.parse(dataFromLocalStorage))
        }else{
            function getUsers(api) {
                fetch(api)
                    .then(response => response.json())
                    .then(data => {setUsers(data.results)});
            }
            getUsers(API)
        }
        }
        
      }, [users]);

    useEffect(() => {
        localStorage.setItem('Users', JSON.stringify(users));
      }, [users]);

  return(
    <>
        <h1>Users List</h1>
      {users ? users.map((user, id)=> {
          return <User key={id} id={id} user={user} handleChange={handleChange}></User>
      }) : null}
    </>
  )
}

export default UserList;