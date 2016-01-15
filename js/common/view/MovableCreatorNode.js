// Copyright 2016, University of Colorado Boulder

/**
 * Base type for "creator" nodes that appear as items in the carousels.
 * It has the following responsibilities:
 *
 * - displays the icon that represents the Movable type
 * - creates instances of the Movable type and manages their initial drag sequence
 * - limits the number of instances created to some (optional) maximum
 * - hides the icon and ceases creation when the maximum number of instances is reached
 * - monitors instances to determine when they have been disposed of
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
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
   * @param {Node} iconNode -  icon that represents the Movable
   * @param {function} createInstance - function called to create an instance of {Movable}
   * @param {Object} [options]
   * @constructor
   */
  function MovableCreatorNode( iconNode, createInstance, options ) {

    options = _.extend( {

      // {number} max number of instances that can be created
      maxInstances: Number.POSITIVE_INFINITY,

      // {Bounds2} constrain dragging to these bounds
      dragBounds: Bounds2.EVERYTHING.copy(),

      /**
       * {function} called at the end of each drag sequence
       * @param {Movable} movable
       * @param {Event} event
       * @param {Trail} trail
       */
      endDrag: function( movable, event, trail ) {}

    }, options );

    assert && assert( options.maxInstances >= 0 && options.maxInstances <= Number.POSITIVE_INFINITY );

    iconNode.cursor = 'pointer';

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

    // @public emit1( {Movable}instance ) when an instance is created
    this.createdEmitter = new Emitter();

    var thisNode = this;
    var dragHandler = new SimpleDragHandler( {

      //TODO cancel drag if movable is disposed of during a drag cycle, scenery#218

      parentScreenView: null, // @private {ScreenView} set on first start drag
      movable: null, // @private {Movable} instance created, set during a drag sequence
      moved: false, // @private {boolean} was the instance moved after it was created?

      allowTouchSnag: true,

      start: function( event, trail ) {

        assert && assert( !this.movable, 'drag handler is not re-entrant' );

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

        // Create an instance and notify listeners
        this.movable = createInstance( {
          location: initialLocationScreenView,  // creator's location
          dragging: true
        } );
        this.movable.setLocation( this.movable.locationProperty.get().plus( FBConstants.POP_OUT_OFFSET ) ); // pop out
        thisNode.createdEmitter.emit1( this.movable );

        // manage instance count
        numberOfInstancesProperty.value++;
        this.movable.disposeCalledEmitter.addListener( function() {
          numberOfInstancesProperty.value--;
        } );
      },

      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        var location = this.movable.locationProperty.get().plus( translationParams.delta );
        this.movable.setLocation( options.dragBounds.closestPointTo( location ) );
      },

      end: function( event, trail ) {
        this.movable.dragging = false;
        options.endDrag( this.movable, event, trail );
        this.movable = null;
      }
    } );
    iconNode.addInputListener( dragHandler );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, iconNode ];

    Node.call( this, options );

    // @private
    this.disposeMovableCreatorNode = function() {
      assert && assert( thisNode.createdEmitter, 'called dispose twice?' );

      // clean up emitter
      thisNode.createdEmitter.removeAllListeners();
      thisNode.createdEmitter = null;

      // cancel drag
      if ( dragHandler.dragging ) {
        functionBuilder.log && functionBuilder.log( thisNode.constructor.name + ': drag canceled' );
        dragHandler.endDrag( null, null ); //TODO test by pressing 'Reset All' while dragging
      }
    };
  }

  functionBuilder.register( 'MovableCreatorNode', MovableCreatorNode );

  return inherit( Node, MovableCreatorNode, {

    // @public
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeMovableCreatorNode();
    }
  } );
} );