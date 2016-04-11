// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card containers.
 * A card that is in a carousel is a descendant of this type of container.
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
  var Property = require( 'AXON/Property' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function CardContainer( options ) {

    options = _.extend( {
      size: FBConstants.CARD_OPTIONS.size
    }, options );

    MovableContainer.call( this, options );

    // @public (read-only) number of items in the container
    this.numberOfCardsProperty = new Property( 0 );
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
     * @param {SeeInsideLayer} seeInsideLayer
     * @param {Property.<boolean>} seeInsideProperty
     * @public
     * @abstract
     */
    createCards: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode,
                           dragLayer, seeInsideLayer, seeInsideProperty ) {
      throw new Error( 'must be implemented by subtype' );
    },

    // @public @override see MovableContainer.addNode
    addNode: function( node ) {
      MovableContainer.prototype.addNode.call( this, node );
      this.numberOfCardsProperty.set( this.numberOfCardsProperty.get() + 1 );
    },

    // @public @override see MovableContainer.removeNode
    removeNode: function( node ) {
      MovableContainer.prototype.removeNode.call( this, node );
      this.numberOfCardsProperty.set( this.numberOfCardsProperty.get() - 1 );
    }
  } );
} );
