// Copyright 2016-2023, University of Colorado Boulder

/**
 * Creates a type of function instance with specific options.
 * Allows us to specify what we want to create in the model, but defer creation until after the view is created.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';

export default class FunctionCreator {

  /**
   * @param {constructor} functionConstructor - constructor for a function
   * @param {Object} [functionConstructorOptions] - options that will be passed to functionConstructor
   */
  constructor( functionConstructor, functionConstructorOptions ) {

    // @private
    this.functionConstructor = functionConstructor;
    this.functionConstructorOptions = functionConstructorOptions;
  }

  /**
   * Creates a function instance.
   * @param {Object} [options] - options passed to function constructor
   * @returns {AbstractFunction}
   * @public
   */
  createInstance( options ) {
    return new this.functionConstructor( merge( {}, this.functionConstructorOptions, options ) );
  }
}

functionBuilder.register( 'FunctionCreator', FunctionCreator );