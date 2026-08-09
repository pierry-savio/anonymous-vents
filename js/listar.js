import { db } from "./firebase-config.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");

let todosDesabafos = [];

function formatarData(timestamp) {
  if (!timestamp) return "sending...";
  const data = timestamp.toDate();
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const min = String(data.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} - ${hora}:${min}`;
}

function renderPosts(lista) {
  postsContainer.innerHTML = "";

  if (lista.length === 0) {
    postsContainer.innerHTML = "<p style='color: rgb(173,173,173)'>No vents sent yet :(</p>";
    return;
  }

  lista.forEach((dados) => {
    const post = document.createElement("div");
    post.classList.add("post");

    const header = document.createElement("div");
    header.classList.add("post-header");
    const dataP = document.createElement("p");
    dataP.textContent = formatarData(dados.criadoEm);
    header.appendChild(dataP);

    const contentP = document.createElement("p");
    contentP.classList.add("post-content");
    contentP.textContent = dados.texto;

    post.appendChild(header);
    post.appendChild(contentP);
    postsContainer.appendChild(post);
  });
}

function aplicarFiltro() {
  const termo = searchInput.value.trim().toLowerCase();

  if (termo === "") {
    renderPosts(todosDesabafos);
    return;
  }

  const filtrados = todosDesabafos.filter((dados) =>
    dados.texto.toLowerCase().includes(termo)
  );
  renderPosts(filtrados);
}

searchInput.addEventListener("input", aplicarFiltro);

const q = query(collection(db, "desabafos"), orderBy("criadoEm", "desc"));

onSnapshot(q, (snapshot) => {
  todosDesabafos = snapshot.docs.map((doc) => doc.data());
  aplicarFiltro();
});
