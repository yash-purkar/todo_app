import React, { useState, useEffect } from 'react'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './Images/to_do.svg';
import "./index.css"

const getLocalSData = () => {
  const data = localStorage.getItem("myItems");
  // myItems is a key
  // console.log(data);
  if (data) { //That means if data inside an data variable
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

const toasts = {
  success: (msg) => {
    toast.success(msg)
  },
  warning: (msg) => {
    toast.warning(msg)
  },
  delete: (msg) => {
    toast.error(msg)
  }
}

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalSData());
  const [itemIdToBeEdit, setITemIdToBeEdit] = useState(null);

  const addItem = () => {
    if (inputData === "") {
      toasts.warning("Plz Fill the data")
    }
    else {
      if (itemIdToBeEdit) {
        const data = items?.map(el => el.id === itemIdToBeEdit ? { ...el, name: inputData } : el)
        setItems(data);
        setITemIdToBeEdit(null)
        setInputData("")
        toasts.success("Updated Successfully")
      }
      else {
        const newTodo = {
          id: new Date().getTime().toString(),
          name: inputData
        }
        setItems([...items, newTodo])
        setInputData("")
        toast.success("Added Successfully")
      }
    }
  }

  // edit
  const editItem = (itemIdToBeEdit) => {
    setITemIdToBeEdit(itemIdToBeEdit);
    const itemToBeEdit = items?.find(el => el.id === itemIdToBeEdit);
    // console.log(itemToBeEdit)
    setInputData(itemToBeEdit?.name)
  }

  // delete
  const deleteItem = (id) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== id;
    })
    setItems(updatedItems);
    toasts.delete("Deleted")
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

          {
            itemIdToBeEdit ? <i className="fa-solid fa-pen-to-square update-btn" onClick={addItem}></i> : <i className="fa-solid fa-plus add" onClick={addItem}></i>
          }
        </div>
        <br />

        <div className="showItems">
          {
            items.map((currElem) => {
              return (
                <div className="eachItem" key={currElem.id}>
                  <span>{currElem.name}</span>
                  <div className="todo_btn" >
                    {/* <i className="fa-solid fa-pen-to-square " ></i> */}
                    <i className="fa-solid fa-pen-to-square edit" onClick={() => editItem(currElem.id)}></i>
                    <i className="fa-solid fa-trash delete" onClick={() => deleteItem(currElem.id)}></i>
                  </div>
                </div>
              )
            })
          }
        </div>

        <button className='clearLists' onClick={() => setItems([])}>
          Clear All
        </button>

      </div>
      <ToastContainer autoClose={1000} transition={Flip} />
    </div>
  )
}

export default ToDo