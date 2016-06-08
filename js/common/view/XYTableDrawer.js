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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
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
      beforeOpen: function() { tableNode.updateEnabled = true; },
      afterClose: function() { tableNode.updateEnabled = false; },

      // XYTableNode
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      headingFont: FBConstants.TABLE_XY_HEADING_FONT

    }, options );

    var tableNode = new XYTableNode( builder, {
      updateEnabled: options.open,
      xSymbol: options.xSymbol,
      ySymbol: options.ySymbol,
      headingFont: options.headingFont,
      cornerRadius: options.cornerRadius
    } );

    Drawer.call( this, tableNode, options );

    // wire up table to input containers
    inputContainers.forEach( function( inputContainer ) {

      // when card is removed from input container, add row to table
      inputContainer.removeEmitter.addListener( function( node ) {
        var card = node.card;
        tableNode.addRow( card );
        tableNode.scrollToRow( card );
      } );

      // when card is returned to input container, remove row from table
      inputContainer.addEmitter.addListener( function( node ) {
        var card = node.card;
        if ( tableNode.containsRow( card ) ) { // ignore when card is added to inputContainer at startup
          tableNode.removeRow( card );
        }
      } );
    } );

    // wire up table to output containers
    outputContainers.forEach( function( outputContainer ) {

      // when card is added to the output container, show its output in the table
      outputContainer.addEmitter.addListener( function( node ) {
        var card = node.card;
        tableNode.setOutputCellVisible( card, true );
        tableNode.scrollToRow( card );
      } );

      // when card is removed from output container, hide its output in the table
      outputContainer.removeEmitter.addListener( function( node ) {
        var card = node.card;
        tableNode.setOutputCellVisible( card, false );
        tableNode.scrollToRow( card );
      } );
    } );
  }

  functionBuilder.register( 'XYTableDrawer', XYTableDrawer );

  return inherit( Drawer, XYTableDrawer );
} );
