// Copyright 2016-2019, University of Colorado Boulder

/**
 * Node that displays the fontawesome 'eye_close' icon.
 * Wrapper around FontAwesomeNode to guard against changes that were made in
 * https://github.com/phetsims/function-builder/issues/102
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EyeCloseNode( options ) {
    FontAwesomeNode.call( this, 'eye_close', options );
  }

  functionBuilder.register( 'EyeCloseNode', EyeCloseNode );

  return inherit( FontAwesomeNode, EyeCloseNode );
} );
