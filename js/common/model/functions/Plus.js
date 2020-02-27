// Copyright 2016-2020, University of Colorado Boulder

/**
 * Plus function.
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
function Plus( options ) {

  options = merge( {
    fill: 'rgb( 246, 203, 144 )',
    pickerColor: 'rgb( 227, 114, 42 )'
  }, options );

  MathFunction.call( this,
    FBSymbols.PLUS,
    function( input, operand ) { return input.plus( operand ); },
    options );
}

functionBuilder.register( 'Plus', Plus );

inherit( MathFunction, Plus );
export default Plus;