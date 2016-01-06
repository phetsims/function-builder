// Copyright 2015, University of Colorado Boulder

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
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
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
      colorScheme: FBColors.BUILDER_MAROON
    }, options );

    assert && assert( options.colorScheme.top );
    assert && assert( options.colorScheme.middle );
    assert && assert( options.colorScheme.bottom );
    assert && assert( options.colorScheme.ends );

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
  }

  functionBuilder.register( 'Builder', Builder );

  inherit( Object, Builder, {

    // @public
    reset: function() {
      this.slots.forEach( function( slot ) {
        slot.reset();
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
      var DISTANCE_THRESHOLD = 0.6 * this.height; //TODO should this be computed? move elsewhere?
      var slotNumber = this.getClosestSlot( functionInstance.locationProperty.get(), DISTANCE_THRESHOLD );
      if ( slotNumber !== -1 ) {
        var slot = this.slots[ slotNumber ];
        if ( !slot.isEmpty() ) {
          // function in the slot goes back to where it originated
          slot.functionInstanceProperty.get().locationProperty.reset();
        }
        slot.functionInstanceProperty.set( functionInstance );
        functionInstance.locationProperty.set( slot.location );
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
      for ( var i = 0; i < this.slots.length && !removed; i++ ) {
        var slot = this.slots[ i ];
        if ( slot.contains( functionInstance ) ) {

          slot.functionInstanceProperty.set( null );
          removed = true;

          // move the function, so that it's obvious that it's no longer in the slot
          functionInstance.locationProperty.set( functionInstance.locationProperty.get().plusXY( 10, -10 ) );
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
    PropertySet.call( this, {
      functionInstance: functionInstance // @public
    } );
  }

  functionBuilder.register( 'Builder.Slot', Slot );

  inherit( PropertySet, Slot, {

    // @public is the slot empty?
    isEmpty: function() { return ( this.functionInstanceProperty.get() === null ); },

    // @public does this slot contain a specified {AbstractFunction} function instance?
    contains: function( functionInstance ) {
      return this.functionInstanceProperty.get() === functionInstance;
    }
  } );

  return Builder;
} );
