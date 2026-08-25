import '@testing-library/jest-dom';

// Global mocks for browser APIs in Vitest JSDOM environment
window.AudioContext = window.AudioContext || class {
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
  createGain() {
    return {
      gain: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {}
      },
      connect: () => {}
    };
  }
  get destination() {
    return {};
  }
  get currentTime() {
    return 0;
  }
};

window.webkitAudioContext = window.AudioContext;

// Comprehensive HTMLCanvasElement getContext mock for Vitest JSDOM canvas rendering
HTMLCanvasElement.prototype.getContext = function () {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x, y, w, h) => ({ data: new Array(w * h * 4) }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    restore: () => {},
    fillText: () => {},
    beginPath: () => {},
    closePath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    clip: () => {},
    rect: () => {},
    moveTo: () => {},
    lineTo: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} }),
    font: '',
    fillStyle: '',
    strokeStyle: '',
    globalAlpha: 1
  };
};
