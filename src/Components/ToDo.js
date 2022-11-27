import React, { useState, useEffect } from 'react'
import logo from './Images/to_do.svg';
import "./index.css"

const getLocalSData = () => {
  const data = localStorage.getItem("myItems");
  // myItems is a key
  // console.log(data);
  if (data === "") { //If data is empty return empty array ;
    return [];
  }
  else { // If data iside localstorage return this data into an array format
    return JSON.parse(data);
  }
}


const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalSData());

  const addItem = () => {
    if (inputData === "") {
      alert("Plzz Fill the data.")
    }
    else {
      const myNewData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, myNewData])
      setInputData("")
    }
  }

  const deleteItem = (id) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== id;
    })
    setItems(updatedItems);
  }

  useEffect(() => {
    // here this setItem is not a updated function it is a method of localStorage
    localStorage.setItem("myItems", JSON.stringify(items));
  }, [items])


  return (
    <div className='main_div'>
      <div className="child_div">
        <figure>
          <img src={logo} alt="logo" />
          <figcaption>Add your list here👇🏻</figcaption>
        </figure>

        <div className="addItems">
          <input type="text" className="form_control"
            placeholder='✍🏻 Add Items'
            value={inputData}
            onChange={(event) => setInputData(event.target.value)} />

          <i className="fa-solid fa-plus add" onClick={addItem}></i>
        </div>
        <br />

        <div className="showItems">
          {
            items.map((currElem) => {
              return <>
                <div className="eachItem" key={currElem.id}>
                  <span>{currElem.name}</span>
                  <div className="todo_btn" >
                    {/* <i className="fa-solid fa-pen-to-square " ></i> */}
                    <i className="fa-solid fa-trash delete" onClick={() => deleteItem(currElem.id)}></i>
                  </div>
                </div>
              </>
            })
          }
        </div>

        <button className='clearLists' onClick={() => setItems([])}>
          Clear All
        </button>

      </div>
    </div>
  )
}

export default ToDo