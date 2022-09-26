import EventEmitter2 from 'eventemitter2'

let emitterController;

if (!emitterController) {
  emitterController = new EventEmitter2();
}

export { emitterController }