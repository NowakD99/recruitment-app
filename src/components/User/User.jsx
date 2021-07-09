import React, {useState, useEffect, useReducer} from 'react';
import UserDetail from '../UserDetail/UserDetail';

function reducer(user, action) {
    switch (action.type) {
      case 'changeAge':
        return {...user, dob:{date: user.dob.date,age: action.payload}};
      case 'changeGender':
        return {...user, gender: action.payload};
      case 'changeCountry':
        return {...user, location:{country: action.payload, city: user.location.city}};
      case 'changeCity':
        return {...user, location:{country: user.location.country, city: action.payload}};
      case 'changeEmail':
        return {...user, email: action.payload};
      case 'changePhone':
        return {...user, phone: action.payload};
      default:
        throw new Error();
    }
  }

function User({id, user, handleChange}) {
    const [isVisible, setIsVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, user);

    function hangeData(typ = false, value) {
        if(typ) {
        dispatch({type: typ, payload: value})
        } 
    }


    useEffect(() => {
            let dataFromLocalStorage = localStorage.getItem('Users');
            if(JSON.parse(dataFromLocalStorage) != null) {
                let newAllUsers = JSON.parse(dataFromLocalStorage);
                newAllUsers[id] = state;
                handleChange(newAllUsers)
            }
      },[state,handleChange,id]);

  return(
    <div className="user">
      {state.name.title} {state.name.first} {state.name.last}

      <button onClick={() => {setIsVisible(!isVisible)}}>{!isVisible ? 'show' : 'hide'} details</button>
    
      <div className={`userDetailsList ${isVisible ? 'show' : 'hide'}`}>
        <img src={state.picture.large} alt={state.name.first}></img>
       
        <UserDetail data={state.dob.age} handleChange={hangeData} actionName="changeAge"></UserDetail>
        <UserDetail data={state.gender} handleChange={hangeData} actionName="changeGender"></UserDetail>
        <UserDetail data={state.location.country} handleChange={hangeData} actionName="changeCountry"></UserDetail>
        <UserDetail data={state.location.city} handleChange={hangeData} actionName="changeCity"></UserDetail>
        <UserDetail data={state.email} handleChange={hangeData} actionName="changeEmail"></UserDetail>
        <UserDetail data={state.phone} handleChange={hangeData} actionName="changePhone"></UserDetail>
      </div>
    </div>
  )
}

export default User;