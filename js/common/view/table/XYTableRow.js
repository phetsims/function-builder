// Copyright 2016-2021, University of Colorado Boulder

/**
 * A row in the XY table.
 * Each row is associated with an instance of a card, and contains an input and output cell.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import merge from '../../../../../phet-core/js/merge.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import functionBuilder from '../../../functionBuilder.js';
import EquationCard from '../../model/cards/EquationCard.js';
import NumberCard from '../../model/cards/NumberCard.js';
import SlopeInterceptEquation from '../../model/equations/SlopeInterceptEquation.js';
import SlopeInterceptEquationNode from '../equations/SlopeInterceptEquationNode.js';
import RationalNumberNode from '../RationalNumberNode.js';

class XYTableRow extends Node {

  /**
   * @param {NumberCard|EquationCard} card - card that's associated with the row
   * @param {Builder} builder
   * @param options
   */
  constructor( card, builder, options ) {

    assert && assert( card instanceof NumberCard || card instanceof EquationCard );

    options = merge( {
      size: new Dimension2( 100, 10 ),
      cellXMargin: 15,
      cellYMargin: 3,
      updateEnabled: true // {boolean} does this node update when the model changes?
    }, options );

    super();

    // @private
    this.card = card;
    this.builder = builder;
    this.size = options.size;
    this._updateEnabled = options.updateEnabled;
    this.dirty = true; // {boolean} does this node need to be updated?

    // don't stroke the cells, grid is drawn by XYTableNode
    const rowNode = new Rectangle( 0, 0, options.size.width, options.size.height );
    this.addChild( rowNode );

    // @private constrain values to cells
    this.valueMaxWidth = ( options.size.width / 2 ) - ( 2 * options.cellXMargin );
    this.valueMaxHeight = options.size.height - ( 2 * options.cellYMargin );

    // input value, static
    const inputValueNode = createCellValueNode( card, builder, {
      numberOfFunctions: 0, // apply no functions for the input value
      maxWidth: this.valueMaxWidth,
      maxHeight: this.valueMaxHeight,
      centerX: 0.25 * options.size.width,
      centerY: options.size.height / 2
    } );
    this.addChild( inputValueNode );

    // @private output value, correct node is created by updateOutputValue
    this.outputValueNode = null;

    // Update the output value when functions change
    const functionChangedListener = () => {
      this.dirty = true;
      if ( this.updateEnabled ) {
        this.updateOutputValue();
      }
    };
    builder.functionChangedEmitter.addListener( functionChangedListener ); // removeListener required by dispose

    // initial state of output cell
    if ( this.updateEnabled ) {
      this.updateOutputValue();
    }
    else {
      // non-null placeholder for output value
      this.outputValueNode = new Rectangle( 0, 0, 1, 1, {
        visible: options.updateEnabled
      } );
      this.addChild( this.outputValueNode );
    }

    this.mutate( options );

    // @private
    this.disposeXYTableRow = () => {
      builder.functionChangedEmitter.removeListener( functionChangedListener );
      builder = null; // so things fail if we try to use this instance after dispose is called
    };
  }

  // @public
  dispose() {
    this.disposeXYTableRow();
    super.dispose();
  }

  /**
   * Updates the value in the output cell.
   *
   * @private
   */
  updateOutputValue() {

    assert && assert( this.updateEnabled && this.dirty );

    // remove previous node
    let outputValueNodeWasVisible = false;
    if ( this.outputValueNode ) {
      outputValueNodeWasVisible = this.outputValueNode.visible;
      this.removeChild( this.outputValueNode );
    }

    // add new node
    this.outputValueNode = createCellValueNode( this.card, this.builder, {
      numberOfFunctions: this.builder.numberOfSlots, // apply all functions for the output value
      visible: outputValueNodeWasVisible,
      maxWidth: this.valueMaxWidth,
      maxHeight: this.valueMaxHeight,
      centerX: 0.75 * this.size.width,
      centerY: this.size.height / 2
    } );
    this.addChild( this.outputValueNode );

    this.dirty = false;
  }

  /**
   * Sets the visibility ofthe row's output cell.
   *
   * @param visible
   * @public
   */
  setOutputCellVisible( visible ) {
    this.outputValueNode.visible = visible;
  }

  /**
   * Determines whether updating of this node is enabled.
   *
   * @param {boolean} updateEnabled
   * @public
   *
   */
  setUpdateEnabled( updateEnabled ) {
    const wasUpdateEnabled = this._updateEnabled;
    this._updateEnabled = updateEnabled;
    if ( this.dirty && !wasUpdateEnabled && updateEnabled ) {
      this.updateOutputValue();
    }
  }

  set updateEnabled( value ) { this.setUpdateEnabled( value ); }

  /**
   * Is updating of this node enabled?
   *
   * @returns {boolean}
   * @public
   */
  getUpdateEnabled() {
    return this._updateEnabled;
  }

  get updateEnabled() { return this.getUpdateEnabled(); }
}

/**
 * Creates the value for a specified card.
 *
 * @param {NumberCard|EquationCard} card
 * @param {Builder} builder
 * @param {Object} [options]
 * @returns {Node}
 */
function createCellValueNode( card, builder, options ) {

  options = merge( {
    numberOfFunctions: 0, // number of functions to apply
    showLeftHandSide: false // don't show the left-hand side (y =) of equations
  }, options );
  assert && assert( options.numberOfFunctions <= builder.numberOfSlots );

  let valueNode = null;
  if ( card instanceof NumberCard ) {
    const rationalNumber = builder.applyFunctions( card.rationalNumber, options.numberOfFunctions );
    valueNode = new RationalNumberNode( rationalNumber, options );
  }
  else if ( card instanceof EquationCard ) {
    const mathFunctions = builder.applyFunctions( [], options.numberOfFunctions ); // {MathFunction[]}
    const equation = new SlopeInterceptEquation( mathFunctions );
    valueNode = new SlopeInterceptEquationNode( equation.slope, equation.intercept, options );
  }
  else {
    throw new Error( 'invalid card type' );
  }
  return valueNode;
}

functionBuilder.register( 'XYTableRow', XYTableRow );

export default XYTableRow;