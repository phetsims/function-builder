// Copyright 2016-2020, University of Colorado Boulder

/**
 * Plus function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import MathFunction from './MathFunction.js';

class Plus extends MathFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fill: 'rgb( 246, 203, 144 )',
      pickerColor: 'rgb( 227, 114, 42 )'
    }, options );

    super( FBSymbols.PLUS,
      ( input, operand ) => input.plus( operand ),
      options );
  }
}

functionBuilder.register( 'Plus', Plus );

export default Plus;