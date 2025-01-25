import Ajv from "https://esm.sh/ajv@8.17.1";

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

for (const filename of Deno.readDirSync(DIR)) {
	Deno.test({
		name: filename.name,
		fn() {
			const content = JSON.parse(
				Deno.readTextFileSync(`${DIR}/${filename.name}`),
			) as unknown[];
			// console.log(content)
			for (const event of content) {
				if (!validate(event)) {
					console.error(event, validate.errors);
					throw new Error("does not comply to json schema");
				}
			}
		},
	});
}
