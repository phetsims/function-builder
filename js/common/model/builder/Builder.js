// Copyright 2016, University of Colorado Boulder

/**
 * A builder produces an output by running an input through a set of functions.
 * The functions occupy a set of slots in what is conceptually a series pipeline.
 * Each slot contains 0 or 1 function instance.
 * An empty slot is equivalent to the identity function.
 * Each slot has an associated window, through which a card can be seen when passing through the builder
 * when the 'See Inside' feature is turned on.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionSlot = require( 'FUNCTION_BUILDER/common/model/builder/FunctionSlot' );
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

    // used to compute other default option values
    var NUMBER_OF_SLOTS = ( options && options.numberOfSlots ) ? options.numberOfSlots : 1;

    options = _.extend( {

      // {number} number of function slots
      numberOfSlots: NUMBER_OF_SLOTS,

      // {number} horizontal distance between input and output slots
      width: ( NUMBER_OF_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 75,

      // {number} height of the builder at it ends
      endHeight: FBConstants.FUNCTION_SIZE.height + 58,

      // {number} height of the builder at its waist
      waistHeight: FBConstants.FUNCTION_SIZE.height + 20,

      // {Vector2} location of the center of the input
      location: new Vector2( 0, 0 ),

      // {*} color scheme for builder, with these properties:
      // top - top color for vertical gradient
      // middle - middle color for vertical gradient
      // bottom - bottom color for vertical gradient
      // ends - color for builder ends
      colorScheme: FBColors.BUILDER_BLUE

    }, options );

    // verify duck typing of colorScheme
    assert && assert( options.colorScheme.top && options.colorScheme.middle &&
    options.colorScheme.bottom && options.colorScheme.ends );

    // @public (read-only)
    this.width = options.width;
    this.endHeight = options.endHeight;
    this.waistHeight = options.waistHeight;
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

    // @public emit is called when any function changes
    this.functionChangedEmitter = new Emitter();

    // @public for layout convenience
    this.left = this.location.x;
    this.right = this.left + options.width;
    this.centerX = this.left + ( options.width / 2 );
  }

  functionBuilder.register( 'Builder', Builder );

  return inherit( Object, Builder, {

    /**
     * Applies functions to an input.
     *
     * @param {*} input - input, type is specific to the functions
     * @param {number} numberOfFunctionsToApply - how many functions to apply (empty slots are effectively identity functions)
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
     * Applies all functions that are in the builder.
     *
     * @param {*} input - input, type is specific to the functions
     * @returns {*} output, with same type as input
     */
    applyAllFunctions: function( input ) {
      return this.applyFunctions( input, this.slots.length );
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
      assert && assert( !this.containsFunctionInstance( functionInstance ), 'function is already in builder' );

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

      slot.clear();
      this.functionChangedEmitter.emit();
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
     * Gets the location of the specified slot.
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
     * Gets the slot that is closest to the specified location.
     *
     * @param {Vector2} location - the location of the function instance
     * @param {number} distanceThreshold - location must be at least this close to slot's location
     * @returns {number} slot number, FunctionSlot.NO_SLOT_NUMBER if no slot is close enough
     * @public
     */
    getClosestSlot: function( location, distanceThreshold ) {
      assert && assert( location );
      var slotNumber = FunctionSlot.NO_SLOT_NUMBER;
      for ( var i = 0; i < this.slots.length; i++ ) {
        var slot = this.slots[ i ];
        if ( slotNumber === FunctionSlot.NO_SLOT_NUMBER ) {
          if ( slot.location.distance( location ) < distanceThreshold ) {
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
     * Is the specified window number valid?
     *
     * @param {number} windowNumber
     * @returns {boolean}
     * @public
     */
    isValidWindowNumber: function( windowNumber ) {
      return this.isValidSlotNumber( windowNumber );
    },

    /**
     * Gets the location (center) of a 'see inside' window.
     *
     * @param {number} windowNumber
     * @returns {Vector2}
     * @public
     */
    getWindowLocation: function( windowNumber ) {
      assert && assert( this.isValidWindowNumber( windowNumber ) );
      var slot = this.slots[ windowNumber ];
      return new Vector2( slot.location.x + WINDOW_X_OFFSET, slot.location.y );
    },

    /**
     * Gets the number of the window that is immediately to the right of some x coordinate.
     *
     * @param {number} x
     * @returns {number} FunctionSlot.NO_SLOT_NUMBER if there is no window to the right
     * @public
     */
    getRightWindowNumber: function( x ) {
      for ( var i = 0; i < this.slots.length; i++ ) {
        var windowLocation = this.getWindowLocation( i );
        if ( windowLocation.x > x ) {
          return i;
        }
      }
      return FunctionSlot.NO_SLOT_NUMBER;
    },

    /**
     * Gets the number of the window that is immediately to the left of some x coordinate.
     *
     * @param {number} x
     * @returns {number} FunctionSlot.NO_SLOT_NUMBER if there is no window to the left
     * @public
     */
    getLeftWindowNumber: function( x ) {
      for ( var i = this.slots.length - 1; i >= 0; i-- ) {
        var windowLocation = this.getWindowLocation( i );
        if ( windowLocation.x < x ) {
          return i;
        }
      }
      return FunctionSlot.NO_SLOT_NUMBER;
    }
  } );
} );
