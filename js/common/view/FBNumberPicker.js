// Copyright 2016-2017, University of Colorado Boulder

/**
 * Specialization of NumberPicker, adds the ability to optionally skip zero value.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Property.<number>} valueProperty
   * @param {Range} valueRange
   * @param {Object} [options]
   * @constructor
   */
  function FBNumberPicker( valueProperty, valueRange, options ) {

    options = _.extend( {
      touchAreaXDilation: 0, // so that it's easier to grab the function's background
      xMargin: 6,
      skipZero: false // {boolean} whether to skip zero value
    }, options );

    assert && assert( !( options.skipZero && ( valueRange.min === 0 || valueRange.max === 0 ) ),
      'cannot skip zero when it is min or max' );

    // increment, optionally skip zero
    assert && assert( !options.upFunction );
    options.upFunction = function( value ) {
      var newValue = value + 1;
      if ( newValue === 0 && options.skipZero ) {
        newValue++;
      }
      assert && assert( !( options.skipZero && newValue === 0 ), 'programming error, zero should be skipped' );
      return newValue;
    };

    // decrement, optionally skip zero
    assert && assert( !options.downFunction );
    options.downFunction = function( value ) {
      var newValue = value - 1;
      if ( newValue === 0 && options.skipZero ) {
        newValue--;
      }
      assert && assert( !( options.skipZero && newValue === 0 ), 'programming error, zero should be skipped' );
      return newValue;
    };

    NumberPicker.call( this, valueProperty, new Property( valueRange ), options );
  }

  functionBuilder.register( 'FBNumberPicker', FBNumberPicker );

  return inherit( NumberPicker, FBNumberPicker );
} );
