import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';
import Header from './Components/Layout/Header';
import About from './Components/Pages/About';
// import uuid from 'uuid';
import './App.css';

class App extends Component {
	state = {
		todos: [],
	};

	componentDidMount() {
		axios
			.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
			.then(res => this.setState({ todos: res.data }));
	}

	//Toggle Complete
	markComplete = id => {
		this.setState({
			todos: this.state.todos.map(todo => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			}),
		});
	};

	//Del todo
	delTodo = id => {
		axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
			this.setState({
				todos: [...this.state.todos.filter(todo => todo.id !== id)],
			})
		);
	};

	//Add Todo
	addTodo = title => {
		axios
			.post('https://jsonplaceholder.typicode.com/todos', {
				title,
				completed: false,
			})
			.then(res => this.setState({ todos: [...this.state.todos, res.data] }));
	};

	render() {
		return (
			<Router>
				<div
					className="App"
					style={{
						width: '33rem',
						justifyContent: 'center',
						margin: '0 auto',
					}}
				>
					<div className="container">
						<Header />
						<Route
							exact
							path="/"
							render={props => (
								<>
									<AddTodo addTodo={this.addTodo} />
									<Todos
										todos={this.state.todos}
										markComplete={this.markComplete}
										delTodo={this.delTodo}
									/>
								</>
							)}
						/>
						<Route path="/about" component={About} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
