// Copyright 2016-2020, University of Colorado Boulder

/**
 * Divide function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import MathFunction from './MathFunction.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function Divide( options ) {

  options = merge( {
    fill: 'rgb( 183, 200, 249 )',
    pickerColor: 'rgb( 14, 89, 218 )'
  }, options );
  options.zeroOperandValid = false; // zero is not a valid operand, since division by zero is undefined

  MathFunction.call( this,
    FBSymbols.DIVIDE,
    function( input, operand ) { return input.divide( operand ); },
    options );
}

functionBuilder.register( 'Divide', Divide );

inherit( MathFunction, Divide );
export default Divide;