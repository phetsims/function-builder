// Copyright 2016, University of Colorado Boulder

/**
 * A numeric function for the 'Equations' screen, with dynamic operand.
 * Can be applied to either a rational number or a mathematical equation.
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
   * @param {function(number,number):number} applyNumber - implementation of the apply function for numbers
   * @param {function(string,number):string} applyEquation - implementation of the apply function for equations
   * @param {Object} [options]
   * @constructor
   */
  function EquationFunction( labelString, applyNumber, applyString, options ) {

    options = _.extend( {
      operandRange: new Range( -3, 3, 1 ), // range of operandProperty
      zeroOperandValid: true, // {boolean} is zero a valid operand?
      isInvertibleWithOperand: null // {function:boolean|null} is this function invertible for specified operand?
    }, options );

    assert && assert( !( options.operandRange.defaultValue === 0 && !options.zeroOperandValid ),
      'default value zero is not a valid operand' );

    this.labelString = labelString; // @public (read-only)
    this._applyNumber = applyNumber; // @private
    this._applyString = applyString; // @private
    this.operandRange = options.operandRange; // @public (read-only)
    this.zeroOperandValid = options.zeroOperandValid; // @public (read-only)
    this.isInvertibleWithOperand = options.isInvertibleWithOperand; // @private

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
     * Is this function invertible for the current value of its operand?
     * @public
     * @override
     */
    getInvertible: function() {
      if ( this.isInvertibleWithOperand ) {
        return this.isInvertibleWithOperand( this.operandProperty.get() );
      }
      else {
        return AbstractFunction.prototype.getInvertible.call( this );
      }
    },

    /**
     * Applies this function.
     *
     * @param {BigRational|string} value - rational number or mathematical equation
     * @returns {BigRational|string}
     * @public
     * @override
     */
    apply: function( value ) {
      if ( typeof value === 'string' ) {
        return this._applyString( value, this.operandProperty.get() );
      }
      else {
        return this._applyNumber( value, this.operandProperty.get() );
      }
    }
  } );
} );
