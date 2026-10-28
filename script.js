let saldo = 1000;
let historico = ["Abertura da conta: R$ 1000"];

document.getElementById("executar").addEventListener("click", function () {
    let operacao = document.getElementById("operacao").value;
    let campoValor = document.getElementById("valor").value;
    let valor = Number(campoValor);
    let mensagem = "";

    switch (operacao) {
        case "consultar":
            mensagem = "Seu saldo é R$ " + saldo;
            break;

        case "depositar":
            if (campoValor == "") {
                mensagem = "Erro: informe um valor.";
            } else if (valor <= 0 || valor % 1 != 0) {
                mensagem = "Erro: digite um número inteiro maior que zero.";
            } else {
                saldo = saldo + valor;
                historico.push("Depósito: +R$ " + valor);
                mensagem = "Depósito realizado! Novo saldo: R$ " + saldo;
            }
            break;

        case "sacar":
            if (campoValor == "") {
                mensagem = "Erro: informe um valor.";
            } else if (valor <= 0 || valor % 1 != 0) {
                mensagem = "Erro: digite um número inteiro maior que zero.";
            } else if (valor % 10 != 0) {
                mensagem = "Erro: o saque deve ser múltiplo de 10.";
            } else if (valor > saldo) {
                mensagem = "Erro: saldo insuficiente.";
            } else {
                saldo = saldo - valor;

                let restante = valor;
                let notas100 = 0;
                let notas50 = 0;
                let notas20 = 0;
                let notas10 = 0;

                while (restante >= 100) {
                    notas100 = notas100 + 1;
                    restante = restante - 100;
                }

                while (restante >= 50) {
                    notas50 = notas50 + 1;
                    restante = restante - 50;
                }

                while (restante >= 20) {
                    notas20 = notas20 + 1;
                    restante = restante - 20;
                }

                while (restante >= 10) {
                    notas10 = notas10 + 1;
                    restante = restante - 10;
                }

                mensagem = "Saque realizado!<br>";
                mensagem += "Notas de R$ 100: " + notas100 + "<br>";
                mensagem += "Notas de R$ 50: " + notas50 + "<br>";
                mensagem += "Notas de R$ 20: " + notas20 + "<br>";
                mensagem += "Notas de R$ 10: " + notas10 + "<br>";
                mensagem += "Saldo restante: R$ " + saldo;

                historico.push("Saque: -R$ " + valor);
            }
            break;

        case "extrato":
            mensagem = "EXTRATO<br>";
            for (let i = 0; i < historico.length; i++) {
                mensagem += (i + 1) + ". " + historico[i] + "<br>";
            }
            mensagem += "Saldo atual: R$ " + saldo;
            break;
    }

    document.getElementById("saldo").textContent = saldo;
    document.getElementById("resultado").innerHTML = mensagem;
});
