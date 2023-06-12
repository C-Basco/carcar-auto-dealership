import React, { useEffect, useState } from "react";



function ServiceGoalList(){
    const [goals, setGoals] = useState("")


    const fetchData = async () =>{
        const url = "http://localhost:8080/api/appointments/goals"
        const response = await fetch(url)
        
        if(response.ok){
            const data = await response.json()
            setGoals(data.goals)
        }
    }
    useEffect(() => {
		fetchData();
	}, []);

    if(!goals){
        return null
    }
    return (
        <div>
            <h3>Company Service Goals</h3>
            
            
        </div>
    )
}

export default ServiceGoalList