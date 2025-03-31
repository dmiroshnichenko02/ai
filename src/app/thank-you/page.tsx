import ThankYouData from '@/components/ThankYouData'
import { ShootingStars } from '@/components/ui/ShootingStars'
import { StarsBackground } from '@/components/ui/StarsBackground'
import Link from 'next/link'
import { FC } from 'react'

const ThankTou: FC = () => {
	return (
		<section className='w-full h-[100vh] '>
			<div className='z-50 rounded-md  flex flex-col items-center justify-center relative w-full min-h-full'>
				<h2 className='relative mb-8 flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8'>
					Thank you for submitting your assignment!
				</h2>
				<ThankYouData />
				<Link
					href={'/'}
					className='group/btn mt-8 flex justify-center items-center px-4 relative h-10 cursor-pointer rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-neutral-500 hover:dark:bg-zinc-500'
				>
					Return to form
					<span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100' />
					<span className='absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100' />
				</Link>
			</div>
			<ShootingStars />
			<StarsBackground />
		</section>
	)
}

export default ThankTou
