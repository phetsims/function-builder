// Copyright 2016, University of Colorado Boulder

/**
 * Extension of Builder for mathematical functions.
 * Observes changes to function operands and notifies listeners.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MathBuilder( options ) {

    Builder.call( this, options );

    // when any function's operand changes, notify listeners
    var thisBuilder = this;
    this.operandObserver = function( operand ) {
      thisBuilder.functionChangedEmitter.emit();
    };
  }

  functionBuilder.register( 'MathBuilder', MathBuilder );

  return inherit( Builder, MathBuilder, {

    /**
     * Puts a function instance into a slot.
     *
     * @param {AbstractFunction} functionInstance
     * @param {number} slotNumber
     * @public
     * @override
     */
    addFunctionInstance: function( functionInstance, slotNumber ) {
      Builder.prototype.addFunctionInstance.call( this, functionInstance, slotNumber );
      functionInstance.operandProperty.link( this.operandObserver );
    },

    /**
     * Removes a function instance from a slot.
     *
     * @param {AbstractFunction} functionInstance
     * @param {number} slotNumber
     * @public
     * @override
     */
    removeFunctionInstance: function( functionInstance, slotNumber ) {
      Builder.prototype.removeFunctionInstance.call( this, functionInstance, slotNumber );
      functionInstance.operandProperty.unlink( this.operandObserver );
    }
  } );
} );