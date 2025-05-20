const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRALIDADE: 3,
  PODER: 3,
  PONTOS: 0
}

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRALIDADE: 4,
  PODER: 4,
  PONTOS: 0
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random()
  let result

  switch (true) {
    case random < 0.33:
      result = "RETA"
      break;
  
    case random < 0.66:
      result = "CURVA"
      break
    default:
      result = "CONFRONTO"
  }

  return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
  for(let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // Sortear Bloco
    let block = await getRandomBlock()
    console.log(`Bloco: ${block}`);

    // Rolar os dados
    let diceResuslt1 = await rollDice()
    let diceResuslt2 = await rollDice()

    // teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResuslt1 + character1.VELOCIDADE
      totalTestSkill2 = diceResuslt2 + character2.VELOCIDADE

      await logRollResult(character1.NOME, "velocidade", diceResuslt1, character1.VELOCIDADE)
      await logRollResult(character2.NOME, "velocidade", diceResuslt2, character2.VELOCIDADE)
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResuslt1 + character1.MANOBRALIDADE
      totalTestSkill2 = diceResuslt2 + character2.MANOBRALIDADE

      await logRollResult(character1.NOME, "manobrabilidade", diceResuslt1, character1.MANOBRALIDADE)
      await logRollResult(character2.NOME, "manobrabilidade", diceResuslt2, character2.MANOBRALIDADE)
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResuslt1 + character1.PODER
      let powerResult2 = diceResuslt2 + character2.PODER

      console.log(`${character1.NOME} confrontou com ${character2.NOME}!`);

      await logRollResult(character1.NOME, "poder", diceResuslt1, character1.PODER)
      await logRollResult(character2.NOME, "poder", diceResuslt2, character2.PODER)

      if (powerResult1 > powerResult2 && character2.PONTOS  > 0) {
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto`)
        character2.PONTOS--
      }
      
      if (powerResult2 > powerResult1 && character1.PONTOS  > 0) {
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto`)
        character1.PONTOS--
      }
      
      console.log(powerResult2 === powerResult1 ? "Confronto empatado! Ninguém perdeu ponto" : "")
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }
    
    console.log("----------------------------------------");
    
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado Final:")
  console.log(`${character1.NOME}: ${character1.PONTOS} pontos(s)`)
  console.log(`${character2.NOME}: ${character2.PONTOS} pontos(s)`)

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns!`)
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns!`)
  } else {
    console.log(`A corrida terminou em empate`);
  }
}

(async function main() {
  console.log(`🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

  await playRaceEngine(player1, player2)
  await declareWinner(player1, player2)
})()