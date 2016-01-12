// Copyright 2015, University of Colorado Boulder

//TODO generalize this pattern, see https://github.com/phetsims/scenery-phet/issues/214
/**
 * For each type of function, an instance of this node is placed in the function Carousel.
 * It has the following responsibilities:
 *
 * - displays a function's icon
 * - creates {AbstractFunction} function instances and manages their initial drag sequence
 * - limits the number of function instances created to some (optional) maximum
 * - hides the function's icon and ceases creation when the maximum number of instances is reached
 * - monitors function instances to determine when they have been disposed of
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var SHOW_BOUNDS = FBQueryParameters.DEV; // {boolean} stroke the bounds with 'red'

  /**
   * @param {function} AbstractFunctionConstructor - constructor for an {AbstractFunction}
   * @param {Object} [options]
   * @constructor
   */
  function FunctionCreatorNode( AbstractFunctionConstructor, options ) {

    options = _.extend( {

      // {number} max number of function instances that can be created
      maxInstances: Number.POSITIVE_INFINITY,

      /**
       * {function} called at the end of each drag sequence
       * @param {AbstractFunction} functionInstance
       * @param {Event} event
       * @param {Trail} trail
       */
      endDrag: function( functionInstance, event, trail ) {}

    }, options );

    assert && assert( options.maxInstances >= 0 && options.maxInstances <= Number.POSITIVE_INFINITY );

    // The icon that represents the function
    var iconNode = new FunctionNode( new AbstractFunctionConstructor(), {
      cursor: 'pointer'
    } );

    // Add a background rectangle with no fill or stroke, so that this Node's visible bounds remain constant
    var backgroundNode = new Rectangle( 0, 0, iconNode.width, iconNode.height, {
      stroke: SHOW_BOUNDS ? 'red' : null ,
      center: iconNode.center
    } );

    // number of instances that have been created
    var numberOfInstancesProperty = new Property( 0 );
    numberOfInstancesProperty.link( function( numberOfInstances ) {
      iconNode.visible = ( numberOfInstances < options.maxInstances );
    } );

    this.functionCreatedEmitter = new Emitter(); // @public

    var thisNode = this;
    iconNode.addInputListener( new SimpleDragHandler( {

      //TODO cancel drag if functionInstance is disposed of during a drag cycle, scenery#218

      parentScreenView: null, // @private {ScreenView} set on first start drag
      functionInstance: null, // @private {AbstractFunction} set during a drag sequence
      functionInstanceMoved: false, // @private {boolean} was the function instance moved after it was created?

      allowTouchSnag: true,

      start: function( event, trail ) {

        assert && assert( !this.functionInstance, 'drag handler is not re-entrant' );

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

        // Create a function instance and notify listeners
        this.functionInstance = new AbstractFunctionConstructor( {
          location: initialLocationScreenView,  // creator's location
          dragging: true
        } );
        this.functionInstance.locationProperty.set( this.functionInstance.locationProperty.get().plus( FBConstants.POP_OUT_OFFSET ) ); // pop out
        thisNode.functionCreatedEmitter.emit1( this.functionInstance );

        // manage instance count
        numberOfInstancesProperty.value++;
        this.functionInstance.disposeCalledEmitter.addListener( function() {
          numberOfInstancesProperty.value--;
        } );
      },

      // No need to constrain drag bounds because functions return to carousel or builder when released.
      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        var location = this.functionInstance.locationProperty.get().plus( translationParams.delta );
        this.functionInstance.locationProperty.set( location );
      },

      end: function( event, trail ) {
        this.functionInstance.dragging = false;
        options.endDrag( this.functionInstance, event, trail );
        this.functionInstance = null;
      }
    } ) );

    options.children = [ backgroundNode, iconNode ];
    Node.call( this, options );

    // @private
    this.disposeFunctionCreatorNode = function() {
      assert && assert( thisNode.functionCreatedEmitter, 'called dispose twice?' );
      thisNode.functionCreatedEmitter.removeAllListeners();
      thisNode.functionCreatedEmitter = null;
    };
  }

  functionBuilder.register( 'FunctionCreatorNode', FunctionCreatorNode );

  return inherit( Node, FunctionCreatorNode, {

    // @public
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeFunctionCreatorNode();
    }
  } );
} );