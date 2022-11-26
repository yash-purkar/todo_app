import React, { useState } from 'react'
import logo from './Images/to_do.svg';

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (inputData === "") {
      alert("Plzz Fill the data.")
    }
    else {
      setItems([...items, inputData])
    }
  }


  return (
    <div className='main_div'>
      <div className="child_div">
        <figure>
          <img src={logo} alt="logo" style={{ width: "100px" }} />
          <figcaption>Add your list here👇🏻</figcaption>
        </figure>

        <div className="addItems">
          <input type="text" className="form_control"
            placeholder='✍🏻Additems'
            value={inputData}
            onChange={(event) => setInputData(event.target.value)} />

          <i className="fa-solid fa-plus" onClick={addItem}></i>
        </div>
        <br />

        <div className="showItems">
          <div className="eachItem">
            {
              items.map((currElem) => {
                return <><span>{currElem}</span>
                  <div className="todo_btn" style={{ display: "inline", margin: "35px" }}>
                    <i className="fa-solid fa-pen-to-square" style={{ margin: "10px" }}></i>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                  <br />
                </>
              })
            }

          </div>
        </div>

        <br />

        <div className="showItems">
          <button data-sm-link-text="Remove All">
            Remove All
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToDo