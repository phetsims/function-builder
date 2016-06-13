// Copyright 2015-2016, University of Colorado Boulder

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
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  /**
   * @param {Property} selectedSceneProperty
   * @param {Scene[]} scenes
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneControl( selectedSceneProperty, scenes, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      spacing: 20,
      baseColor: 'white',
      selectedLineWidth: 2,
      buttonContentXMargin: 10,
      buttonContentYMargin: 16
    }, options );

    // touchArea optimized for spacing
    options.touchAreaXDilation = ( options.spacing / 2 ) - 1;
    options.touchAreaYDilation = 5;

    var content = [];
    scenes.forEach( function( scene ) {
      assert && assert( scene.iconNode, 'expected iconNode for scene' );
      content.push( {
        value: scene,
        node: scene.iconNode
      } );
    } );

    RadioButtonGroup.call( this, selectedSceneProperty, content, options );
  }

  functionBuilder.register( 'PatternsSceneControl', PatternsSceneControl );

  return inherit( RadioButtonGroup, PatternsSceneControl );
} );
