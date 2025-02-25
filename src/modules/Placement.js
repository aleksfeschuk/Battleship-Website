import Field from "./Field";
import Ships from "./Ships";

export default class Placement {

    //Static property to store human field coordinates, initialized later
    static FRAME_COORDS = null;

    constructor(humanfield) {
        this.humanfield = humanfield
        this.dragObject = {};
        this.pressed = false;
        this.clone = null;
        this.isHandlerPlacement = false;
        Placement.FRAME_COORDS = this.getCoordinates(humanfield);
    }

    static getShipName (el) {
        return el.getAttribute('id');   
    } 

    static getCloneDecks (el) {
        const type = Placement.getShipName(el).slice(0, -1);
        return Field.SHIP_DATA[type]?.[1] || 0;
    }

    // Bind mouse event listeners for dragging
    setObserver() {
        if(this.isHandlerPlacement) return;

       ['mousedown', 'mousemove', 'mouseup'].forEach(event => {
            const handler = `on${event.charAt(0).toUpperCase() + event.slice(1)}`;
            document.addEventListener(event, this[handler].bind(this));
       });

        this.humanfield.addEventListener('contextmenu', this.onContextMenu.bind(this));
        this.isHandlerPlacement = true;
    }

    //Handle mouse down to start dragging
    onMouseDown(e) {
        if (e.which !== 1 || window.startGame) return;

        const el = e.target.closest('.ship');
        if(!el || !this.humanfield.contains(el)) return;

        this.pressed = true;
        const coords = this.getCoordinates(el);
        this.dragObject = {
            el, 
            parent: el.parentElement,
            next: el.nextElementSibling,
            downX: e.pageX,
            downY: e.pageY,
            left: coords.left,
            top: coords.top,
            kx:  el.classList.contains('vertical') ? 0 : 1,
            ky: el.classList.contains('vertical') ? 1 : 0
        };

        this.decks = Placement.getCloneDecks(el);
        this.clone = this.dragObject.el.cloneNode(true);
        this.clone.style.position = 'absolute';
        this.clone.style.zIndex = '1000';
        this.clone.style.left = `${coords.left}px`;
        this.clone.style.top = `${coords.top}px`;
        document.body.appendChild(this.clone);

        this.shiftX = e.pageX - coords.left;
        this.shiftY = e.pageY - coords.top;
        
    }

    // Handle mouse movement to drag the ship
    onMouseMove(e) {
        if (!this.pressed || !this.clone) return;

        const newLeft = Math.max(this.FRAME_COORDS.left, 
                        Math.min(e.pageX - this.shiftX, 
                            Placement.FRAME_COORDS.right - (this.dragObject.kx ? Field.SHIP_SIDE * this.decks : Field.SHIP_SIDE)));
        const newTop = Math.max(this.FRAME_COORDS.top, 
                        Math.min(e.pageY - this.shiftY, 
                            Placement.FRAME_COORDS.bottom - (this.dragObject.ky ? Field.SHIP_SIDE * this.decks : Field.SHIP_SIDE)));
        this.clone.style.left = `${newLeft}px`;
        this.clone.style.top = `${newTop}px`;
        
        const coords = this.getCoordinates(this.clone);
        const { x, y } = this.getCoordsInMatrix(coords);
        const options = {
            x, y, kx: this.dragObject.kx, 
            ky: this.dragObject.ky, 
            decks: this.decks
        };

        //  Visual feedback during drag
        if (this.isWithinField(coords) && window.human.checkLocationShip(options, this.decks)) {
            this.clone.classList.remove('unsuccess');
            this.clone.classList.add('success');
        } else {
            this.clone.classList.remove('success');
            this.clone.classList.add('unsuccess');
        }
    }

    // Handle mouse up to place or revert the ship

    onMouseUp(e) {
        if(!this.pressed || !this.clone) return;
        
        this.pressed = false;
        const coords = this.getCoordinates(this.clone);
        const { x, y, left, top } = this.getCoordsInMatrix(coords);
        const options = {
            x,
            y,
            kx: this.dragObject.kx,
            ky: this.dragObject.ky,
            decks: this.decks,
            shipname: Placement.getShipName(this.dragObject.el)
        };

        if(this.isWithinField(coords) && window.human.checkLocationShip(options, this.decks)) {
            new Ships(window.human, options).createShip();
            this.clone.remove();
        } else {
            this.clone.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
            this.clone.style.left = `${this.dragObject.left}px`;
            this.clone.style.top = ` ${this.dragObject.top}px`;
            setTimeout(() => this.clone.remove(), 200);
        }

        this.clone = null;
        this.dragObject = {};
    }

    // Handle right-click to toggle ship orientation 

    onContextMenu(e) {
        e.preventDefault();
        const el = e.target.closest('.ship');
        if(!el || !this.humanfield.contains(el)) return;

        el.classList.toggle('vertical');
        if (this.dragObject.el === el) {
            this.dragObject.kx = el.classList.contains('vertical') ? 0 : 1;
            this.dragObject.ky = el.classList.contains('vertical') ? 1 : 0;
        }
    }

    //  Get element coordinates


    getCoordinates(el) {
        const { left, right, top, bottom } = el.getBoundingClientRect();
        return {
            left: left + window.pageXOffset,
            right: right + window.pageXOffset,
            top: top + window.pageYOffset,
            bottom: bottom + window.pageYOffset
        };
    }

    // Check if clone is within field boundaries

    isWithinField({ left, right, top, bottom }) {
        return (
            left >= Placement.FRAME_COORDS.left - 14 &&
            right <= Placement.FRAME_COORDS.right + 14 && 
            top >= Placement.FRAME_COORDS.top - 14 && 
            bottom <= Placement.FRAME_COORDS.bottom + 14
        );
    }


    //Convert pixel coordinates to grid coordinates

   getCoordsInMatrix({ left, top}) {
        const frame = Placement.FRAME_COORDS;
        const maxLeft = Field.FIELD_SIDE - (this.dragObject.kx ? Field.SHIP_SIDE * this.decks : Field.SHIP_SIDE);
        const maxTop = Field.FIELD_SIDE - (this.dragObject.ky ? Field.SHIP_SIDE * this.decks : Field.SHIP_SIDE);

        const relativeLeft = Math.min(Math.max(left - frame.left, 0), maxLeft);
        const relativeTop = Math.min(Math.max(top - frame.top, 0), maxTop);

        const x = Math.min(Math.max(Math.round(relativeTop / Field.SHIP_SIDE), 0), 9);
        const y = Math.min(Math.max(Math.round(relativeLeft / Field.SHIP_SIDE), 0), 9);

        return {
            x,
            y, 
            left: y * Field.SHIP_SIDE + frame.left,
            top: x * Field.SHIP_SIDE + frame.top
        };
   }

   removeObserver() {
        if (!this.isHandlerPlacement) return;

        ['mousedown', 'mousemove', 'mouseup'].forEach(event => {
            const handler = `on${event.charAt(0).toUpperCase() + event.slice(1)}`;
            document.removeEventListener(event, this[handler].bind(this));
       });

       this.humanfield.removeEventListener('contextmenu', this.onContextMenu.bind(this));
       this.isHandlerPlacement = false;

   }
}