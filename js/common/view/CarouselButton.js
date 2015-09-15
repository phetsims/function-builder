// Copyright 2002-2015, University of Colorado Boulder

//TODO sun#197 ideally, only 2 corners of the button should be rounded (the corners in the direction of the arrow)
/**
 * Button used for scrolling in a carousel, has an arrow that points in the direction of scrolling.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RectangularButtonView = require( 'SUN/buttons/RectangularButtonView' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function CarouselButton( options ) {

    // see supertype for additional options
    options = _.extend( {

      // button
      baseColor: 'rgba( 200, 200, 200, 0.5 )', // {Color|string} button fill color
      stoke: 'black', // {Color|string|null} button stroke
      buttonAppearanceStrategy: RectangularButtonView.flatAppearanceStrategy,

      // arrow
      arrowDirection: 'up', // {string} direction that the arrow points, 'up'|'down'|'left'|'right'
      arrowSize: new Dimension2( 7, 20 ), // {Color|string} color used for the arrow icons, in horizontal orientation
      arrowStroke: 'black', // {Color|string} color used for the arrow icons
      arrowLineWidth: 3, // {number} line width used to stroke the arrow icons
      arrowLineCap: 'round' // {string} 'butt'|'round'|'square'

    }, options );

    // Generic arrow shape, points to the right
    var arrowShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( options.arrowSize.width, options.arrowSize.height / 2 )
      .lineTo( 0, options.arrowSize.height );

    // Transform arrow shape to proper direction
    switch ( options.arrowDirection ) {
      case 'up':
        arrowShape = arrowShape.transformed( Matrix3.rotation2( -Math.PI / 2 ) );
        break;
      case 'down':
        arrowShape = arrowShape.transformed( Matrix3.rotation2( Math.PI / 2 ) );
        break;
      case 'left':
        arrowShape = arrowShape.transformed( Matrix3.rotation2( Math.PI ) );
        break;
      case 'right':
        break;
      default:
        throw new Error( 'invalid direction: ' + options.arrowDirection );
    }

    // Arrow node
    options.content = new Path( arrowShape, {
      stroke: options.arrowStroke,
      lineWidth: options.arrowLineWidth,
      lineCap: options.arrowLineCap
    } );

    RectangularPushButton.call( this, options );
  }

  return inherit( RectangularPushButton, CarouselButton );
} );
