// Copyright 2016, University of Colorado Boulder

/**
 * 'Ghost' version of equation card that appears in empty input carousel container.
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

  /**
   * @param {string} symbol
   * @param {Object} [options]
   * @constructor
   */
  function EquationGhostCard( symbol, options ) {
    assert && assert( typeof symbol === 'string' );
    GhostCard.call( this, new Text( symbol, { font: FBConstants.EQUATIONS_CARD_SYMBOL_FONT } ), options );
  }

  functionBuilder.register( 'EquationGhostCard', EquationGhostCard );

  return inherit( GhostCard, EquationGhostCard );
} );
