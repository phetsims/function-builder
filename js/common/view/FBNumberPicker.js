// Copyright 2016-2022, University of Colorado Boulder

/**
 * Specialization of NumberPicker, adds the ability to optionally skip zero value.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import NumberPicker from '../../../../sun/js/NumberPicker.js';
import functionBuilder from '../../functionBuilder.js';

export default class FBNumberPicker extends NumberPicker {

  /**
   * @param {Property.<number>} valueProperty
   * @param {Range} valueRange
   * @param {Object} [options]
   */
  constructor( valueProperty, valueRange, options ) {

    options = merge( {
      touchAreaXDilation: 0, // so that it's easier to grab the function's background
      xMargin: 6,
      skipZero: false // {boolean} whether to skip zero value
    }, options );

    assert && assert( !( options.skipZero && ( valueRange.min === 0 || valueRange.max === 0 ) ),
      'cannot skip zero when it is min or max' );

    // increment, optionally skip zero
    assert && assert( !options.incrementFunction );
    options.incrementFunction = value => {
      let newValue = value + 1;
      if ( newValue === 0 && options.skipZero ) {
        newValue++;
      }
      assert && assert( !( options.skipZero && newValue === 0 ), 'programming error, zero should be skipped' );
      return newValue;
    };

    // decrement, optionally skip zero
    assert && assert( !options.decrementFunction );
    options.decrementFunction = value => {
      let newValue = value - 1;
      if ( newValue === 0 && options.skipZero ) {
        newValue--;
      }
      assert && assert( !( options.skipZero && newValue === 0 ), 'programming error, zero should be skipped' );
      return newValue;
    };

    super( valueProperty, new Property( valueRange ), options );
  }
}

functionBuilder.register( 'FBNumberPicker', FBNumberPicker );