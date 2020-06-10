const {readdirSync, promises} = require('fs')
const test = require('ava')

const {readFile} = promises

const DIR = './events'

for (const filename of readdirSync(DIR)) {
	test(filename, async t => {
		const content = JSON.parse(await readFile(`${DIR}/${filename}`))
		t.log(content)
		for (const event of content) {
			checkEvent(t, event)
		}
	})
}

function checkEvent(t, event) {
	// Not needed: room

	t.truthy(event.name)
	t.truthy(event.starttime)
	t.truthy(event.endtime)

	t.true(Number.isFinite(event.date) && event.date >= 1 && event.date <= 31)
	t.true(Number.isFinite(event.month) && event.month >= 1 && event.month <= 12)
	t.true(Number.isFinite(event.year) && event.year >= 2015 && event.year <= 2100)
}
