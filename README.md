# Meu Site
> Site pessoal

# DEMO
[https://vagas-laravel.herokuapp.com/](https://vagas-laravel.herokuapp.com/)

# Tecnologias
 * PUG
 * GULP 4
 * GITHUB Pages

## TODO
 * Change jquery for js
 * Change css for sass
 * ADJUST HTML for HTML5
 * ADD Load circle bar skill

## Iniciando projeto
```
git clone git@github.com:walternascimentobarroso/walternascimentobarroso.github.io.git .
npm install
gulp
```

> Se prefirir pode usar docker
```
docker-compose up -d
http://127.0.0.1
```

### Página inicial
https://vagas-laravel.herokuapp.com/

### Página para testar api 
https://vagas-laravel.herokuapp.com/api/vacancies

## Testes
> Digite o comando na raiz do projeto
```
./vendor/bin/phpunit
```

## Documentação para API
__É necessário ter o apidoc instalado antes `npm i -g apidoc`__
```
cd doc/apidoc
apidoc -i ../../routes/ -o ../../public/apidoc/
```
https://vagas-laravel.herokuapp.com/apidoc/

## Captura de tela - Página Inicial
<img src="screenshot.png">

## Captura de tela - Documentação API
<img src="screenshot-api.png">