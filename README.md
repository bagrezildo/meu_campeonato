# meu_campeonato
simulador de campeonatos de futebol

## Requisitos
PHP
Composer
Angular
Python 3

## Executando o projeto

Para executar esse projeto você deve primeiro em seu terminal, clonar o repositório e entrar na pasta.
```
gitclone https://github.com/bagrezildo/meu_campeonato.git meu_campeonato

cd meu_campeonato
``````

Vamos então instalar as dependencias do laravel e configurar o ambiente.

Você deve estar com o servidor php e do banco de dados relacional funcionando. O banco de dados deve se chamar meu_campeonato.

Execute os seguintes comandos no terminal dentro da pasta meu_campeonato, para instalar as dependencias:
```
cd backend
composer install
composer require laravel/jetstream
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```
cd backend
composer installer
composer require laravel/jetstream
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

Copie o arquivo .env.example e ajuste as configurações de banco de dados:
```
cp .env.example .env
```

Com o banco de dados configurado, execute as migrações, as inserções e incie o servidor:
```
php artisan migrate:refresh
php artisan db:seed --class=DatabaseSeeder

php artisan serve
```

Agora, em uma nova instância do terminal, vamos instalar as dependencias do Angular e iniciar o servidor:

```
npm install
ng serve
```

Pronto! Basta acessar http://localhost:4200/ no seu navegador para abrir o projeto.
