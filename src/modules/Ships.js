import Field from "./Field";

export default class Ships {
    constructor(self, {x, y, kx, ky, decks, shipname}) {
        this.player = self;
        this.field = self.field;
        this.shipname = shipname;
        this.decks = decks;
        this.x = x;
        this.y = y;
        this.kx = kx;
        this.ky = ky;
        this.arrDecks = [];
        this.hits = 0;
    }

    static showShip(self, shipname, x, y, kx) {
        const div = document.createElement('div');
        div.id = shipname;
        div.className = `ship ${shipname.slice(0, -1)}${kx == 0 ? 'vertical' : ''}`;
        div.style.cssText = `left:${y * Field.SHIP_SIDE}px; top:${x * Field.SHIP_SIDE}px;`;
        self.field.appendChild(div);
    }


    createShip() {
        let k = 0;

        while(k < this.decks) {
            let i = this.x + k * this.kx;
            let j = this.y + k * this.ky;
            this.player.matrix[i][j] = 1;
            this.arrDecks.push([i, j]);
            k++;
        }

        // Add ship to player's squadron
        this.player.squadron[this.shipname] = {
            arrDecks: this.arrDecks,
            hits: this.hits,
            x: this.x,
            y: this.y,
            kx: this.kx,
            ky: this.ky
        };

        // If human player, update UI
        if(this.player === window.human) {
            Ships.showShip(window.human, this.shipname, this.x, this.y, this.kx);
            if (Object.keys(this.player.squadron).length === 10) {
                window.buttonPlay.hidden = false;
            }
        }
    }
}