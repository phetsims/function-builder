// Copyright 2016-2023, University of Colorado Boulder

/**
 * A function slot in a builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';

export default class FunctionSlot {

  /**
   * @param {Vector2} position - position of the slot in the global coordinate frame
   */
  constructor( position ) {

    // @public (read-only)
    this.position = position;

    // @public {AbstractFunction|null} the function instance that occupies the slot, null if the slot is empty.
    this.functionInstance = null;
  }

  /**
   * Is this slot empty?
   *
   * @returns {boolean}
   * @public
   */
  isEmpty() {
    return ( this.functionInstance === null );
  }

  /**
   * Clears the slot, makes it empty.
   *
   * @public
   */
  clear() {
    this.functionInstance = null;
  }

  /**
   * Does this slot contain a specified function instance?
   *
   * @param {AbstractFunction} functionInstance
   * @returns {boolean}
   * @public
   */
  contains( functionInstance ) {
    assert && assert( functionInstance );  // so we don't accidentally test whether the slot is empty
    return ( this.functionInstance === functionInstance );
  }

  /**
   * Is the slot invertible? Meaning, can a card be dragged backwards through this slot?
   *
   * @returns {boolean}
   * @public
   */
  isInvertible() {
    return ( this.isEmpty() || this.functionInstance.invertible );
  }
}

// @public @static used to indicate the absence of a valid slot number
FunctionSlot.NO_SLOT_NUMBER = -1;

functionBuilder.register( 'FunctionSlot', FunctionSlot );