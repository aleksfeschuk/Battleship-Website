import Field from "./Field";

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
        this.human = new Field(this.humanfield);

        
    }
        
    // function to get an element by ID
    getElement (id) {
        return document.getElementById(id);
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

    // const typeGeneration = {
    //     random() {
    //         shipsCollection.hidden = true;
    //         human.randomLocationShips();
    //     },
    //     manually() {

    //     }
    // };

    // typeGeneration[type]();
   
}