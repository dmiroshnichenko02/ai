/* eslint-disable prefer-const */
'use client'

import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import React from 'react'
import Select, { Props as SelectProps } from 'react-select'

type CustomSelectProps = SelectProps & {
	id: string
	options: { value: string; label: string }[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	id,
	className,
	options,
	...props
}) => {
	const radius = 100
	const [visible, setVisible] = React.useState(false)

	let mouseX = useMotionValue(0)
	let mouseY = useMotionValue(0)

	function handleMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent) {
		let { left, top } = currentTarget.getBoundingClientRect()

		mouseX.set(clientX - left)
		mouseY.set(clientY - top)
	}

	return (
		<motion.div
			style={{
				background: useMotionTemplate`
					radial-gradient(
						${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
						#3b82f6,
						transparent 80%
					)
				`,
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			className='group/select rounded-lg p-[2px] transition duration-300'
		>
			<Select
				{...props}
				options={options}
				id={id}
				className={className}
				classNamePrefix='custom-select'
				styles={{
					control: (base, state) => ({
						...base,
						height: '40px',
						backgroundColor: 'rgb(39 39 42)', // dark:bg-zinc-800
						borderColor: 'transparent',
						borderRadius: '0.375rem',
						boxShadow: state.isFocused
							? '0 0 0 2px rgb(82 82 91)' // dark:focus-visible:ring-neutral-600
							: '0px 0px 1px 1px #404040', // dark:shadow
						'&:hover': {
							borderColor: 'transparent',
							boxShadow: '0px 0px 1px 1px #404040',
						},
						transition: 'all 400ms',
					}),
					valueContainer: base => ({
						...base,
						padding: '2px 12px',
					}),
					menu: base => ({
						...base,
						backgroundColor: 'rgb(39 39 42)', // dark:bg-zinc-800
						color: '#fff',
						zIndex: 10,
						borderRadius: '0.375rem',
						overflow: 'hidden',
						boxShadow: '0px 0px 1px 1px #404040',
					}),
					menuList: base => ({
						...base,
						padding: '4px',
					}),
					option: (base, state) => ({
						...base,
						backgroundColor: state.isSelected
							? '#3b82f6'
							: state.isFocused
							? 'rgba(59, 130, 246, 0.5)'
							: 'transparent',
						color: '#fff',
						borderRadius: '0.25rem',
						'&:hover': { backgroundColor: '#3b82f6', color: '#fff' },
						fontSize: '0.875rem',
						padding: '8px 12px',
					}),
					singleValue: base => ({
						...base,
						color: '#fff',
						fontSize: '0.875rem',
					}),
					input: base => ({
						...base,
						color: '#fff',
						fontSize: '0.875rem',
					}),
					indicatorSeparator: () => ({
						display: 'none',
					}),
					dropdownIndicator: base => ({
						...base,
						color: '#fff',
						'&:hover': {
							color: '#3b82f6',
						},
					}),
				}}
			/>
		</motion.div>
	)
}

export { CustomSelect }
