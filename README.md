# ProjetBackendGestionQuotes
Gestion des Citations Backend

citation-app/
│ .env
│ package.json
│ server.js
│ db.js
│ authMiddleware.js
│
├── routes/
│   ├── auth.js
│   ├── auteurs.js
│   ├── domaines.js
│   └── citations.js

COMMANDES :

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

npm init -y
npm install express pg bcrypt jsonwebtoken cors dotenv

Crée un fichier .env

Lancer la création de la structure :
psql -h localhost -p 5432 -U menjato -d postgres -f base/init_Structure_Base_QuotesDB.sql

pour se connecter :
psql -U menjato -d quotesdb

utiliser user_api et web_anon comme user et roles :

db-uri = "postgres://user_api:testapi!@localhost:5432/quotesdb"
db-schema = "public"
db-anon-role = "web_anon"


créer le fichier server.js et les autres

lancer le projet :

node server.js

TEST :

curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'

curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'

menjato@mnKodem ProjetBackendGestionQuotes % curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzI4NDE4MCwiZXhwIjoxNzY3MjkxMzgwfQ.kdV4DxCkVkV2czIPkjPZRYZDDL_wSYS5OW55uJWZWZc"}%                                                                        

TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}' \
  | jq -r '.token')


curl -X POST http://localhost:4000/domains \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domain":"Philosophie"}'

Pour vérifier :
curl -X GET http://localhost:4000/authors \
  -H "Authorization: Bearer $TOKEN"

  curl -X POST http://localhost:4000/authors \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Descartes","bio":"Philosophe français"}'


  curl -X POST http://localhost:4000/quotes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "quote":"Je pense donc je suis",
        "reference":"Discours de la méthode",
        "author_id":1,
        "domain_id":1
      }'

curl -X GET http://localhost:4000/quotes \
  -H "Authorization: Bearer $TOKEN"

FRONTEND

ProjetBackendGestionQuotes/
│ backend/
│   server.js
│   routes/
│   db.js
│   ...
│ frontend/
│   index.html
│   dashboard.html
│   style.css
│   script.js


✅ Instructions pour lancer

Lance le backend Node.js (node server.js) sur http://localhost:4000

Ouvre frontend/index.html dans ton navigateur

Connecte-toi avec admin / 123456

Tu verras le dashboard avec domaines, auteurs et citations

ou bien install :
npm install -g http-server
et lancer dans le dossier frontend
http-server -c-1

ou utiliser python3

cd frontend
python3 -m http.server 8000

Ouvre http://localhost:8000 dans ton navigateur

PB COMMIT

error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400
send-pack: unexpected disconnect while reading sideband packet
➡️ Cela arrive souvent si :

La taille des fichiers est trop grande pour un push via HTTPS

L’URL du remote est mal configurée (HTTPS vs SSH)
Option B : augmenter le buffer Git (utile pour gros fichiers)
git config --global http.postBuffer 524288000


(ça met le buffer à 500MB, normalement suffisant)
