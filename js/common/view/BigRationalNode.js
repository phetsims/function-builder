// Copyright 2016, University of Colorado Boulder

/**
 * Displays a rational number, as implemented by the 3rd-party BigRational library.
 * The number can be displayed as either a mixed number or improper fraction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var SIGN_X_SPACING = 3;
  var FRACTION_X_SPACING = 3;
  var FRACTION_Y_SPACING = 2;

  /**
   * @param {BigRational} value - see BigRational.js (3rd-party library)
   * @param {Object} [options]
   * @constructor
   */
  function BigRationalNode( value, options ) {

    options = _.extend( {
      color: 'black',
      signFont: FBConstants.NUMBER_CARD_SIGN_FONT,
      quotientFont: FBConstants.NUMBER_CARD_QUOTIENT_FONT,
      fractionFont: FBConstants.NUMBER_CARD_FRACTION_FONT,
      mixedNumber: true // {boolean} true: display as mixed number, false: display as improper fraction
    }, options );

    this.mixedNumber = options.mixedNumber; // @private

    // @private sign
    this.signNode = new Text( '', {
      font: options.signFont,
      fill: options.color
    } );

    // @private integer quotient
    this.quotientNode = new Text( '', {
      font: options.quotientFont,
      fill: options.color
    } );

    // fraction
    var fractionOptions = {
      font: options.fractionFont,
      fill: options.color
    };
    this.numeratorNode = new Text( '', fractionOptions ); // @private
    this.denominatorNode = new Text( '', fractionOptions ); // @private
    this.fractionLineNode = new Line( 0, 0, 1, 0, { stroke: options.color, lineWidth: 1 } ); // @private

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.signNode, this.quotientNode, this.numeratorNode, this.fractionLineNode, this.denominatorNode ];

    Node.call( this, options );

    this.setValue( value );
  }

  return inherit( Node, BigRationalNode, {

    /**
     * Sets the value displayed by this node.
     * @param {BigRational} value
     * @public
     */
    setValue: function( value ) {

      // set the sign
      var isNegative = value.isNegative();
      this.signNode.text = isNegative ? FBSymbols.MINUS : '';

      // display absolute value of numbers, since we have a separate node for sign
      value = value.abs();

      // display the value
      if ( value.denominator.equals( 1 ) ) { // quotient only

        // visibility
        this.quotientNode.visible = true;
        this.numeratorNode.visible = this.denominatorNode.visible = this.fractionLineNode.visible = false;

        // values
        this.quotientNode.text = value.numerator;
        this.numeratorNode.text = this.denominatorNode.text = '';
        this.fractionLineNode.setLine( 0, 0, 1, 0 );

        // layout
        this.quotientNode.left = isNegative ? ( this.signNode.right + SIGN_X_SPACING ) : 0;
        this.quotientNode.centerY = this.signNode.centerY;
        this.numeratorNode.left = this.denominatorNode.left = this.fractionLineNode.left = this.quotientNode.left;
        this.numeratorNode.centerY = this.denominatorNode.centerY = this.fractionLineNode.centerY = this.quotientNode.centerY;
      }
      else if ( this.mixedNumber && value.numerator.gt( value.denominator ) ) { // mixed number (quotient and proper fraction)

        // visibility
        this.quotientNode.visible = this.numeratorNode.visible = this.denominatorNode.visible = this.fractionLineNode.visible = true;

        // values
        var quotient = value.floor();
        var fraction = value.minus( quotient );

        this.quotientNode.text = quotient;
        this.numeratorNode.text = fraction.numerator;
        this.denominatorNode.text = fraction.denominator;
        this.fractionLineNode.setLine( 0, 0, Math.max( this.numeratorNode.width, this.denominatorNode.width ), 0 );

        // layout
        this.quotientNode.left = isNegative ? ( this.signNode.right + SIGN_X_SPACING ) : 0;
        this.quotientNode.centerY = this.signNode.centerY;
        this.fractionLineNode.left = this.quotientNode.right + FRACTION_X_SPACING;
        this.fractionLineNode.centerY = this.quotientNode.centerY;
        this.numeratorNode.centerX = this.fractionLineNode.centerX;
        this.numeratorNode.bottom = this.fractionLineNode.top - FRACTION_Y_SPACING;
        this.denominatorNode.centerX = this.fractionLineNode.centerX;
        this.denominatorNode.top = this.fractionLineNode.bottom + FRACTION_Y_SPACING;
      }
      else { // fraction, possibly improper

        // visibility
        this.quotientNode.visible = false;
        this.numeratorNode.visible = this.denominatorNode.visible = this.fractionLineNode.visible = true;

        // values
        this.quotientNode.text = '';
        this.numeratorNode.text = value.numerator;
        this.denominatorNode.text = value.denominator;
        this.fractionLineNode.setLine( 0, 0, Math.max( this.numeratorNode.width, this.denominatorNode.width ), 0 );

        // layout
        this.fractionLineNode.left = isNegative ? ( this.signNode.right + SIGN_X_SPACING ) : 0;
        this.fractionLineNode.centerY = this.signNode.centerY;
        this.quotientNode.centerX = this.numeratorNode.centerX = this.denominatorNode.centerX = this.fractionLineNode.centerX;
        this.quotientNode.centerY = this.fractionLineNode.centerY;
        this.numeratorNode.bottom = this.fractionLineNode.top - FRACTION_Y_SPACING;
        this.denominatorNode.top = this.fractionLineNode.bottom + FRACTION_Y_SPACING;
      }
    }
  } );
} );
