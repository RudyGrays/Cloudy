import React from 'react'

function LabeledInput({ text = '', children, ...props }) {
	const childId = React.Children.only(children).props.id
	return (
		<label htmlFor={childId} {...props}>
			{!!text.length && <div className='text-white text-[1.2rem]'>{text}</div>}
			{children}
		</label>
	)
}

export default LabeledInput
