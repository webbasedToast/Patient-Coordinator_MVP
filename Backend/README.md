# Patient Coordinator - Backend

Backend des Patient Coordinator MVP.
Stellt eine REST-API zur Verfügung um Patiententransporte zu verwalten.
Bietet ebenfalls eine simple json-basierte Lösung zum Datenspeichern an.

## Technologien

- Python (Mind. Version [3.12](https://www.python.org/downloads/release/python-31213/))
- FastAPI
- Uvicorn
- Pydantic
- Json

## Installation

1. In das Directory des Backends navigieren und eine virtuelle Umgebung erstellen
    ```bash
    cd Patient-Coordinator_MVP/backend
    python -m venv venv
    ```
2. Aktivieren der Virtuellen Umgebung:
\
\
   Unter Linux:
   ```bash
   source venv/bin/activate
   ```
   Unter Windows:
   ```bash
   venv/Scripts/activate
   ```
3. Abhängigkeiten installieren: 
    ```bash
    pip instsall -r requirements.txt
    ```

## Ausführen

Der API Server wird über die Commandline gestartet.
`--reload` aktiviert zusätzlich automatisches neu-laden der API (Dies sollte nur während der Entwicklung genutzt werden).
```bash
uvicorn main:app --reload
```

Die Adresse unter welcher die API-Endpunkte veröffentlicht werden, kann anschließend aus der Commandline abgelesen werden.\
Die Dokumentation der API kann unter den Endpunkten `/docs` oder `/redoc` eingesehen werden.

