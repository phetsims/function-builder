// Copyright 2015, University of Colorado Boulder

/**
 * For each type of function, an instance of this node is placed in the function Carousel.
 * It has the following responsibilities:
 *
 * - displays a function's icon
 * - creates {AbstractFunction} function instances and manages their initial drag cycle
 * - limits the number of instances created to some (optional) maximum
 * - hides the function's icon and ceases creation when the maximum number of instances is reached
 * - monitors function instance to determine when they have been returned to the Carousel
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var SHOW_BOUNDS = FBQueryParameters.DEV; // {boolean} stroke the bounds with 'red'

  /**
   * @param {Node} iconNode - the function's icon
   * @param {function} createFunctionInstance - @param {Vector2} initialLocation, @returns {AbstractFunction}
   * @param {Object} [options]
   * @constructor
   */
  function FunctionCreatorNode( iconNode, createFunctionInstance, options ) {

    options = _.extend( {
      maxInstances: Number.POSITIVE_INFINITY  // {number} max number of function instances that can be created
    }, options );

    assert && assert( options.maxInstances >= 0 && options.maxInstances <= Number.POSITIVE_INFINITY );

    // Add a background rectangle with no fill or stroke, so that this Node's visible bounds remain constant
    var backgroundNode = new Rectangle( 0, 0, iconNode.width, iconNode.height, {
      stroke: SHOW_BOUNDS ? 'red' : null
    } );

    iconNode.center = backgroundNode.center;

    // number of function instances that have been created
    var numberOfInstancesProperty = new Property( 0 );
    numberOfInstancesProperty.link( function( numberOfInstances ) {
      iconNode.visible = ( numberOfInstances < options.maxInstances );
    } );

    iconNode.addInputListener( new SimpleDragHandler( {

      parentScreenView: null, // @private {ScreenView} set on first start drag
      functionInstance: null, // @private {AbstractFunction} set during a drag cycle

      allowTouchSnag: true,

      start: function( event, trail ) {

        assert && assert( !this.functionInstance );

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

        // Determine the initial location in the ScreenView's coordinate frame
        var initialLocationGlobal = event.currentTarget.parentToGlobalPoint( event.currentTarget.center );
        var initialLocationScreenView = this.parentScreenView.globalToLocalPoint( initialLocationGlobal );

        // Create the new function instance
        this.functionInstance = createFunctionInstance( initialLocationScreenView );

        // If the number of instances is limited, monitor when the function instance is returned
        if ( options.maxInstances < Number.POSITIVE_INFINITY ) {

          // increment
          numberOfInstancesProperty.value++;

          // decrement when the function instance is disposed of
          this.functionInstance.disposeEmitter.addListener( function() {
            numberOfInstancesProperty.value--;
          } );
        }
      },

      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        var location = this.functionInstance.locationProperty.get().plus( translationParams.delta );
        this.functionInstance.locationProperty.set( location );
      },

      end: function( event, trail ) {
        this.functionInstance.dragging = false;
        this.functionInstance = null;
      }
    } ) );

    options.children = [ backgroundNode, iconNode ];
    Node.call( this, options );
  }

  functionBuilder.register( 'FunctionCreatorNode', FunctionCreatorNode );

  return inherit( Node, FunctionCreatorNode );
} );