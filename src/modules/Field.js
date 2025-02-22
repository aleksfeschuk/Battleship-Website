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
}