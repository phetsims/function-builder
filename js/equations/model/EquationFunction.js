// Copyright 2016, University of Colorado Boulder

//TODO invertible will change dynamically for divide function, how to handle that?
/**
 * A numeric function for the 'Equations' screen, with dynamic operand.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/AbstractFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  /**
   * @param {string} labelString
   * @param {function(number,number):number} apply - implementation of the apply function
   * @param {Object} [options]
   * @constructor
   */
  function EquationFunction( labelString, apply, options ) {

    options = _.extend( {
      operandRange: new Range( -3, 3, 1 ), // range of operandProperty
      zeroOperandValid: true // {boolean} is zero a valid operand?
    }, options );

    assert && assert( !( options.operandRange.defaultValue === 0 && !options.zeroOperandValid ),
      'default value zero is not a valid operand' );

    this.labelString = labelString; // @public (read-only)
    this._apply = apply; // @private
    this.operandRange = options.operandRange; // @public (read-only)
    this.zeroOperandValid = options.zeroOperandValid; // @public (read-only)

    // @public
    this.operandProperty = new Property( options.operandRange.defaultValue );
    this.operandProperty.link( function( operand ) {

      // validate operand
      assert && assert( options.operandRange.contains( operand ), 'operand out of range: ' + operand );
      assert && assert( !( operand === 0 && !options.zeroOperandValid ), 'zero operand not valid' );
    } );

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'EquationFunction', EquationFunction );

  return inherit( AbstractFunction, EquationFunction, {

    /**
     * Applies this function.
     *
     * @param {number} value
     * @returns {number}
     * @public
     * @override
     */
    apply: function( value ) {
      return this._apply( value, this.operandProperty.get() );
    }
  } );
} );
