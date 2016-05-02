// Copyright 2016, University of Colorado Boulder

/**
 * 'Ghost' version of number card that appears in empty input carousel container.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var GhostCard = require( 'FUNCTION_BUILDER/common/view/GhostCard' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {number} value
   * @param {Object} [options]
   * @constructor
   */
  function NumberGhostCard( value, options ) {
    assert && assert( Util.isInteger( value ) );
    GhostCard.call( this, new Text( value, { font: FBConstants.NUMBERS_CARD_WHOLE_NUMBER_FONT } ), options );
  }

  functionBuilder.register( 'NumberGhostCard', NumberGhostCard );

  return inherit( GhostCard, NumberGhostCard );
} );
