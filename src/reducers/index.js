import {combineReducers} from 'redux'
import {FETCH_MENTORS,FETCH_MENTOR,UPDATE_MENTOR,ADD_MENTOR,DELETE_MENTOR,ADD_TASK} from '../actions'
import _ from 'lodash';


const mentorsReducer=(state={},action)=>{
	switch(action.type){
		case FETCH_MENTORS:
			return {...state,..._.mapKeys(action.payload,'_id')};
		case FETCH_MENTOR:
			return {...state,[action.payload._id]:action.payload};
		case UPDATE_MENTOR:
			return {...state,[action.payload._id]:action.payload}
		case ADD_MENTOR:
			return {...state,[action.payload._id]:action.payload}
		case DELETE_MENTOR:
			return _.omit(state,action.payload)
		// case FETCH_TASKS:
		// 	return {...state,[action.payload._id]:action.payload};		
		case ADD_TASK:
			return {...state,[action.payload._id]:action.payload}
		default:
			return state;
	}
}

// const tasksReducer=(state={},action)=>{
// 	switch(action.type){
// 		case FETCH_TASKS:

// 			return state;
// 		case ADD_TASK:
// 			return state;
// 		default:
// 			return state;
// 	}
// }


export default combineReducers({
	mentors:mentorsReducer
});