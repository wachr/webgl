"use strict";

var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    //var leftTriangle = new Float32Array([-1, 1, 0.25, 0, -1, -1]);

    //var rightTriangle = new Float32Array([1, 1, -0.25, 0, 1, -1]);

    var bothTriangles = new Float32Array([-1, 1, -0.005, 0, -1, -1,
                                           1, 1,  0.005, 0,  1, -1]);

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 0.9, 0.1, 0.8 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    //gl.bufferData( gl.ARRAY_BUFFER, leftTriangle, gl.STATIC_DRAW );
    //gl.bufferData( gl.ARRAY_BUFFER, rightTriangle, gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, bothTriangles, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}
