import { FormState } from '@/components/Form'
import axios from 'axios'

export interface SendFormState extends Pick<FormState, 'name' | 'email'> {
	assignment_description: string
	github_repo_url: string
	candidate_level: string
}

export interface SuccessResponse {
	messasge: string
}

export const sendAssignmentForm = async (state: SendFormState) => {
	try {
		const response = await axios.post<SuccessResponse>(
			'https://tools.qa.ale.ai/api/tools/candidates/assignments',
			state
		)
		return {
			...response.data,
			status: true,
		}
	} catch (error) {
		console.log('Error send form request', error)
	}
}
