document.addEventListener("DOMContentLoaded", () => {
    const SAVE_KEY = "oneLifeSave";

    const screens = {
        title: document.getElementById("title-screen"),
        creator: document.getElementById("creator-screen"),
        hub: document.getElementById("hub-screen")
    };

    const characterForm = document.getElementById("character-form");

    // =========================
    // SISTEMA DE ECRÃS
    // =========================

    function showScreen(screen) {
        Object.values(screens).forEach((element) => {
            if (element) {
                element.classList.remove("active");
            }
        });

        if (screens[screen]) {
            screens[screen].classList.add("active");
        }
    }

    // =========================
    // ESTADO INICIAL
    // =========================

    function createDefaultState() {
        return {
            age: 16,
            energy: 100,
            morale: 75,
            confidence: 50,
            money: 0,
            fans: 0,
            recognition: "Desconhecido",
            ovr: 60,
            week: 1,

            character: {
                realName: "",
                artistName: "",
                nationality: "",
                shirtNumber: "",

                primaryPosition: "",
                secondaryPosition: "",
                preferredFoot: "",
                height: "",

                musicPrimary: "",
                musicSecondary: "",
                musicTertiary: "",

                skinTone: "",
                eyeColor: "",
                eyeShape: "",
                faceShape: "",
                nose: "",
                mouth: "",
                eyebrows: "",
                hairType: "",
                hairColor: "",

                topStyle: "",
                bottomStyle: "",
                shoes: "",
                accessory: ""
            }
        };
    }

    // =========================
    // LOCAL STORAGE
    // =========================

    function saveGame(state) {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    }

    function loadGame() {
        const savedGame = localStorage.getItem(SAVE_KEY);

        if (!savedGame) {
            return null;
        }

        try {
            return JSON.parse(savedGame);
        } catch (error) {
            console.error("Erro ao carregar a carreira:", error);
            return null;
        }
    }

    // =========================
    // FORMULÁRIO
    // =========================

    function getValue(id) {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
    }

    function collectCharacterData() {
        return {
            realName: getValue("real-name"),
            artistName: getValue("artist-name"),
            nationality: getValue("nationality"),
            shirtNumber: getValue("shirt-number"),

            primaryPosition: getValue("primary-position"),
            secondaryPosition: getValue("secondary-position"),
            preferredFoot: getValue("preferred-foot"),
            height: getValue("height"),

            musicPrimary: getValue("music-primary"),
            musicSecondary: getValue("music-secondary"),
            musicTertiary: getValue("music-tertiary"),

            skinTone: getValue("skin-tone"),
            eyeColor: getValue("eye-color"),
            eyeShape: getValue("eye-shape"),
            faceShape: getValue("face-shape"),
            nose: getValue("nose"),
            mouth: getValue("mouth"),
            eyebrows: getValue("eyebrows"),
            hairType: getValue("hair-type"),
            hairColor: getValue("hair-color"),

            topStyle: getValue("top-style"),
            bottomStyle: getValue("bottom-style"),
            shoes: getValue("shoes"),
            accessory: getValue("accessory")
        };
    }

    // =========================
    // HUB
    // =========================

    function formatMoney(value) {
        return new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0
        }).format(value || 0);
    }

    function formatFans(value) {
        const fans = Number(value) || 0;

        if (fans >= 1000000) {
            return `${(fans / 1000000).toFixed(1)}M`;
        }

        if (fans >= 1000) {
            return `${(fans / 1000).toFixed(1)}K`;
        }

        return fans.toString();
    }

    function populateHub(state) {
        const character = state.character || {};

        const realName = character.realName || "Jogador";
        const artistName = character.artistName || "Artista";

        const playerName = document.getElementById("hub-player-name");
        const hubArtistName = document.getElementById("hub-artist-name");
        const subtitle = document.getElementById("hub-player-subtitle");

        const age = document.getElementById("hub-age");
        const ovr = document.getElementById("hub-ovr");
        const energy = document.getElementById("hub-energy");
        const morale = document.getElementById("hub-morale");
        const confidence = document.getElementById("hub-confidence");

        const money = document.getElementById("hub-money");
        const fans = document.getElementById("hub-fans");
        const recognition = document.getElementById("hub-recognition");

        const week = document.getElementById("hub-week");
        const nextMatch = document.getElementById("hub-next-match");
        const musicStatus = document.getElementById("hub-music-status");
        const lifeStatus = document.getElementById("hub-life-status");

        if (playerName) {
            playerName.textContent = realName;
        }

        if (hubArtistName) {
            hubArtistName.textContent = artistName;
        }

        if (subtitle) {
            subtitle.textContent =
                `${state.age} anos • Academia • Música independente`;
        }

        if (age) {
            age.textContent = state.age;
        }

        if (ovr) {
            ovr.textContent = state.ovr;
        }

        if (energy) {
            energy.textContent = state.energy;
        }

        if (morale) {
            morale.textContent = state.morale;
        }

        if (confidence) {
            confidence.textContent = state.confidence;
        }

        if (money) {
            money.textContent = formatMoney(state.money);
        }

        if (fans) {
            fans.textContent = formatFans(state.fans);
        }

        if (recognition) {
            recognition.textContent = state.recognition;
        }

        if (week) {
            week.textContent = `Semana ${state.week}`;
        }

        if (nextMatch) {
            nextMatch.textContent = "Por definir";
        }

        if (musicStatus) {
            musicStatus.textContent = "A começar";
        }

        if (lifeStatus) {
            lifeStatus.textContent = "Academia + música";
        }
    }

    // =========================
    // AVANÇAR SEMANA
    // =========================

   function advanceWeek() {
    alert("O botão está a funcionar!");

    const state = loadGame();

    if (!state) {
        alert("Não existe nenhuma carreira guardada.");
        return;
    }

    state.week += 1;

    saveGame(state);
    populateHub(state);
}

    // =========================
    // NOVO JOGO
    // =========================

    function startNewGame() {
        localStorage.removeItem(SAVE_KEY);

        if (characterForm) {
            characterForm.reset();
        }

        showScreen("creator");
    }

    // =========================
    // CONTINUAR
    // =========================

    function continueGame() {
        const state = loadGame();

        if (!state) {
            alert("Não existe nenhuma carreira guardada.");
            return;
        }

        populateHub(state);
        showScreen("hub");
    }

    // =========================
    // CRIAR PERSONAGEM
    // =========================

    function createCharacter(event) {
        event.preventDefault();

        if (!characterForm.checkValidity()) {
            characterForm.reportValidity();
            return;
        }

        const state = createDefaultState();

        state.character = collectCharacterData();

        saveGame(state);
        populateHub(state);

        showScreen("hub");
    }

    // =========================
    // BOTÕES DO MENU PRINCIPAL
    // =========================

    const newGameButton = document.getElementById("new-game-button");
    const continueButton = document.getElementById("continue-button");
    const settingsButton = document.getElementById("settings-button");

    if (newGameButton) {
        newGameButton.addEventListener("click", startNewGame);
    }

    if (continueButton) {
        continueButton.addEventListener("click", continueGame);
    }

    if (settingsButton) {
        settingsButton.addEventListener("click", () => {
            alert("Definições — em construção para a V0.4.");
        });
    }

    // =========================
    // FORMULÁRIO
    // =========================

    if (characterForm) {
        characterForm.addEventListener("submit", createCharacter);
    }

    // =========================
    // BOTÕES DO HUB
    // =========================

    const hubButtons = [
        "hub-football",
        "hub-music",
        "hub-calendar",
        "hub-news",
        "hub-social",
        "hub-finances",
        "hub-relationships",
        "hub-career"
    ];

    hubButtons.forEach((buttonId) => {
        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener("click", () => {
                alert("Este módulo está em construção. 🔨");
            });
        }
    });

    // =========================
    // BOTÃO AVANÇAR SEMANA
    // =========================

   document.addEventListener("click", (event) => {
    const button = event.target.closest("#advance-week-button");

    if (button) {
        advanceWeek();
    }
});

    // =========================
    // DEFINIÇÕES DO HUB
    // =========================

    const hubSettingsButton = document.getElementById("hub-settings");

    if (hubSettingsButton) {
        hubSettingsButton.addEventListener("click", () => {
            alert("Definições — em construção para a V0.4.");
        });
    }

    // =========================
    // ARRANQUE
    // =========================

    const savedGame = loadGame();

    if (savedGame) {
        populateHub(savedGame);
    }

    showScreen("title");
});