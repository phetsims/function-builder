// Copyright 2016-2020, University of Colorado Boulder

/**
 * Extension of Builder for mathematical functions.
 * Observes changes to function operands and notifies listeners.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import functionBuilder from '../../../functionBuilder.js';
import Builder from './Builder.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function MathBuilder( options ) {

  Builder.call( this, options );

  // when any function's operand changes, notify listeners
  const self = this;
  this.operandObserver = function( operand ) {
    self.functionChangedEmitter.emit();
  };
}

functionBuilder.register( 'MathBuilder', MathBuilder );

export default inherit( Builder, MathBuilder, {

  /**
   * Puts a function instance into a slot. Start observing its operand.
   *
   * @param {AbstractFunction} functionInstance
   * @param {number} slotNumber
   * @public
   * @override
   */
  addFunctionInstance: function( functionInstance, slotNumber ) {
    Builder.prototype.addFunctionInstance.call( this, functionInstance, slotNumber );
    functionInstance.operandProperty.link( this.operandObserver ); // unlink handled in removeFunctionInstance
  },

  /**
   * Removes a function instance from a slot. Stop observing its operand.
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