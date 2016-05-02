// Copyright 2016, University of Colorado Boulder

//TODO much in common with ImageCardContainer
/**
 * Container for number cards. This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/CardContainer' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCard = require( 'FUNCTION_BUILDER/numbers/model/NumberCard' );
  var NumberCardNode = require( 'FUNCTION_BUILDER/numbers/view/NumberCardNode' );
  var NumberGhostCard = require( 'FUNCTION_BUILDER/numbers/view/NumberGhostCard' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {number} value - number that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function NumberCardContainer( value, options ) {

    assert && assert( Util.isInteger( value ) );

    options = _.extend( {
      showGhostCard: false // {boolean} whether to show a 'ghost' card when the container is empty
    }, options );

    this.value = value; // @private

    if ( options.showGhostCard ) {
      options.emptyNode = new NumberGhostCard( value );
    }

    CardContainer.call( this, options );
  }

  functionBuilder.register( 'NumberCardContainer', NumberCardContainer );

  return inherit( CardContainer, NumberCardContainer, {

    /**
     * Creates cards and puts them in the container.
     * See supertype CardContainer.createCards for params.
     * @override
     * @public
     */
    createCards: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode,
                           dragLayer, seeInsideLayer, seeInsideProperty ) {

      assert && assert( this === inputContainer, 'cards must be created in the input carousel' );
      assert && assert( inputContainer.carouselLocation );
      assert && assert( outputContainer.carouselLocation );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var card = NumberCard.withInteger( this.value, {
          location: inputContainer.carouselLocation
        } );
        scene.cards.push( card );

        // associated Node
        var cardNode = new NumberCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );

        // put the Node in this container
        this.addNode( cardNode );

        // add to 'see inside' layer, for viewing the card through windows
        seeInsideLayer.addCardNode( cardNode );

        // add a 'mole under the carpet' to the builder, synchronizes with the card's location
        builderNode.addMole( card );
      }
    }
  } );
} );
