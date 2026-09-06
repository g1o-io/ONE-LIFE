/* =================================
   ONE LIFE — V0.2
   Character Creator
================================= */

const app = document.getElementById("app");

let character = {
  realName: "",
  artistName: "",
  nationality: "",
  shirtNumber: "",
  primaryPosition: "",
  secondaryPosition: "",
  preferredFoot: "",
  height: "",
  primaryGenre: "",
  secondaryGenre: "",
  tertiaryGenre: "",
  skinTone: "",
  eyeColor: "",
  eyeShape: "",
  faceShape: "",
  nose: "",
  mouth: "",
  eyebrows: "",
  hairType: "",
  hairColor: "",
  top: "",
  bottom: "",
  shoes: "",
  accessory: ""
};

/* =================================
   NAVEGAÇÃO
================================= */

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.style.display = "none";
  });

  const selectedScreen = document.getElementById(screenId);

  if (selectedScreen) {
    selectedScreen.style.display = "block";
  }
}

/* =================================
   RECOLHER PERSONAGEM
================================= */

function collectCharacterData() {
  character.realName =
    document.getElementById("realName")?.value.trim() || "";

  character.artistName =
    document.getElementById("artistName")?.value.trim() || "";

  character.nationality =
    document.getElementById("nationality")?.value || "";

  character.shirtNumber =
    document.getElementById("shirtNumber")?.value || "";

  character.primaryPosition =
    document.getElementById("primaryPosition")?.value || "";

  character.secondaryPosition =
    document.getElementById("secondaryPosition")?.value || "";

  character.preferredFoot =
    document.getElementById("preferredFoot")?.value || "";

  character.height =
    document.getElementById("height")?.value || "";

  character.primaryGenre =
    document.getElementById("primaryGenre")?.value || "";

  character.secondaryGenre =
    document.getElementById("secondaryGenre")?.value || "";

  character.tertiaryGenre =
    document.getElementById("tertiaryGenre")?.value || "";

  character.skinTone =
    document.getElementById("skinTone")?.value || "";

  character.eyeColor =
    document.getElementById("eyeColor")?.value || "";

  character.eyeShape =
    document.getElementById("eyeShape")?.value || "";

  character.faceShape =
    document.getElementById("faceShape")?.value || "";

  character.nose =
    document.getElementById("nose")?.value || "";

  character.mouth =
    document.getElementById("mouth")?.value || "";

  character.eyebrows =
    document.getElementById("eyebrows")?.value || "";

  character.hairType =
    document.getElementById("hairType")?.value || "";

  character.hairColor =
    document.getElementById("hairColor")?.value || "";

  character.top =
    document.getElementById("top")?.value || "";

  character.bottom =
    document.getElementById("bottom")?.value || "";

  character.shoes =
    document.getElementById("shoes")?.value || "";

  character.accessory =
    document.getElementById("accessory")?.value || "";
}

/* =================================
   GUARDAR PERSONAGEM
================================= */

function saveCharacter() {
  collectCharacterData();

  localStorage.setItem(
    "oneLifeCharacter",
    JSON.stringify(character)
  );
}

/* =================================
   CARREGAR PERSONAGEM
================================= */

function loadCharacter() {
  const savedCharacter =
    localStorage.getItem("oneLifeCharacter");

  if (!savedCharacter) {
    return false;
  }

  try {
    character = JSON.parse(savedCharacter);
    return true;
  } catch (error) {
    console.error("Erro ao carregar personagem:", error);
    return false;
  }
}

/* =================================
   NOVO JOGO
================================= */

function newGame() {
  localStorage.removeItem("oneLifeCharacter");

  character = {
    realName: "",
    artistName: "",
    nationality: "",
    shirtNumber: "",
    primaryPosition: "",
    secondaryPosition: "",
    preferredFoot: "",
    height: "",
    primaryGenre: "",
    secondaryGenre: "",
    tertiaryGenre: "",
    skinTone: "",
    eyeColor: "",
    eyeShape: "",
    faceShape: "",
    nose: "",
    mouth: "",
    eyebrows: "",
    hairType: "",
    hairColor: "",
    top: "",
    bottom: "",
    shoes: "",
    accessory: ""
  };

  showScreen("character-creator");
}

/* =================================
   CONTINUAR
================================= */

function continueGame() {
  const exists = loadCharacter();

  if (exists) {
    showScreen("character-creator");
    fillCharacterForm();
  } else {
    alert("Ainda não existe uma carreira guardada.");
  }
}

/* =================================
   PREENCHER FORMULÁRIO
================================= */

function fillCharacterForm() {
  Object.keys(character).forEach(key => {
    const element = document.getElementById(key);

    if (element) {
      element.value = character[key] || "";
    }
  });
}

/* =================================
   CRIAR PERSONAGEM
================================= */

function createCharacter() {
  collectCharacterData();

  if (!character.realName) {
    alert("Escreve o teu nome.");
    return;
  }

  if (!character.artistName) {
    alert("Escolhe o teu nome artístico.");
    return;
  }

  if (!character.nationality) {
    alert("Escolhe a tua nacionalidade.");
    return;
  }

  if (!character.primaryPosition) {
    alert("Escolhe a tua posição principal.");
    return;
  }

  if (!character.secondaryPosition) {
    alert("Escolhe a tua posição secundária.");
    return;
  }

  if (!character.primaryGenre) {
    alert("Escolhe o teu género musical principal.");
    return;
  }

  saveCharacter();

  alert(
    `Personagem criada!\n\n` +
    `${character.realName}\n` +
    `"${character.artistName}"\n\n` +
    `A tua vida começa aos 16 anos.`
  );
}

/* =================================
   INICIALIZAÇÃO
================================= */

document.addEventListener("DOMContentLoaded", () => {

  showScreen("title-screen");

  const newGameButton =
    document.getElementById("new-game-button");

  const continueButton =
    document.getElementById("continue-button");

  const createButton =
    document.getElementById("create-character-button");

  if (newGameButton) {
    newGameButton.addEventListener("click", newGame);
  }

  if (continueButton) {
    continueButton.addEventListener("click", continueGame);
  }

  if (createButton) {
    createButton.addEventListener("click", createCharacter);
  }
});