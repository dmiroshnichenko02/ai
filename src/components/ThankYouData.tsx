'use client'
import { SUBMIT_DATA_KEY } from '@/constants/cookie.constants'
import { SendFormState } from '@/services/sendAssignmentForm'
import Cookie from 'js-cookie'
import { FC, useEffect, useState } from 'react'

const ThankYouData: FC = () => {
	const [submitData, setSubmitData] = useState<null | SendFormState>(null)

	useEffect(() => {
		const data = Cookie.get(SUBMIT_DATA_KEY)
		if (data) {
			setSubmitData(JSON.parse(data))
			Cookie.remove(SUBMIT_DATA_KEY)
		}
	}, [])

	return (
		<section>
			{submitData && (
				<div>
					<ul className='list-none text-white text-2xl flex flex-col gap-4'>
						<li>{`Your name: ${submitData.name}`}</li>
						<li>{`Your email: ${submitData.email}`}</li>
						<li>{`Your Description: ${submitData.assignment_description}`}</li>
						<li>{`Your GitHub Repo URL: ${submitData.github_repo_url}`}</li>
						<li>{`Your Level: ${submitData.candidate_level}`}</li>
					</ul>
				</div>
			)}
		</section>
	)
}

export default ThankYouData
