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

    // {FunctionSlot[]} slots
    this.slots = [];
    var leftSlotLocation = new Vector2( this.location.x + ( this.width - totalWidthOfSlots + FBConstants.FUNCTION_SIZE.width ) / 2, this.location.y );
    for ( var i = 0; i < options.numberOfSlots; i++ ) {

      // location is at slot's center
      var dx = i * FBConstants.FUNCTION_SIZE.width - i * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width;
      var slotLocation = leftSlotLocation.plusXY( dx, 0 );

      // each slot is initially empty
      this.slots.push( new FunctionSlot( slotLocation, null ) );
    }

    // @public emit1({Builder}) when any function changes
    this.functionChangedEmitter = new Emitter();
  }

  functionBuilder.register( 'Builder', Builder );

  return inherit( Object, Builder, {

    // @public
    reset: function() {
      this.slots.forEach( function( slot ) {
        //TODO
      } );
    },

    /**
     * Puts a function instance into a slot.
     *
     * @param {AbstractFunction} functionInstance
     * @param {number} slotNumber
     * @public
     */
    addFunctionInstance: function( functionInstance, slotNumber ) {
      var slot = this.slots[ slotNumber ];
      assert && assert( slot.isEmpty(), 'slot ' + slotNumber + ' is occupied' );
      slot.functionInstance = functionInstance;
      this.functionChangedEmitter.emit1( this );
    },

    /**
     * Removes a function instance from a slot.
     *
     * @param {AbstractFunction} functionInstance
     * @param {number} slotNumber
     * @public
     */
    removeFunctionInstance: function( functionInstance, slotNumber ) {
      var slot = this.slots[ slotNumber ];
      assert && assert( slot.contains( functionInstance ), 'functionInstance is not in slot ' + slotNumber );
      slot.functionInstance = null;
      this.functionChangedEmitter.emit1( this );
    },

    /**
     * Gets the slot number occupied by a function instance.
     *
     * @param {AbstractFunction} functionInstance
     * @returns {number} -1 if the function instance isn't in any slot
     * @public
     */
    getSlotNumber: function( functionInstance ) {
      for ( var i = 0; i < this.slots.length; i++ ) {
        var slot = this.slots[ i ];
        if ( slot.contains( functionInstance ) ) {
          return i;
        }
      }
      return -1;
    },

    /**
     * Does the builder contain the specified function instance?
     *
     * @param {AbstractFunction} functionInstance
     * @returns {boolean}
     * @public
     */
    containsFunctionInstance: function( functionInstance ) {
      return ( this.getSlotNumber( functionInstance ) !== -1 );
    },

    /**
     * Gets the slot that is closest to the specified location.
     *
     * @param {Vector2} location - the location of the function instance
     * @returns {number} slot number, -1 if no slot is close enough
     * @public
     */
    getClosestSlot: function( location ) {
      var DISTANCE_THRESHOLD = 0.6 * this.height;  // must be at least this close
      var slotNumber = -1;
      for ( var i = 0; i < this.slots.length; i++ ) {
        var slot = this.slots[ i ];
        if ( slotNumber === -1 ) {
          if ( slot.location.distance( location ) < DISTANCE_THRESHOLD ) {
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
} );
