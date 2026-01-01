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

CREATION BRANCHES :
dev1
dev2

menjato@mnKodem ProjetBackendGestionQuotes % git branch

* main

4️⃣ Fusionner main dans dev1 (pour synchroniser)

C’est la façon recommandée pour intégrer les dernières modifications de main dans ta branche dev1 :

git checkout dev1
git merge main

menjato@mnKodem ProjetBackendGestionQuotes % git fetch 
origin
From https://github.com/GrainEspoir91/ProjetBackendGestionQuotes
 * [new branch]      dev1       -> origin/dev1
 * [new branch]      dev2       -> origin/dev2

 2️⃣ Créer une branche locale qui suit la branche distante
git checkout -b dev1 origin/dev1

Explication :

-b dev1 → crée la branche locale dev1

origin/dev1 → la branche distante à suivre

Après ça, tu seras sur dev1 local, et elle suivra automatiquement origin/dev1

4️⃣ Synchroniser avec main si nécessaire

Ensuite, pour mettre dev1 à jour avec main :

git checkout main
git pull origin main        # mettre main à jour
git checkout dev1
git merge main              # ou git rebase main

menjato@mnKodem ProjetBackendGestionQuotes % git merge 
main
Updating da5f148..5419cb0
Fast-forward
 README.md                 |  4 ++
 backend/routes/authors.js | 49 +++++++++++----
 backend/routes/domains.js | 49 +++++++++++----
 backend/routes/quotes.js  | 57 +++++++++++-------
 frontend/dashboard.html   |  2 +-
 frontend/script.js        | 69 ++++++++++++++++++----
 frontend/style.css        | 53 ++++++++++++-----
 7 files changed, 209 insertions(+), 74 deletions(-)

6️⃣ Pousser la branche dev1 mise à jour sur GitHub
git push origin dev1