/**
 * FALTA PROS REQUISITOS
 *
 * - modularizar essas funções aí numa functions.js fazendo injeção de depedencias de repente, ou algo assim
 *     - funções que se repetem: a de mostrar a tela do char, a de ver se tá no localStorage, ver se é light ou dark mode no localStorage, ...
 * - se tiver como usar alguma lib ou outra coisa pra traduzir as palavras em ingles que vem da API pra ptbr
 * - comentários dps?
 * - tem q fazer algo pra n poder clicar nos botões de avançar nas páginas enquanto a página toda não estiver montada, tlgd, enquanto cada li de char n tiver completinho, pq se n agt clica e desanda a contagem das páginas, pq elas carregam prmeiro, já q a chamada da api pros lis é assíncrona e o cálculo das páginas n
 * - apagar comentários ruins e consologs
 */

import React from "react";
import AppRoutes from "./routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
