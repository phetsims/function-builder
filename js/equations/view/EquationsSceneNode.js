// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EditableMathFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/EditableMathFunctionNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSceneNode = require( 'FUNCTION_BUILDER/common/view/MathSceneNode' );

  /**
   * @param {EquationsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function EquationsSceneNode( scene, layoutBounds, options ) {

    options = _.extend( {
      cardCarouselDefaultPageNumber: 1,  // show cards 0-3 in input carousel
      functionsPerPage: 2, // number of functions visible in the carousel
      hasTableDrawer: true, // include an XY table drawer
      hasGraphDrawer: true, // include an XY graph drawer
      hasEquationDrawer: true // include an equation drawer
    }, options );

    MathSceneNode.call( this, scene, layoutBounds, EditableMathFunctionNode, options );
  }

  functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

  return inherit( MathSceneNode, EquationsSceneNode );
} );
