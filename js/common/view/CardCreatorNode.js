// Copyright 2016, University of Colorado Boulder

//TODO generalize this pattern, see https://github.com/phetsims/scenery-phet/issues/214
//TODO lots in common with FunctionCreatorNode
/**
 * For each card image, an instance of this node is placed in input cards carousel.
 * It has the following responsibilities:
 *
 * - displays a card's icon
 * - creates {AbstractCard} card instances and manages their initial drag sequence
 * - limits the number of cards created to some (optional) maximum
 * - hides the card's icon and ceases creation when the maximum number of instances is reached
 * - monitors cards to determine when they have been disposed of
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var Emitter = require( 'AXON/Emitter' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var SHOW_BOUNDS = FBQueryParameters.DEV; // {boolean} stroke the bounds with 'red'

  /**
   * @param {function} createCard - function called to create a {Card}
   * @param {Object} [options]
   * @constructor
   */
  function CardCreatorNode( createCard, options ) {

    options = _.extend( {

      // {number} max number of function instances that can be created
      maxInstances: Number.POSITIVE_INFINITY,

      // {Bounds2} constrain dragging to these bounds
      dragBounds: Bounds2.EVERYTHING.copy(),

      /**
       * {function} called at the end of each drag sequence
       * @param {Card} card
       * @param {Event} event
       * @param {Trail} trail
       */
      endDrag: function( card, event, trail ) {}

    }, options );

    assert && assert( options.maxInstances >= 0 && options.maxInstances <= Number.POSITIVE_INFINITY );

    // The icon that represents the card
    var iconNode = new CardNode( createCard(), {
      cursor: 'pointer'
    } );

    // Add a background rectangle with no fill or stroke, so that this Node's visible bounds remain constant
    var backgroundNode = new Rectangle( 0, 0, iconNode.width, iconNode.height, {
      stroke: SHOW_BOUNDS ? 'red' : null,
      center: iconNode.center
    } );

    // number of instances that have been created
    var numberOfInstancesProperty = new Property( 0 );
    numberOfInstancesProperty.link( function( numberOfInstances ) {
      iconNode.visible = ( numberOfInstances < options.maxInstances );
    } );

    this.cardCreatedEmitter = new Emitter(); // @public

    var thisNode = this;
    iconNode.addInputListener( new SimpleDragHandler( {

      //TODO cancel drag if card is disposed of during a drag cycle, scenery#218

      parentScreenView: null, // @private {ScreenView} set on first start drag
      card: null, // @private {AbstractFunction} set during a drag sequence
      cardMoved: false, // @private {boolean} was the function instance moved after it was created?

      allowTouchSnag: true,

      start: function( event, trail ) {

        assert && assert( !this.card, 'drag handler is not re-entrant' );

        // Find the parent ScreenView by moving up the scene graph.
        // This happens the first time a drag is initiated, then we keep a reference to the ScreenView.
        var testNode = event.currentTarget.parents[ 0 ];
        while ( !this.parentScreenView && testNode !== null ) {
          if ( testNode instanceof ScreenView ) {
            this.parentScreenView = testNode;
          }
          else {
            testNode = testNode.parents[ 0 ];
          }
        }
        assert && assert( this.parentScreenView );

        //TODO This assumes that the parent ScreenView's local coordinate frame is equivalent to the model coordinate frame
        // Determine the initial location in the ScreenView's coordinate frame
        var initialLocationGlobal = event.currentTarget.parentToGlobalPoint( event.currentTarget.center );
        var initialLocationScreenView = this.parentScreenView.globalToLocalPoint( initialLocationGlobal );

        // Create a card and notify listeners
        this.card = createCard( {
          location: initialLocationScreenView,  // creator's location
          dragging: true
        } );
        this.card.setLocation( this.card.locationProperty.get().plus( FBConstants.POP_OUT_OFFSET ) ); // pop out
        thisNode.cardCreatedEmitter.emit1( this.card );

        // manage instance count
        numberOfInstancesProperty.value++;
        this.card.disposeCalledEmitter.addListener( function() {
          numberOfInstancesProperty.value--;
        } );
      },

      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        var location = this.card.locationProperty.get().plus( translationParams.delta );
        this.card.setLocation( options.dragBounds.closestPointTo( location ) );
      },

      end: function( event, trail ) {
        this.card.dragging = false;
        options.endDrag( this.card, event, trail );
        this.card = null;
      }
    } ) );

    options.children = [ backgroundNode, iconNode ];
    Node.call( this, options );

    // @private
    this.disposeCardCreatorNode = function() {
      assert && assert( thisNode.cardCreatedEmitter, 'called dispose twice?' );
      thisNode.cardCreatedEmitter.removeAllListeners();
      thisNode.cardCreatedEmitter = null;
    };
  }

  functionBuilder.register( 'CardCreatorNode', CardCreatorNode );

  return inherit( Node, CardCreatorNode, {

    // @public
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeCardCreatorNode();
    }
  } );
} );