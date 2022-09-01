import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Todo from '../components/Todo';
import { listTodos } from '../src/graphql/queries';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import { ListTodosQuery} from '../src/API';

Amplify.configure(awsExports);
const Home: NextPage = () => {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		fetchTodos();
	}, []);

	async function fetchTodos() {
		const { data } = (await API.graphql({ query: listTodos })) as {
			data: ListTodosQuery;
			errors: any[];
		};
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Todo />
		</div>
	);
};

export default Home;
