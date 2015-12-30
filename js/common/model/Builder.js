// Copyright 2015, University of Colorado Boulder

/**
 * The builder is a function 'pipeline'.
 * Each step in the pipeline is a function that takes 1 input and produces 1 output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Builder( options ) {

    options = _.extend( {
      numberOfFunctions: 3, // {number} maximum number of functions in the pipeline
      width: 450, // {number} distance between input and output slot
      height: 125, // {number} height of tallest part of the builder
      location: new Vector2( 285, 240 ) // {Vector2} left center (input slot)
    }, options );

    // @public (read-only)
    this.numberOfFunctions = options.numberOfFunctions;
    this.width = options.width;
    this.height = options.height;
    this.location = options.location;

    // @public A {Property.<AbstractFunction|null>} for each slot in the builder. Null indicates that the slot is unoccupied.
    this.functionInstanceProperties = [];

    // @public (read-only) center of each slot in the builder. 1:1 index correspondence with functionInstanceProperties.
    this.slotLocations = [];

    // width occupied by slots
    var totalWidthOfSlots = this.numberOfFunctions * FBConstants.FUNCTION_WIDTH;
    if ( this.numberOfFunctions > 1 ) {
      totalWidthOfSlots -= ( ( this.numberOfFunctions - 1 ) * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_WIDTH );
    }
    assert && assert( totalWidthOfSlots > 0 );

    // create and populate slots
    var leftSlotLocation = new Vector2( this.location.x + ( this.width - totalWidthOfSlots + FBConstants.FUNCTION_WIDTH ) / 2, this.location.y );
    for ( var i = 0; i < this.numberOfFunctions; i++ ) {

      // slot, location is at its center
      this.slotLocations.push( leftSlotLocation.plusXY(
        i * FBConstants.FUNCTION_WIDTH - i * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_WIDTH, 0 ) );

      // function in the slot
      this.functionInstanceProperties.push( new Property( null ) );
    }
    assert && assert( this.slotLocations.length === this.functionInstanceProperties.length );
  }

  functionBuilder.register( 'Builder', Builder );

  return inherit( Object, Builder, {

    // @public
    reset: function() {
      this.functionInstanceProperties.forEach( function( functionInstance ) {
        functionInstance.reset();
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
      for ( var i = 0; i < this.functionInstanceProperties.length && !found; i++ ) {
        found = ( this.functionInstanceProperties[ i ].get() === functionInstance );
      }
      return found;
    },

    /**
     * Adds a function instance, if it's close enough to an empty slot.
     *
     * @param {AbstractFunction} functionInstance
     * @returns {number} slot number it was added to, -1 if not added
     * @public
     */
    addFunctionInstance: function( functionInstance ) {
      var DISTANCE_THRESHOLD = 100; //TODO should this be computed? move elsewhere?
      var slotNumber = this.getClosestEmptySlot( functionInstance.locationProperty.get(), DISTANCE_THRESHOLD );
      if ( slotNumber !== -1 ) {
        this.functionInstanceProperties[ slotNumber ].set( functionInstance );
        functionInstance.locationProperty.set( this.slotLocations[ slotNumber ] );
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
      for ( var i = 0; i < this.functionInstanceProperties.length && !removed; i++ ) {
        if ( this.functionInstanceProperties[ i ].get() === functionInstance ) {
          this.functionInstanceProperties[ i ].set( null );
          removed = true;
        }
      }
      assert && assert( removed );
    },

    /**
     * Gets the empty slot that is closest to the specified location.
     *
     * @param {Vector2} location - the location of the function instance
     * @param {number} distanceThreshold - must be at least this close
     * @returns {number} slot number, -1 if no slot
     * @private
     */
    getClosestEmptySlot: function( location, distanceThreshold ) {
      var slotNumber = -1;
      for ( var i = 0; i < this.slotLocations.length; i++ ) {
        if ( this.functionInstanceProperties[ i ].get() === null ) {
          if ( slotNumber === -1 ) {
            if ( this.slotLocations[ i ].distance( location ) < distanceThreshold ) {
              slotNumber = i;
            }
          }
          else if ( this.slotLocations[ i ].distance( location ) < this.slotLocations[ slotNumber ].distance( location ) ) {
            slotNumber = i;
          }
        }
      }
      return slotNumber;
    }
  } );
} );
