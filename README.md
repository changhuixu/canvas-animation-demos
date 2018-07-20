# Canvas Animation in TypeScript

Canvas Animation written in TypeScript. No jQuery and no other 3rd party dependencies. You might also interest in [my another repo about canvas animation](https://github.com/changhuixu/canvas-animation-step-by-step).

## [Demo](https://canvas-animations.firebaseapp.com/)

[Medium Post](https://medium.com/@changhuixu/canvas-animations-in-typescript-97ba0163cb19)

This repo includes the following animation examples:

1.  Solar System

    The Sun is in the center; the Earth is rotating around the Sun; the Moon is rotating around the Earth. When the moon is dimmed in the shadow area formed by the Earth blocking Sun light. This animation is based on the example in [MDN Basic Animation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations) and [this CodePen](https://codepen.io/anon/pen/bjVvMy).

    Note: The composition order of canvas layers is important.

1.  Clock

    A clock with second hand, minute hand and hour hand rotating and pointing to current time. This animation is based on the example in [MDN Basic Animation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations) and [this CodePen](https://codepen.io/anon/pen/QBjmBW)

1.  Bouncing Ball

    A ball bouncing inside of canvas box with some simple Physics. This animation is based on the example in [MDN Advanced animations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations)

1.  Constellation

    A number (default 100) stars/particles drifting in the universe (a gradient color background), with some simple Physics. The Constellation model class can take configurations for stars/particles. This animation is based on [this CodePen](https://codepen.io/acauamontiel/pen/mJdnw).

1.  Candy Text

    A parameterized text string is created by colorful particles. When mouse over (or touch) particles, they explode and fly away, eventually out of the canvas. When mouse cursor is out of canvas, the animation will pause. When mouse cursor enters canvas, the animation resumes.

    This animation is based on [HTML5 Canvas Tutorials: Interacive Text Particles](https://www.html5canvastutorials.com/advanced/html5-canvas-interactive-text-particles/) and [this CodePen](https://codepen.io/anon/pen/ZjGqRg).

    ![Candy Text](candy.png)
