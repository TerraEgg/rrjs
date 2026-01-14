(function(globalThis) {
  'use strict';

  class AsciiPlayer {
    constructor(options = {}) {
      this.animationData = options.animationData || null;
      this.frameDelay = options.frameDelay || 100;
      this.autoPlay = options.autoPlay !== false;
      this.loop = options.loop !== false;
      
      this.currentFrame = 0;
      this.isPlaying = false;
      this.animationId = null;
      this.lastFrameTime = 0;
    }


    async loadAnimation(dataOrUrl) {
      if (typeof dataOrUrl === 'string') {
        const response = await fetch(dataOrUrl);
        this.animationData = await response.json();
      } else if (typeof dataOrUrl === 'object') {
        this.animationData = dataOrUrl;
      }
      
      if (this.autoPlay) {
        this.play();
      }
      return this.animationData;
    }

    getCurrentFrame() {
      if (!this.animationData || !this.animationData.frames) {
        return null;
      }
      return this.animationData.frames[this.currentFrame];
    }

    renderFrame() {
      const frame = this.getCurrentFrame();
      if (!frame) return;

      if (Array.isArray(frame.ascii)) {
        console.log(frame.ascii.join('\n'));
      } else if (typeof frame.ascii === 'string') {
        console.log(frame.ascii);
      }
    }

    play() {
      if (this.isPlaying) return;
      
      this.isPlaying = true;
      this.lastFrameTime = Date.now();
      this._nextFrame();
    }

    _nextFrame() {
      if (!this.isPlaying) return;

      const now = Date.now();
      const frame = this.getCurrentFrame();
      const frameDuration = frame ? frame.duration_ms : this.frameDelay;

      if (now - this.lastFrameTime >= frameDuration) {
        this.renderFrame();
        this.lastFrameTime = now;
        this.currentFrame++;

        if (this.currentFrame >= this.animationData.frame_count) {
          if (this.loop) {
            this.currentFrame = 0;
          } else {
            this.isPlaying = false;
            return;
          }
        }
      }

      this.animationId = requestAnimationFrame(() => this._nextFrame());
    }

    goToFrame(frameNumber) {
      if (frameNumber >= 0 && frameNumber < this.animationData.frame_count) {
        this.currentFrame = frameNumber;
        this.renderFrame();
      }
    }

    getInfo() {
      if (!this.animationData) return null;
      return {
        frameCount: this.animationData.frame_count,
        width: this.animationData.width_chars,
        currentFrame: this.currentFrame,
        isPlaying: this.isPlaying
      };
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AsciiPlayer;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return AsciiPlayer; });
  } else {
    globalThis.AsciiPlayer = AsciiPlayer;
  }

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
