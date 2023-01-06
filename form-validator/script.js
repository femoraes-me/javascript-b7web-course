let validador = {
    //bloqueando evento submit
    handleSubmit:(event)=>{
        event.preventDefault();

        let send = true; // variavel de controle para envio do formulário

        //trabalhando os inputs
        let inputs = form.querySelectorAll('input');

        //limpar erros antigos do browser
        validador.clearErros();

        for(let i = 0; i < inputs.length; i++) {
            // armazenando cada input
            let input = inputs[i];
            
            //fazendo o check em cada input do form
            let check = validador.checkInput(input);
            if(check !== true) {
                send = false;
                validador.showError(input, check);
            }
            
        }
        
        //se envio estiver ok - enviar formulário
        if(send) {
            form.submit();
        }
    },
    
    // função de verificação do input
    checkInput:(input) => {
        //coletando as regras dos inputs
        let rules = input.getAttribute('data-rules');
        
        // se houver regras no input
        if(rules !== null) {            
            rules = rules.split('|'); //separando as regras
            for(let k in rules) {
                let rulesDetails = rules[k].split('=');

                //analisando cada regra personalizada após o split
                switch(rulesDetails[0]) {
                    // campo obrigatorio
                    case 'required':
                        if(input.value == '') {
                            return `*Campo não pode ser vazio!`
                        }
                    break;
                    case 'min':
                        if(input.value.length < rulesDetails[1]) {
                            return `*Campo deve ter pelo menos ${rulesDetails[1]} caracteres`;
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(regex.test(input.value.toLowerCase())) {
                                return 'Digite um email válido!';
                            }

                        }
                    break;
                }
            }
        }

        return true;
    },

    // função para exibir as mensagens de erro
    showError:(input, error) => {
        // mudando cor da borda do campo com erro
        input.style.borderColor = '#FFA500';

        // criando div para exibir no html
        let errorElement = document.createElement('div');
        errorElement.classList.add('error'); //adicionando classe para estilizar erro
        errorElement.innerHTML = error; //colocando mensagem de erro no elemento

        // inserindo input em posição correta na página
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    // função para limpar erros antigos na tela do navegador
    clearErros:() => {
        // removendo estilização da borda
        let inputs = form.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }
        // removendo classe error
        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
}

let form = document.querySelector('#formulario');
form.addEventListener('submit', validador.handleSubmit);
