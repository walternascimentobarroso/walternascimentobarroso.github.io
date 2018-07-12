#!/bin/bash
set -e # termina o script com um código diferente de 0 se alguma coisa falhar

# instal all dependency
npm install

# gerando arquivos para deploy
gulp deploy

# entre na pasta onde está o build do seu projeto e inicie um novo repositório git
cd dist
git init

# dentro desse repositório nós pretendemos ser um novo usuário
git config user.name "Travis CI"
git config user.email "walter.nascimento.barroso@gmail.com"

# O primeiro e único commit do seu repositório terá
# todos os arquivos presentes e a mensagem do commit será "Deploy to GitHub Pages"
git add .
git commit -m "Deploy to GitHub Pages"

# Forçando o push (Toda história anterior da branch master
# será perdido, pois vamos substituí-lo.)  Redirecionamos qualquer saída para
# /dev/null para ocultar quaisquer dados de credenciais sensíveis que de outra forma possam ser expostos.
# tokens GH_TOKEN e GH_REF serão fornecidos como variáveis de ambiente Travis CI
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" > /dev/null 2>&1

# exit the script
exit 0