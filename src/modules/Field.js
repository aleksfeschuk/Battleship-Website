import Ships from "./Ships";
import Placement from "./Placement";


export default class Field {
    static FIELD_SIDE = 330;

    static SHIP_SIDE = 33;

    static SHIP_DATA = {
        fourdeck: [1, 4],
        tripledeck: [2, 3],
        doubledeck: [3, 2],
        singledeck: [4, 1]
    };

    constructor(field) {
        this.field = field;
        this.squadron = {};
        this.matrix = Field.createMatrix();

        let {left, right, top, bottom} = this.getCoordinates(this.field);
        this.fieldLeft = left;
        this.fieldRight = right;
        this.fieldTop = top;
        this.fieldBottom = bottom;
    }

    getCoordinates(el) {
        const { left, right, top, bottom } = el.getBoundingClientRect();
        return {
            left: left + window.pageXOffset,
            right: right + window.pageXOffset,
            top: top + window.pageYOffset,
            bottom: bottom + window.pageYOffset,
        };
    }

    // clean field

    cleanField() {
        this.clearElement(this.field);
        this.squadron = {};
        this.matrix = Field.createMatrix();
    }

    // funtion to clear all child elements
    clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    static createMatrix() {
        return [...Array(10)].map(() => Array(10).fill(0));
    }


    // random 
    randomLocationShips() {
        Object.entries(Field.SHIP_DATA).forEach(([type, [count, decks]]) => {
            Array.from({ length: count}).forEach((_, i) => {
                const options = {
                    ...this.getCoordinatesDecks(decks),
                    decks,
                    shipname: `${type}${i + 1}`
                };
                new Ships(this, options).createShip();
            });
        });
    }


    static getRandom = n => Math.floor(Math.random() * (n + 1));


    // Generates random coordinates for ship placement
    getCoordinatesDecks(decks) {
        let obj;

        do { 
            const kx = Field.getRandom(1);
            const ky = 1 - kx;

            const x = Field.getRandom(10 - decks * kx - 1);
            const y = Field.getRandom(10 - decks * ky - 1);

            obj = { x, y, kx, ky };
        } while (!this.checkLocationShip(obj, decks));

        return obj;
    }


    checkLocationShip(obj, decks) {
        let { x, y, kx, ky} = obj;


         // Define the upper and lower boundaries of the area

         let fromX = Math.max(x - 1, 0);
         let toX = Math.min(x + kx * decks, 9);


        //  Define the left and right boundaries of the area

        let fromY = Math.max(y - 1, 0);
        let toY = Math.min(y + ky * decks, 9);

        // Check if the zone contains already installed ships

        for (let i = fromX; i <= toX; i++) {
            for (let j = fromY; j <= toY; j++) {
                if(this.matrix[i]?.[j] === 1) return false;
            }
        }
        return true;
    }


   
}