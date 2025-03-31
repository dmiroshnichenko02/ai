'use client'
import { SUBMIT_DATA_KEY } from '@/constants/cookie.constants'
import { cn } from '@/lib/utils'
import {
	sendAssignmentForm,
	SendFormState,
} from '@/services/sendAssignmentForm'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookie from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { z } from 'zod'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import { Textarea } from './ui/Textarea'

export interface FormState {
	name: string
	email: string
	assignmentDescription: string
	url: string
	candidate: { value: string; label: string }
}

export const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	assignmentDescription: z
		.string()
		.min(10, 'Description must be at least 10 characters'),
	url: z.string().url('Invalid URL'),
	candidate: z.object({
		value: z.string().min(1, 'Candidate value is required'),
		label: z.string().min(1, 'Candidate label is required'),
	}),
})

const CustomSelect = dynamic(
	() => import('./ui/CustomSelect').then(mod => mod.CustomSelect),
	{
		ssr: false,
	}
)

export function Form({
	labels,
}: {
	labels: OptionsOrGroups<unknown, GroupBase<unknown>> &
		{ value: string; label: string }[]
}) {
	const [requestError, setRequestError] = useState(false)
	const [requestSuccess, setRequestSuccess] = useState(false)

	const router = useRouter()

	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm<FormState>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: FormState) => {
		const transformedDataToSend: SendFormState = {
			name: data.name,
			email: data.email,
			github_repo_url: data.url,
			assignment_description: data.assignmentDescription,
			candidate_level: data.candidate.value,
		}
		const res = await sendAssignmentForm(transformedDataToSend)
		if (res?.status) {
			setRequestSuccess(true)
			Cookie.remove(SUBMIT_DATA_KEY)
			Cookie.set(SUBMIT_DATA_KEY, JSON.stringify(transformedDataToSend))
			setTimeout(() => {
				router.push('/thank-you')
			}, 1000)
		} else {
			setRequestError(true)
		}
	}

	return (
		<div className='shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black'>
			<h2 className='text-xl text-center font-bold text-neutral-800 dark:text-neutral-200'>
				Assignment Form
			</h2>

			<form className='my-8' onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-4'>
					<LabelInputContainer>
						<Label htmlFor='name'>Name *</Label>
						<Input
							id='name'
							placeholder='Tyler'
							type='text'
							{...register('name', { required: true })}
						/>
						{errors.name && (
							<span className='text-red-500'>{errors.name.message}</span>
						)}
					</LabelInputContainer>
				</div>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='email'>Email Address *</Label>
					<Input
						id='email'
						placeholder='test@gmail.com'
						type='email'
						{...register('email', { required: true })}
					/>
					{errors.email && (
						<span className='text-red-500'>{errors.email.message}</span>
					)}
				</LabelInputContainer>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='assignmentDescription'>
						Assignment Description *
					</Label>
					<Textarea
						id='assignmentDescription'
						placeholder='Assignment Description'
						{...register('assignmentDescription', { required: true })}
					/>
					{errors.assignmentDescription && (
						<span className='text-red-500'>
							{errors.assignmentDescription.message}
						</span>
					)}
				</LabelInputContainer>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='url'>GitHub Repository URL *</Label>
					<Input
						id='url'
						placeholder='https://github.com/user/repo'
						type='url'
						{...register('url', { required: true })}
					/>
					{errors.url && (
						<span className='text-red-500'>{errors.url.message}</span>
					)}
				</LabelInputContainer>
				<LabelInputContainer className='mb-8'>
					<Label htmlFor='candidate'>Candidate Level *</Label>
					<Controller
						name='candidate'
						control={control}
						render={({ field }) => (
							<CustomSelect id='candidate' options={labels} {...field} />
						)}
					/>
					{errors.candidate && (
						<span className='text-red-500'>{errors.candidate.message}</span>
					)}
				</LabelInputContainer>
				<button
					className='group/btn relative block h-10 cursor-pointer w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]'
					type='submit'
				>
					Submit Assignment
					<BottomGradient />
				</button>
				{requestSuccess && (
					<div className='text-green-500'>
						Submission successful. You will be redirected in one second.
					</div>
				)}
				{requestError && (
					<div className='text-red-500'>Something went wrong. Try again</div>
				)}
			</form>
		</div>
	)
}

const BottomGradient = () => {
	return (
		<>
			<span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100' />
			<span className='absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100' />
		</>
	)
}

const LabelInputContainer = ({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) => {
	return (
		<div className={cn('flex w-full flex-col space-y-2', className)}>
			{children}
		</div>
	)
}
