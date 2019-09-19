// Copyright 2016, University of Colorado Boulder

/**
 * Abstract base type for all image-processing functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AbstractFunction = require( 'FUNCTION_BUILDER/common/model/functions/AbstractFunction' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Node} iconNode - icon that represents the function type
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunction( iconNode, options ) {
    this.iconNode = iconNode; // @public (read-only)
    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'ImageFunction', ImageFunction );

  return inherit( AbstractFunction, ImageFunction );
} );
