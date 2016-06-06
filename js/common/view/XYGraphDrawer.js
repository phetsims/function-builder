// Copyright 2016, University of Colorado Boulder

/**
 * Drawer that contains the XY graph.
 *
 * The drawer is responsible for adding/removing things from the graph as cards are added/removed
 * from the output carousel, subject to the following requirements:
 *  - A point or line is added to the graph when the *first* instance of its corresponding card
 *   is added to the output container.
 * - A point or line is removed from the graph when the *last* instance of its corresponding card
 *   is removed from the output container.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationCardContainer = require( 'FUNCTION_BUILDER/common/view/EquationCardContainer' );
  var EquationCardNode = require( 'FUNCTION_BUILDER/common/view/EquationCardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/common/view/NumberCardContainer' );
  var NumberCardNode = require( 'FUNCTION_BUILDER/common/view/NumberCardNode' );
  var XYGraphNode = require( 'FUNCTION_BUILDER/common/view/XYGraphNode' );

  /**
   * @param {Builder} builder
   * @param {CardContainer[]} outputContainers - card containers in the output carousel
   * @param {Object} [options]
   * @constructor
   */
  function XYGraphDrawer( builder, outputContainers, options ) {

    options = _.extend( {
      open: FBConstants.GRAPH_DRAWER_OPEN,
      handleLocation: 'top',
      handleTouchAreaXDilation: FBConstants.DRAWER_TOUCH_AREA_X_DILATION,
      handleTouchAreaYDilation: FBConstants.DRAWER_TOUCH_AREA_Y_DILATION,
      cornerRadius: FBConstants.DRAWER_CORNER_RADIUS
    }, options );

    // Graph
    var graphNode = new XYGraphNode( builder, {
      visible: options.open,
      cornerRadius: options.cornerRadius
    } );

    Drawer.call( this, graphNode, options );

    // wire up output containers to graph
    outputContainers.forEach( function( outputContainer ) {
      if ( outputContainer instanceof NumberCardContainer ) {

        // When a number is added to an empty container in the output carousel,
        // add its corresponding point to the graph.
        outputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode );
          if ( outputContainer.numberOfItemsProperty.get() === 1 ) {
            graphNode.addPointAt( node.card.rationalNumber );
          }
        } );

        // When the last number is removed from a container in the output carousel,
        // remove its corresponding point from the graph.
        outputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode );
          if ( outputContainer.isEmpty() ) {
            graphNode.removePointAt( node.card.rationalNumber );
          }
        } );
      }
      else if ( outputContainer instanceof EquationCardContainer ) {

        // When the equation is added to a container in the output carousel,
        // show the line on the graph.
        outputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof EquationCardNode );
          graphNode.setLineVisible( true );
        } );

        // When the last equation is removed from a container in the output carousel,
        // hide the line on the graph.
        outputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof EquationCardNode );
          if ( outputContainer.isEmpty() ) {
            graphNode.setLineVisible( false );
          }
        } );
      }
      else {
        throw new Error( 'unexpected container type' );
      }
    } );
  }

  functionBuilder.register( 'XYGraphDrawer', XYGraphDrawer );

  return inherit( Drawer, XYGraphDrawer );
} );
