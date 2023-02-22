// Copyright 2016-2020, University of Colorado Boulder

/**
 * Divide function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import MathFunction from './MathFunction.js';

export default class Divide extends MathFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fill: 'rgb( 183, 200, 249 )',
      pickerColor: 'rgb( 14, 89, 218 )'
    }, options );
    options.zeroOperandValid = false; // zero is not a valid operand, since division by zero is undefined

    super( FBSymbols.DIVIDE,
      ( input, operand ) => input.divide( operand ),
      options );
  }
}

functionBuilder.register( 'Divide', Divide );