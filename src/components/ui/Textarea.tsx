/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import * as React from 'react'

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		const radius = 100
		const [visible, setVisible] = React.useState(false)

		let mouseX = useMotionValue(0)
		let mouseY = useMotionValue(0)

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function handleMouseMove({ currentTarget, clientX, clientY }: any) {
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
				className='group/textarea rounded-lg p-[2px] transition duration-300'
			>
				<textarea
					className={cn(
						`resize-none shadow-input dark:placeholder-text-neutral-600 flex w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/textarea:shadow-none placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
						className
					)}
					ref={ref}
					{...props}
				/>
			</motion.div>
		)
	}
)
Textarea.displayName = 'Textarea'

export { Textarea }
