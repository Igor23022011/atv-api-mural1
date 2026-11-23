const botao = document.querySelector("#btn-carregar");

botao.addEventListener("click", () => {
  console.log("Cliquei!");
});

const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";
let publicacoes = [];

function carregarPublicacoes() {
  fetch(API_URL)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then((dados) => {
      console.log(dados);
      publicacoes = dados;
    });

    renderizarPublicacoes(publicacoes);
}

botao.addEventListener("click", carregarPublicacoes);

const painel = document.querySelector("#lista-posts");

function renderizarPublicacoes(lista) {
  painel.replaceChildren();

  lista.forEach((publicacao) => {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao");

    const id = document.createElement("small");
    id.textContent = `Publicação #${publicacao.id}`;

    const titulo = document.createElement("h2");
    titulo.textContent = publicacao.title;

    const texto = document.createElement("p");
    texto.textContent = publicacao.body;

    cartao.append(id, titulo, texto);
    painel.append(cartao);
  });
}

const filtro = document.querySelector("#filtro");

filtro.addEventListener("input", () => {
  const termo = filtro.value.trim().toLowerCase();

  const encontradas = publicacoes.filter((item) =>
    item.title.toLowerCase().includes(termo)
  );

  renderizarPublicacoes(encontradas);

  if (encontradas.length === 0) {
    mensagem.textContent = "Nenhuma publicação encontrada.";
  } else {
    mensagem.textContent = "";
  }
});

function carregarPublicacoes() {
  mensagem.textContent = "Carregando publicações...";
  mensagem.className = "carregando";
  botao.disabled = true;

  fetch(API_URL)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then((dados) => {
      publicacoes = dados;
      filtro.value = "";
      mensagem.textContent = "";
      mensagem.className = "";
      renderizarPublicacoes(publicacoes);
    })
    .catch((erro) => {
      console.error(erro);
      mensagem.textContent = "Não foi possível carregar as publicações. Tente novamente.";
      mensagem.className = "erro";
      painel.replaceChildren();
    })
    .finally(() => {
      botao.disabled = false;
    });
}