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
        this.matrix = [];

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
                    ...this.getCoordsDecks(decks),
                    decks,
                    shipname: `${type}${i + 1}`
                };
                new Ships(this.options).createShip();
            });
        });
    }

    // static getRandom = n => Math.floor(Math.random() * (n + 1));

    // getCoordinatesDecks(decks) {
    //     let kx = Field.getRandom(1), ky = (kx == 0) ? 1 : 0,
    //         x, y;
        
    //         if (kx == 0) {
    //             x = Field.getRandom(9); y = Field.getRandom(10 - decks);
    //         } else {
    //             x = Field.getRandom(10 - decks); y = Field.getRandom(9);
    //         }

    //         const obj = {x, y, kx, ky}

    //         const result = this.checkLocationShip(obj, decks);

    //         if(!result) return this.getCoordsDecks(decks);
    //         return obj;
    // }

    static getRandom = n => (Math.random() * (n + 1)) | 0; //math.floor | 0


    // Generates random coordinates for ship placement
    getCoordinatesDecks(decks) {
        const kx = Field.getRandom(1), ky = 1 - kx;
        const x = Field.getRandom(10 - decks * kx);
        const y = Field.getRandom(10 - decks * ky);

        const obj = {x , y, kx, ky}

        return this.checkLocationShip(obj, decks) ? obj : this.getCoordinatesDecks(decks);
    }


    checkLocationShip(obj, decks) {
        let { x, y, kx, ky} = obj;


         // Define the upper and lower boundaries of the area

         let fromX = (x === 0) ? x : x - 1;
         let toX = (x + kx * decks < 10) ? x + kx * decks + 1 : x + kx * decks;


        //  Define the left and right boundaries of the area

        let fromY = (y === 0) ? y : y - 1;
        let toY = (y + ky * decks < 10) ? y + ky * decks + 1 : y + ky * decks;

        // Check if the zone contains already installed ships

        for (let i = fromX; i < toX; i++) {
            for (let j = fromY; j < toY; j++) {
                if(this.matrix[i][j] === 1) return false;
            }
        }
        return true;
    }


    // checkLocationShip(obj, decks) {
    //     let { x, y, kx, ky, fromX, toX, fromY, toY } = obj;

    //     fromX = (x == 0) ? x : x - 1;

    //     if (x + kx * decks == 10 && kx == 1) toX = x + kx * decks;

    //     else if (x + kx * decks < 10 && kx == 1) toX = x + kx * decks + 1;

    //     else if (x == 9 && kx == 0) toX = x + 1;
         
    //     else if(x < 9 && kx == 0) toX = x + 2;

    //     fromY = (y == 0) ? y : y - 1;
        
    //     if (y + ky * decks == 10 && ky == 1) toY = y + ky * decks;
        
    //     else if(y + ky * decks < 10 && ky == 1) toY = y + ky * decks + 1;
    //     else if (y == 9 && ky == 0 ) toY = y + 1;
    //     else if (y < 9 && ky == 0) toY = y + 2;

    //     if (toX === undefined || toY === undefined) return false;

    //     if (this.matrix.slice(fromX, toX)
    //         .filter(arr => arr.slice(fromY, toY).includes(1))
    //         .length > 0) return false;
    //         return true;
    // }
}