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
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );

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
    assert && assert( FBUtils.isaBuilderColorScheme( options.colorScheme  ) );

    // @public (read-only)
    this.width = options.width;
    this.height = options.height;
    this.location = options.location;
    this.colorScheme = options.colorScheme;

    // width occupied by slots
    var totalWidthOfSlots = options.numberOfSlots * FBConstants.FUNCTION_WIDTH;
    if ( options.numberOfSlots > 1 ) {
      totalWidthOfSlots -= ( ( options.numberOfSlots - 1 ) * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_WIDTH );
    }
    assert && assert( totalWidthOfSlots > 0 );

    // create and populate slots
    this.slots = [];
    var leftSlotLocation = new Vector2( this.location.x + ( this.width - totalWidthOfSlots + FBConstants.FUNCTION_WIDTH ) / 2, this.location.y );
    for ( var i = 0; i < options.numberOfSlots; i++ ) {

      // location is at slot's center
      var slotLocation = leftSlotLocation.plusXY( i * FBConstants.FUNCTION_WIDTH - i * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_WIDTH, 0 );

      // each slot is initially empty
      this.slots.push( new Slot( slotLocation, null ) );
    }

    // @public emit1({Builder}) when any function changes
    this.functionChangedEmitter = new Emitter();
  }

  functionBuilder.register( 'Builder', Builder );

  inherit( Object, Builder, {

    // @public
    reset: function() {
      this.slots.forEach( function( slot ) {
        slot.functionInstance = null;
      } );
    },

    /**
     * Does the builder contain the specified function instance?
     *
     * @param {AbstractFunction} functionInstance
     * @returns {boolean}
     * @public
     */
    containsFunctionInstance: function( functionInstance ) {
      var found = false;
      for ( var i = 0; i < this.slots.length && !found; i++ ) {
        found = this.slots[ i ].contains( functionInstance );
      }
      return found;
    },

    /**
     * Adds a function instance, if it's close enough to a slot.
     * If the slot is occupied, replace the function that occupies the slot.
     *
     * @param {AbstractFunction} functionInstance
     * @returns {number} slot number it was added to, -1 if not added
     * @public
     */
    addFunctionInstance: function( functionInstance ) {

      // find the closest slot
      var DISTANCE_THRESHOLD = 0.6 * this.height;
      var slotNumber = this.getClosestSlot( functionInstance.locationProperty.get(), DISTANCE_THRESHOLD );

      // if we found a slot...
      if ( slotNumber !== -1 ) {

        var slot = this.slots[ slotNumber ];

        // if the slot was occupied, return the occupier to whence it originated
        if ( !slot.isEmpty() ) {
          var oldFunctionInstance = slot.functionInstance;
          oldFunctionInstance.destination = oldFunctionInstance.locationProperty.initialValue;
        }

        // put the function instance in the slot
        slot.functionInstance = functionInstance;
        functionInstance.destination = slot.location;

        // notify that's there's been a change
        this.functionChangedEmitter.emit1( this );
      }

      return slotNumber;
    },

    /**
     * Removes a function instance.
     *
     * @param {AbstractFunction} functionInstance
     * @public
     */
    removeFunctionInstance: function( functionInstance ) {

      var removed = false;

      // iterate over the slots until we find the function instance or run out of slots
      for ( var i = 0; i < this.slots.length && !removed; i++ ) {
        var slot = this.slots[ i ];
        if ( slot.contains( functionInstance ) ) {

          // empty the slot
          slot.functionInstance = null;
          removed = true;

          // pop function out of slot
          functionInstance.setLocation( functionInstance.locationProperty.get().plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );

          // notify that there's been a change
          this.functionChangedEmitter.emit1( this );
        }
      }
      assert && assert( removed );
    },

    /**
     * Gets the slot that is closest to the specified location.
     *
     * @param {Vector2} location - the location of the function instance
     * @param {number} distanceThreshold - must be at least this close
     * @returns {number} slot number, -1 if no slot is close enough
     * @private
     */
    getClosestSlot: function( location, distanceThreshold ) {
      var slotNumber = -1;
      for ( var i = 0; i < this.slots.length; i++ ) {
        var slot = this.slots[ i ];
        if ( slotNumber === -1 ) {
          if ( slot.location.distance( location ) < distanceThreshold ) {
            slotNumber = i;
          }
        }
        else if ( slot.location.distance( location ) < this.slots[ slotNumber ].location.distance( location ) ) {
          slotNumber = i;
        }
      }
      return slotNumber;
    }
  } );

  /**
   * A function slot in the builder.
   * @param location - {Vector2} location of the slot in the global coordinate frame
   * @param {AbstractFunction|null} functionInstance - the function instance that occupies the slot, null if the slot is empty
   * @constructor
   */
  function Slot( location, functionInstance ) {
    this.location = location; // @public (read-only)
    this.functionInstance = functionInstance; // @public
  }

  functionBuilder.register( 'Builder.Slot', Slot );

  inherit( Object, Slot, {

    // @public is the slot empty?
    isEmpty: function() { return ( this.functionInstance === null ); },

    // @public does this slot contain a specified {AbstractFunction} function instance?
    contains: function( functionInstance ) {
      return this.functionInstance === functionInstance;
    }
  } );

  return Builder;
} );
