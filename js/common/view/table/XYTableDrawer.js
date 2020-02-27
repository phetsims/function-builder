// Copyright 2016-2020, University of Colorado Boulder

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

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import Drawer from '../../../../../scenery-phet/js/Drawer.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import XYTableNode from './XYTableNode.js';

/**
 * @param {Builder} builder
 * @param {CardContainer[]} inputContainers - card containers in the input carousel
 * @param {CardContainer[]} outputContainers - card containers in the output carousel
 * @param {Object} [options]
 * @constructor
 */
function XYTableDrawer( builder, inputContainers, outputContainers, options ) {

  options = merge( {
    open: FBConstants.TABLE_DRAWER_OPEN,
    handlePosition: 'top',
    tableOptions: null, // {*} options for XYTableNode

    // improve performance by disabling updates while the drawer is closed
    beforeOpen: function() { tableNode.updateEnabled = true; },
    afterClose: function() { tableNode.updateEnabled = false; }

  }, FBConstants.DRAWER_OPTIONS, options );

  var tableNode = new XYTableNode( builder, merge( {
    updateEnabled: options.open,
    cornerRadius: options.cornerRadius
  }, options.tableOptions ) );

  Drawer.call( this, tableNode, options );

  // wire up table to input containers
  inputContainers.forEach( function( inputContainer ) {

    // When card is removed from input container, add row to table.
    // removeListener unnecessary, instances exist for lifetime of the sim
    inputContainer.removeEmitter.addListener( function( node ) {
      const card = node.card;
      tableNode.addRow( card );
      tableNode.scrollToRow( card );
    } );

    // When card is returned to input container, remove row from table.
    // removeListener unnecessary, instances exist for lifetime of the sim
    inputContainer.addEmitter.addListener( function( node ) {
      const card = node.card;
      if ( tableNode.containsRow( card ) ) { // ignore when card is added to inputContainer at startup
        tableNode.removeRow( card );
      }
    } );
  } );

  // wire up table to output containers
  outputContainers.forEach( function( outputContainer ) {

    // When card is added to the output container, show its output in the table.
    // removeListener unnecessary, instances exist for lifetime of the sim.
    outputContainer.addEmitter.addListener( function( node ) {
      const card = node.card;
      tableNode.setOutputCellVisible( card, true );
      tableNode.scrollToRow( card );
    } );

    // When card is removed from output container, hide its output in the table.
    // removeListener unnecessary, instances exist for lifetime of the sim.
    outputContainer.removeEmitter.addListener( function( node ) {
      const card = node.card;
      tableNode.setOutputCellVisible( card, false );
      tableNode.scrollToRow( card );
    } );
  } );
}

functionBuilder.register( 'XYTableDrawer', XYTableDrawer );

inherit( Drawer, XYTableDrawer );
export default XYTableDrawer;