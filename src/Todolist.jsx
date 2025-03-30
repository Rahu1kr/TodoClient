import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const Todolist = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoData, setTodoData] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userdata"));
    const token = userData?.token;

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/todo/", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch todos');
                const data = await response.json();
                setTodoData(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        if (token) fetchTodos();
    }, [token]);

    const addTodo = async () => {
        if (!inputValue.trim()) return;

        try {
            const response = await fetch("http://localhost:8000/api/todo/create", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({ 
                    title: inputValue, 
                    status: "pending" 
                })
            });
            console.log(response)
            
            if (!response.ok) throw new Error('Failed to add todo');
            
            const newTodo = await response.json();
            setTodoData([...todoData, newTodo]);
            setInputValue("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/todo/delete/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (!response.ok) throw new Error('Failed to delete todo');
            
            setTodoData(todoData.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const updateTodo = async (id, newTitle) => {
        try {
            const response = await fetch(`http://localhost:8000/api/todo/update/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({ title: newTitle })
            });
            
            if (!response.ok) throw new Error('Failed to update todo');
            
            const updatedTodo = await response.json();
            setTodoData(todoData.map(todo => 
                todo._id === id ? updatedTodo : todo
            ));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const doneTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/todo/update/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({ status: "done" })
            });
            
            if (!response.ok) throw new Error('Failed to mark todo as done');
            
            const updatedTodo = await response.json();
            setTodoData(todoData.map(todo => 
                todo._id === id ? updatedTodo : todo
            ));
        } catch (error) {
            console.error("Error marking todo as done:", error);
        }
    };

    return (
        <div style={{ height: "700px", width: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ height: "45px", width: "100%", margin: "20px 0", display: "flex", justifyContent: "space-between" }}>
                <input 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    style={{ height: "100%", width: "80%", fontSize: "20px" }} 
                    type="text" 
                />
                <button 
                    onClick={addTodo} 
                    style={{ height: "100%", fontSize: "20px", padding: "0 10px" }}
                >
                    Add
                </button>
            </div>
            {todoData.map((todo) => (
                <TodoItem 
                    key={todo._id} 
                    todo={todo} 
                    deleteTodo={deleteTodo} 
                    updateTodo={updateTodo} 
                    doneTodo={doneTodo} 
                />
            ))}
        </div>
    );
};

export default Todolist;