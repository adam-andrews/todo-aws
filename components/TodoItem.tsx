import React from 'react';
import { Todo } from '../src/API';
import { deleteTodo } from '../src/graphql/mutations';
import { Amplify, API, graphqlOperation } from 'aws-amplify';

interface TodoProps {
	todo: Todo;
}

function TodoItem({ todo }: TodoProps) {
	async function removeTodo(): Promise<void> {
		const todoDetails = {
			id: todo.id,
		};
		const deletedTodo = await API.graphql({
			query: deleteTodo,
			variables: { input: todoDetails },
		});
	}

	return (
		<div onClick={removeTodo} className="alert alert-info shadow-lg max-w-3xl">
			<div>
				<input type="checkbox" className="checkbox bg-slate-100" />
				<span>{todo.description}</span>
			</div>
		</div>
	);
}

export default TodoItem;
