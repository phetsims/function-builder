# Function Builder - implementation notes

This document contains miscellaneous notes related to the implementation of Function Builder. It
supplements the internal documentation that appears in the code, and (hopefully) provides some insight into
"big picture" implementation issues.  The audience for this document is software developers who are familar
with JavaScript and the PhET simulation development (as described in [PhET Development Overview]
(http://bit.ly/phet-development-overview)).

First, read [model.md](https://github.com/phetsims/function-builder/blob/master/doc/model.md), which provides
a high-level description of the simulation model.

Things to discuss...

No model-view transform. All locations are in the view coordinate frame.

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