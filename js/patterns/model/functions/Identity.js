// Copyright 2015-2017, University of Colorado Boulder

/**
 * The identity function, creates an output that is identical to the input.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Identity( options ) {

    options = options || {};
    options.name = 'Identity';
    options.fill = 'rgb( 255, 246, 146 )';

    // The identify function has no visible icon. See https://github.com/phetsims/function-builder/issues/91
    // This decision was made late in development, and it was easier to use an invisible Rectangle than to
    // make the icon optional in the myriad places where it is currently required.
    var iconNode = new Rectangle( 0, 0, 1, 1 );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'Identity', Identity );

  return inherit( ImageFunction, Identity, {

    /**
     * Applies this function.
     *
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // copy the input canvas to the output canvas
      return FBCanvasUtils.createCanvasWithImage( inputCanvas );
    }
  } );
} );
