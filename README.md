# Terraform GUI

[![LABELER [CI]](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/labeler.ci.yml/badge.svg)](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/labeler.ci.yml)
[![ WEB [CI]](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.ci.yml/badge.svg)](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.ci.yml)
[![ WEB [CD]](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.cd.yml/badge.svg)](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.cd.yml)
[![API [CD]](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/api.cd.yml/badge.svg)](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/api.cd.yml)

[![](https://img.shields.io/github/v/release/Terraform-GUI/terraform-gui?display_name=tag)](https://github.com/Terraform-GUI/terraform-gui/releases)
[![](https://img.shields.io/github/issues/Terraform-GUI/terraform-gui)](https://github.com/Terraform-GUI/terraform-gui/issues)
[![](https://img.shields.io/github/issues-pr/Terraform-GUI/terraform-gui)](https://github.com/Terraform-GUI/terraform-gui/pulls)
[![](https://img.shields.io/github/license/Terraform-GUI/terraform-gui)](https://github.com/Terraform-GUI/terraform-gui/blob/main/LICENSE)

## I - Introduction

**Terraform GUI** is a web application that allows **developers** and **DevOps** begginers to learn about [Terraform](https://www.terraform.io/), an open-source, *Infrastructure as Code*, software tool created by [HashiCorp](https://www.hashicorp.com/).

The main goal of this is tool is to **make Terraform understandable** for everyone, with a **different approach** from the original HCL file structure.

This tool provides:

- *Graphical User Interface* with **cell representation of web ressources of providers**
- **Ressources forms** for templating *HCL* files
- **Terraform HCL file generation** for *provider, ressources, variables, outputs [...] used for deployment*
- **ZIP downloaded solution** for planning and applying Terraform files

## II - Table of content

- [Terraform GUI](#terraform-gui)
  - [I - Introduction](#i---introduction)
  - [II - Table of content](#ii---table-of-content)
  - [III - Folder structure](#iii---folder-structure)
  - [IV - Project setup](#iv---project-setup)
    - [A - Stack](#a---stack)
    - [B - Makefile](#b---makefile)
  - [V - CI/CD, release and container registry](#v---cicd-release-and-container-registry)
    - [A - CI](#a---ci)
    - [B - CD](#b---cd)
  - [VI - License](#vi---license)

## III - Folder structure

The structure of this project follows [these conventions](https://github.com/golang-standards/project-layout).

- `/.github`: Conventions, template, labels, ci, cd, settings
- `/api`: Symfony API files
- `/build`: Dockerfiles
- `/deploy`: Deployment-related Terraform files
- `/docs`: Swagger documentation
- `/samples`: Terraform samples for usecase
- `/web`: ReactJS web files

## IV - Project setup

The project use **Docker** and **Docker Compose** to build and run local and distant images in our workspace.

### A - Stack

All the images use the **same network**, more informations at [docker-compose.yml](docker-compose.yml)

| CONTAINER   | PORT          | IMAGE                                                                            |
| :---------- | :------------ | :------------------------------------------------------------------------------- |
| REACTJS     | `3000:3000`   | [build/package/web/Dockerfile.dev](build/package/web/Dockerfile.dev)             |
| SYMFONY     | `8080:80`     | [build/package/api/Dockerfile.dev](build/package/api/Dockerfile.dev)             |
| MONGODB     | `27017:27017` | [mongo:latest](https://hub.docker.com/_/mongo)                                   |
| MAILCATCHER | `1080:1080`   | [schickling/mailcatcher:latest](https://hub.docker.com/r/schickling/mailcatcher) |

### B - Makefile

#### TL;DR <!-- omit in toc -->

```bash
make setup-env start logs
```

#### `make help` <!-- omit in toc -->

**Display** informations about other commands.

#### `make init` <!-- omit in toc -->

**Setup** the API, **start** containers & **output** logs in terminal.

#### `make start` <!-- omit in toc -->

Up the containers with **full cache reset** to avoid cache errors.

#### `make stop` <!-- omit in toc -->

**Down** the containers.

#### `make logs` <!-- omit in toc -->

**Display and follow** the logs.

#### `make api-*` <!-- omit in toc -->

**API**-related commands

## V - CI/CD, release and container registry

### A - CI

[![ WEB [CI]](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.ci.yml/badge.svg)](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.ci.yml)

The **CI** workflow is located at [.github/workflows/web.ci.yml](.github/workflows/web.ci.yml). It's triggered at **each push in /web folder** on **all branches**.

It consist of:

- **install Node** on the VM
- get the dependancies **using the cache of other Actions run**
- **install deps**
- **build** the application

### B - CD

[![ WEB [CD]](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.cd.yml/badge.svg)](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/web.cd.yml)
[![API [CD]](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/api.cd.yml/badge.svg)](https://github.com/Terraform-GUI/terraform-gui/actions/workflows/api.cd.yml)

The **CD** workflow is triggered a **each push** on **`main` branches** (`main/dev/ops`).

It consist of:

- **login** into the GitHub container registry (ghcr.io)
- **build and push** the Docker images using the **production Dockerfile**
After that, you can check the **pushed container** here: https://github.com/orgs/Terraform-GUI/packages?repo_name=terraform-gui


## VI - License

Under [MIT](./LICENSE) license.
