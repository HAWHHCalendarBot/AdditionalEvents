# Additional Events

[![Build Status](https://travis-ci.com/HAWHHCalendarBot/AdditionalEvents.svg?branch=master)](https://travis-ci.com/HAWHHCalendarBot/AdditionalEvents)

Veranstaltungen wie Tutorien oder Termine von Arbeitsgruppen können hier gelistet werden.
Diese werden durch den [Downloader](https://github.com/HAWHHCalendarBot/downloader) eingelesen und sind dann im [Telegram Bot](https://telegram.me/HAWHHCalendarBot), wie andere Veranstaltungen auch, verfügbar.

## Veranstaltungen oder Termine hinzufügen

Erstelle einfach einen Pull Request oder frage [EdJoPaTo auf Telegram](https://t.me/EdJoPaTo) um Rat :)

### Format

```json
[
  {
    "name": "TeSSA",
    "room": "1101c",
    "date": 4,
    "month": 12,
    "year": 2018,
    "starttime": "16:00",
    "endtime": "17:30"
  }
]
```

Die Dateien enthalten ein einzelnes JSON Array, welches die Termine als Objekte enthält.
Ein Termin hat:
- `name` alle gleichen Namen werden zusammen gruppiert.
- `room` enthält den Ort der Veranstaltung.
- `year`, `month`, `date` sind jeweils Zahlen, 1-31, 1-12, 2042
- `starttime` und `endtime` sind am angegeben Tag
