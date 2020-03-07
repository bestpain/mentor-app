import MentorAPI from '../apis/mentorapi'
export const FETCH_MENTORS='FETCH_MENTORS';
export const FETCH_MENTOR='FETCH_MENTOR';
export const UPDATE_MENTOR="UPDATE_MENTOR"
export const ADD_MENTOR="ADD_MENTOR"
export const DELETE_MENTOR="DELETE_MENTOR"
//export const FETCH_TASKS="FETCH_TASKS"
export const ADD_TASK="ADD_TASK"

export const fetchMentors=()=>async dispatch=>{
	const result=await MentorAPI.get('/mentors')
	dispatch({type:FETCH_MENTORS,payload:result.data})
}

export const updateMentor=(idToUpdate,updatedMentor)=>async dispatch=>{
	const response=await MentorAPI.patch(`/mentors/update/${idToUpdate}`,updatedMentor)
	dispatch({type:UPDATE_MENTOR,payload:response.data})
}

export const addMentor=(mentor)=>async dispatch=>{
	const response=await MentorAPI.post(`/mentors/add`,mentor)
	dispatch({type:ADD_MENTOR,payload:response.data})
}

export const deleteMentor=(idToDelete)=>async dispatch=>{
	const response=await MentorAPI.delete(`/mentors/delete/${idToDelete}`)
	dispatch({type:DELETE_MENTOR,payload:response.data._id})
}

export const fetchMentor=(id)=>async dispatch=>{
	console.log(id)
	const result=await MentorAPI.get(`/mentor/${id}`)
	dispatch({type:FETCH_MENTOR,payload:result.data})
}

export const addTask=(id,task)=>async dispatch=>{
	const result=await MentorAPI.post(`/tasks/add/${id}`,task)
	dispatch({type:ADD_TASK,payload:result.data})
}