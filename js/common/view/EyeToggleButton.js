// Copyright 2016, University of Colorado Boulder

//TODO move to scenery-phet
/**
 * Button that toggles between an open and closed eyeball, used to control the visibility of something.
 * 
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RectangularToggleButton = require( 'SUN/buttons/RectangularToggleButton' );

  /**
   * @param {Property.<boolean>} eyeOpenProperty - true: eye is open; false: eye is closed
   * @param {Object} [options]
   * @constructor
   */
  function EyeToggleButton( eyeOpenProperty, options ) {

    options = options || {};

    // icons
    var eyeOpenNode = new FontAwesomeNode( 'eye_open' );
    var eyeCloseNode = new FontAwesomeNode( 'eye_close', {
      center: eyeOpenNode.center
    } );

    // button content
    assert && assert( !options.content );
    options.content = new Node( {
      children: [ eyeCloseNode, eyeOpenNode ]
    } );

    // toggle which icon is shown
    var eyeOpenObserver = function( eyeOpen ) {
      eyeOpenNode.visible = eyeOpen;
      eyeCloseNode.visible = !eyeOpen;
    };
    eyeOpenProperty.link( eyeOpenObserver );

    RectangularToggleButton.call( this, true, false, eyeOpenProperty, options );

    // @private
    this._disposeEyeToggleButton = function() {
      eyeOpenProperty.unlink( eyeOpenObserver );
    };
  }

  functionBuilder.register( 'EyeToggleButton', EyeToggleButton );

  return inherit( RectangularToggleButton, EyeToggleButton, {
    
    // @public
    dispose: function() {
      this._disposeEyeToggleButton();
    }
  } );
} );
