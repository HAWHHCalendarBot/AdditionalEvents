import {readdirSync, promises} from 'fs'
import test from 'ava'

const {readFile} = promises

const DIR = './events'

for (const filename of readdirSync(DIR)) {
	test(filename, async t => {
		const content = JSON.parse(await readFile(`${DIR}/${filename}`))
		t.log(content)
		for (const e of content) {
			checkEvent(t, e)
		}
	})
}

function checkEvent(t, e) {
	// Not needed: room

	t.truthy(e.name)
	t.truthy(e.starttime)
	t.truthy(e.endtime)

	t.true(isFinite(e.date) && e.date >= 1 && e.date <= 31)
	t.true(isFinite(e.month) && e.month >= 1 && e.month <= 12)
	t.true(isFinite(e.year) && e.year >= 2015 && e.year <= 2100)
}
