// Copyright 2016-2023, University of Colorado Boulder

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

import merge from '../../../../../phet-core/js/merge.js';
import Drawer from '../../../../../scenery-phet/js/Drawer.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import EquationCardNode from '../cards/EquationCardNode.js';
import NumberCardNode from '../cards/NumberCardNode.js';
import XYGraphNode from './XYGraphNode.js';

export default class XYGraphDrawer extends Drawer {

  /**
   * @param {Builder} builder
   * @param {CardContainer[]} outputContainers - card containers in the output carousel
   * @param {Object} [options]
   */
  constructor( builder, outputContainers, options ) {

    options = merge( {
      open: FBConstants.GRAPH_DRAWER_OPEN,
      handlePosition: 'top',
      graphOptions: null // {*} options for XYGraphNode
    }, FBConstants.DRAWER_OPTIONS, options );

    // Graph
    const graphNode = new XYGraphNode( builder, merge( {
      visible: options.open,
      cornerRadius: options.cornerRadius
    }, options.graphOptions ) );

    super( graphNode, options );

    // wire up graph to output containers
    outputContainers.forEach( outputContainer => {

      // When adding a card to an empty container in the output carousel,
      // add its corresponding point or line to the graph.
      // removeListener unnecessary, instances exist for lifetime of the sim.
      outputContainer.addEmitter.addListener( node => {
        if ( outputContainer.numberOfItemsProperty.get() === 1 ) {
          if ( node instanceof NumberCardNode ) {
            graphNode.addPointAt( node.card.rationalNumber );
          }
          else if ( node instanceof EquationCardNode ) {
            graphNode.setLineVisible( true );
          }
          else {
            throw new Error( 'invalid node type' );
          }
        }
      } );

      // When removing a card from the output carousel makes its output container empty,
      // remove its corresponding point or line from the graph.
      // removeListener unnecessary, instances exist for lifetime of the sim.
      outputContainer.removeEmitter.addListener( node => {
        if ( outputContainer.isEmpty() ) {
          if ( node instanceof NumberCardNode ) {
            graphNode.removePointAt( node.card.rationalNumber );
          }
          else if ( node instanceof EquationCardNode ) {
            graphNode.setLineVisible( false );
          }
          else {
            throw new Error( 'invalid node type' );
          }
        }
      } );
    } );
  }
}

functionBuilder.register( 'XYGraphDrawer', XYGraphDrawer );