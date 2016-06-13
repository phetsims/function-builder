// Copyright 2016, University of Colorado Boulder

/**
 * Workaround for https://github.com/phetsims/function-builder/issues/35.
 * Add this node to each ScreenView.
 * No idea why this works.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Bounds2} layoutBounds - bounds of the ScreenView
   * @constructor
   */
  function Workaround35( layoutBounds ) {

    RadioButtonGroup.call( this, new Property( 0 ), [
      // doesn't matter what's here
      { value: 0, node: new Rectangle( 0, 0, 10, 10, { fill: 'red' } ) },
      { value: 1, node: new Rectangle( 0, 0, 10, 10, { fill: 'green' } ) }
    ], {
      renderer: 'canvas',
      orientation: 'horizontal',
      centerX: layoutBounds.centerX,
      top: layoutBounds.top
    } );
  }

  functionBuilder.register( 'Workaround35', Workaround35 );

  return inherit( RadioButtonGroup, Workaround35 );
} );
