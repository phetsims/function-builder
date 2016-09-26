// Copyright 2016, University of Colorado Boulder

/**
 * Node the displays the fontawesome 'eye_close' icon.
 * Wrapper around FontAwesomeNode to guard against changes that were made in
 * https://github.com/phetsims/function-builder/issues/102
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

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
