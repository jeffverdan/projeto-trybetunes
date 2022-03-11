# Acesso ao site
https://jeffverdan.github.io/Trybe-Projetos-Trybewarts/

# Habilidades
Neste projeto, fui capaz de:

  * Fazer requisições e consumir dados vindos de uma `API`.

  * Utilizar os ciclos de vida de um componente React.

  * Utilizar a função `setState` de forma a garantir que um determinado código só é executado após o estado ser atualizado.
  
  * Utilizar o componente `BrowserRouter` corretamente.

  * Criar rotas, mapeando o caminho da URL com o componente correspondente, via `Route`.

  * Utilizar o `Switch` do `React Router`.

  * Usar o componente `Redirect` pra redirecionar para uma rota específica.

  * Criar links de navegação na aplicação com o componente `Link`.

## O que foi desenvolvido

O projeto TrybeTunes, é uma aplicação capaz de reproduzir músicas das mais variadas bandas e artistas, criar uma lista de músicas favoritas e editar o perfil da pessoa usuária logada. Essa aplicação será capaz de:

  - Fazer login;
  - Pesquisar por uma banda ou artista;
  - Listar os álbuns disponíveis dessa banda ou artista;
  - Visualizar as músicas de um álbum selecionado;
  - Reproduzir uma prévia das músicas deste álbum;
  - Favoritar e desfavoritar músicas;
  - Ver a lista de músicas favoritas;
  - Ver o perfil da pessoa logada;
  - Editar o perfil da pessoa logada;

### Prints do projeto
Tela de Login:<br>
<img src="https://github.com/jeffverdan/projeto-trybetunes/blob/main/public/images/Tela%20de%20Login.png" width="600"/>

Tela de Pesquisa:<br>
<img src="https://github.com/jeffverdan/projeto-trybetunes/blob/main/public/images/Tela%20de%20Search.png" width="600"/>

## Instruções para executar o projeto

1. Clone o repositório
  * `git clone git@github.com:jeffverdan/projeto-trybetunes.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-017-project-trybetunes`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador com um texto simples)

# Documentação

Projeto contém um template fornecido pela Trybe com um App React criado. Após clonar o projeto e instalar as dependências, fui capaz de completar este template implementando os requisitos listados na sessão Habilidades.

Também já existia no projeto um diretório `src/services`, que contém os arquivos `favoriteSongsAPI.js`, `searchAlbumsAPI.js`, `userAPI.js` e `musicsAPI.js`. Esses arquivos são responsáveis por lidar com as requisições simuladas.
## `userAPI.js`

O arquivo `userAPI.js` é utilizado para manipular as informações da pessoa logada, dentro dele estão as funções para recuperar e atualizar as informações da pessoa usuária, além de criar um novo perfil. Todas essas funções simulam o funcionamento de uma API.

## `searchAlbumsAPI.js`

O arquivo `searchAlbumsAPI.js` contém uma função que faz uma requisição à uma API e retorna os álbuns de uma banda ou artista. Para essa função funcionar, ela recebe como parâmetro uma string, que deve ser o nome da banda ou artista. O retorno dessa função, quando encontra as informações, é um array com cada álbum dentro de um objeto.

## `favoriteSongsAPI.js`

O arquivo `favoriteSongsAPI.js` é responsável por manipular as informações das músicas favoritas. Nele há as funções `getFavoriteSongs`, `addSong` e `removeSong`, que recuperam, adicionam e removem músicas dos favoritos, respectivamente. Assim como nos arquivos anteriores, todas as funções simulam o funcionamento de uma API.

## `musicsAPI.js`

O arquivo `musicsAPI.js` contém uma função que faz uma requisição à uma API e retorna os as músicas de um álbum, ela recebe como parâmetro uma string, que deve ser o id do álbum. O retorno dessa função, quando encontra as informações, é um array onde o primeiro elemento é um objeto com informações do álbum e o restante dos elementos são as músicas do álbum.
