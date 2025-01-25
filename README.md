# Additional Events

Veranstaltungen wie Tutorien oder Termine von Arbeitsgruppen können hier gelistet werden.

Aktuell wird dieses Repo nicht benutzt, da es seit einiger Zeit keine Aktivität gab.
Wenn du Bedarf hast, melde dich gerne, dann werden die Daten aus diesem Repo auch zu den auswählbaren Veranstaltungen hinzugefügt.

## Veranstaltungen oder Termine hinzufügen

Erstelle einen Pull Request oder frage [EdJoPaTo auf Telegram](https://t.me/EdJoPaTo) um Rat :)

### Format

```json
[
  {
    "name": "Example",
    "location": "online",
    "start": "2042-12-24T18:00:00",
    "end": "2042-12-24T19:00:00"
  }
]
```

Die Dateien enthalten ein einzelnes JSON Array, welches die Termine als Objekte enthält.
Ein Termin hat:

- `name` alle gleichen Namen werden zusammen gruppiert.
- `location` enthält den Ort der Veranstaltung.
- `start` und `end` sind die Start und Endzeit in ISO8601 ohne Zeitzone
