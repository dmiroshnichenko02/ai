import { Form } from '@/components/Form'
import { GradationLabels } from '@/interfaces/labels.interface'
import axios from 'axios'
import { GroupBase, OptionsOrGroups } from 'react-select'

async function getLabels() {
	try {
		const labels: GradationLabels = await axios
			.get('https://tools.qa.ale.ai/api/tools/candidates/levels')
			.then(res => res.data)

		return labels
	} catch (error) {
		console.error('Error fetching labels', error)
		return { levels: [] }
	}
}

export default async function Home() {
	const labels = await getLabels()

	const labelsListToSelectType: OptionsOrGroups<unknown, GroupBase<unknown>> &
		{ value: string; label: string }[] = labels.levels.map(label => {
		return {
			value: label,
			label,
		}
	})

	return (
		<section className='w-full h-[100vh] bg-black flex justify-center items-center'>
			<Form labels={labelsListToSelectType} />
		</section>
	)
}
