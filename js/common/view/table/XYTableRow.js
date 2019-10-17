// Copyright 2016-2019, University of Colorado Boulder

/**
 * A row in the XY table.
 * Each row is associated with an instance of a card, and contains an input and output cell.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const EquationCard = require( 'FUNCTION_BUILDER/common/model/cards/EquationCard' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberCard = require( 'FUNCTION_BUILDER/common/model/cards/NumberCard' );
  const RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/equations/SlopeInterceptEquation' );
  const SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/equations/SlopeInterceptEquationNode' );

  /**
   * @param {NumberCard|EquationCard} card - card that's associated with the row
   * @param {Builder} builder
   * @param options
   * @constructor
   */
  function XYTableRow( card, builder, options ) {

    assert && assert( card instanceof NumberCard || card instanceof EquationCard );

    options = merge( {
      size: new Dimension2( 100, 10 ),
      cellXMargin: 15,
      cellYMargin: 3,
      updateEnabled: true // {boolean} does this node update when the model changes?
    }, options );

    // @private
    this.card = card;
    this.builder = builder;
    this.size = options.size;
    this._updateEnabled = options.updateEnabled;
    this.dirty = true; // {boolean} does this node need to be updated?

    Node.call( this );

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
    const self = this;
    const functionChangedListener = function() {
      self.dirty = true;
      if ( self.updateEnabled ) {
        self.updateOutputValue();
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
    this.disposeXYTableRow = function() {
      builder.functionChangedEmitter.removeListener( functionChangedListener );
      builder = null; // so things fail if we try to use this instance after dispose is called
    };
  }

  functionBuilder.register( 'XYTableRow', XYTableRow );

  /**
   * Creates the value for a specified card.
   *
   * @param {NumberCard|EquationCard} card
   * @param {Builder} builder
   * @param {Object} [options]
   * @returns {Node}
   */
  var createCellValueNode = function( card, builder, options ) {

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
  };

  return inherit( Node, XYTableRow, {

    // @public
    dispose: function() {
      this.disposeXYTableRow();
      Node.prototype.dispose.call( this );
    },

    /**
     * Updates the value in the output cell.
     *
     * @private
     */
    updateOutputValue: function() {

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
    },

    /**
     * Sets the visibility ofthe row's output cell.
     *
     * @param visible
     * @public
     */
    setOutputCellVisible: function( visible ) {
      this.outputValueNode.visible = visible;
    },

    /**
     * Determines whether updating of this node is enabled.
     *
     * @param {boolean} updateEnabled
     * @public
     *
     */
    setUpdateEnabled: function( updateEnabled ) {
      const wasUpdateEnabled = this._updateEnabled;
      this._updateEnabled = updateEnabled;
      if ( this.dirty && !wasUpdateEnabled && updateEnabled ) {
        this.updateOutputValue();
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
