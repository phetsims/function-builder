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
   * @param {function} createInstance - function called to create an instance of {Movable}
   * @param {function} viewToModelVector2 - converts a view {Event} to a model {Vector2}
   * @param {Node} iconNode - icon that represents the Movable when instance creation is enabled
   * @param {Node} disabledIconNode - icon that represents the Movable when instance creation is disabled
   * @param {Object} [options]
   * @constructor
   */
  function MovableCreatorNode( createInstance, viewToModelVector2, iconNode, disabledIconNode, options ) {

    options = _.extend( {

      // {number} max number of instances that can be created
      maxInstances: Number.POSITIVE_INFINITY,

      // {Bounds2} constrain dragging to these bounds
      dragBounds: Bounds2.EVERYTHING.copy(),

      /**
       * Called at the start of each drag sequence, after a Movable is created.
       * {function|null} ( {Movable} movable, {Event} event, {Trail} trail )
       */
      startDrag: null,

      /**
       * Called at the end of each drag sequence.
       * {function|null} ( {Movable} movable, {Event} event, {Trail} trail )
       */
      endDrag: null,

      /**
       * Optional listener to attach to createdEmitter, for notification of instance creation.
       * {function|null} ( {Movable} movable)
       */
      createdEmitterListener: null

    }, options );

    // validate options
    assert && assert( options.maxInstances >= 0 && options.maxInstances <= Number.POSITIVE_INFINITY );

    // Add a background rectangle with no fill or stroke, so that this Node's visible bounds remain constant
    var backgroundNode = new Rectangle( 0, 0, iconNode.width, iconNode.height, {
      stroke: SHOW_BOUNDS ? 'red' : null
    } );

    // center icon on background
    iconNode.center = disabledIconNode.center = backgroundNode.center;

    // number of instances that have been created
    var numberOfInstancesProperty = new Property( 0 );
    numberOfInstancesProperty.link( function( numberOfInstances ) {
      assert && assert( numberOfInstances <= options.maxInstances, 'maxInstances exceeded' );
      var enabled = ( numberOfInstances < options.maxInstances );
      iconNode.visible = enabled;
      disabledIconNode.visible = !enabled;
    } );

    // @public emit1( {Movable}instance ) when an instance is created
    this.createdEmitter = new Emitter();
    if ( options.createdEmitterListener ) {
      this.createdEmitter.addListener( options.createdEmitterListener );
    }

    var thisNode = this;
    var dragHandler = new SimpleDragHandler( {

      //TODO cancel drag if movable is disposed of during a drag cycle, scenery#218

      movable: null, // @private {Movable} instance created, set during a drag sequence
      moved: false, // @private {boolean} was the instance moved after it was created?

      allowTouchSnag: true,

      start: function( event, trail ) {

        assert && assert( !this.movable, 'drag handler is not re-entrant' );

        // Create an instance and notify listeners
        this.movable = createInstance( {
          location: viewToModelVector2( event ),
          dragging: true
        } );
        this.movable.setLocation( this.movable.locationProperty.get().plus( FBConstants.POP_OUT_OFFSET ) ); // pop out
        thisNode.createdEmitter.emit1( this.movable );

        // manage instance count
        numberOfInstancesProperty.value++;
        this.movable.disposeCalledEmitter.addListener( function() {
          numberOfInstancesProperty.value--;
        } );

        options.startDrag && options.startDrag( this.movable, event, trail );
      },

      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        //TODO these 2 lines are duplicated in MovableNode
        var location = this.movable.locationProperty.get().plus( translationParams.delta );
        this.movable.setLocation( options.dragBounds.closestPointTo( location ) );
      },

      end: function( event, trail ) {
        //TODO these 2 lines are duplicated in MovableNode
        this.movable.dragging = false;
        options.endDrag && options.endDrag( this.movable, event, trail );
        this.movable = null;
      }
    } );
    iconNode.addInputListener( dragHandler );
    iconNode.cursor = 'pointer';

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, disabledIconNode, iconNode ];

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