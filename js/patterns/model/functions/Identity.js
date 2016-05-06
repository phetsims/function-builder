// Copyright 2015-2016, University of Colorado Boulder

/**
 * The identity function, creates an output that is identical to the input.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var identityImage = require( 'mipmap!FUNCTION_BUILDER/functions/identity.png' );

  /**
   * @constructor
   */
  function Identity() {
    ImageFunction.call( this, new Image( identityImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } ), {
      fill: 'rgb( 255, 161, 43 )'
    } );
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

      // copy the input data to the output canvas
      var imageData = CanvasUtils.getImageData( inputCanvas );
      return CanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
