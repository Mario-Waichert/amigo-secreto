let amigos = [];

function adicionar() {
    let amigo = document.getElementById('nome-amigo');

    //Não permitir que adicione valores vazios na lista de amigos.
    if (amigo.value == ''){
        alert('Informe o nome do amigo!');
        return;
    }
    //Não permitir que adicione o mesmo nome mesmo se estiver algum caractere maiusculo
    let nomeDigitado = amigo.value.toLowerCase();
    if (amigos.some(nomeExistente => nomeExistente.toLowerCase() === nomeDigitado)) {
         alert('Nome já existente!');
        return;
    }

    let lista = document.getElementById('lista-amigos');
    amigos.push(amigo.value);
    if (lista.textContent == ''){
        lista.textContent = amigo.value;
    } else {
        lista.textContent = lista.textContent + ', ' + amigo.value;
    }
    amigo.value = '';

    atualizarLista();
    atualizarSorteio();
}

function sortear() {
    //Ter o mínimo de amigos para o sorteio fazer sentido.
    if (amigos.length < 4) {
        alert('Adicione pelo menos 4 amigos!');
        return;
        
    }

    embaralha(amigos);
    let sorteio = document.getElementById('lista-sorteio');
   
    for (let i = 0; i < amigos.length; i++) {

        if(i == amigos.length - 1){
            sorteio.innerHTML = sorteio.innerHTML +  amigos[i] + ' --> ' + amigos[0] + '<br>';
        } else {
           sorteio.innerHTML = sorteio.innerHTML +  amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        }
        
    }
}

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function embaralha(lista) {

    let indice = lista.length
    
    while(indice) {
        // atenção para o pós-incremento indice-- 
        const indiceAleatorio = Math.floor(Math.random() * indice--);
        [lista[indice], lista[indiceAleatorio]] = 
            [lista[indiceAleatorio], lista[indice]];
    }
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}


function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';


    for (let i = 0; i < amigos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigos[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });


        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}

function reiniciar () {
    amigos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';

}