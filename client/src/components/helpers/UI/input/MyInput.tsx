import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/storeHooks'
import InputErrors from './InputErrors'

function MyInput({ errorVariant, ...props }) {
	const [isActive, setIsActive] = useState(false)
	const { errors } = useAppSelector(state => state.authReducer)
	return (
		<>
			<input
				onFocus={() => setIsActive(true)}
				onBlur={() => setIsActive(false)}
				{...props}
				className={`flex w-full bg-transparent text-[1.3rem] text-white p-1 px-4 outline-none rounded-md ${
					isActive && !errors[errorVariant] && ' border-blue-400'
				} ${errors[errorVariant] && ' border-red-600'} border`}
			/>
			{!!errors && errors[errorVariant] && (
				<InputErrors errors={errors} errorVariant={errorVariant} />
			)}
		</>
	)
}

export default MyInput
