import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import { listTodos } from '../src/graphql/queries';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import { ListTodosQuery, Todo} from '../src/API';

Amplify.configure(awsExports);
const Home: NextPage = () => {
	const [todos, setTodos] = useState<Todo[]>();
	useEffect(() => {
		fetchTodos();
	}, []);

	async function fetchTodos() {
		const { data } = (await API.graphql({ query: listTodos })) as {
			data: ListTodosQuery;
			errors: any[];
		};

		setTodos(data.listTodos?.items as Todo[])
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mt-5 space-y-4">
			{todos?.map((todo, index) => (
				<TodoItem key={index} todo={todo} />
			))}
		</div>
		</div>
	);
};

export default Home;
