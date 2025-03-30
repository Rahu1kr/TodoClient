import React, { useState } from 'react'
import { MdDoneOutline } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";

const TodoItem = ({ todo, deleteTodo, updateTodo, doneTodo }) => {
    const [updt, setUpdt] = useState(false)
    const [inputValue, setInputValue] = useState(todo.title);

    const handleUpdate = () => {
        if (inputValue.trim()) {
            updateTodo(todo._id, inputValue.trim());
            setUpdt(false);
        }
    };

    return (
        <div style={{
            height: "45px",
            backgroundColor: todo.status === "done" ? "lightseagreen" : "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px"
        }}>
            {!updt ? (
                <span style={{ fontSize: "20px", flex: 1 }}>{todo.title}</span>
            ) : (
                <input 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ height: "40px", flex: 1, fontSize: "18px", padding: "0 10px" }}
                    type="text" 
                />
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {updt ? (
                    <button 
                        onClick={handleUpdate}
                        style={{ 
                            padding: "5px 15px",
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Save
                    </button>
                ) : (
                    <>
                        <button 
                            onClick={() => doneTodo(todo._id)}
                            style={{ 
                                padding: "5px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer"
                            }}
                        >
                            <MdDoneOutline size={20} color='green' />
                        </button>
                        <button 
                            onClick={() => setUpdt(true)}
                            style={{ 
                                padding: "5px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer"
                            }}
                        >
                            <HiOutlinePencilAlt size={20} />
                        </button>
                        <button 
                            onClick={() => deleteTodo(todo._id)}
                            style={{ 
                                padding: "5px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer"
                            }}
                        >
                            <MdOutlineDelete size={20} color="red" />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default TodoItem;