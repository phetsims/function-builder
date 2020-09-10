// Copyright 2015-2020, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Dimension2 from '../../../dot/js/Dimension2.js';
import Range from '../../../dot/js/Range.js';
import Vector2 from '../../../dot/js/Vector2.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import functionBuilder from '../functionBuilder.js';
import FBSymbols from './FBSymbols.js';

// constants that are used to compute other constants
const CARD_SIZE = new Dimension2( 70, 70 );
const FUNCTION_SIZE = new Dimension2( 165, CARD_SIZE.height + 8 );

const FBConstants = {

  // layoutBounds for all ScreenView subtypes
  SCREEN_VIEW_LAYOUT_BOUNDS: new Bounds2( 0, 0, 1024, 618 ),

  // offset of the Reset All button from the lower-right corner of the screen
  RESET_ALL_BUTTON_OFFSET: new Vector2( -50, -20 ),

  //--------------------------------------------------------------------------------------------------------
  // Builder

  // all builders have the same y position, so that the builder doesn't move around when switching screens
  BUILDER_Y: 285,

  //--------------------------------------------------------------------------------------------------------
  // Cards

  // options for cards and things that looks like cards ('see inside' windows, 'mole under carpet')
  CARD_OPTIONS: {
    size: CARD_SIZE, // dimensions of a card Node
    cornerRadius: 5, // corner radius of a card Node
    fill: 'white',
    stroke: 'black',
    lineWidth: 1,
    lineDash: []
  },

  // how much a card should 'pop out' of its container when clicked
  CARD_POP_OUT_OFFSET: new Vector2( 0, -10 ),

  // distance/second that cards move when animating
  CARD_ANIMATION_SPEED: 400,

  //--------------------------------------------------------------------------------------------------------
  // Functions

  // dimensions of a function Node
  FUNCTION_SIZE: FUNCTION_SIZE,

  // x-inset of arrow-like ends of a function's shape
  FUNCTION_X_INSET_FACTOR: 0.15,

  // how much a function should 'pop out' of its container when clicked
  FUNCTION_POP_OUT_OFFSET: new Vector2( 0, -10 ),

  // function must be at least this close to a slot to be put into the builder
  FUNCTION_DISTANCE_THRESHOLD: ( FUNCTION_SIZE.width / 2 ) - 1,

  // distance/second that functions move when animating
  FUNCTION_ANIMATION_SPEED: 400,

  // scale of the icons on functions in Patterns screen
  PATTERNS_FUNCTION_ICON_SCALE: 0.3,

  // font for functions in Patterns screen
  PATTERNS_FUNCTION_FONT: new PhetFont( 44 ),

  // font for functions in Numbers screen
  NUMBERS_FUNCTION_FONT: new PhetFont( 30 ),

  // fonts for functions in Equations screen
  EQUATIONS_FUNCTION_PICKER_FONT: new PhetFont( 30 ),
  EQUATIONS_FUNCTION_OPERATOR_FONT: new PhetFont( 30 ),

  // font for hidden functions in Mystery screen
  MYSTERY_FUNCTION_FONT: new PhetFont( { size: 70, weight: 'bold' } ),

  //--------------------------------------------------------------------------------------------------------
  // Drawers

  DRAWER_Y_OVERLAP: 1, // how much drawers overlap the builder

  // default option values used by all Drawers
  DRAWER_OPTIONS: {
    handleTouchAreaXDilation: 25, // x dilation of the drawer's handle
    handleTouchAreaYDilation: 8, // y dilation of the drawer's handle
    cornerRadius: 4
  },

  //--------------------------------------------------------------------------------------------------------
  // Table

  TABLE_DRAWER_SIZE: new Dimension2( 175, 200 ),
  TABLE_DRAWER_OPEN: false,
  TABLE_XY_HEADING_FONT: new MathSymbolFont( 18 ),

  //--------------------------------------------------------------------------------------------------------
  // Graph

  GRAPH_DRAWER_SIZE: new Dimension2( 200, 200 ),
  GRAPH_DRAWER_OPEN: false,

  // Ranges based on card numbers [-4,7] and worst case equation '+ 3 * 3 * 3'
  GRAPH_X_RANGE: new Range( -8, 8 ),
  GRAPH_Y_RANGE: new Range( -100, 100 ),

  //--------------------------------------------------------------------------------------------------------
  // Equations

  EQUATION_DRAWER_SIZE: new Dimension2( 300, 120 ),
  EQUATION_DRAWER_OPEN: false,

  // default option values shared by SlopeInterceptEquationNode and HelpfulEquationNode
  EQUATION_OPTIONS: {

    showLeftHandSide: true, // {boolean} whether to show left-hand side of the equation
    xSymbol: FBSymbols.X, // {string} symbol for input
    ySymbol: FBSymbols.Y, // {string} symbol for output
    xyAsCards: false, // {boolean} put x & y symbols on a rectangle background, like a card?
    xyMaxWidth: 100, // {number} maxWidth of x & y symbols, for i18n, determined empirically

    // colors
    xColor: 'black', // {Color|string} for x symbol
    yColor: 'black', // {Color|string} for y symbol
    color: 'black', // {Color|string} for everything else

    // fonts
    xyFont: new MathSymbolFont( 30 ), // {Font} font for x & y symbols
    symbolFont: new PhetFont( 30 ), // {Font} font for math symbols (equals, plus, minus)
    wholeNumberFont: new PhetFont( 30 ), // {Font} font for whole numbers
    fractionFont: new PhetFont( 20 ), // {Font} font for fractions
    signFont: new PhetFont( 22 ), // {Font} font for negative sign
    parenthesesFont: new PhetFont( 30 ), // {Font} font for parentheses

    // x spacing
    equalsXSpacing: 8, // {number} x space on both sides of equals sign
    signXSpacing: 3, // {number} x spacing between a negative sign and the number that follows it
    operatorXSpacing: 8, // {number} x space on both sides of an operator
    integerSlopeXSpacing: 3, // {number} x space between integer slope and x
    multiplierXSpacing: 3, // {number} x space following multiplier
    fractionSlopeXSpacing: 6, // {number} x space between fractional slope and x
    parenthesesXSpacing: 3, // {number} x space inside of parentheses

    // y spacing
    fractionYSpacing: 2, // {number} y space above and below fraction line

    //NOTE: These options are not currently implemented by HelpfulEquationNode.
    // y offsets, positive is down, everything is relative to the equals sign
    xyYOffset: 0, // {number} vertical offset of x & y symbols
    slopeYOffset: 0, // {number} vertical offset of slope
    interceptYOffset: 0, // {number} vertical offset of intercept
    operatorYOffset: 0 // {number} vertical offset of operators (plus, minus)
  }
};

functionBuilder.register( 'FBConstants', FBConstants );

export default FBConstants;