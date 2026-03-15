# Patient-Coordinator\_MVP

Minimal Viable Product (MVP) zur Koordination und Verwaltung von Patiententransporten.

Der Aufbau des Projektes besteht aus zwei voneinander getrennten Komponenten:

- **Frontend** - Weboberfläche zur Verwaltung und Anzeige von Transportaufträgen
- **Backend** - REST-API zum Speichern und Verarbeiten der Transport- und Nutzerdaten

## Installation

Die Installation der Komponenten erfolgt unabhängig von einander.

### Backend

- [Anleitung](Backend/README.md) zur Installation und zum Start der API.

Backendseitig wurde sich unter anderem aus Zeitgründen dafür entschieden, nur eine datei-basierte Speicherung zu implementieren.
Im Datenmodell werden User und die Transportaufträge jeweils als Datenklassen repräsentiert, Parameter wie Nutzenden-Rollen oder die Transportstati sind über Enum definiert.
Jedes Datum wird Einzigartig über eine UUID dargestellt.
Für die einzelnen Nutzenden wird die Login-Logik nur über deren Nutzernamen abgewickelt - Eine passwortbasierte Authentifizierung ist bei Nutzung einer "richtigen" Datenbank jedoch durchaus möglich und angebracht.


### Frontend

- [Anleitung](frontend/README.mde) zur Installation und zum Start der Weboberfläche.

Das Frontend ist als eine React-basierte SPA aufgebaut.
Als grundlegende Komponenten für die einzelnen Seiten dienen primär Dialoge oder Tabellen.
Ansichten für die Anzeige der Transportaufträge oder der Nutzenden sind dabei in Tabellenform umgesetzt, während das Anlegen von neuen Transportaufträgen, Nutzenden oder der Login in Dialogform dargestellt werden.

Durch die Rolle des eingeloggten Nutzenden werden die verfügbaren Sichten unterschieden:
- Die Admin Rolle sieht alle angelegten Transportaufträge, kann Nutzende hinzufügen und Löschen wie auch neue Transportaufträge anlegen und zuweisen.
- Die Nutzenden Rolle sieht nur die dem jeweiligen Nutzenden zugewiesenen Transportaufträge.
