// Copyright 2016, University of Colorado Boulder

/**
 * Displays a rational number, as implemented by the BigRational 3rd-party library.
 * The number can be displayed as either a mixed number or improper fraction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {BigRational} value - see BigRational.js (3rd-party library)
   * @param {Object} [options]
   * @constructor
   */
  function BigRationalNode( value, options ) {

    options = _.extend( {
      color: 'black', // {Color|string} color used for all sub-parts of this node
      negativeSymbol: '\u2212', // {string} symbol used for negative sign
      positiveSymbol: '', // {string} symbol used for positive sign
      signFont: new PhetFont( 22 ),
      wholeNumberFont: new PhetFont( 30 ),
      fractionFont: new PhetFont( 20 ),
      fractionLineWidth: 1, // {number} lineWidth for the line that separates numerator and denominator
      signXSpace: 3, // {number} space to right of sign
      fractionXSpace: 3, // {number} horizontal space between whole number and fraction
      fractionYSpace: 2, // {number} vertical space in fraction
      mixedNumber: true // {boolean} true: display as mixed number, false: display as improper fraction
    }, options );

    // @private options required by setValue
    this.negativeSymbol = options.negativeSymbol;
    this.positiveSymbol = options.positiveSymbol;
    this.signXSpace = options.signXSpace;
    this.fractionXSpace = options.fractionXSpace;
    this.mixedNumber = options.mixedNumber;

    // @private sign, correct sign set by setValue
    this.signNode = new Text( '', {
      fill: options.color,
      font: options.signFont
    } );

    // @private whole number, correct value set by setValue
    this.wholeNumberNode = new WholeNumberNode( 1, {
      fill: options.color,
      font: options.wholeNumberFont
    } );

    // @private fraction, correct value set by setValue
    this.fractionNode = new FractionNode( 1, 1, {
      color: options.color,
      font: options.fractionFont,
      lineWidth: options.fractionLineWidth,
      ySpace: options.fractionYSpace
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.signNode, this.wholeNumberNode, this.fractionNode ];

    Node.call( this, options );

    this.setValue( value );
  }
  
  functionBuilder.register( 'BigRationalNode', BigRationalNode );

  inherit( Node, BigRationalNode, {

    /**
     * @param {BigRational} value - see BigRational.js
     * @public
     */
    setValue: function( value ) {

      // set the sign
      this.signNode.text = value.isNegative() ? this.negativeSymbol : this.positiveSymbol;

      // display absolute value, since we have a separate node for sign
      value = value.abs();

      if ( value.denominator.equals( 1 ) ) { // integer

        // whole number
        this.wholeNumberNode.visible = true;
        this.wholeNumberNode.setValue( value.valueOf() );
        this.wholeNumberNode.left = ( this.signNode.width > 0 ) ? ( this.signNode.right + this.signXSpace ) : 0;
        this.wholeNumberNode.centerY = this.signNode.centerY;

        // fraction
        this.fractionNode.visible = false;
        this.fractionNode.center = this.wholeNumberNode.center;
      }
      else if ( this.mixedNumber && value.gt( 1 ) ) { // mixed number

        // whole number
        this.wholeNumberNode.visible = true;
        var wholeNumber = value.floor();
        this.wholeNumberNode.setValue( wholeNumber.valueOf() );
        this.wholeNumberNode.left = ( this.signNode.width > 0 ) ? ( this.signNode.right + this.signXSpace ) : 0;
        this.wholeNumberNode.centerY = this.signNode.centerY;

        // fraction
        this.fractionNode.visible = true;
        var fraction = value.minus( wholeNumber );
        this.fractionNode.setValue( fraction.numerator.valueOf(), fraction.denominator.valueOf() );
        this.fractionNode.left = this.wholeNumberNode.right + this.fractionXSpace;
        this.fractionNode.centerY = this.wholeNumberNode.centerY;
      }
      else { // fraction, possibly improper

        // fraction
        this.fractionNode.visible = true;
        this.fractionNode.setValue( value.numerator.valueOf(), value.denominator.valueOf() );
        this.fractionNode.left = ( this.signNode.width > 0 ) ? ( this.signNode.right + this.signXSpace ) : 0;
        this.fractionNode.centerY = this.signNode.centerY;

        // whole number
        this.wholeNumberNode.visible = false;
        this.wholeNumberNode.center = this.fractionNode.center;
      }
    }
  } );

  /**
   * @param {number} wholeNumber
   * @param {Object} options
   * @constructor
   */
  function WholeNumberNode( wholeNumber, options ) {
    assert && assert( Util.isInteger( wholeNumber ) );
    options = options || {};
    options.text = wholeNumber;
    Text.call( this, wholeNumber, options );
    this.setValue( wholeNumber );
  }
  
  functionBuilder.register( 'BigRationalNode.WholeNumberNode', WholeNumberNode );

  inherit( Text, WholeNumberNode, {

    /**
     * @param {number} wholeNumber
     * @public
     */
    setValue: function( wholeNumber ) {
      assert && assert( Util.isInteger( wholeNumber ) );
      this.text = wholeNumber;
    }
  } );

  /**
   * @param {number} numerator
   * @param {number} denominator
   * @param {Object} [options]
   * @constructor
   */
  function FractionNode( numerator, denominator, options ) {

    assert && assert( Util.isInteger( numerator ) );
    assert && assert( Util.isInteger( denominator ) );

    options = _.extend( {
      color: 'black',
      font: new PhetFont( 20 ),
      lineWidth: 1,
      ySpace: 1
    }, options );
    
    this.ySpace = options.ySpace; // @private

    // numerator and denominator
    var FRACTION_OPTIONS = {
      fill: options.color,
      font: options.font
    };
    this.numeratorNode = new Text( numerator, FRACTION_OPTIONS ); // @private
    this.denominatorNode = new Text( denominator, FRACTION_OPTIONS ); // @private

    // @private line separating numerator and denominator
    this.lineNode = new Line( 0, 0, 1, 0, {
      stroke: options.color,
      lineWidth: options.lineWidth
    } );

    options.children = [ this.numeratorNode, this.denominatorNode, this.lineNode ];

    Node.call( this, options );
    
    this.setValue( numerator, denominator );
  }
  
  functionBuilder.register( 'BigRationalNode.FractionNode', FractionNode );

  inherit( Node, FractionNode, {

    /**
     * @param {number} numerator
     * @param {number} denominator
     * @public
     */
    setValue: function( numerator, denominator ) {

      assert && assert( Util.isInteger( numerator ) );
      assert && assert( Util.isInteger( denominator ) );

      // node properties
      this.numeratorNode.text = numerator;
      this.denominatorNode.text = denominator;
      this.lineNode.setLine( 0, 0, Math.max( this.numeratorNode.width, this.denominatorNode.width ), 0 );

      // layout
      this.numeratorNode.centerX = this.lineNode.centerX;
      this.numeratorNode.bottom = this.lineNode.top - this.ySpace;
      this.denominatorNode.centerX = this.lineNode.centerX;
      this.denominatorNode.top = this.lineNode.bottom + this.ySpace;
    }
  } );

  return BigRationalNode;
} );
