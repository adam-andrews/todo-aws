import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import { listTodos } from '../src/graphql/queries';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import { ListTodosQuery, Todo, CreateTodoMutation } from '../src/API';
import Postbox from '../components/Postbox';
import { useForm } from 'react-hook-form';
import { createTodo } from '../src/graphql/mutations';

type FormData = {
	postDescription: string;
};
Amplify.configure(awsExports);


const Home: NextPage = () => {
	const [todos, setTodos] = useState<Todo[]>();
	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	useEffect(() => {
		fetchTodos();
	}, []);

	async function fetchTodos() {
		const { data } = (await API.graphql({ query: listTodos })) as {
			data: ListTodosQuery;
			errors: any[];
		};

		setTodos(data.listTodos?.items as Todo[]);
	}

	const onSubmit = handleSubmit(async (formData) => {
		const { postDescription } = formData;
		const todoDetails = {
			description: postDescription,
		};
		const {data} = (await API.graphql({
			query: createTodo,
			variables: { input: todoDetails },
		})) as {
			data: CreateTodoMutation;
			errors: any[];
		};
		setTodos([...todos as Todo[], data.createTodo as Todo])
		setValue('postDescription', '')

	});

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>This is the dev branch</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mt-5 space-y-4 w-96">
				<form
					onSubmit={onSubmit}
					className="sticky top-16 z-50 border rounded-md "
				>
					<input
						{...register('postDescription', { required: true })}
						type="text"
						placeholder="Enter Todo"
						className="input focus:outline-none w-full max-w-xs"
					/>
				</form>
				{todos?.map((todo, index) => (
					<TodoItem key={index} todo={todo} />
				))}
			</div>
		</div>
	);
};

export default Home;
