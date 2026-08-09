import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ventInput = document.getElementById("ventInput");
const sendBtn = document.getElementById("sendBtn");

const TEMPO_ESPERA = 10 * 1000;

function tempoRestante() {
  const ultimoEnvio = Number(localStorage.getItem("ultimoEnvio") || 0);
  const passado = Date.now() - ultimoEnvio;
  return Math.max(0, TEMPO_ESPERA - passado);
}

sendBtn.addEventListener("click", async () => {
  const texto = ventInput.value.trim();

  if (texto === "") {
    alert("Type something before sending...");
    return;
  }

  const restante = tempoRestante();
  if (restante > 0) {
    alert(`Cannot send! Wait more ${Math.ceil(restante / 1000)} seconds before sending.`);
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "SENDING...";

  try {
    // addDoc cria um novo documento dentro da coleção "desabafos"
    // serverTimestamp() pede pro próprio Firebase registrar a hora exata do envio
    await addDoc(collection(db, "desabafos"), {
      texto: texto,
      criadoEm: serverTimestamp()
    });

    localStorage.setItem("ultimoEnvio", Date.now().toString());

    ventInput.value = "";
    sendBtn.textContent = "SENT!";

    setTimeout(() => {
      sendBtn.textContent = "SEND";
      sendBtn.disabled = false;
    }, 1500);

  } catch (erro) {
    console.error("Error while sending:", erro);
    alert("Something went wrong while sending. Try again later.");
    sendBtn.textContent = "SEND";
    sendBtn.disabled = false;
  }
});
