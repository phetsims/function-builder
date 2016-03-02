// Copyright 2016, University of Colorado Boulder

/**
 * A function slot in a builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Vector2} location - location of the slot in the global coordinate frame
   * @param {AbstractFunction|null} functionInstance - the function instance that occupies the slot, null if the slot is empty
   * @constructor
   */
  function FunctionSlot( location, functionInstance ) {
    this.location = location; // @public (read-only)
    this.functionInstance = functionInstance; // @public
  }

  functionBuilder.register( 'FunctionSlot', FunctionSlot );

  return inherit( Object, FunctionSlot, {

    // @public is this slot empty?
    isEmpty: function() { return ( this.functionInstance === null ); },

    // @public does this slot contain a specified {AbstractFunction} function instance?
    contains: function( functionInstance ) {
      assert && assert( functionInstance );  // so we don't accidentally test whether the slot is empty
      return ( this.functionInstance === functionInstance );
    }
  } );
} );