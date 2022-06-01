import { assert } from "https://deno.land/std@0.141.0/testing/asserts.ts";

const DIR = "./events";

interface EventEntry {
  readonly name: string;
  readonly room: string;
  readonly starttime: string;
  readonly endtime: string;
  readonly date: number;
  readonly month: number;
  readonly year: number;
}

for (const filename of Deno.readDirSync(DIR)) {
  Deno.test({
    name: filename.name,
    fn() {
      const content = JSON.parse(
        Deno.readTextFileSync(`${DIR}/${filename.name}`),
      ) as EventEntry[];
      // console.log(content)
      for (const event of content) {
        checkEvent(event);
      }
    },
  });
}

function checkEvent(event: EventEntry): void {
  assert(event.name);
  assert(typeof event.room === "string");
  assert(event.starttime);
  assert(event.endtime);

  assert(Number.isFinite(event.date) && event.date >= 1 && event.date <= 31);
  assert(Number.isFinite(event.month) && event.month >= 1 && event.month <= 12);
  assert(
    Number.isFinite(event.year) && event.year >= 2015 && event.year <= 2100,
  );
}
