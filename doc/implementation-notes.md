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

Many PhET simulations have a model-view transform (see
[ModelViewTransform2](https://github.com/phetsims/phetcommon/blob/master/js/view/ModelViewTransform2.js)
that maps between model and view coordinate frames. This
simulation has no specific model coordinate frame, so the model and view coordinate frames are equivalent, and
no transform is required. (If you don't understand that, don't worry about it.)

## Model

The base type for anything that can be moved (ie, cards and functions) is [
Movable](https://github.com/phetsims/function-builder/blob/master/js/common/model/Movable.js).
It is responsible for an object's location and animation to a desired location.

The card model (see
[Card](https://github.com/phetsims/function-builder/blob/master/js/common/model/cards/Card.js)
and its subtypes) has no responsibility for what is displayed on a card. It
provides the input information to the builder.  What is actually displayed on a card is the responsibility
of the view (see
[CardNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/cards/CardNode.js)
and its subtypes).

The function model (see
[AbstractFunction](https://github.com/phetsims/function-builder/blob/master/js/common/model/functions/AbstractFunction.js)
and its subtypes) is responsible for applying the function to an input and producing an output. For programming
convenience, it also carries some view-specific information (e.g., the color of the function's background,
the icon to display on the function to identify it).

There are two primary types of functions:
* image functions: These functions perform an image transform using Canvas.  See
[ImageFunction](https://github.com/phetsims/function-builder/blob/master/js/common/model/functions/ImageFunction.js).
* numeric functions: These functions perform mathematical functions using rational numbers. See
[MathFunction](https://github.com/phetsims/function-builder/blob/master/js/common/model/functions/MathFunction.js)
and its subtypes.

Support for rational numbers is implemented in
(RationalNumber)[https://github.com/phetsims/function-builder/blob/master/js/common/model/RationalNumber.js].
This is a wrapper around the 3rd-party library [BigRational.js](https://github.com/peterolson/BigRational.js).
It wraps only the functionality required for this simulation, so is not generally useful.

The builder is modeled in
[Builder](https://github.com/phetsims/function-builder/blob/master/js/common/model/builder/Builder.js). It is
responsible for managing the functions in its slots, and applying those functions to cards. For programming
convenience, it also carries some view-specific information (e.g., the builder's dimensions, the color scheme
applied to the builder).

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