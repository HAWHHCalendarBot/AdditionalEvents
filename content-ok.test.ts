import Ajv from "https://esm.sh/ajv@8.11.0";

const DIR = "./events";

const eventSchema = {
	type: "object",
	properties: {
		name: { type: "string" },
		room: { type: "string" },
		starttime: { type: "string", pattern: "^[12]?\\d:\\d\\d" },
		endtime: { type: "string", pattern: "^[12]?\\d:\\d\\d" },
		date: { type: "integer", minimum: 1, maximum: 31 },
		month: { type: "integer", minimum: 1, maximum: 12 },
		year: { type: "integer", minimum: 2015, maximum: 2100 },
	},
	required: ["name", "room", "starttime", "endtime", "date", "month", "year"],
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
