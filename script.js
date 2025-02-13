document.addEventListener("DOMContentLoaded", () => {
    // Obtém elementos do formulário e da página
    const mobForm = document.getElementById("mobForm");
    const mobListDiv = document.getElementById("mobListDiv");
    const deleteForm = document.getElementById("deleteForm");
    const mobList = document.getElementById("mobList");
    const img = document.getElementById("minhaImagem");
    const img2 = document.getElementById("minhaImagem2");

    // Adiciona eventos aos formulários e imagens
    if (mobForm) mobForm.addEventListener("submit", cadastrarMob);
    if (mobListDiv) listarMobsDiv();
    if (deleteForm) deleteForm.addEventListener("submit", excluirMob);
    if (mobList) listarMobs();
    if (img) configurarTrocaImagem(img, "img/enderman2.webp", "img/enderman.webp");
    if (img2) configurarTrocaImagem(img2, "img/creeper2.png", "img/creeper.png");
});

// Função para trocar imagem ao passar o mouse
function configurarTrocaImagem(elemento, srcEnter, srcLeave) {
    elemento.addEventListener("mouseenter", () => elemento.src = srcEnter);
    elemento.addEventListener("mouseleave", () => elemento.src = srcLeave);
}

// Funções para manipular armazenamento local
function obterMobs() {
    return JSON.parse(localStorage.getItem("mobs")) || [];
}

function salvarMobs(mobs) {
    localStorage.setItem("mobs", JSON.stringify(mobs));
}

// Função para cadastrar um novo mob
function cadastrarMob(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const classificacao = document.getElementById("classificacao").value;
    const valor = document.getElementById("valor").value.trim();
    let imagem = document.getElementById("imagem").value.trim() || "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/56/Spawn_Egg.png";

    if (!nome || !classificacao || !valor) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const mobs = obterMobs();
    mobs.push({ nome, classificacao, valor, imagem });
    salvarMobs(mobs);
    alert("Cadastrado com sucesso!");
    document.getElementById("mobForm").reset();
    listarMobsDiv();
}

// Função para listar os mobs no catálogo
function listarMobs() {
    const mobListDiv = document.getElementById("mobList");
    if (!mobListDiv) return;

    mobListDiv.innerHTML = "";
    const mobs = obterMobs();

    if (mobs.length === 0) {
        mobListDiv.innerHTML = "<h4>Nenhum mob cadastrado ainda.</h4>";
        return;
    }

    mobs.forEach((mob) => {
        const mobDiv = document.createElement("div");
        mobDiv.classList.add("mob-card");
        mobDiv.innerHTML = `
            <img src="${mob.imagem}" alt="${mob.nome}" class="mob-img">
            <h3>${mob.nome}</h3>
            <h3><strong>Tipo:</strong> <b style="color: red">${mob.classificacao}</b>
            <strong> Valor:</strong> <b style="color:green">${mob.valor}<img src="img/esmeralda.png" alt="esmeralda" width="10px"></b></h3>
        `;
        mobListDiv.appendChild(mobDiv);
    });
}

// Função para listar os mobs em formato de tabela
function listarMobsDiv() {
    const mobList = document.getElementById("mobListDiv");
    if (!mobList) return;

    mobList.innerHTML = "";
    const mobs = obterMobs();

    if (mobs.length === 0) {
        mobList.innerHTML = "<h4>Nenhum mob cadastrado ainda.</h4>";
        return;
    }

    const table = document.createElement("table");
    table.style.margin = "0 auto";
    table.style.borderCollapse = "collapse";

    table.innerHTML = `
        <thead>
            <tr>
                <th style="border: 1px solid white; padding: 8px; width: 25%">Imagem</th>
                <th style="border: 1px solid white; padding: 8px; width: 25%">Nome</th>
                <th style="border: 1px solid white; padding: 8px; width: 25%">Tipo</th>
                <th style="border: 1px solid white; padding: 8px; width: 25%">Valor</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");
    
    mobs.forEach((mob) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="border: 1px solid white; padding: 8px; text-align: center;" class="fundo";><img src="${mob.imagem}" alt="${mob.nome}" width="120px" height="120px"></td>
            <td style="border: 1px solid white; padding: 8px; text-align: center;" class="fundo";>${mob.nome}</td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; color: red;" class="fundo";><b>${mob.classificacao}</b></td>
            <td style="border: 1px solid white; padding: 8px; text-align: center; color: green;" class="fundo";><b>${mob.valor}</b> <img src="img/esmeralda.png" alt="esmeralda" width="10"></td>
        `;
        tbody.appendChild(row);
    });

    mobList.appendChild(table);
}

// Função para excluir um mob da lista
function excluirMob(event) {
    event.preventDefault();
    const nomeExcluir = document.getElementById("nomeExcluir").value.trim();
    let mobs = obterMobs();
    const novoMobs = mobs.filter(mob => mob.nome !== nomeExcluir);

    if (mobs.length === novoMobs.length) {
        alert("Item não encontrado!");
        return;
    }

    salvarMobs(novoMobs);
    alert("Item excluído com sucesso!");
    document.getElementById("deleteForm").reset();
    listarMobsDiv();
}
