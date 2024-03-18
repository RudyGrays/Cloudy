import React, { useEffect, useState } from 'react'

function InputErrors({ errors, errorVariant = '' }) {
	const [errorsArr, setErrorsArr] = useState([])
	useEffect(() => {
		if (!errorVariant) {
			return setErrorsArr(errors)
		}
		setErrorsArr(errors[errorVariant])
	}, [errors])

	return (
		<>
			<div className='flex w-full flex-col gap-1'>
				{errorsArr.map((error, index) => (
					<div className='text-red-500' key={index}>
						{error}
					</div>
				))}
			</div>
		</>
	)
}

export default InputErrors
