import {readdirSync} from 'fs'
import {readFile} from 'fs/promises'

import test, {ExecutionContext} from 'ava'

const DIR = './events'

interface EventEntry {
	readonly name: string;
	readonly room: string;
	readonly starttime: string;
	readonly endtime: string;
	readonly date: number;
	readonly month: number;
	readonly year: number;
}

for (const filename of readdirSync(DIR)) {
	test(filename, async t => {
		const content = JSON.parse(await readFile(`${DIR}/${filename}`, 'utf8'))
		t.log(content)
		for (const event of content) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			checkEvent(t, event)
		}
	})
}

function checkEvent(t: ExecutionContext, event: EventEntry): void {
	t.truthy(event.name)
	t.true(typeof event.room === 'string')
	t.truthy(event.starttime)
	t.truthy(event.endtime)

	t.true(Number.isFinite(event.date) && event.date >= 1 && event.date <= 31)
	t.true(Number.isFinite(event.month) && event.month >= 1 && event.month <= 12)
	t.true(Number.isFinite(event.year) && event.year >= 2015 && event.year <= 2100)
}
