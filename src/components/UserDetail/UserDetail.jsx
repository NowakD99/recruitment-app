import React, {useState} from 'react';

function UserDetail({data, handleChange, actionName}) {
    const [isEdited, setIsEdited] = useState(false);
    const [val, setValue] = useState(data);

  return(
    <>
        <div className="userDetail">
            {!isEdited ? 
            <> 
                <span>{actionName.replace('change','')}:  {val}</span> 
                <button onClick={() => {setIsEdited(!isEdited);}}>Edit</button>
            </> 
            : 
            <>
                <input value={val} onChange={(e) => setValue(e.target.value)}></input>
                <button onClick={() => {handleChange(actionName,val); setIsEdited(!isEdited)}}>Save</button> 
            </>
            }
        </div>
    </>
  )
}

export default UserDetail;