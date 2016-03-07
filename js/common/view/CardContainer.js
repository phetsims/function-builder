// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card containers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/MovableContainer' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function CardContainer( options ) {

    options = _.extend( {
      size: FBConstants.CARD_SIZE
    }, options );

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'CardContainer', CardContainer );

  return inherit( MovableContainer, CardContainer, {

    /**
     * Creates cards and puts them in the container.
     *
     * @param {number} numberOfInstances
     * @param {PatternsScene} scene
     * @param {ImageCardContainer} inputContainer
     * @param {ImageCardContainer} outputContainer
     * @param {BuilderNode} builderNode
     * @param {Node} dragLayer
     * @param {Node} foregroundAnimationLayer
     * @public
     */
    createFunctions: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode, dragLayer, foregroundAnimationLayer ) {
      throw new Error( 'must be implemented by subtypes' );
    }
  } );
} );
