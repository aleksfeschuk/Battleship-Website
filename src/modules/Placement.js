export default class Placement {
    static FRAME_COORDS = getCoordinates(humanfield);

    constructor() {
        this.dragObject = {};
        this.pressed = false
    }

    static getShipName (el) {
        return el.getAttribute('id');   
    } 

    static getCloneDecks (el) {
        const type = Placement.getShipName(el).slice(0, -1);
        return Field.SHIP_DATA[type][1];
    }

    setObserver() {
        if(this.isHandlerPlacement) return;

       ['mousedown', 'mousemove', 'mouseup'].forEach(event => document.addEventListener(event, this[`on${event.charAt(0).toUpperCase() + event.slice(1)}`].bind(this)));

        this.isHandlerPlacement = true;
    }

    // onMouseDown(e) {
    //     if (e.which !== 1 || startGame) return;

    //     const el = e.target.closest('.ship');
    //     if(!el) return;

    //     this.pressed = true;
    //     this.dragObject = {
    //         el, 
    //         parent: el.parentElement,
    //         next: el.nextElementSibling,
    //         downX: e.pageX,
    //         downY: e.pageY,
    //         left: el.offsetLeft,
    //         top: el.offsetTop,
    //         kx: 0,
    //         ky: 1
    //     };
    // }


}