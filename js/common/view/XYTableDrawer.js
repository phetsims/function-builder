// Copyright 2016, University of Colorado Boulder

/**
 * Drawer that contains the XY table.
 *
 * As cards are added/removed from the input and output carousels, the drawer is responsible for:
 * - adding/removing rows from the table
 * - showing/hiding the output cells
 * - scrolling the table to show a specific row
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationCardNode = require( 'FUNCTION_BUILDER/common/view/EquationCardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardNode = require( 'FUNCTION_BUILDER/common/view/NumberCardNode' );
  var XYTableNode = require( 'FUNCTION_BUILDER/common/view/XYTableNode' );

  /**
   * @param {Builder} builder
   * @param {CardContainer[]} inputContainers - card containers in the input carousel
   * @param {CardContainer[]} outputContainers - card containers in the output carousel
   * @param {Object} [options]
   * @constructor
   */
  function XYTableDrawer( builder, inputContainers, outputContainers, options ) {

    options = _.extend( {

      // Drawer
      open: FBConstants.TABLE_DRAWER_OPEN,
      handleLocation: 'top',
      handleTouchAreaXDilation: FBConstants.DRAWER_TOUCH_AREA_X_DILATION,
      handleTouchAreaYDilation: FBConstants.DRAWER_TOUCH_AREA_Y_DILATION,
      cornerRadius: FBConstants.DRAWER_CORNER_RADIUS,

      // XYTableNode
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      headingFont: FBConstants.TABLE_XY_HEADING_FONT

    }, options );

    var tableNode = new XYTableNode( builder, {
      visible: options.open,
      xSymbol: options.xSymbol,
      ySymbol: options.ySymbol,
      headingFont: options.headingFont,
      cornerRadius: options.cornerRadius
    } );

    Drawer.call( this, tableNode, options );

    // wire up input and output containers to table
    for ( var i = 0; i < inputContainers.length; i++ ) {

      // create a closure using IIFE
      (function() {

        // closure vars, used in listeners
        var inputContainer = inputContainers[ i ];
        var outputContainer = outputContainers[ i ];

        // when card is removed from input container, add row to table, or scroll to show existing row in table
        inputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode || node instanceof EquationCardNode );
          var xValue = ( node instanceof NumberCardNode ) ? node.card.rationalNumber : node.card.xSymbol;
          if ( !tableNode.containsRow( xValue ) ) {
            tableNode.addRow( xValue );
          }
          tableNode.scrollToRow( xValue );
        } );

        // when card is returned to input container, remove row from table if the corresponding output container is empty
        inputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode || node instanceof EquationCardNode );
          var xValue = ( node instanceof NumberCardNode ) ? node.card.rationalNumber : node.card.xSymbol;
          if ( tableNode.containsRow( xValue ) && outputContainer.isEmpty() ) {
            tableNode.removeRow( xValue );
          }
        } );

        // when card is added to the output container, show its output in the table
        outputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode || node instanceof EquationCardNode );
          var xValue = ( node instanceof NumberCardNode ) ? node.card.rationalNumber : node.card.xSymbol;
          tableNode.setOutputCellVisible( xValue, true );
          tableNode.scrollToRow( xValue );
        } );

        // when card is removed from output container, hide its output in the table if the output container is empty
        outputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode || node instanceof EquationCardNode );
          var xValue = ( node instanceof NumberCardNode ) ? node.card.rationalNumber : node.card.xSymbol;
          tableNode.scrollToRow( xValue );
          if ( outputContainer.isEmpty() ) {
            tableNode.setOutputCellVisible( xValue, false );
          }
          tableNode.scrollToRow( xValue );
        } );
      })();
    }
  }

  functionBuilder.register( 'XYTableDrawer', XYTableDrawer );

  return inherit( Drawer, XYTableDrawer );
} );
