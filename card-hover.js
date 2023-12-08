//just give the class "card3d" to the desired divs

var styles = `
        .card3d {
            margin: 10px;
            transform: scale(1);
        }

        .card3d:hover {
            z-index: 100;
            transform: scale(1.5);
        }

        .card3d,
        .card3d img {
            transition: all 250ms ease-out;
        }`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

var cards = [];

document.addEventListener('DOMContentLoaded', function () {
    cards = document.getElementsByClassName('card3d');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('mousemove', (e) => {
            Card3D(cards[i], e);
        });

        cards[i].addEventListener('mouseleave', (e) => {
            cards[i].style.transform = 'rotateX(0deg) rotateY(0deg)';
            cards[i].style.filter = 'brightness(1)';
        });
    }
}, false);

function Card3D(card, e) {
    let bound = card.getBoundingClientRect();
    let width = bound.width;
    let height = bound.height;
    let rotateY = normalizeToNewBound(e.offsetX, 0, width, -25, 25);
    let rotateX = normalizeToNewBound(e.offsetY, 0, height, 25, -25); // last 2 values are inverted for vertical because the lower you are the higher the y offset is
    let brightness = normalizeToNewBound(e.offsetY, 0, height, 1.0, 0.5); // last 2 values are inverted for vertical because the lower you are the higher the y offset is
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.filter = `brightness(${brightness})`;
}

function normalizeToNewBound(val, oldLowerBound, oldUpperBound, NewLowerBound, NewUpperBound) {
    return NewLowerBound + ((val - oldLowerBound) * (NewUpperBound - NewLowerBound)) / (oldUpperBound - oldLowerBound);
}