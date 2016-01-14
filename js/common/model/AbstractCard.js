// Copyright 2015-2016, University of Colorado Boulder

/**
 * Base type for cards.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractMovable = require( 'FUNCTION_BUILDER/common/model/AbstractMovable' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AbstractCard( options ) {

    options = _.extend( {
      //TODO
    }, options );

    AbstractMovable.call( this, options );
  }

  functionBuilder.register( 'AbstractCard', AbstractCard );

  return inherit( AbstractMovable, AbstractCard );
} );
