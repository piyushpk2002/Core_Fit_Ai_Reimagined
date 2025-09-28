import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserTodo(){
    const [text, setText] = useState("");
    const {userTodo} = useSelector((state) => state.auth);
    

    const renderTodo = (todo = userTodo)=>{
        let newArr = todo.slice(0,-1)
        return newArr.map((data, index) => {
            const [day, todoExercises] = data.split(":");
            
            const Exercises = todoExercises.split(";")
            
             return (
                <div key={index} className="space-y-5 mb-14 ">
                    <h1 className="text-5xl font-semibold text-gray-300">
                        {day}
                    </h1>
                    <div>
                        {
                            Exercises.map((data, exerciseIndex) => {
                                
                                return (<div  key={exerciseIndex}><p className="mb-1 text-lg tracking-wide">
                                {data}
                            </p></div>)
                            })
                        }
                    </div>
                </div>)
        })
    
    }

    useEffect(()=>{
        setText(renderTodo())
    }, [userTodo])
    return (
        <div className="h-auto w-5/6 mx-auto my-10">
            <h2 className="text-5xl mb-12 border-b-2 pb-2 text-cyan-200 text-center fredoka font-semibold tracking-wide">My Todos</h2>
            {
                text.length > 0 ? text : (
                    <p className="text-4xl text-center mt-52 text-gray-300">No Todos Available Right Now...</p>
                )
            }
        </div>
    )

}

export default UserTodo;