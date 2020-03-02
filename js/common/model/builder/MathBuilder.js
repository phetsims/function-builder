// Copyright 2016-2020, University of Colorado Boulder

/**
 * Extension of Builder for mathematical functions.
 * Observes changes to function operands and notifies listeners.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import Builder from './Builder.js';

class MathBuilder extends Builder {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    super( options );

    // when any function's operand changes, notify listeners
    this.operandObserver = () => this.functionChangedEmitter.emit();
  }

  /**
   * Puts a function instance into a slot. Start observing its operand.
   *
   * @param {AbstractFunction} functionInstance
   * @param {number} slotNumber
   * @public
   * @override
   */
  addFunctionInstance( functionInstance, slotNumber ) {
    super.addFunctionInstance( functionInstance, slotNumber );
    functionInstance.operandProperty.link( this.operandObserver ); // unlink handled in removeFunctionInstance
  }

  /**
   * Removes a function instance from a slot. Stop observing its operand.
   *
   * @param {AbstractFunction} functionInstance
   * @param {number} slotNumber
   * @public
   * @override
   */
  removeFunctionInstance( functionInstance, slotNumber ) {
    super.removeFunctionInstance( functionInstance, slotNumber );
    functionInstance.operandProperty.unlink( this.operandObserver );
  }
}

functionBuilder.register( 'MathBuilder', MathBuilder );

export default MathBuilder;