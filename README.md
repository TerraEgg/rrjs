# RRJS - Rick Roll JS

A simple solution to annoy anyone poking around your website.

## Quick Start

### Browser (HTML) - Direct Link (recommended)
Just put this in your .html file.

```html
<script src="https://cdn.jsdelivr.net/gh/terraegg/rrjs@latest/asciiPlayer.js"></script><script>new AsciiPlayer({autoPlay:1,loop:1}).loadAnimation('https://cdn.jsdelivr.net/gh/terraegg/rrjs@latest/data/ascii_animation.json')</script>
```

### Browser (HTML) - NPM Package

```bash
npm install rrjs
```

Then in your HTML:

```html
<script src="node_modules/rrjs/asciiPlayer.js"></script>
<script>
  const player = new AsciiPlayer({ autoPlay: true, loop: true });
  player.loadAnimation('node_modules/rrjs/data/ascii_animation.json');
</script>
```

Or with a bundler (Webpack/Vite):

```javascript
import AsciiPlayer from 'rrjs';

const player = new AsciiPlayer({ autoPlay: true, loop: true });
player.loadAnimation('node_modules/rrjs/data/ascii_animation.json');
```

## JSON Format

If you decide you want to change out the ASCII art, edit in the following format:

```json
{
  "frame_count": 23,
  "width_chars": 80,
  "frames": [
    {
      "frame": 0,
      "duration_ms": 100,
      "ascii": [
        "line 1 of ascii art",
        "line 2 of ascii art",
        "..."
      ]
    },
    ...
  ]
}
```

## API

### Constructor

```javascript
const player = new AsciiPlayer({
  animationData: null,
  frameDelay: 100,
  autoPlay: true,
  loop: true
});
```