// Copyright 2015-2019, University of Colorado Boulder

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
define( require => {
  'use strict';

  // modules
  const Emitter = require( 'AXON/Emitter' );
  const FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const FunctionSlot = require( 'FUNCTION_BUILDER/common/model/builder/FunctionSlot' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Vector2 = require( 'DOT/Vector2' );

  // {number} x-offset of center of 'see inside' window from it's corresponding slot in the builder
  const WINDOW_X_OFFSET = ( FBConstants.FUNCTION_SIZE.width / 2 ) -
                        ( FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width / 2 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Builder( options ) {

    options = merge( {

      // {number} number of function slots
      numberOfSlots: 1,

      // {number} horizontal distance between input and output slots
      width: 200,

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
    this.numberOfSlots = options.numberOfSlots;
    this.width = options.width;
    this.endHeight = options.endHeight;
    this.waistHeight = options.waistHeight;
    this.location = options.location;
    this.colorScheme = options.colorScheme;

    // width occupied by slots
    let totalWidthOfSlots = options.numberOfSlots * FBConstants.FUNCTION_SIZE.width;
    if ( options.numberOfSlots > 1 ) {
      totalWidthOfSlots -= ( ( options.numberOfSlots - 1 ) * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width );
    }
    assert && assert( totalWidthOfSlots > 0 );

    // @public {FunctionSlot[]} slots
    this.slots = [];
    const leftSlotLocation = new Vector2( this.location.x + ( this.width - totalWidthOfSlots + FBConstants.FUNCTION_SIZE.width ) / 2, this.location.y );
    for ( let i = 0; i < options.numberOfSlots; i++ ) {

      // location is at slot's center
      const dx = i * FBConstants.FUNCTION_SIZE.width - i * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width;
      const slotLocation = leftSlotLocation.plusXY( dx, 0 );

      // each slot is initially empty
      this.slots.push( new FunctionSlot( slotLocation ) );
    }
    assert && assert( this.slots.length === this.numberOfSlots );

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
      assert && assert( ( numberOfFunctionsToApply >= 0 ) && ( numberOfFunctionsToApply <= this.numberOfSlots ) );
      let output = input;
      for ( let i = 0; i < numberOfFunctionsToApply; i++ ) {
        const slot = this.slots[ i ];
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
      return this.applyFunctions( input, this.numberOfSlots );
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

      const slot = this.slots[ slotNumber ];
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

      const slot = this.slots[ slotNumber ];
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
      for ( let i = 0; i < this.slots.length; i++ ) {
        const slot = this.slots[ i ];
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
     * @returns {Vector2} location in the global coordinate frame
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
      let slotNumber = FunctionSlot.NO_SLOT_NUMBER;
      for ( let i = 0; i < this.slots.length; i++ ) {
        const slot = this.slots[ i ];
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
      const slot = this.slots[ windowNumber ];
      return new Vector2( slot.location.x + WINDOW_X_OFFSET, slot.location.y );
    },

    /**
     * Gets the number of the window whose x coordinate is > some x coordinate.
     *
     * @param {number} x
     * @returns {number} FunctionSlot.NO_SLOT_NUMBER if there is no window >
     * @public
     */
    getWindowNumberGreaterThan: function( x ) {
      for ( let i = 0; i < this.slots.length; i++ ) {
        const windowLocation = this.getWindowLocation( i );
        if ( windowLocation.x > x ) {
          return i;
        }
      }
      return FunctionSlot.NO_SLOT_NUMBER;
    },

    /**
     * Gets the number of the window whose x coordinate is <= some x coordinate.
     *
     * @param {number} x
     * @returns {number} FunctionSlot.NO_SLOT_NUMBER if there is no window <=
     * @public
     */
    getWindowNumberLessThanOrEqualTo: function( x ) {
      for ( let i = this.slots.length - 1; i >= 0; i-- ) {
        const windowLocation = this.getWindowLocation( i );
        if ( windowLocation.x <= x ) {
          return i;
        }
      }
      return FunctionSlot.NO_SLOT_NUMBER;
    }
  } );
} );
