// Copyright 2016-2023, University of Colorado Boulder

/**
 * Specialization of NumberPicker, adds the ability to optionally skip zero value.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import NumberPicker, { NumberPickerOptions } from '../../../../sun/js/NumberPicker.js';
import functionBuilder from '../../functionBuilder.js';

type SelfOptions = {
  skipZero?: boolean; // whether to skip zero value
};

type FBNumberPickerOptions = SelfOptions & PickOptional<NumberPickerOptions, 'color' | 'font'>;

export default class FBNumberPicker extends NumberPicker {

  public constructor( valueProperty: Property<number>, valueRange: Range, providedOptions?: FBNumberPickerOptions ) {

    const options = optionize<FBNumberPickerOptions, SelfOptions, NumberPickerOptions>()( {

      // SelfOptions
      skipZero: false,

      // NumberPickerOptions
      touchAreaXDilation: 0, // so that it's easier to grab the function's background
      xMargin: 6,
      arrowLineWidth: 0.5
    }, providedOptions );

    assert && assert( !( options.skipZero && ( valueRange.min === 0 || valueRange.max === 0 ) ),
      'cannot skip zero when it is min or max' );

    // increment, optionally skip zero
    options.incrementFunction = value => {
      let newValue = value + 1;
      if ( newValue === 0 && options.skipZero ) {
        newValue++;
      }
      assert && assert( !( options.skipZero && newValue === 0 ), 'programming error, zero should be skipped' );
      return newValue;
    };

    // decrement, optionally skip zero
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