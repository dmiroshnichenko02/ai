import { Form } from '@/components/Form'
import { GradationLabels } from '@/interfaces/labels.interface'
import { GroupBase, OptionsOrGroups } from 'react-select'

async function getLabels() {
	try {
		const labels: GradationLabels = await fetch(
			'https://tools.qa.ale.ai/api/tools/candidates/levels',
			{ next: { revalidate: 3600 } }
		).then(res => res.json())

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
