import { ref } from 'vue';

export default function easy() {
    const squares = ref(Array(9).fill(" "));
    const currentPlayer = ref("X");
    const gameContinue = ref(true);
    const gameEnd = ref("");

    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function handleClick(index) {
        if (gameContinue.value && squares.value[index] === ' ') {
            squares.value[index] = currentPlayer.value;
            review();

            if (gameContinue.value) {
                currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
                setTimeout(CPU, 300);
            }
        }
    }

    function CPU() {
        if (!gameContinue.value) return;

        let vacias = [];
        for (let i = 0; i < squares.value.length; i++) {
            if (squares.value[i] === " ") {
                vacias.push(i);
            }
        }

        if (vacias.length > 0) {
            let posicion = vacias[Math.floor(Math.random() * vacias.length)];
            squares.value[posicion] = currentPlayer.value;
            review();

            if (gameContinue.value) {
                currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
            }
        }
    }

    function review() {
        for (let [a, b, c] of win) {
            if (squares.value[a] !== " " &&
                squares.value[a] === squares.value[b] &&
                squares.value[b] === squares.value[c]) {
                gameEnd.value = "Ganó: " + squares.value[a];
                gameContinue.value = false;
                return;
            }
        }
        if (!squares.value.includes(" ")) {
            gameEnd.value = "Empate";
            gameContinue.value = false;
        }
    }

    return {
        squares,
        currentPlayer,
        gameContinue,
        gameEnd,
        handleClick
    };
}
