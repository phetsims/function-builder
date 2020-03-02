// Copyright 2016-2020, University of Colorado Boulder

/**
 * Times function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import MathFunction from './MathFunction.js';

class Times extends MathFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fill: 'rgb( 237, 165, 222 )',
      pickerColor: 'rgb( 223, 17, 213 )'
    }, options );

    super( FBSymbols.TIMES,
      function( input, operand ) { return input.times( operand ); },
      options );
  }

  /**
   * Is this function invertible for the current value of its operand?
   * Multiplication by zero is not invertible, since division by zero is undefined.
   *
   * @public
   * @override
   */
  getInvertible() {
    return ( this.operandProperty.get() !== 0 );
  }
}

functionBuilder.register( 'Times', Times );

export default Times;