// Copyright 2016, University of Colorado Boulder

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
define( function( require ) {
  'use strict';

  // modules
  var CarouselButton = require( 'SUN/buttons/CarouselButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EquationCard = require( 'FUNCTION_BUILDER/common/model/cards/EquationCard' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoveTo = require( 'TWIXT/MoveTo' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberCard = require( 'FUNCTION_BUILDER/common/model/cards/NumberCard' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var XYTableHeading = require( 'FUNCTION_BUILDER/common/view/table/XYTableHeading' );
  var XYTableRow = require( 'FUNCTION_BUILDER/common/view/table/XYTableRow' );

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

    var self = this;

    // @private
    this.builder = builder;
    this.numberOfRowsVisible = options.numberOfRowsVisible;
    this._animationEnabled = options.animationEnabled;
    this._updateEnabled = options.updateEnabled;
    this.gridDirty = true; // {boolean} does the grid need to be updated?

    // @private {Property.<number>} number of rows in the table
    this.numberOfRowsProperty = new Property( 0 );

    // @private {Array.<NumberCard|EquationCard>} cards, in the order that they appear in the table
    this.cards = [];

    // @private parent for all {XYTableRow} rows, children in the same order as this.cards
    // Do not add anything that is not a XYTableRow to this node!
    this.rowsParent = new VBox();

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
      fill: options.headingBackground,
      cornerRadii: {
        topLeft: options.cornerRadius,
        topRight: options.cornerRadius
      }
    } );

    // window that rows scroll in
    var scrollingRegionHeight = options.size.height - headingNode.height - upButton.height - downButton.height;
    var scrollingRegion = new Rectangle( 0, 0, options.size.width, scrollingRegionHeight, {
      fill: options.scrollingRegionFill
    } );
    scrollingRegion.clipArea = Shape.bounds( scrollingRegion.localBounds );

    // @private
    this.rowSize = new Dimension2( options.size.width, scrollingRegionHeight / options.numberOfRowsVisible );

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

    // @private {Property.<number>} the row number that appears at the top of the table
    this.rowNumberAtTopProperty = new Property( 0 );

    var animation = null; // {MoveTo} animation that scrolls the rows

    // scroll
    // unlink unnecessary, instance owns this property
    this.rowNumberAtTopProperty.link( function() {

      // stop any animation that's in progress
      animation && animation.stop();

      var scrollY = -( self.rowNumberAtTopProperty.get() * self.rowSize.height );
      if ( self.visible && self.animationEnabled ) {

        // animate scrolling
        var destination = new Vector2( scrollingContents.x, scrollY );
        animation = new MoveTo( scrollingContents, destination, {
          constantSpeed: false,
          duration: 500, // ms
          onComplete: function() {
            animation = null;
          }
        } );
        animation.start( phet.joist.elapsedTime );
      }
      else {

        // move immediately, no animation
        scrollingContents.y = scrollY;
      }
    } );

    // button state is dependent on number of rows and which rows are visible
    var updateButtonState = function() {
      upButton.enabled = ( self.rowNumberAtTopProperty.get() !== 0 );
      downButton.enabled = ( self.numberOfRowsProperty.get() - self.rowNumberAtTopProperty.get() ) > options.numberOfRowsVisible;
    };
    // unlink unnecessary, instance owns these properties
    this.numberOfRowsProperty.link( updateButtonState );
    this.rowNumberAtTopProperty.link( updateButtonState );

    upButton.addListener( function() {
      self.rowNumberAtTopProperty.set( self.rowNumberAtTopProperty.get() - 1 );
    } );

    downButton.addListener( function() {
      self.rowNumberAtTopProperty.set( self.rowNumberAtTopProperty.get() + 1 );
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

      assert && assert( this.updateEnabled && this.gridDirty );

      // always show 1 page of cells, even if some are empty
      var numberOfRows = Math.max( this.numberOfRowsVisible, this.numberOfRowsProperty.get() );

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

      this.gridDirty = false;
    },

    /**
     * Adds a row to the table.
     * For NumberCard, cards are in ascending numeric order.
     * For EquationCard, cards are added to the end.
     *
     * @param {NumberCard|EquationCard} card - card that's associated with the row
     * @public
     */
    addRow: function( card ) {

      assert && assert( !this.containsRow( card ) );
      assert && assert( card instanceof NumberCard || card instanceof EquationCard );

      // create the row
      var rowNode = new XYTableRow( card, this.builder, {
        size: this.rowSize,
        updateEnabled: this.updateEnabled
      } );

      if ( card instanceof NumberCard ) {

        // Insert number cards in ascending numerical order. Determine insertion index by looking at cards in order,
        // until we encounter a symbolic card (eg, 'x', which is always at the end) or a card with a larger number.
        var insertIndex = this.cards.length;
        for ( var i = 0; i < this.cards.length; i++ ) {
          var someCard = this.cards[ i ];
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
      var wasAnimationEnabled = this.animationEnabled;
      if ( this.rowNumberAtTopProperty.get() === this.numberOfRowsProperty.get() - this.numberOfRowsVisible ) {
        this.animationEnabled = false;
      }

      // remove row, rows below it move up automatically since rowsParent is a VBox
      var rowNode = this.rowsParent.getChildAt( cardIndex );
      assert && assert( rowNode instanceof XYTableRow );
      rowNode.dispose();
      this.rowsParent.removeChild( rowNode );
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

      var rowNode = this.rowsParent.getChildAt( cardIndex );
      assert && assert( rowNode instanceof XYTableRow );
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

      FBQueryParameters.log && console.log( this.constructor.name + '.setUpdateEnabled ' + updateEnabled );

      var wasUpdateEnabled = this._updateEnabled;
      this._updateEnabled = updateEnabled;

      // set updateEnabled for rows
      this.rowsParent.getChildren().forEach( function( rowNode ) {
        assert && assert( rowNode instanceof XYTableRow, 'did you add something to this.rowsParent that you should not have?' );
        rowNode.updateEnabled = updateEnabled;
      } );

      // update things specific to this node
      if ( this.gridDirty && !wasUpdateEnabled && updateEnabled ) {
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
