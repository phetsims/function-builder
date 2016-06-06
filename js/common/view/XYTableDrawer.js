// Copyright 2016, University of Colorado Boulder

/**
 * Drawer that contains the XY table.
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
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/common/view/NumberCardContainer' );
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
      beforeOpen: function() { tableNode.visible = true; },
      afterClose: function() { tableNode.visible = false; },
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

    //TODO move this logic into XYTableNode?

    //TODO duplicate code in here, should we pass Card to table functions?
    // wire up input containers to table
    inputContainers.forEach( function( inputContainer ) {

      if ( inputContainer instanceof NumberCardContainer ) {

        // when card is removed from input container, add it to table, or scroll to show it in table
        inputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode );
          var rationalNumber = node.card.rationalNumber;
          if ( tableNode.containsEntry( rationalNumber ) ) {
            tableNode.scrollToEntry( rationalNumber );
          }
          else {
            tableNode.addEntry( rationalNumber );
          }
        } );

        // when card is returned to input container, remove it from table if the corresponding output container is empty
        inputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode );
          //TODO tableNode.removeEntry only if the corresponding output container is empty
          var rationalNumber = node.card.rationalNumber;
          if ( tableNode.containsEntry( rationalNumber ) ) { //TODO containsEntry required to avoid startup problem
            tableNode.removeEntry( rationalNumber );
          }
        } );
      }
      else if ( inputContainer instanceof EquationCardContainer ) {

        // when card is removed from input container, add it to table, or scroll to show it in table
        inputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof EquationCardNode );
          var xSymbol = node.card.xSymbol;
          if ( !tableNode.containsEntry( xSymbol ) ) {
            tableNode.addEntry( xSymbol );
          }
        } );

        // when card is returned to input container, remove it from table if the corresponding output container is empty
        inputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof EquationCardNode );
          //TODO tableNode.removeEntry only if the corresponding output container is empty
          var xSymbol = node.card.xSymbol;
          if ( tableNode.containsEntry( xSymbol ) ) { //TODO containsEntry required to avoid startup problem
            tableNode.removeEntry( xSymbol );
          }
        } );
      }
      else {
        throw new Error( 'unexpected container type' );
      }
    } );

    //TODO duplicate code in here, should we pass Card to table functions?
    // wire up output containers to table
    outputContainers.forEach( function( outputContainer ) {

      if ( outputContainer instanceof NumberCardContainer ) {

        // when card is added to the output container, show its output in the table
        outputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode );
          tableNode.setOutputVisible( node.card.rationalNumber, true );
        } );

        // when card is removed from output container, hide output in the table if the output container is empty
        outputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof NumberCardNode );
          var rationalNumber = node.card.rationalNumber;
          tableNode.scrollToEntry( rationalNumber );
          if ( outputContainer.isEmpty() ) {
            tableNode.setOutputVisible( rationalNumber, false );
          }
        } );
      }
      else if ( outputContainer instanceof EquationCardContainer ) {

        // when card is added to the output container, show its output in the table
        outputContainer.addEmitter.addListener( function( node ) {
          assert && assert( node instanceof EquationCardNode );
          tableNode.setOutputVisible( node.card.xSymbol, true );
        } );

        // when card is removed from output container, hide output in the table if the output container is empty
        outputContainer.removeEmitter.addListener( function( node ) {
          assert && assert( node instanceof EquationCardNode );
          var xSymbol = node.card.xSymbol;
          tableNode.scrollToEntry( xSymbol );
          if ( outputContainer.isEmpty() ) {
            tableNode.setOutputVisible( xSymbol, false );
          }
        } );
      }
      else {
        throw new Error( 'unexpected container type' );
      }
    } );
  }

  functionBuilder.register( 'XYTableDrawer', XYTableDrawer );

  return inherit( Drawer, XYTableDrawer );
} );
