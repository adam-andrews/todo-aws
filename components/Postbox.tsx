import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
	postDescription: string;
};

function Postbox() {
	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async (formData) => {
		const { postDescription } = formData;
        
	});
	return (
		<form onSubmit={onSubmit} className="sticky top-16 z-50 border rounded-md ">
			<input
				{...register('postDescription', { required: true })}
				type="text"
				placeholder="Enter Todo"
				className="input input-bordered w-full max-w-xs"
			/>
		</form>
	);
}

export default Postbox;
