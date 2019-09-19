// Copyright 2016, University of Colorado Boulder

/**
 * A function slot in a builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );

  // constants
  var NO_FUNCTION_INSTANCE = null; // used to indicate the absence of function instance

  /**
   * @param {Vector2} location - location of the slot in the global coordinate frame
   * @constructor
   */
  function FunctionSlot( location ) {

    // @public (read-only)
    this.location = location;

    // @public {AbstractFunction|null} the function instance that occupies the slot, possibly empty
    this.functionInstance = NO_FUNCTION_INSTANCE;
  }

  functionBuilder.register( 'FunctionSlot', FunctionSlot );

  return inherit( Object, FunctionSlot, {

    /**
     * Is this slot empty?
     *
     * @returns {boolean}
     * @public
     */
    isEmpty: function() {
      return ( this.functionInstance === NO_FUNCTION_INSTANCE );
    },

    /**
     * Clears the slot, makes it empty.
     *
     * @public
     */
    clear: function() {
      this.functionInstance = NO_FUNCTION_INSTANCE;
    },

    /**
     * Does this slot contain a specified function instance?
     *
     * @param {AbstractFunction} functionInstance
     * @returns {boolean}
     * @public
     */
    contains: function( functionInstance ) {
      assert && assert( functionInstance );  // so we don't accidentally test whether the slot is empty
      return ( this.functionInstance === functionInstance );
    },

    /**
     * Is the slot invertible? Meaning, can a card be dragged backwards through this slot?
     *
     * @returns {boolean}
     * @public
     */
    isInvertible: function() {
      return ( this.isEmpty() || this.functionInstance.invertible );
    }
  }, {

    // @public @static used to indicate the absence of a valid slot number
    NO_SLOT_NUMBER: -1
  } );
} );