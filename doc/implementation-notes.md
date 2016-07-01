# Function Builder - implementation notes

This document contains miscellaneous notes related to the implementation of Function Builder. It
supplements the internal documentation that appears in the code, and (hopefully) provides insight into
"big picture" implementation issues.  The audience for this document is software developers who are familiar
with JavaScript and PhET simulation development (as described in [PhET Development Overview]
(http://bit.ly/phet-development-overview)).

First, read [model.md](https://github.com/phetsims/function-builder/blob/master/doc/model.md), which provides
a high-level description of the simulation model.

## Terminology

Terminology (in alphabetical order), which you'll see throughout the source code:

* builder - the apparatus in the center of the screen
* cards - the things in the input and output carousel, that you drag through the builder
* challenge - a series of 1 or more functions in Mystery screen's builder. The user's tasks is to guess the function(s) in the challenge.
* drawers - things that slide out of the top & bottom of the builder, to reveal additional representations
* functions - the things in the functions carousel, that you drag into slots in the builder
* function carousel - horizontal carousel at bottom of screen
* generate button - the yellow button centered below the builder in the Mystery screen. Pressing it selects a challenge randomly from the pool.
* input carousel - vertical carousel on the left side of the screen
* output carousel - vertical carousel on the right side of the screen
* reveal buttons - toggle buttons below the functions in the Mystery screen (they have eyeball icons on them).
Pressing a "reveal" button shows/hides the identity of the function directly above it. These buttons are initially
disabled for a challenge. They are enabled when the output carousel contains 3 cards, and they remain enabled until
a new challenge is generated.
* scene - a builder, set of cards and set of functions. Each screen has 1 or more scenes
* "see inside" windows - windows that appear in the builder to display intermediate results
* slots - places where you can drop functions in the builder

## General

**Model-view transform**: Many PhET simulations have a model-view transform that maps between model and view coordinate frames
(see [ModelViewTransform2](https://github.com/phetsims/phetcommon/blob/master/js/view/ModelViewTransform2.js)).
The domain of this simulation has no need for a model coordinate frame, so the model and view coordinate frames
are treated as equivalent, and no transform is required. (If you don't understand that, don't worry about it.)

**Initialization**: This simulation takes a long time to initialize, which can be a little annoying or disconcerting for the user.
We implemented 2 initialization strategies: (1) on start, which initializes when the sim starts, and
(2) on demand, which initialize when a feature is first used. These 2 strategies can be selected independently
for ScreenView and SceneNode types, using query parameters.
To investigate this further, see `'initScreenViews'` and `'initScenes'` in
[FBQueryParameters](https://github.com/phetsims/function-builder/blob/master/js/common/FBQueryParameters.js).

**Memory management**: All objects created in this simulation exist for the lifetime of the simulation. So in
most cases, when an observer is registered (e.g. via `link`, `addListener`), there is no need to unregister that
observer (e.g. via `unlink`, `removeListener`).  For clarity, all calls that register an observer indicate whether
a corresponding unregister call is required. For example:

```js
// unlink unnecessary, instances exist for lifetime of the sim
movable.locationProperty.link( ... );
```

## Model

This section provides an overview of the most important model elements.

[Movable](https://github.com/phetsims/function-builder/blob/master/js/common/model/Movable.js)
is the base type for anything that can be moved (ie, cards and functions).
It is responsible for an object's location and animation to a desired location.

[Card](https://github.com/phetsims/function-builder/blob/master/js/common/model/cards/Card.js)
and its subtypes implement the card model. Cards provide the input to the builder, but have no responsibility
for what is displayed on them. What is actually displayed on a card is the responsibility of the view (see
[CardNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/cards/CardNode.js)
and its subtypes).

[AbstractFunction](https://github.com/phetsims/function-builder/blob/master/js/common/model/functions/AbstractFunction.js)
and its subtypes implement the function model. The function model is responsible for applying the function to an
input and producing an output. For programming convenience, it also carries some view-specific information
(e.g., the color of the function's background, the icon to display on the function to identify it).

There are two primary types of functions:
* image functions: These functions perform an image transform using Canvas.  See
[ImageFunction](https://github.com/phetsims/function-builder/blob/master/js/common/model/functions/ImageFunction.js).
* numeric functions: These functions perform mathematical functions using rational numbers. See
[MathFunction](https://github.com/phetsims/function-builder/blob/master/js/common/model/functions/MathFunction.js)
and its subtypes.

[RationalNumber](https://github.com/phetsims/function-builder/blob/master/js/common/model/RationalNumber.js)
implements support for rational numbers. This is a thin wrapper around the 3rd-party library
[BigRational.js](https://github.com/peterolson/BigRational.js).
It exposes only the functionality required for this simulation, so is not likely to be useful in other
simulations.

[Builder](https://github.com/phetsims/function-builder/blob/master/js/common/model/builder/Builder.js)
implements the builder model. It is responsible for managing the functions in its slots, and applying those
functions to cards. For programming convenience, it also carries some view-specific information (e.g.,
the builder's dimensions, the color scheme applied to the builder).

[Scene](https://github.com/phetsims/function-builder/blob/master/js/common/model/Scene.js)
and its subtypes implement a specific configuration that is to be displayed to the user.
The model for each screen contains one or more scenes. A scene consists of a builder, a set of cards, and a set of functions.
Subtypes of Scene add additional elements to the basic scene. For example,
[MysteryScene](https://github.com/phetsims/function-builder/blob/master/js/mystery/model/MysteryScene.js)
adds a pool of challenges for the "Mystery" screen.

## View


Each screen has one or more *scenes*.

What is a 'scene', only Patterns screen has multiple scenes

Image functions are all Canvas based

Carousels and containers

Movable: dragging vs animation

Drag handling: MovableNode, FunctionNode, CardNode, every drag ends with an animation, no need for dragBounds

No inverse functions, always compute forward

See Inside layer uses scenery DAG and clipArea features

Memory management (unlink, detach, removeListener,...)

View stuff (locationProperty, slots, animation,...) in the model for convenience

Card model elements are only responsible for this location and what is displayed on the input card.
The view (CardNode) is responsible for what is displayed on the card based on the card's location.

Mystery screen reuses 'scene' architecture, each scene has a hidden function carousel, programmatically
get functions from the carousel to construct challenges.