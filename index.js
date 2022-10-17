const listaTarefas = document.querySelector('#listaTarefas');
const caixaTexto = document.querySelector('#caixaTexto');
const botaoAdicionar = document.querySelector('#botaoAdicionar');
const listaSuspensa = document.querySelector('#listaSuspensa')

// listner = adiciona um item na lista \\
botaoAdicionar.addEventListener('click', function(){
    let textoTarefa = caixaTexto.value;
    caixaTexto.value = '';

    listaTarefas.appendChild(adicionaTarefa(textoTarefa));
    //appendChild cria um novo 'apendice', um novo 'filho', no nó do DOM

    exibeOcultaListaSuspensa();
    caixaTexto.focus();
})

function adicionaTarefa(textoTarefa) {
    let elementoLI = document.createElement('li');
    let elementoSPAN = document.createElement('span');

    elementoSPAN.setAttribute('id','tarefa');
    elementoSPAN.textContent = textoTarefa;

    //elementoLI.className ='naoRealizada' ou
    elementoLI.setAttribute('class','naoRealizada')
    elementoLI.appendChild(elementoSPAN);
    elementoLI.appendChild(adicionaBotaoRemover());

    // listner = altera a tarefa de realizada para não realizada \\
    elementoSPAN.addEventListener('click', function() {
        if (this.id === 'tarefa') {
            if (this.parentNode.className === 'naoRealizada') {
                this.parentNode.className = 'realizada'
            } else {
                this.parentNode.className = 'naoRealizada'
            }
        }
    })

    return elementoLI;
}

function adicionaBotaoRemover() {
    let botaoRemover = document.createElement('button');
    botaoRemover.textContent = '✘';
    botaoRemover.className = 'remover';

    // listner = remove o elemento filho ao clicar no botão \\
    botaoRemover.addEventListener('click', function() {
        listaTarefas.removeChild(this.parentNode) //parent node = pai do elemento
        exibeOcultaListaSuspensa()
    })

    return botaoRemover;
}

function exibeOcultaListaSuspensa() {
    let elementoSPAN = document.querySelector('#tarefa');
    if (elementoSPAN === null) {
        listaSuspensa.setAttribute('hidden','hidden');
    } else {
        listaSuspensa.removeAttribute('hidden');
    }
}

listaSuspensa.addEventListener('change', function() {
    if (listaSuspensa.selectedIndex === 1 || listaSuspensa.selectedIndex === 2) {
        let vetorTarefas = document.querySelectorAll('#tarefa');
        for(tarefa of vetorTarefas) {
            tarefa.dispatchEvent(new Event('click'));
        }
    } else if (listaSuspensa.selectedIndex === 3) {
            let vetorBotoes = listaTarefas.querySelectorAll('.remover');
            for(botao of vetorBotoes) {
                botao.dispatchEvent(new Event('click'));
            }
        }
    }
)



//precisa corrigir a seleção de todos os itens