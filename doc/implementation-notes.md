# Function Builder - implementation notes

This document contains miscellaneous notes related to the implementation of Function Builder. It
supplements the internal (source code) documentation, and (hopefully) provides insight into
"big picture" implementation issues.  The audience for this document is software developers who are familiar
with JavaScript and PhET simulation development (as described in [PhET Development Overview]
(http://bit.ly/phet-development-overview)).

First, read [model.md](https://github.com/phetsims/function-builder/blob/master/doc/model.md), which provides
a high-level description of the simulation model.

## Terminology

This section enumerates terms that you'll see used throughout the internal and external documentation.
In alphabetical order:

* builder - the apparatus in the center of the screen
* cards - the things in the input and output carousel, that you drag through the builder
* challenge - a series of 1 or more functions in Mystery screen's builder. The user's tasks is to guess the function(s) in the challenge.
* container - an item in a carousel, which contains cards or functions
* drawers - things that slide out of the top & bottom of the builder, to reveal additional representations
* functions - the things in the functions carousel, that you drag into slots in the builder
* function carousel - horizontal carousel at bottom of screen
* generate button - the yellow button centered below the builder in the Mystery screen. Pressing it selects a challenge randomly from the pool.
* input carousel - vertical carousel on the left side of the screen
* output carousel - vertical carousel on the right side of the screen
* reveal buttons - toggle buttons below the functions in the Mystery screen (they have eyeball icons on them). Pressing a reveal button shows/hides the identity of the function directly above it. These buttons are initially disabled for a challenge. They are enabled when the output carousel contains 3 cards, and they remain enabled until a new challenge is generated.
* scene - a builder, set of cards and set of functions. Each screen has 1 or more scenes
* "see inside" windows - windows that appear in the builder to display intermediate results
* slots - places where you can drop functions in the builder

## General

This section describes how this simulation uses patterns that are common to most PhET simulations.

**Model-view transform**: Many PhET simulations have a model-view transform that maps between model and view coordinate frames
(see [ModelViewTransform2](https://github.com/phetsims/phetcommon/blob/master/js/view/ModelViewTransform2.js)).
The domain of this simulation has no need for a model coordinate frame, so the model and view coordinate frames
are treated as equivalent, and no transform is required. (If you don't understand that, don't worry about it.)

**Query parameters**: Query parameters are used to enable sim-specific features, mainly for debugging and
testing. All such query parameters are documented in
[FBQueryParameters](https://github.com/phetsims/function-builder/blob/master/js/common/FBQueryParameters.js).

**Initialization**: This simulation takes a long time to initialize, which can be a little annoying or disconcerting for the user.
We implemented 2 initialization strategies: (1) on start, which initializes when the sim starts, and
(2) on demand, which initialize when a feature is first used. These 2 strategies can be selected independently
for ScreenView and SceneNode types, using query parameters.
To investigate this further, see `'initScreenViews'` and `'initScenes'` in
[FBQueryParameters](https://github.com/phetsims/function-builder/blob/master/js/common/FBQueryParameters.js).

**Memory management**: All objects created in this simulation exist for the lifetime of the simulation, so there
is no need to call `dispose`.  Since there is no need to call `dispose`, it is generally not implemented for
sim-specific types. Likewise, when an observer is registered (e.g. via `link` or `addListener`), there is no need
to unregister that observer (e.g. via `unlink` or `removeListener`).  For clarity, all calls that register an
observer indicate whether a corresponding unregister call is required. For example:

```js
// unlink unnecessary, instances exist for lifetime of the sim
movable.locationProperty.link( ... );
```

## Model

This section provides an overview of the most important model elements, and some miscellaneous topics
related to the model.

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
For invertible functions, an explicit inverse function is not implemented.
Instead, all computations are performed in the forward direction, based on an input's location relative
to a function. A card's location is constrained based on whether a function is invertible; cards cannot be
dragged backwards through non-invertible functions.

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
and its subtypes implement the builder model. It is responsible for managing the functions in its slots, and
applying those functions to cards. For programming convenience, it also carries some view-specific information
(e.g., the builder's dimensions, the color scheme applied to the builder).

[Scene](https://github.com/phetsims/function-builder/blob/master/js/common/model/Scene.js)
and its subtypes implement a specific configuration that is to be displayed to the user.
The model for each screen contains one or more scenes. A scene consists of a builder, a set of cards, and a set of functions.
Subtypes of Scene add additional elements to the basic scene. For example,
[MysteryScene](https://github.com/phetsims/function-builder/blob/master/js/mystery/model/MysteryScene.js)
adds a pool of challenges for the "Mystery" screen.

**Two-phase model initialization**: Most PhET simulations create a model, then a corresponding view.
This simulation is a bit different; the
model cannot be fully instantiated without creating the view. The initial location of cards and functions is their
location in their respective carousels, which are view components.  So we cannot create cards and functions until
their carousels are created. Initialization of this simulation's model therefore occurs in 2 phases. In the first phase,
scenes are created without cards and functions. The view is then initialized, which creates the carousels. In
the second phase, the scenes are then populated with cards and functions. To investigate this further, see
`completeInitialization` in
[SceneNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/SceneNode.js).

## View

This section provides an overview of the most important view components, and some miscellaneous topics
related to the view.

[MovableNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/MovableNode.js)
is the base type for all nodes that move or animate (i.e., cards and functions).

[CardNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/cards/CardNode.js)
and its subtypes implement are responsible for what appears on the cards, based on their location
relative to the functions in the builder. CardNode encapsulates all drag handling for cards.

[FunctionNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/functions/FunctionNode.js)
and its subtypes implement the view of functions. FunctionNode encapsulates all drag handling for cards.

[BuilderNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/builder/BuilderNode.js)
implements the view of the builder, with a 3D perspective. It uses scenery's `clipArea` feature
to provide the illusion that cards are being dragged through the builder.

[SeeInsideLayer]() uses scenery's `clipArea` and DAG (Directed Acyclic Graph) features to provide the
illusion of being able to "see inside" the builder. All instances of CardNode are descendants of this node,
and thus visible when they pass a window.

[SceneNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/SceneNode.js) and
its subtypes display a scene.  Each screen has 1 or more scene.  If a screen has more than 1 scene, it
also has a control for selecting a scene (see
[SceneControl](https://github.com/phetsims/function-builder/blob/master/js/common/view/SceneControl.js)).

**Carousels and containers**: Cards and functions are not put directly into carousels. Rather, cards and functions
are put into *containers*, which are then put into the carousels. See
[MovableContainer](https://github.com/phetsims/function-builder/blob/master/js/common/view/containers/MovableContainer.js)
and its subtypes.
[CardContainer](https://github.com/phetsims/function-builder/blob/master/js/common/view/containers/CardContainer.js)
and its subtypes has responsibility for creating the model and view of cards.
[FunctionContainer](https://github.com/phetsims/function-builder/blob/master/js/common/view/containers/FunctionContainer.js)
has responsibility for creating the model and view of functions.

**Drawers**: A drawer is a user-interface for showing/hiding a feature. Drawers appear on the top and bottom
edges of the builder in some scenes.
[MathSceneNode](https://github.com/phetsims/function-builder/blob/master/js/common/view/MathSceneNode.js)
optionally adds drawers for these 3 features:
* XY table - a table of input and output values
* XY graph - a graph of input and output values
* Equation - equation (in 2 forms) that represents the functions in the builder

**Animation**: The view is responsible only for fading between scenes (using Tween.js).
All other animation is the responsibility of the model
(see `step` in [Movable](https://github.com/phetsims/function-builder/blob/master/js/common/model/Movable.js)).

**Mystery screen notes**: The Mystery screen was added late in the development process. This had a few
unfortunate (but not tragic) consequences for its implementation, which are worth describing here.
The Mystery screen has 3 scenes, but (unlike the other screens) it has no function carousel.  The function carousel
was at this point deeply ingrained in the architecture of scenes. So in order to reuse what had been done for
other screens, the function carousel exists in the Mystery screen, but is made invisible. And while the
function carousel is invisible, it continues to play an important, as a source of functions.
The function carousel is populated with enough functions to handle all challenges. When a challenge is generated,
functions are moved between the (invisible) carousel and the builder, and the functions are configured to match
the challenge. Had this screen been included from the beginning, this is *not* how things would have been
implemented. But it does work well, and is not unreasonably complicated to understand.