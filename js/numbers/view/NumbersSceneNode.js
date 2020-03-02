// Copyright 2016-2020, University of Colorado Boulder

/**
 * View of a scene in the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import FBFont from '../../common/FBFont.js';
import MathFunctionNode from '../../common/view/functions/MathFunctionNode.js';
import MathSceneNode from '../../common/view/MathSceneNode.js';
import functionBuilderStrings from '../../function-builder-strings.js';
import functionBuilder from '../../functionBuilder.js';

// strings
const inputString = functionBuilderStrings.input;
const outputString = functionBuilderStrings.output;

class NumbersSceneNode extends MathSceneNode {

  /**
   * @param {NumbersScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   */
  constructor( scene, layoutBounds, options ) {

    options = merge( {

      cardCarouselDefaultPageNumber: 1,  // show cards 0-3 in input carousel
      functionsPerPage: 3, // number of functions visible in the carousel
      hasTableDrawer: true, // include an XY table drawer
      hasEquationDrawer: true, // include an equation drawer

      // options for XYTableNode
      tableOptions: {
        xSymbol: inputString, // use 'Input' in place of x
        ySymbol: outputString, // use 'Output' in place of y
        headingFont: new FBFont( 18 ) // different font for 'Input' and 'Output'
      },

      // options for EquationPanel
      equationOptions: {
        xSymbol: inputString, // use 'Input' in place of x
        ySymbol: outputString, // use 'Output' in place of y
        xyFont: new FBFont( 24 ), // different font for 'Input' and 'Output'
        xyAsCards: true // card outlines around 'Input' and 'Output'
      }

    }, options );

    super( scene, layoutBounds, MathFunctionNode, options );
  }
}

functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

export default NumbersSceneNode;