// Copyright 2016, University of Colorado Boulder

/**
 * Creates a type of function instance with specific options.
 * Allows us to specify what we want to create in the model, but defer creation until after the view is created.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {constructor} functionConstructor - constructor for a function
   * @param {Object} [functionConstructorOptions] - options that will be passed to functionConstructor
   * @constructor
   */
  function FunctionCreator( functionConstructor, functionConstructorOptions ) {

    // @private
    this.functionConstructor = functionConstructor;
    this.functionConstructorOptions = functionConstructorOptions;
  }

  functionBuilder.register( 'FunctionCreator', FunctionCreator );

  return inherit( Object, FunctionCreator, {

    /**
     * Creates a function instance.
     *
     * @param {Object} [options] - options passed to function constructor
     * @returns {AbstractFunction}
     */
    createInstance: function( options ) {
      var FunctionConstructor = this.functionConstructor;
      return new FunctionConstructor( _.extend( {}, this.functionConstructorOptions, options ) );
    }
  } );
} );
