// Copyright 2016-2020, University of Colorado Boulder

/**
 * Scene for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import EditableMathFunctionNode from '../../common/view/functions/EditableMathFunctionNode.js';
import MathSceneNode from '../../common/view/MathSceneNode.js';
import functionBuilder from '../../functionBuilder.js';

/**
 * @param {EquationsScene} scene - model for this scene
 * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
 * @param {Object} [options]
 * @constructor
 */
function EquationsSceneNode( scene, layoutBounds, options ) {

  options = merge( {
    cardCarouselDefaultPageNumber: 1,  // show cards 0-3 in input carousel
    functionsPerPage: 2, // number of functions visible in the carousel
    hasTableDrawer: true, // include an XY table drawer
    hasGraphDrawer: true, // include an XY graph drawer
    hasEquationDrawer: true // include an equation drawer
  }, options );

  MathSceneNode.call( this, scene, layoutBounds, EditableMathFunctionNode, options );
}

functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

inherit( MathSceneNode, EquationsSceneNode );
export default EquationsSceneNode;