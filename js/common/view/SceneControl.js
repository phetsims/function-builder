// Copyright 2015-2017, University of Colorado Boulder

/**
 * Control for selecting a scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  /**
   * @param {Property.<Scene>} selectedSceneProperty
   * @param {Scene[]} scenes
   * @param {Object} [options]
   * @constructor
   */
  function SceneControl( selectedSceneProperty, scenes, options ) {

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

    const content = [];
    scenes.forEach( function( scene ) {
      assert && assert( scene.iconNode, 'expected iconNode for scene' );
      content.push( {
        value: scene,
        node: scene.iconNode
      } );
    } );

    RadioButtonGroup.call( this, selectedSceneProperty, content, options );
  }

  functionBuilder.register( 'SceneControl', SceneControl );

  return inherit( RadioButtonGroup, SceneControl );
} );
