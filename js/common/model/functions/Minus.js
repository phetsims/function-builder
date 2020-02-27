// Copyright 2016-2020, University of Colorado Boulder

/**
 * Minus function.
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
function Minus( options ) {

  options = merge( {
    fill: 'rgb( 152, 231, 156 )',
    pickerColor: 'rgb( 25, 168, 52 )'
  }, options );

  MathFunction.call( this,
    FBSymbols.MINUS,
    function( input, operand ) { return input.minus( operand ); },
    options );
}

functionBuilder.register( 'Minus', Minus );

inherit( MathFunction, Minus );
export default Minus;