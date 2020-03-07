import React from 'react';
import MentorsList from './mentorsList'
import AddMentor from './addMentor'

class App extends React.Component{
  constructor(props){
		super(props);
		this.state={
			showModal:false,
		}
  }	
  
  handleCloseModal=()=>{
    this.setState({showModal:false})
  }

 handleClick=()=>{
    this.setState({showModal:true})
}

  render(){
    return(
      <div className="ui container">
          <h1 style={{textAlign:"center"}}>List of Mentors</h1>
          <MentorsList/>
          <div style={{textAlign:"center"}}>
          <button onClick={this.handleClick} 
               className="ui secondary button">Add Mentor</button>
          </div>
          {this.state.showModal && 
         			<AddMentor show={this.state.showModal} toClose={this.handleCloseModal}/>}
      </div>
      )
  }
}

export default App; 