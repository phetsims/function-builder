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
   * @param {Vector2} location - location of the slot in the model coordinate frame
   * @constructor
   */
  function FunctionSlot( location ) {

    // @public (read-only)
    this.location = location;

    // @public {AbstractFunction|null} the function instance that occupies the slot, null if the slot is empty
    this.functionInstance = null;
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
  }, {

    NO_SLOT_NUMBER: -1  // used to indicate the absence of a valid slot number
  } );
} );