import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import { Ajv } from "ajv";

const DIR = "./events";

const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.source;

const eventSchema = {
	type: "object",
	properties: {
		name: { type: "string" },
		location: { type: "string" },
		start: { type: "string", pattern: datePattern },
		end: { type: "string", pattern: datePattern },
	},
	required: ["name", "location", "start", "end"],
	additionalProperties: false,
};

const ajv = new Ajv();
const validate = ajv.compile(eventSchema);

for (const filename of readdirSync(DIR)) {
	test(filename, () => {
		const content = JSON.parse(
			readFileSync(`${DIR}/${filename}`, "utf8"),
		) as unknown[];
		// console.log(content)
		for (const event of content) {
			if (!validate(event)) {
				console.error(event, validate.errors);
				throw new Error("does not comply to json schema");
			}
		}
	});
}
