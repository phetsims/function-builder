// Copyright 2016, University of Colorado Boulder

//TODO performance: update only when XYTableNode is visible, if that seems significant
/**
 * XY table.
 * Each row is associated with an instance of a Card, and consists of input (x) and output (y) cells.
 * When a row is added, it is added to the end of the table, it's input cell is visible, it's output cell is invisible.
 * When a row is deleted, rows below it move up (handled automatically by using VBox).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CarouselButton = require( 'SUN/buttons/CarouselButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EquationCard = require( 'FUNCTION_BUILDER/common/model/EquationCard' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoveTo = require( 'TWIXT/MoveTo' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberCard = require( 'FUNCTION_BUILDER/common/model/NumberCard' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var XYTableHeading = require( 'FUNCTION_BUILDER/common/view/XYTableHeading' );
  var XYTableRow = require( 'FUNCTION_BUILDER/common/view/XYTableRow' );

  /**
   * @param {Builder} builder
   * @param {Object} options
   * @constructor
   */
  function XYTableNode( builder, options ) {

    options = _.extend( {

      size: FBConstants.TABLE_DRAWER_SIZE,
      numberOfRowsVisible: 3, // {number} number of rows visible in the scrolling area
      cornerRadius: 0,
      scrollingRegionFill: 'white',
      animationEnabled: true, // {boolean} is animation of scrolling enabled?

      // column headings
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      headingFont: FBConstants.TABLE_XY_HEADING_FONT,
      headingYMargin: 2,
      headingBackground: 'rgb( 144, 226, 252 )'

    }, options );

    var thisNode = this;

    // @private
    this.builder = builder;
    this.numberOfRowsVisible = options.numberOfRowsVisible;
    this._animationEnabled = options.animationEnabled;
    this._updateEnabled = options.updateEnabled;

    // @private {NumberCard|EquationCard} cards, in the order that they appear in the table
    this.cards = [];

    // @private {XYTableRow} rows, in the same order as cards[]
    this.rowNodes = new ObservableArray( [] );

    // options for scroll buttons
    var BUTTON_OPTIONS = {
      fireOnHold: false, // because scrolling is animated
      minWidth: options.size.width
    };

    // up button
    var upButton = new CarouselButton( _.extend( {}, BUTTON_OPTIONS, {
      cornerRadius: 0,
      arrowDirection: 'up'
    } ) );

    // down button
    var downButton = new CarouselButton( _.extend( {}, BUTTON_OPTIONS, {
      cornerRadius: options.cornerRadius,
      arrowDirection: 'down'
    } ) );

    // button touchAreas
    upButton.touchArea = upButton.localBounds.dilatedXY( 10, 5 ).shiftedY( -5 );
    downButton.touchArea = downButton.localBounds.dilatedXY( 10, 5 ).shiftedY( -5 );

    // column headings
    var headingNode = new XYTableHeading( options.xSymbol, options.ySymbol, {
      size: new Dimension2( options.size.width, 30 ),
      font: options.headingFont,
      fill: options.headingBackground
    } );

    // window that rows scroll in
    var scrollingRegionHeight = options.size.height - headingNode.height - upButton.height - downButton.height;
    var scrollingRegion = new Rectangle( 0, 0, options.size.width, scrollingRegionHeight, {
      fill: options.scrollingRegionFill
    } );
    scrollingRegion.clipArea = Shape.bounds( scrollingRegion.localBounds );

    // @private
    this.rowSize = new Dimension2( options.size.width, scrollingRegionHeight / options.numberOfRowsVisible );

    // @private parent for all rows
    this.rowsParent = new VBox();

    // @private grid is drawn separately so we don't have weirdness with cell strokes overlapping
    this.gridNode = new Path( null, {
      stroke: 'black',
      lineWidth: 0.5
    } );
    if ( options.updateEnabled ) {
      this.updateGrid();
    }

    // contents of the scrolling region
    var scrollingContents = new Node( {
      children: [ this.rowsParent, this.gridNode ]
    } );
    scrollingRegion.addChild( scrollingContents ); // add after setting clipArea

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ headingNode, upButton, scrollingRegion, downButton ];

    VBox.call( this, options );

    // private the row number that appears at the top of the table
    this.rowNumberAtTopProperty = new Property( 0 );

    var animation = null; // {MoveTo} animation that scrolls the rows

    // scroll
    this.rowNumberAtTopProperty.link( function() {

      // stop any animation that's in progress
      animation && animation.stop();

      var scrollY = -( thisNode.rowNumberAtTopProperty.get() * thisNode.rowSize.height );
      if ( thisNode.visible && thisNode.animationEnabled ) {

        // animate scrolling
        var destination = new Vector2( scrollingContents.x, scrollY );
        animation = new MoveTo( scrollingContents, destination, {
          constantSpeed: false,
          duration: 500, // ms
          onComplete: function() {
            animation = null;
          }
        } );
        animation.start();
      }
      else {

        // move immediately, no animation
        scrollingContents.y = scrollY;
      }
    } );

    // button state is dependent on number of rows and which rows are visible
    var updateButtonState = function() {

      var rowNumberAtTop = thisNode.rowNumberAtTopProperty.get();
      var numberOfRows = thisNode.rowNodes.lengthProperty.get();

      // scrolling button states
      upButton.enabled = ( rowNumberAtTop !== 0 );
      downButton.enabled = ( numberOfRows - rowNumberAtTop ) > options.numberOfRowsVisible;
    };
    this.rowNumberAtTopProperty.link( updateButtonState );
    this.rowNodes.addItemAddedListener( updateButtonState );
    this.rowNodes.addItemRemovedListener( updateButtonState );

    upButton.addListener( function() {
      thisNode.rowNumberAtTopProperty.set( thisNode.rowNumberAtTopProperty.get() - 1 );
    } );

    downButton.addListener( function() {
      thisNode.rowNumberAtTopProperty.set( thisNode.rowNumberAtTopProperty.get() + 1 );
    } );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  return inherit( VBox, XYTableNode, {

    /**
     * Updates the grid that delineates rows and columns. This grid is drawn separately from cells,
     * so that we don't have to deal with issues related to overlapping strokes around cells.
     * Draw one extra (empty) row so that we don't see a gap when animating after removing the last row.
     *
     * @private
     */
    updateGrid: function() {

      assert && assert( this.updateEnabled );

      // always show 1 page of cells, even if some are empty
      var numberOfRows = Math.max( this.numberOfRowsVisible, this.rowNodes.lengthProperty.get() );

      var gridShape = new Shape();

      // horizontal lines between rows
      for ( var i = 1; i < numberOfRows + 1; i++ ) {
        var y = i * this.rowSize.height;
        gridShape.moveTo( 0, y ).lineTo( this.rowSize.width, y );
      }

      // vertical line between columns
      var centerX = this.rowSize.width / 2;
      gridShape.moveTo( centerX, 0 ).lineTo( centerX, ( numberOfRows + 1 ) * this.rowSize.height );

      this.gridNode.shape = gridShape;
    },

    /**
     * Appends a row to the table.
     *
     * @param {NumberCard|EquationCard} card - card that's associated with the row
     * @public
     */
    addRow: function( card ) {

      assert && assert( !this.containsRow( card ) );
      assert && assert( card instanceof NumberCard || card instanceof EquationCard );

      // add card
      this.cards.push( card );

      // add row
      var rowNode = new XYTableRow( card, this.builder, {
        size: this.rowSize,
        updateEnabled: this.updateEnabled
      } );
      this.rowNodes.add( rowNode );
      this.rowsParent.addChild( rowNode );

      // update the grid
      if ( this.updateEnabled ) {
        this.updateGrid();
      }
    },

    /**
     * Removes a row from the table. Rows below it move up.
     *
     * @param {NumberCard|EquationCard} card - card that's associated with the row
     * @public
     */
    removeRow: function( card ) {

      var cardIndex = this.cards.indexOf( card );
      assert && assert( cardIndex !== -1 );

      // remove card
      this.cards.splice( cardIndex, 1 );

      // If the last row is visible at the bottom of the table, disable scrolling animation.
      // This prevents a situation that looks a little odd: rows will move up to reveal an empty
      // row at the bottom, then rows will scroll down.
      var numberOfRows = this.rowNodes.lengthProperty.get();
      var rowNumberAtTop = this.rowNumberAtTopProperty.get();
      var wasAnimationEnabled = this.animationEnabled;
      if ( rowNumberAtTop === numberOfRows - this.numberOfRowsVisible ) {
        this.animationEnabled = false;
      }

      // remove row, rows below it move up automatically since rowsParent is a VBox
      var rowNode = this.rowNodes.get( cardIndex );
      rowNode.dispose();
      this.rowsParent.removeChild( rowNode );
      this.rowNodes.remove( rowNode );

      // update the grid
      if ( this.updateEnabled ) {
        this.updateGrid();
      }

      // empty row at the bottom of the table, move all rows down
      numberOfRows = this.rowNodes.lengthProperty.get();
      rowNumberAtTop = this.rowNumberAtTopProperty.get();
      if ( rowNumberAtTop !== 0 && ( numberOfRows - this.numberOfRowsVisible < rowNumberAtTop ) ) {
        this.rowNumberAtTopProperty.set( numberOfRows - this.numberOfRowsVisible );
      }

      this.animationEnabled = wasAnimationEnabled;
    },

    /**
     * Does the table contain a row for the specified card?
     *
     * @param {Card} card
     * @returns {boolean}
     * @public
     */
    containsRow: function( card ) {
      return ( this.cards.indexOf( card ) !== -1 );
    },

    /**
     * Sets the visibility of the corresponding output cell.
     *
     * @param {NumberCard|EquationCard} card - card that's associated with the row
     * @param {boolean} visible
     * @public
     */
    setOutputCellVisible: function( card, visible ) {

      var cardIndex = this.cards.indexOf( card );
      assert && assert( cardIndex !== -1 );

      var rowNode = this.rowNodes.get( cardIndex );
      rowNode.setOutputCellVisible( visible );
    },

    /**
     * Scrolls the table to make the corresponding row visible.
     * Does the minimal amount of scrolling necessary for the row to be visible.
     *
     * @param {NumberCard|EquationCard} card - card that's associated with the row
     * @public
     */
    scrollToRow: function( card ) {

      var cardIndex = this.cards.indexOf( card );
      assert && assert( cardIndex !== -1 );

      var rowNumberAtTop = this.rowNumberAtTopProperty.get();

      if ( cardIndex < rowNumberAtTop ) {
        this.rowNumberAtTopProperty.set( cardIndex );
      }
      else if ( cardIndex > rowNumberAtTop + this.numberOfRowsVisible - 1 ) {
        this.rowNumberAtTopProperty.set( cardIndex - this.numberOfRowsVisible + 1 );
      }
      else {
        // row is already visible
      }
    },

    /**
     * Determines whether animation is enabled for scrolling.
     *
     * @param {boolean} animationEnabled
     * @public
     *
     */
    setAnimationEnabled: function( animationEnabled ) {
      this._animationEnabled = animationEnabled;
    },
    set animationEnabled( value ) { this.setAnimationEnabled( value ); },

    /**
     * Is animation enabled for scrolling?
     *
     * @returns {boolean}
     * @public
     */
    getAnimationEnabled: function() {
      return this._animationEnabled;
    },
    get animationEnabled() { return this.getAnimationEnabled(); },

    /**
     * Determines whether updating of this node is enabled.
     *
     * @param {boolean} updateEnabled
     * @public
     *
     */
    setUpdateEnabled: function( updateEnabled ) {

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.setUpdateEnabled ' + updateEnabled );

      var wasUpdateEnabled = this._updateEnabled;
      this._updateEnabled = updateEnabled;

      // set updateEnabled for rows
      this.rowNodes.forEach( function( rowNode ) {
        rowNode.updateEnabled = updateEnabled;
      } );

      // update things specific to this node
      if ( !wasUpdateEnabled && updateEnabled ) {
        this.updateGrid();
      }
    },
    set updateEnabled( value ) { this.setUpdateEnabled( value ); },

    /**
     * Is updating of this node enabled?
     *
     * @returns {boolean}
     * @public
     */
    getUpdateEnabled: function() {
      return this._updateEnabled;
    },
    get updateEnabled() { return this.getUpdateEnabled(); }
  } );
} );
