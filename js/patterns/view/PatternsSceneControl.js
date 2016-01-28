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

  var FUNCTION_WIDTH = 30;

  /**
   * @param {Property} selectedSceneProperty
   * @param {PatternsScene[]} scenes
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneControl( selectedSceneProperty, scenes, options ) {

    options = options || {};
    options.orientation = 'horizontal';
    options.spacing = 20;
    options.baseColor = 'white';
    options.selectedLineWidth = 2;
    options.buttonContentXMargin = 10;
    options.buttonContentYMargin = 16;

    var content = [];
    for ( var i = 0; i < scenes.length; i++ ) {
      content.push( {
        value: scenes[ i ],
        node: scenes[ i ].createIcon( FUNCTION_WIDTH )
      } );
    }

    RadioButtonGroup.call( this, selectedSceneProperty, content, options );
  }

  functionBuilder.register( 'PatternsSceneControl', PatternsSceneControl );

  return inherit( RadioButtonGroup, PatternsSceneControl );
} );
