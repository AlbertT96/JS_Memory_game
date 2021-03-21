// stworzenie listy z kolorami z których będziemy losować kolory kart
const cardsColor = ["red", "red", "green", "blue", "brown", "yellow", "gray", "cadetblue", "violet", "lightgreen", "green", "blue", "brown", "yellow", "gray", "cadetblue", "violet", "lightgreen"]

let cards = document.querySelectorAll("div");
// zmienia listę na elementy, by następnie stworzyć z nich tablice
cards = [...cards];


const timeOfGame = new Date().getTime();

//zmienne podtrzebne do roztrzygnięcia wygranej
let activeCard = "";
const activePairOfCards = [];

const gameProggres = cards.length / 2;
let gameResult = 0;


const clickCard = function () {
    activeCard = this;

    if (activeCard == activePairOfCards[0]) { return;}

    activeCard.classList.remove("hidden");
    if (activePairOfCards.length == 0) {
        activePairOfCards[0] = activeCard;
        return;
    }
    else {
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activePairOfCards[1] = activeCard;

        setTimeout(function () {
            if (activePairOfCards[0].className === activePairOfCards[1].className) {
                activePairOfCards.forEach(card => card.classList.add("off"))
                gameResult++;

                // dla każdej klikniętej karty(obiektu,diva) która uzyskuje klasę "off", tj. została trafnie odkryta para kolorów, zostaje usunięta z gry,
                // aby uniemożliwić klikanie ponownie w już odgadnięte karty

                cards = cards.filter(card => !card.classList.contains("off"))
                //warunek kończący grę
                if (gameResult == gameProggres) {
                    const timeOfEndGame = new Date().getTime();
                    const gameTime = (timeOfEndGame - timeOfGame) / 1000
                    alert(`Udało Ci się skończyć grę w: ${gameTime} sekund`)
                    //zapewnia refresh strony po kliknięciu w komunikat o wygranej grze
                    location.reload();
                }
        }
        else {
            activePairOfCards.forEach(card => card.classList.add("hidden"))
            }
            
            activeCard = "";
            activePairOfCards.length = 0; 
            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 500)
        
       
        
    }
};

const init = function () {
    cards.forEach(card => {
        // losowanie kolorów do kart
        const positionInTab = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[positionInTab]);
        // usuwanie z tablicy kolorów już wybranych, aby uniknąć powtórek 
        cardsColor.splice(positionInTab, 1);
    })
    // funkcja wymuszająca przerwę, aby uniknąć bugów z klikaniem kilku rzeczy na raz
    setTimeout(function () {
        cards.forEach(card=> {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 1000)
}
// start gry
init();