// Copyright 2015-2016, University of Colorado Boulder

/**
 * A builder produces an output by running an input through a set of functions.
 * The functions occupy a set of slots in what is conceptually a serial pipeline.
 * Each slot contains 0 or 1 function instance.
 * An empty slot is equivalent to the identity function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBUtils = require( 'FUNCTION_BUILDER/common/FBUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionSlot = require( 'FUNCTION_BUILDER/common/model/FunctionSlot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );

  // {number} x-offset of center of 'see inside' window from it's corresponding slot in the builder
  var WINDOW_X_OFFSET = ( FBConstants.FUNCTION_SIZE.width / 2 ) -
                        ( FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width / 2 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Builder( options ) {

    options = _.extend( {
      numberOfSlots: 1, // {number} number of function slots
      width: 450, // {number} horizontal distance between input and output
      height: 125, // {number} height of tallest part of the builder
      location: new Vector2( 0, 0 ), // {Vector2} location of the center of the input
      colorScheme: FBColors.BUILDER_MAROON // {Object} color scheme, see FBUtils.isaBuilderColorScheme
    }, options );

    // verify duck typing of colorScheme
    assert && assert( FBUtils.isaBuilderColorScheme( options.colorScheme ) );

    // @public (read-only)
    this.width = options.width;
    this.height = options.height;
    this.location = options.location;
    this.colorScheme = options.colorScheme;

    // width occupied by slots
    var totalWidthOfSlots = options.numberOfSlots * FBConstants.FUNCTION_SIZE.width;
    if ( options.numberOfSlots > 1 ) {
      totalWidthOfSlots -= ( ( options.numberOfSlots - 1 ) * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width );
    }
    assert && assert( totalWidthOfSlots > 0 );

    // @public {FunctionSlot[]} slots
    this.slots = [];
    var leftSlotLocation = new Vector2( this.location.x + ( this.width - totalWidthOfSlots + FBConstants.FUNCTION_SIZE.width ) / 2, this.location.y );
    for ( var i = 0; i < options.numberOfSlots; i++ ) {

      // location is at slot's center
      var dx = i * FBConstants.FUNCTION_SIZE.width - i * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width;
      var slotLocation = leftSlotLocation.plusXY( dx, 0 );

      // each slot is initially empty
      this.slots.push( new FunctionSlot( slotLocation ) );
    }

    // @public emit when any function changes
    this.functionChangedEmitter = new Emitter();

    // @public for convenience
    this.left = this.location.x;
    this.right = this.left + options.width;
    this.centerX = this.left + ( options.width / 2 );
  }

  functionBuilder.register( 'Builder', Builder );

  return inherit( Object, Builder, {

    /**
     * Is the specified slot number valid?
     *
     * @param {number} slotNumber
     * @returns {boolean}
     * @public
     */
    isValidSlotNumber: function( slotNumber ) {
      return ( slotNumber >= 0 && slotNumber < this.slots.length  );
    },

    /**
     * Puts a function instance into a slot.
     *
     * @param {AbstractFunction} functionInstance
     * @param {number} slotNumber
     * @public
     */
    addFunctionInstance: function( functionInstance, slotNumber ) {
      assert && assert( functionInstance );
      assert && assert( this.isValidSlotNumber( slotNumber ) );
      var slot = this.slots[ slotNumber ];
      assert && assert( slot.isEmpty(), 'slot ' + slotNumber + ' is occupied' );
      slot.functionInstance = functionInstance;
      this.functionChangedEmitter.emit();
    },

    /**
     * Removes a function instance from a slot.
     *
     * @param {AbstractFunction} functionInstance
     * @param {number} slotNumber
     * @public
     */
    removeFunctionInstance: function( functionInstance, slotNumber ) {
      assert && assert( functionInstance );
      assert && assert( this.isValidSlotNumber( slotNumber ) );
      var slot = this.slots[ slotNumber ];
      assert && assert( slot.contains( functionInstance ), 'functionInstance is not in slot ' + slotNumber );
      slot.functionInstance = null;
      this.functionChangedEmitter.emit();
    },

    /**
     * Gets the location of the specified slot.
     * Convenience function, delegates to the model.
     *
     * @param {number} slotNumber
     * @returns {Vector2} location in the model coordinate frame
     * @public
     */
    getSlotLocation: function( slotNumber ) {
      assert && assert( this.isValidSlotNumber( slotNumber ) );
      return this.slots[ slotNumber ].location;
    },

    /**
     * Gets the slot number occupied by a function instance.
     *
     * @param {AbstractFunction} functionInstance
     * @returns {number} FunctionSlot.NO_SLOT_NUMBER if the function instance isn't in any slot
     * @public
     */
    getSlotNumber: function( functionInstance ) {
      assert && assert( functionInstance );
      for ( var i = 0; i < this.slots.length; i++ ) {
        var slot = this.slots[ i ];
        if ( slot.contains( functionInstance ) ) {
          return i;
        }
      }
      return FunctionSlot.NO_SLOT_NUMBER;
    },

    /**
     * Does the builder contain the specified function instance?
     *
     * @param {AbstractFunction} functionInstance
     * @returns {boolean}
     * @public
     */
    containsFunctionInstance: function( functionInstance ) {
      assert && assert( functionInstance );
      return ( this.getSlotNumber( functionInstance ) !== FunctionSlot.NO_SLOT_NUMBER );
    },

    /**
     * Gets the slot that is closest to the specified location.
     *
     * @param {Vector2} location - the location of the function instance
     * @returns {number} slot number, FunctionSlot.NO_SLOT_NUMBER if no slot is close enough
     * @public
     */
    getClosestSlot: function( location ) {
      assert && assert( location );
      var DISTANCE_THRESHOLD = 0.6 * this.height;  // must be at least this close
      var slotNumber = FunctionSlot.NO_SLOT_NUMBER;
      for ( var i = 0; i < this.slots.length; i++ ) {
        var slot = this.slots[ i ];
        if ( slotNumber === FunctionSlot.NO_SLOT_NUMBER ) {
          if ( slot.location.distance( location ) < DISTANCE_THRESHOLD ) {
            slotNumber = i;
          }
        }
        else if ( slot.location.distance( location ) < this.slots[ slotNumber ].location.distance( location ) ) {
          slotNumber = i;
        }
      }
      return slotNumber;
    },

    /**
     * Applies functions to an input.
     * @param {*} input - input, type is specific to the functions
     * @param {number} numberOfFunctionsToApply - how many functions to apply from the builder
     * @returns {*} output, with same type as input
     */
    applyFunctions: function( input, numberOfFunctionsToApply ) {

      assert && assert( ( numberOfFunctionsToApply >= 0 ) && ( numberOfFunctionsToApply <= this.slots.length ) );

      var output = input;
      for ( var i = 0; i < numberOfFunctionsToApply; i++ ) {
        var slot = this.slots[ i ];
        if ( !slot.isEmpty() ) {
          output = slot.functionInstance.apply( output );
        }
      }
      return output;
    },

    /**
     * Is the specified window number valid?
     * @param {number} windowNumber
     * @returns {boolean}
     * @public
     */
    isValidWindowNumber: function( windowNumber ) {
      return this.isValidSlotNumber( windowNumber );
    },

    /**
     * Gets the location (center) of a 'see inside' window.
     * @param {number} windowNumber
     * @returns {*}
     */
    getWindowLocation: function( windowNumber ) {
      assert && assert( this.isValidWindowNumber( windowNumber ) );
      var slot = this.slots[ windowNumber ];
      return new Vector2( slot.location.x + WINDOW_X_OFFSET, slot.location.y );
    },

    /**
     * Gets the number of the window that is immediately to the right of a location.
     * @param {Vector2} location
     * @returns {number} FunctionSlot.NO_SLOT_NUMBER if there is no window to the right
     */
    getRightWindowNumber: function( location ) {
      for ( var i = 0; i < this.slots.length; i++ ) {
        var windowLocation = this.getWindowLocation( i );
        if ( location.x <= windowLocation.x ) {
          return i;
        }
      }
      return FunctionSlot.NO_SLOT_NUMBER;
    },

    /**
     * Gets the number of the window that is immediately to the left of a location.
     * @param {Vector2} location
     * @returns {number} FunctionSlot.NO_SLOT_NUMBER if there is no window to the left
     */
    getLeftWindowNumber: function( location ) {
      for ( var i = this.slots.length - 1; i >= 0; i-- ) {
        var windowLocation = this.getWindowLocation( i );
        if ( windowLocation.x <= location.x ) {
          return i;
        }
      }
      return FunctionSlot.NO_SLOT_NUMBER;
    }
  } );
} );
