// Copyright 2016-2023, University of Colorado Boulder

/**
 * Minus function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import MathFunction from './MathFunction.js';

export default class Minus extends MathFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fill: 'rgb( 152, 231, 156 )',
      pickerColor: 'rgb( 25, 168, 52 )'
    }, options );

    super( FBSymbols.MINUS,
      ( input, operand ) => input.minus( operand ),
      options );
  }
}

functionBuilder.register( 'Minus', Minus );