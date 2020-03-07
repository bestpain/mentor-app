import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux'
import {updateMentor,deleteMentor} from '../actions'
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ViewMentor extends React.Component {
  	constructor () {
      super()	
      this.state = {
         name:'',
         email:'',
         subject:'',
         nameError:'',
         emailError:'',
         subjectError:'',
      }
    
  }
  
  componentDidMount=()=>{
  	this.setState({name:this.props.mentor.name,
  		email:this.props.mentor.email,
  		subject:this.props.mentor.subject})
  }

  validateAndSubmit=async e=>{
  	e.preventDefault()
  	if((this.state.nameError==null || this.state.nameError==='') && 
  		(this.state.emailError==null || this.state.emailError==='') && 
  		(this.state.salaryError==null || this.state.salaryError==='')){
  		const ment={
  			name:this.state.name,
  			email:this.state.email,
  			subject:this.state.subject
  		}
		
    this.props.updateMentor(this.props.mentor._id,ment)		
    this.props.toClose();
					
  	}
  }
   handleEmailChange = event => {
    this.setState({ email: event.target.value }, () => {
      this.validateEmail();
    });
  };

   validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError:
        (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[?=(com|org)]{3}$/i.test(email)) ? null : 'Email is not valid'
    });
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value }, () => {
      this.validateName();
    });
  };

   validateName = () => {
    const { name } = this.state;
    this.setState({
      nameError:
        name.length > 3 ? null : 'Name must be longer than 3 characters'
    });
  }

  handleSubjectChange =event=>{
  	this.setState({subject:event.target.value},()=>{
  		this.validateSubject();
  	})
  }

  validateSubject=()=>{
  	const {subject} =this.state;
  	this.setState({
  		subjectError:
  			subject.length!== 0 ? null : 'Subject Cant be empty'
  	})
  }

  handleDelete=()=>{
    this.props.deleteMentor(this.props.mentor._id)
    this.props.toClose();
  }


  render () {
    return (
      <div>
        <ReactModal 
           isOpen={this.props.show}
           contentLabel="Edit Modal"
            style={customStyles}
            ariaHideApp={false}
        >
       <form onSubmit={this.validateAndSubmit} className="ui form error" 
			 style={{width:'600px',marginLeft:'80px',marginTop:'40px'}}>
				<div className={`field ${this.state.nameError ? 'error' : ''}`}>
				  <label>Name</label>
				  <input value={this.state.name} 
				  		onChange={this.handleNameChange} 
				   		name="name" 
				   		type="text"
				   		onBlur={this.validateName}
				   />
				<div className='ui error message'>{this.state.nameError}</div>
				</div>
				
				<div className={`field ten wide ${this.state.emailError ? 'error': ''}`}>
					    <label>Email</label>
					    <input name="email" 
					    	value={this.state.email} 
					    	onChange={this.handleEmailChange} 
				     	 	onBlur={this.validateEmail} 
				     	 	type="text"/>
				     <div className='ui error message'>{this.state.emailError}</div>
				</div>
    		    <div className={`five wide field ${this.state.subjectError ? 'error' :''}`}>
      					<label>subject</label>
      					<input value={this.state.subject} 
      						onChange={this.handleSubjectChange} 
      					 	name="subject" 
      					 	onBlur={this.validateSubject}
      					 	type="text"/>
      				 <div className='ui error message'>{this.state.subjectError}</div>
    			</div>
    				
				  <button className="ui secondary button" type="submit">Submit</button>
          <button className="ui grey button " onClick={this.props.toClose}>Close</button>
          <button className="ui red right floated button " onClick={this.handleDelete}>Remove Mentor</button>
			</form>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps=(state,props)=>{
	return {mentor:state.mentors[props.selected]}
}

export default connect(mapStateToProps,{updateMentor,deleteMentor})(ViewMentor);