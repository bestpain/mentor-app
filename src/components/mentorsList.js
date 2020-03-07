import React from 'react';
import {fetchMentors} from '../actions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import ViewMentor from './viewMentor'

class MentorsList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showModal:false,
			selectedMentor:''
		}
	}	
	componentDidMount(){
		this.props.fetchMentors();
	}
	
	handleCloseModal=()=>{
    	this.setState({showModal:false})
  	}

 	handleClick=(mentor)=>{
    	this.setState({showModal:true,selectedMentor:mentor})
	}
	
	showMentors(){
		let res=null;
		let id=1;
		if(this.props.mentors){
			let keys=Object.keys(this.props.mentors)
			 res= keys.map(m=>{
				return (
					<tr key={id++}>
						<td>{this.props.mentors[m].name}</td>
						<td>{this.props.mentors[m].subject}</td>
						<td><button type='button' onClick={this.handleClick.bind(this,m)}>View Profile</button></td>
						<td><Link to={`/tasks/${m}`} className="ui button blue">View Tasks</Link></td>
					</tr>
				)
			})
		}
		if(res!=null)
			return (
				<table className="ui celled table">
  					<thead>
    					<tr>
    						<th>Name</th>
    						<th>Subject</th>
    						<th></th>
    						<th></th>
  						</tr>
  					</thead>
  					<tbody>
  						{res}
					</tbody>					
				</table>
			);
	}

	render(){
		return(
			<div>
				{this.showMentors()}
				{this.state.showModal && 
         			<ViewMentor show={this.state.showModal} selected={this.state.selectedMentor} toClose={this.handleCloseModal}/>}
			</div>

			)
	}
}

const mapStateToProps=(state)=>{
	return {mentors:state.mentors}
}
export default connect(mapStateToProps,{fetchMentors})(MentorsList);