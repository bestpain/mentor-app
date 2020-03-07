import React from 'react'
import {connect} from 'react-redux'
import {fetchMentor,addTask} from '../actions'

class ViewTasks extends React.Component{
    constructor(props){
        super(props);
        this.state={newTask:'',taskError:'',showTextArea:false,addButton:true}
    
    }
    componentDidMount(){
        this.props.fetchMentor(this.props.match.params.id)
    
    }
    handleChange=(e)=>{
        this.setState({newTask:e.target.value,taskError:''})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.newTask!=''){
            this.props.addTask(this.props.match.params.id,{title:this.state.newTask})
            this.setState({newTask:'',showTextArea:false,addButton:true})
        }
        else this.setState({taskError:"Task cant be empty"})
    }

    renderTasks=()=>{
        let tasks=null;
        if(this.props.tasks && this.props.tasks.length>0){
            tasks=this.props.tasks.map(t=>{
            return (
                <div key={t._id} class="item">
                <i class="tasks icon"></i>
                <div class="content">
                    {t.title}               
                </div>
              </div>
            )
        })
            return <div className="ui relaxed divided list">{tasks}</div>
        }
        else {
            return <h3>no task to show</h3>
        }
    }

    showTextArea=()=>{
      this.setState({showTextArea:true,addButton:false})
    }

    render(){
        return <div className="container" style={{marginTop:"50px",marginLeft:"600px"}}>
            {this.renderTasks()}
            {this.state.addButton && <button className="ui button primary" style={{marginLeft:"200px"}}
                onClick={this.showTextArea}>Add Task</button>}
            {this.state.showTextArea && <form style={{marginLeft:"200px"}} onSubmit={this.handleSubmit}>
                <textarea placeholder="enter a task" style={{width:"30%",border:"solid grey"}} value={this.state.newTask} onChange={this.handleChange}></textarea>
                {this.state.taskError && <h3>{this.state.taskError}</h3>}<br/>
                <button style={{marginLeft:"75px"}} className="ui button secondary" type="submit">Submit</button>
            </form>}
            
        </div>
    }
}

const mapStateToProps=(state,ownProps)=>{
    if(state.mentors.hasOwnProperty(ownProps.match.params.id))
        return {tasks:state.mentors[ownProps.match.params.id].tasks}
    else return {}
}

export default connect(mapStateToProps,{fetchMentor,addTask})(ViewTasks);