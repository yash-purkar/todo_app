import React, { useState } from 'react'
import logo from './Images/to_do.svg';
import "./index.css"

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

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