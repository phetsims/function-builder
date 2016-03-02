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
   * @param {PatternsScene[]} scenes
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

    var content = [];
    for ( var i = 0; i < scenes.length; i++ ) {
      content.push( {
        value: scenes[ i ],
        node: scenes[ i ].createIcon()
      } );
    }

    RadioButtonGroup.call( this, selectedSceneProperty, content, options );
  }

  functionBuilder.register( 'PatternsSceneControl', PatternsSceneControl );

  return inherit( RadioButtonGroup, PatternsSceneControl );
} );
