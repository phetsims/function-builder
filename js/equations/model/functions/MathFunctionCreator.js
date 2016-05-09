// Copyright 2016, University of Colorado Boulder

/**
 * Creates an instance of a MathFunction subtype.
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
   * @param {constructor} functionConstructor - constructor for a subtype of {MathFunction}
   * @param {Object} [functionConstructorOptions] - options that will be passed to functionConstructor
   * @constructor
   */
  function MathFunctionCreator( functionConstructor, functionConstructorOptions ) {

    // @public (read-only)
    this.functionConstructor = functionConstructor;
    this.functionConstructorOptions = functionConstructorOptions;
  }

  functionBuilder.register( 'MathFunctionCreator', MathFunctionCreator );

  return inherit( Object, MathFunctionCreator, {

    /**
     * Creates an instance.
     *
     * @param {Object} [options] - options passed to function constructor
     * @returns {MathFunction}
     */
    createInstance: function( options ) {
      var FunctionConstructor = this.functionConstructor;
      return new FunctionConstructor( _.extend( {}, this.functionConstructorOptions, options ) );
    }
  } );
} );
