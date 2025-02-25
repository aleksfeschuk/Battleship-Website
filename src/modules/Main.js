import Field from "./Field";
import Placement from "./Placement";


export default  class Main {

    constructor() {
        // Initialize game state variables
        this.startGame = false;
        this.isHandlerPlacement = false;
        this.isHandlerController = false;
        this.compShot = false;
        console.log("Main class initialized");

        // Get the human and computer fields
        this.humanfield = this.getElement('field_human');
        this.computerfield = this.getElement('field_computer');
        
        // Get various elements related to the game interface
        this.instruction = this.getElement('instruction');
        this.shipsCollection = this.getElement('ships_collection');
        this.initialShips = document.querySelector('.wrap + .initial-ships');
        this.toptext = this.getElement('text_top');
        this.buttonPlay = this.getElement('play');
        this.buttonNewGame = this.getElement('newgame');

        // Initialize Field instance for the human player
        if(!this.humanfield) throw new Error('Element #field_human not found');
        this.human = new Field(this.humanfield);
        this.placement = new Placement(this.humanfield);

        window.human = this.human;
        window.buttonPlay = this.buttonPlay;
        window.startGame = this.startGame;

        const typePlacement = this.getElement('type-placement');
        if  (typePlacement) {
            typePlacement.addEventListener('click', (e) => {
                if (e.target.tagName !== 'SPAN') return;

                this.buttonPlay.hidden = true;
                this.human.cleanField();

                const type = e.target.dataset.target;

                // use arrow functions to preserve 'this' as Main instance

                const typeGeneration = {
                    random: () => {
                        this.shipsCollection.hidden = true;
                        this.human.randomLocationShips();
                    },
                    manually: () => {
                        let value = !this.shipsCollection.hidden;

                        if(this.shipsCollection.children.length > 1) {
                            this.shipsCollection.removeChild(this.shipsCollection.lastChild)
                        }

                        if (!value) {
                            if (!this.initialShips) {
                                console.error('initialShips not found in DOM');
                                return;
                            }
                            this.initialShipsClone = this.initialShips.cloneNode(true);
                            this.shipsCollection.appendChild(this.initialShipsClone);
                            this.initialShipsClone.hidden = false;
                            this.placement.setObserver();
                        }
                    }
                };

                typeGeneration[type]?.();
            });
        } else {
            console.warn("Element #type-placement not found");
        }
        
    }
   

    // function to get an element by ID
    getElement (id) {
        const element = document.getElementById(id);
        if(!element) console.warn(`Element #${id} not found`);
        return element;
    }

    // Function to get the coordinates of an element
    getCoordinates(el) {
        const { left, right, top, bottom } = el.getBoundingClientRect();
        return {
            left: left + window.pageXOffset,
            right: right + window.pageXOffset,
            top: top + window.pageYOffset,
            bottom: bottom + window.pageYOffset,
        };
    }

   
}