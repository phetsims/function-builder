// Copyright 2016-2021, University of Colorado Boulder

/**
 * XY table, showing the mapping between input and output values for the functions in the builder.
 *
 * Requirements:
 * Each row is associated with an instance of a Card, and consists of input (x) and output (y) cells.
 * Rows for number cards are inserted in ascending numerical order.
 * Rows for symbolic cards (eg 'x') are appended to the table.
 * When a row is added, it's input cell is visible, it's output cell is invisible.
 * When a row is deleted, rows below it move up (handled automatically by using VBox).
 * The first 'page' in the table contains empty rows, otherwise there are no empty rows.
 * The values in the output cells reflect the functions in the builder.
 *
 * Performance is optimized so that the table synchronizes with the model only while updatesEnabled is true.
 * When updatesEnabled is changed from false to true, anything that is 'dirty' is updated.
 * See updatesEnabled and gridDirty flags.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Dimension2 from '../../../../../dot/js/Dimension2.js';
import Shape from '../../../../../kite/js/Shape.js';
import merge from '../../../../../phet-core/js/merge.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import CarouselButton from '../../../../../sun/js/buttons/CarouselButton.js';
import Animation from '../../../../../twixt/js/Animation.js';
import Easing from '../../../../../twixt/js/Easing.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBQueryParameters from '../../FBQueryParameters.js';
import FBSymbols from '../../FBSymbols.js';
import EquationCard from '../../model/cards/EquationCard.js';
import NumberCard from '../../model/cards/NumberCard.js';
import XYTableHeading from './XYTableHeading.js';
import XYTableRow from './XYTableRow.js';

class XYTableNode extends VBox {

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   */
  constructor( builder, options ) {

    options = merge( {

      size: FBConstants.TABLE_DRAWER_SIZE,
      numberOfRowsVisible: 3, // {number} number of rows visible in the scrolling area
      cornerRadius: 0,
      scrollingRegionFill: 'white',
      animationEnabled: true, // {boolean} is animation of scrolling enabled?
      updateEnabled: false, // {boolean} does this node update when the model changes?

      // column headings
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      headingFont: FBConstants.TABLE_XY_HEADING_FONT,
      headingYMargin: 2,
      headingBackground: 'rgb( 144, 226, 252 )'

    }, options );

    // options for scroll buttons
    const BUTTON_OPTIONS = {
      fireOnHold: false, // because scrolling is animated
      minWidth: options.size.width
    };

    // up button
    const upButton = new CarouselButton( merge( {}, BUTTON_OPTIONS, {
      cornerRadius: 0,
      arrowDirection: 'up'
    } ) );

    // down button
    const downButton = new CarouselButton( merge( {}, BUTTON_OPTIONS, {
      cornerRadius: options.cornerRadius,
      arrowDirection: 'down'
    } ) );

    // button touchAreas
    upButton.touchArea = upButton.localBounds.dilatedXY( 10, 5 ).shiftedY( -5 );
    downButton.touchArea = downButton.localBounds.dilatedXY( 10, 5 ).shiftedY( -5 );

    // column headings
    const headingNode = new XYTableHeading( options.xSymbol, options.ySymbol, {
      size: new Dimension2( options.size.width, 30 ),
      font: options.headingFont,
      fill: options.headingBackground,
      cornerRadii: {
        topLeft: options.cornerRadius,
        topRight: options.cornerRadius
      }
    } );

    // window that rows scroll in
    const scrollingRegionHeight = options.size.height - headingNode.height - upButton.height - downButton.height;
    const scrollingRegion = new Rectangle( 0, 0, options.size.width, scrollingRegionHeight, {
      fill: options.scrollingRegionFill
    } );
    scrollingRegion.clipArea = Shape.bounds( scrollingRegion.localBounds );

    // parent for all {XYTableRow} rows, children in the same order as this.cards
    // Do not add anything that is not a XYTableRow to this node!
    const rowsParent = new VBox();

    // grid is drawn separately so we don't have weirdness with cell strokes overlapping
    const gridNode = new Path( null, {
      stroke: 'black',
      lineWidth: 0.5
    } );

    // contents of the scrolling region
    const scrollingContents = new Node( {
      children: [ rowsParent, gridNode ]
    } );
    scrollingRegion.addChild( scrollingContents ); // add after setting clipArea

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ headingNode, upButton, scrollingRegion, downButton ];

    super( options );

    // @private
    this.builder = builder;
    this.numberOfRowsVisible = options.numberOfRowsVisible;
    this._animationEnabled = options.animationEnabled;
    this._updateEnabled = options.updateEnabled;
    this.gridDirty = true; // {boolean} does the grid need to be updated?
    this.rowsParent = rowsParent;
    this.gridNode = gridNode;
    this.rowSize = new Dimension2( options.size.width, scrollingRegionHeight / options.numberOfRowsVisible );

    if ( options.updateEnabled ) {
      this.updateGrid();
    }

    // @private number of rows in the table
    this.numberOfRowsProperty = new NumberProperty( 0, { numberType: 'Integer' } );

    // @private {Array.<NumberCard|EquationCard>} cards, in the order that they appear in the table
    this.cards = [];

    // @private {Property.<number>} the row number that appears at the top of the table
    this.rowNumberAtTopProperty = new NumberProperty( 0, { numberType: 'Integer' } );

    // {Animation} animation that vertically scrolls the rows
    let animation = null;

    // scroll
    // unlink unnecessary, instance owns this property
    this.rowNumberAtTopProperty.link( () => {

      // stop any animation that's in progress
      animation && animation.stop();

      const scrollY = -( this.rowNumberAtTopProperty.get() * this.rowSize.height );
      if ( this.visible && this.animationEnabled ) {

        // animate scrolling
        animation = new Animation( {
          duration: 0.5, // seconds
          easing: Easing.QUADRATIC_IN_OUT,
          object: scrollingContents,
          attribute: 'y',
          to: scrollY
        } );
        animation.start();
      }
      else {

        // move immediately, no animation
        scrollingContents.y = scrollY;
      }
    } );

    // button state is dependent on number of rows and which rows are visible
    const updateButtonState = () => {
      upButton.enabled = ( this.rowNumberAtTopProperty.get() !== 0 );
      downButton.enabled = ( this.numberOfRowsProperty.get() - this.rowNumberAtTopProperty.get() ) > options.numberOfRowsVisible;
    };
    // unlink unnecessary, instance owns these properties
    this.numberOfRowsProperty.link( updateButtonState );
    this.rowNumberAtTopProperty.link( updateButtonState );

    upButton.addListener( () => {
      this.rowNumberAtTopProperty.set( this.rowNumberAtTopProperty.get() - 1 );
    } );

    downButton.addListener( () => {
      this.rowNumberAtTopProperty.set( this.rowNumberAtTopProperty.get() + 1 );
    } );
  }

  /**
   * Updates the grid that delineates rows and columns. This grid is drawn separately from cells,
   * so that we don't have to deal with issues related to overlapping strokes around cells.
   * Draw one extra (empty) row so that we don't see a gap when animating after removing the last row.
   *
   * @private
   */
  updateGrid() {

    assert && assert( this.updateEnabled && this.gridDirty );

    // always show 1 page of cells, even if some are empty
    const numberOfRows = Math.max( this.numberOfRowsVisible, this.numberOfRowsProperty.get() );

    const gridShape = new Shape();

    // horizontal lines between rows
    for ( let i = 1; i < numberOfRows + 1; i++ ) {
      const y = i * this.rowSize.height;
      gridShape.moveTo( 0, y ).lineTo( this.rowSize.width, y );
    }

    // vertical line between columns
    const centerX = this.rowSize.width / 2;
    gridShape.moveTo( centerX, 0 ).lineTo( centerX, ( numberOfRows + 1 ) * this.rowSize.height );

    this.gridNode.shape = gridShape;

    this.gridDirty = false;
  }

  /**
   * Adds a row to the table.
   * For NumberCard, cards are in ascending numeric order.
   * For EquationCard, cards are added to the end.
   *
   * @param {NumberCard|EquationCard} card - card that's associated with the row
   * @public
   */
  addRow( card ) {

    assert && assert( !this.containsRow( card ) );
    assert && assert( card instanceof NumberCard || card instanceof EquationCard );

    // create the row
    const rowNode = new XYTableRow( card, this.builder, {
      size: this.rowSize,
      updateEnabled: this.updateEnabled
    } );

    if ( card instanceof NumberCard ) {

      // Insert number cards in ascending numerical order. Determine insertion index by looking at cards in order,
      // until we encounter a symbolic card (eg, 'x', which is always at the end) or a card with a larger number.
      let insertIndex = this.cards.length;
      for ( let i = 0; i < this.cards.length; i++ ) {
        const someCard = this.cards[ i ];
        if ( ( someCard instanceof EquationCard ) || ( card.rationalNumber.valueOf() < someCard.rationalNumber.valueOf() ) ) {
          insertIndex = i;
          break;
        }
      }
      this.cards.splice( insertIndex, 0, card );
      this.rowsParent.insertChild( insertIndex, rowNode );
    }
    else if ( card instanceof EquationCard ) {

      // add 'x' card to end
      this.cards.push( card );
      this.rowsParent.addChild( rowNode );
    }
    else {
      throw new Error( 'invalid card type' );
    }

    this.numberOfRowsProperty.set( this.numberOfRowsProperty.get() + 1 );

    // update the grid
    this.gridDirty = true;
    if ( this.updateEnabled ) {
      this.updateGrid();
    }
  }

  /**
   * Removes a row from the table. Rows below it move up.
   *
   * @param {NumberCard|EquationCard} card - card that's associated with the row
   * @public
   */
  removeRow( card ) {

    const cardIndex = this.cards.indexOf( card );
    assert && assert( cardIndex !== -1 );

    // remove card
    this.cards.splice( cardIndex, 1 );

    // If the last row is visible at the bottom of the table, disable scrolling animation.
    // This prevents a situation that looks a little odd: rows will move up to reveal an empty
    // row at the bottom, then rows will scroll down.
    const wasAnimationEnabled = this.animationEnabled;
    if ( this.rowNumberAtTopProperty.get() === this.numberOfRowsProperty.get() - this.numberOfRowsVisible ) {
      this.animationEnabled = false;
    }

    // remove row, rows below it move up automatically since rowsParent is a VBox
    const rowNode = this.rowsParent.getChildAt( cardIndex );
    assert && assert( rowNode instanceof XYTableRow );
    this.rowsParent.removeChild( rowNode );
    rowNode.dispose();
    this.numberOfRowsProperty.set( this.numberOfRowsProperty.get() - 1 );

    // update the grid
    this.gridDirty = true;
    if ( this.updateEnabled ) {
      this.updateGrid();
    }

    // if we're not on the first page, which allows empty rows...
    if ( this.rowNumberAtTopProperty.get() !== 0 ) {

      // if there's an empty row at the bottom of the table, move all rows down
      if ( this.numberOfRowsProperty.get() - this.numberOfRowsVisible < this.rowNumberAtTopProperty.get() ) {
        this.rowNumberAtTopProperty.set( this.numberOfRowsProperty.get() - this.numberOfRowsVisible );
      }
    }

    this.animationEnabled = wasAnimationEnabled;
  }

  /**
   * Does the table contain a row for the specified card?
   *
   * @param {Card} card
   * @returns {boolean}
   * @public
   */
  containsRow( card ) {
    return ( this.cards.indexOf( card ) !== -1 );
  }

  /**
   * Sets the visibility of the corresponding output cell.
   *
   * @param {NumberCard|EquationCard} card - card that's associated with the row
   * @param {boolean} visible
   * @public
   */
  setOutputCellVisible( card, visible ) {

    const cardIndex = this.cards.indexOf( card );
    assert && assert( cardIndex !== -1 );

    const rowNode = this.rowsParent.getChildAt( cardIndex );
    assert && assert( rowNode instanceof XYTableRow );
    rowNode.setOutputCellVisible( visible );
  }

  /**
   * Scrolls the table to make the corresponding row visible.
   * Does the minimal amount of scrolling necessary for the row to be visible.
   *
   * @param {NumberCard|EquationCard} card - card that's associated with the row
   * @public
   */
  scrollToRow( card ) {

    const cardIndex = this.cards.indexOf( card );
    assert && assert( cardIndex !== -1 );

    const rowNumberAtTop = this.rowNumberAtTopProperty.get();

    if ( cardIndex < rowNumberAtTop ) {
      this.rowNumberAtTopProperty.set( cardIndex );
    }
    else if ( cardIndex > rowNumberAtTop + this.numberOfRowsVisible - 1 ) {
      this.rowNumberAtTopProperty.set( cardIndex - this.numberOfRowsVisible + 1 );
    }
    else {
      // row is already visible
    }
  }

  /**
   * Determines whether animation is enabled for scrolling.
   *
   * @param {boolean} animationEnabled
   * @public
   *
   */
  setAnimationEnabled( animationEnabled ) {
    this._animationEnabled = animationEnabled;
  }

  set animationEnabled( value ) { this.setAnimationEnabled( value ); }

  /**
   * Is animation enabled for scrolling?
   *
   * @returns {boolean}
   * @public
   */
  getAnimationEnabled() {
    return this._animationEnabled;
  }

  get animationEnabled() { return this.getAnimationEnabled(); }

  /**
   * Determines whether updating of this node is enabled.
   *
   * @param {boolean} updateEnabled
   * @public
   *
   */
  setUpdateEnabled( updateEnabled ) {

    FBQueryParameters.log && console.log( `${this.constructor.name}.setUpdateEnabled ${updateEnabled}` );

    const wasUpdateEnabled = this._updateEnabled;
    this._updateEnabled = updateEnabled;

    // set updateEnabled for rows
    this.rowsParent.getChildren().forEach( rowNode => {
      assert && assert( rowNode instanceof XYTableRow, 'did you add something to this.rowsParent that you should not have?' );
      rowNode.updateEnabled = updateEnabled;
    } );

    // update things specific to this node
    if ( this.gridDirty && !wasUpdateEnabled && updateEnabled ) {
      this.updateGrid();
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

functionBuilder.register( 'XYTableNode', XYTableNode );

export default XYTableNode;