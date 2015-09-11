// Copyright 2002-2015, University of Colorado Boulder

/**
 * Scene control for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  var FUNCTION_WIDTH = 25;

  /**
   * @param {Property<string>} sceneNameProperty - name of the scene that is visible, 'single'|'dual'|'composed'
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneControl( sceneNameProperty, options ) {

    options = options || {};
    options.orientation = 'horizontal';
    options.spacing = 15;
    options.baseColor = 'white';
    options.selectedLineWidth = 2;
    options.buttonContentXMargin = 10;
    options.buttonContentYMargin = 5;

    RadioButtonGroup.call( this, sceneNameProperty, [
      { value: 'single', node: PatternsIconFactory.createSingleSceneIcon( FUNCTION_WIDTH ) },
      { value: 'dual', node: PatternsIconFactory.createDualSceneIcon( FUNCTION_WIDTH ) },
      { value: 'composed', node: PatternsIconFactory.createComposedSceneIcon( FUNCTION_WIDTH ) }
    ], options );
  }

  return inherit( RadioButtonGroup, PatternsSceneControl );
} );
