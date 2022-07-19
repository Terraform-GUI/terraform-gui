# Terraform GUI Backend

## Instalation

```
make install
```

> This command will install docker containers + install composer deps

## Start

```
make start
```

> App should now be available on : [http://localhost:8082](http://localhost:8082/)

## Database

- Type : Mongo DB
- Username : `root`
- Password : `root`
- host : `localhost`
- Port : `27017`

## Usefull commands

```
make fix
```

> This command will lint all your php code, usefull before commiting

## Git Commit Convention

| Symbol                                                    | When to use :                                         |
| --------------------------------------------------------- | ----------------------------------------------------- |
| :sparkles: `:sparkles:`                                   | Small feature or improvement                          |
| :fire: `:fire:`                                           | Big feature                                           |
| :tada: `:tada:`                                           | Initialization of files or creating something         |
| :pencil2: `:pencil2:`                                     | Updating wording, content, comments, translations,... |
| :package: `:package:`                                     | Adding package in composer.json or package.json       |
| :arrow_up: `:arrow_up:`                                   | Upgrading dependancies                                |
| :art: `:art:`                                             | CSS related                                           |
| :bug: `:bug:`                                             | Fixing bug                                            |
| :construction: `:construction:`                           | Something unfinished - WIP                            |
| :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` | Merging branches                                      |
| :wastebasket: `:wastebasket:`                             | Deleting files or renoming files/folders,...          |
