# Conversor de Texto em áudio

Este código utiliza a funcionalidade de Text to Speech (TTS) do JavaScript para transformar o texto inserido em um elemento `textarea` em fala. O usuário pode escolher uma voz entre as disponíveis em um `select` preenchido automaticamente com a lista de vozes disponíveis no dispositivo. 

## Como utilizar

1. Insira o texto que deseja ouvir no `textarea`
2. Escolha a voz desejada no `select` de vozes
3. Clique no botão para ouvir o texto

## Como funciona

O código cria um evento que é acionado quando as vozes disponíveis são carregadas. Ele preenche um `select` com as opções de voz e, quando o usuário escolhe uma voz, a variável `selectedVoice` é atualizada.

O botão é adicionado um evento de clique que verifica se o `textarea` não está vazio. Se o `textarea` contiver algum texto, o código cria um novo objeto `SpeechSynthesisUtterance`, adiciona a voz selecionada e inicia a fala com o método `speak()`.

O código também possui uma função `updateStatus()` que verifica se o TTS ainda está falando e desabilita o `select` e o botão enquanto a fala não for concluída.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
