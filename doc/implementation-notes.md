TODO

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