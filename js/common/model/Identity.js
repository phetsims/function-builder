// Copyright 2015, University of Colorado Boulder

/**
 * The identity function, creates an output that is identical to the input.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var identityImage = require( 'mipmap!FUNCTION_BUILDER/functions/identity.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Identity( options ) {

    options = _.extend( {
      name: 'identity',
      image: identityImage,
      fill: 'rgb( 255, 161, 43 )'
    }, options );

    FBFunction.call( this, options );
  }

  functionBuilder.register( 'Identity', Identity );

  return inherit( FBFunction, Identity, {

    /**
     * Applies this function.
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {
      var imageData = CanvasUtils.getImageData( inputCanvas );
      return CanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
