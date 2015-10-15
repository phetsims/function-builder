// Copyright 2002-2015, University of Colorado Boulder

/**
 * The identity function, creates an output that is identical to the input.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
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

  return inherit( FBFunction, Identity, {

    /**
     * Applies this function to a card.
     * @param {Card} card
     * @returns {Card}
     * @public
     * @override
     */
    apply: function( card ) {
      return Card.withImageData( card.name + '.' + this.name, card.getImageData() );
    }
  } );
} );
