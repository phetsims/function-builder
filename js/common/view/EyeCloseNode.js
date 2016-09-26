// Copyright 2016, University of Colorado Boulder

/**
 * Node the displays the fontawesome 'eye_close' icon. Reuses 1 Shape instance to improve performance.
 * See https://github.com/phetsims/function-builder/issues/102
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );

  // constants
  var EYE_CLOSE_SHAPE = FontAwesomeNode.createShape( 'eye_close' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EyeCloseNode( options ) {

    options = _.extend( {
      fill: 'black',
      pickable: false
    }, options );

    Path.call( this, EYE_CLOSE_SHAPE, options );
  }

  functionBuilder.register( 'EyeCloseNode', EyeCloseNode );

  return inherit( Path, EyeCloseNode );
} );
