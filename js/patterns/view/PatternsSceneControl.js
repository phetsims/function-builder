// Copyright 2015, University of Colorado Boulder

/**
 * Scene control for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  var FUNCTION_WIDTH = 30;

  /**
   * @param {Property} selectedSceneProperty
   * @param {SingleScene} singleScene
   * @param {DualScene} dualScene
   * @param {ComposedScene} composedScene
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneControl( selectedSceneProperty, singleScene, dualScene, composedScene, options ) {

    options = options || {};
    options.orientation = 'horizontal';
    options.spacing = 20;
    options.baseColor = 'white';
    options.selectedLineWidth = 2;
    options.buttonContentXMargin = 10;
    options.buttonContentYMargin = 5;

    RadioButtonGroup.call( this, selectedSceneProperty, [
      { value: singleScene, node: PatternsIconFactory.createSingleSceneIcon( FUNCTION_WIDTH ) },
      { value: dualScene, node: PatternsIconFactory.createDualSceneIcon( FUNCTION_WIDTH ) },
      { value: composedScene, node: PatternsIconFactory.createComposedSceneIcon( FUNCTION_WIDTH ) }
    ], options );
  }

  functionBuilder.register( 'PatternsSceneControl', PatternsSceneControl );

  return inherit( RadioButtonGroup, PatternsSceneControl );
} );
