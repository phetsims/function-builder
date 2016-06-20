// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSceneNode = require( 'FUNCTION_BUILDER/common/view/MathSceneNode' );

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function EquationsSceneNode( scene, layoutBounds, options ) {

    options = _.extend( {
      cardCarouselDefaultPageNumber: 1,
      functionsPerPage: 2,
      hasTableDrawer: true,
      hasGraphDrawer: true,
      hasEquationDrawer: true
    }, options );

    MathSceneNode.call( this, scene, layoutBounds, options );
  }

  functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

  return inherit( MathSceneNode, EquationsSceneNode );
} );
