import axios from 'axios'

export default axios.create({
	baseURL:'https://mentor-server.herokuapp.com/'
})