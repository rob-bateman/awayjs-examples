/*

AWD file loading example in Away3d

Demonstrates:

How to use the Loader3D object to load an embedded internal 3ds model.
How to map an external asset reference inside a file to an internal embedded asset.
How to extract material data and use it to set custom material properties on a model.

Code by Rob Bateman
rob@infiniteturtles.co.uk
http://www.infiniteturtles.co.uk

This code is distributed under the MIT License

Copyright (c) The Away Foundation http://www.theawayfoundation.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var View = require("awayjs-core/lib/containers/View");
var DirectionalLight = require("awayjs-core/lib/entities/DirectionalLight");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");
var AssetLibrary = require("awayjs-core/lib/core/library/AssetLibrary");
var AssetType = require("awayjs-core/lib/core/library/AssetType");
var StaticLightPicker = require("awayjs-core/lib/materials/lightpickers/StaticLightPicker");
var URLRequest = require("awayjs-core/lib/core/net/URLRequest");
var DefaultRenderer = require("awayjs-stagegl/lib/core/render/DefaultRenderer");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var AWDParser = require("awayjs-renderergl/lib/parsers/AWDParser");
var Basic_LoadAWD = (function () {
    /**
     * Constructor
     */
    function Basic_LoadAWD() {
        this._time = 0;
        this.init();
    }
    /**
     * Global initialise function
     */
    Basic_LoadAWD.prototype.init = function () {
        this.initEngine();
        this.initLights();
        this.initMaterials();
        this.initObjects();
        this.initListeners();
    };
    /**
     * Initialise the engine
     */
    Basic_LoadAWD.prototype.initEngine = function () {
        this._view = new View(new DefaultRenderer());
        //set the background of the view to something suitable
        this._view.backgroundColor = 0x1e2125;
        //position the camera
        this._view.camera.z = -2000;
    };
    /**
     * Initialise the entities
     */
    Basic_LoadAWD.prototype.initLights = function () {
        //create the light for the scene
        this._light = new DirectionalLight();
        this._light.color = 0x683019;
        this._light.direction = new Vector3D(1, 0, 0);
        this._light.ambient = 0.5;
        this._light.ambientColor = 0x30353b;
        this._light.diffuse = 2.8;
        this._light.specular = 1.8;
        this._view.scene.addChild(this._light);
        //create the light picker for the material
        this._lightPicker = new StaticLightPicker([this._light]);
    };
    /**
     * Initialise the materials
     */
    Basic_LoadAWD.prototype.initMaterials = function () {
    };
    /**
     * Initialise the scene objects
     */
    Basic_LoadAWD.prototype.initObjects = function () {
    };
    /**
     * Initialise the listeners
     */
    Basic_LoadAWD.prototype.initListeners = function () {
        var _this = this;
        window.onresize = function (event) { return _this.onResize(event); };
        this.onResize();
        this._timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this._timer.start();
        AssetLibrary.enableParser(AWDParser);
        AssetLibrary.addEventListener(AssetEvent.ASSET_COMPLETE, function (event) { return _this.onAssetComplete(event); });
        AssetLibrary.load(new URLRequest('assets/suzanne.awd'));
    };
    /**
     * Navigation and render loop
     */
    Basic_LoadAWD.prototype.onEnterFrame = function (dt) {
        this._time += dt;
        if (this._suzanne)
            this._suzanne.rotationY += 1;
        this._view.render();
    };
    /**
     * Listener function for asset complete event on loader
     */
    Basic_LoadAWD.prototype.onAssetComplete = function (event) {
        var asset = event.asset;
        switch (asset.assetType) {
            case AssetType.MESH:
                var mesh = asset;
                mesh.y = -300;
                mesh.transform.scale = new Vector3D(900, 900, 900);
                this._suzanne = mesh;
                this._view.scene.addChild(mesh);
                break;
            case AssetType.MATERIAL:
                var material = asset;
                material.lightPicker = this._lightPicker;
                break;
        }
    };
    /**
     * stage listener for resize events
     */
    Basic_LoadAWD.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    return Basic_LoadAWD;
})();
window.onload = function () {
    new Basic_LoadAWD();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9CYXNpY19Mb2FkQVdELnRzIl0sIm5hbWVzIjpbIkJhc2ljX0xvYWRBV0QiLCJCYXNpY19Mb2FkQVdELmNvbnN0cnVjdG9yIiwiQmFzaWNfTG9hZEFXRC5pbml0IiwiQmFzaWNfTG9hZEFXRC5pbml0RW5naW5lIiwiQmFzaWNfTG9hZEFXRC5pbml0TGlnaHRzIiwiQmFzaWNfTG9hZEFXRC5pbml0TWF0ZXJpYWxzIiwiQmFzaWNfTG9hZEFXRC5pbml0T2JqZWN0cyIsIkJhc2ljX0xvYWRBV0QuaW5pdExpc3RlbmVycyIsIkJhc2ljX0xvYWRBV0Qub25FbnRlckZyYW1lIiwiQmFzaWNfTG9hZEFXRC5vbkFzc2V0Q29tcGxldGUiLCJCYXNpY19Mb2FkQVdELm9uUmVzaXplIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBb0NFO0FBSUYsSUFBTyxJQUFJLFdBQWlCLGlDQUFpQyxDQUFDLENBQUM7QUFFL0QsSUFBTyxnQkFBZ0IsV0FBYywyQ0FBMkMsQ0FBQyxDQUFDO0FBRWxGLElBQU8sVUFBVSxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFDckUsSUFBTyxRQUFRLFdBQWdCLG9DQUFvQyxDQUFDLENBQUM7QUFDckUsSUFBTyxZQUFZLFdBQWUsMkNBQTJDLENBQUMsQ0FBQztBQUMvRSxJQUFPLFNBQVMsV0FBZSx3Q0FBd0MsQ0FBQyxDQUFDO0FBR3pFLElBQU8saUJBQWlCLFdBQWEsMERBQTBELENBQUMsQ0FBQztBQUNqRyxJQUFPLFVBQVUsV0FBZSxxQ0FBcUMsQ0FBQyxDQUFDO0FBQ3ZFLElBQU8sZUFBZSxXQUFjLGdEQUFnRCxDQUFDLENBQUM7QUFDdEYsSUFBTyxxQkFBcUIsV0FBWSw2Q0FBNkMsQ0FBQyxDQUFDO0FBRXZGLElBQU8sU0FBUyxXQUFlLHlDQUF5QyxDQUFDLENBQUM7QUFFMUUsSUFBTSxhQUFhO0lBZ0JsQkE7O09BRUdBO0lBQ0hBLFNBbkJLQSxhQUFhQTtRQWNWQyxVQUFLQSxHQUFV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QSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDaENBLEtBQUtBLENBQUNBO1lBQ1BBLEtBQUtBLFNBQVNBLENBQUNBLFFBQVFBO2dCQUN0QkEsSUFBSUEsUUFBUUEsR0FBbURBLEtBQUtBLENBQUNBO2dCQUNyRUEsUUFBUUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7Z0JBQ3pDQSxLQUFLQSxDQUFDQTtRQUNSQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEVDs7T0FFR0E7SUFDS0EsZ0NBQVFBLEdBQWhCQSxVQUFpQkEsS0FBb0JBO1FBQXBCVSxxQkFBb0JBLEdBQXBCQSxZQUFvQkE7UUFFcENBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDckNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBO0lBQ3hDQSxDQUFDQTtJQUNGVixvQkFBQ0E7QUFBREEsQ0FwSkEsQUFvSkNBLElBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHO0lBRWYsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUEiLCJmaWxlIjoiQmFzaWNfTG9hZEFXRC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cbkFXRCBmaWxlIGxvYWRpbmcgZXhhbXBsZSBpbiBBd2F5M2RcblxuRGVtb25zdHJhdGVzOlxuXG5Ib3cgdG8gdXNlIHRoZSBMb2FkZXIzRCBvYmplY3QgdG8gbG9hZCBhbiBlbWJlZGRlZCBpbnRlcm5hbCAzZHMgbW9kZWwuXG5Ib3cgdG8gbWFwIGFuIGV4dGVybmFsIGFzc2V0IHJlZmVyZW5jZSBpbnNpZGUgYSBmaWxlIHRvIGFuIGludGVybmFsIGVtYmVkZGVkIGFzc2V0LlxuSG93IHRvIGV4dHJhY3QgbWF0ZXJpYWwgZGF0YSBhbmQgdXNlIGl0IHRvIHNldCBjdXN0b20gbWF0ZXJpYWwgcHJvcGVydGllcyBvbiBhIG1vZGVsLlxuXG5Db2RlIGJ5IFJvYiBCYXRlbWFuXG5yb2JAaW5maW5pdGV0dXJ0bGVzLmNvLnVrXG5odHRwOi8vd3d3LmluZmluaXRldHVydGxlcy5jby51a1xuXG5UaGlzIGNvZGUgaXMgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG5cbkNvcHlyaWdodCAoYykgVGhlIEF3YXkgRm91bmRhdGlvbiBodHRwOi8vd3d3LnRoZWF3YXlmb3VuZGF0aW9uLm9yZ1xuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSDigJxTb2Z0d2FyZeKAnSksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQg4oCcQVMgSVPigJ0sIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29udGFpbmVycy9TY2VuZVwiKTtcbmltcG9ydCBMb2FkZXJcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29udGFpbmVycy9Mb2FkZXJcIik7XG5pbXBvcnQgVmlld1x0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvbnRhaW5lcnMvVmlld1wiKTtcbmltcG9ydCBIb3ZlckNvbnRyb2xsZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb250cm9sbGVycy9Ib3ZlckNvbnRyb2xsZXJcIik7XG5pbXBvcnQgRGlyZWN0aW9uYWxMaWdodFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL0RpcmVjdGlvbmFsTGlnaHRcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEFzc2V0TGlicmFyeVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0Fzc2V0TGlicmFyeVwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgVHJpYW5nbGVNZXRob2RNYXRlcmlhbFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtc3RhZ2VnbC9saWIvbWF0ZXJpYWxzL1RyaWFuZ2xlTWV0aG9kTWF0ZXJpYWxcIik7XG5pbXBvcnQgU3RhdGljTGlnaHRQaWNrZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9TdGF0aWNMaWdodFBpY2tlclwiKTtcbmltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IERlZmF1bHRSZW5kZXJlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXN0YWdlZ2wvbGliL2NvcmUvcmVuZGVyL0RlZmF1bHRSZW5kZXJlclwiKTtcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZVwiKTtcblxuaW1wb3J0IEFXRFBhcnNlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvcGFyc2Vycy9BV0RQYXJzZXJcIik7XG5cbmNsYXNzIEJhc2ljX0xvYWRBV0Rcbntcblx0Ly9lbmdpbmUgdmFyaWFibGVzXG5cdHByaXZhdGUgX3ZpZXc6VmlldztcblxuXHQvL2xpZ2h0IG9iamVjdHNcblx0cHJpdmF0ZSBfbGlnaHQ6RGlyZWN0aW9uYWxMaWdodDtcblx0cHJpdmF0ZSBfbGlnaHRQaWNrZXI6U3RhdGljTGlnaHRQaWNrZXI7XG5cblx0Ly9zY2VuZSBvYmplY3RzXG5cdHByaXZhdGUgX3N1emFubmU6TWVzaDtcblxuXHQvL25hdmlnYXRpb24gdmFyaWFibGVzXG5cdHByaXZhdGUgX3RpbWVyOlJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0cHJpdmF0ZSBfdGltZTpudW1iZXIgPSAwO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2xvYmFsIGluaXRpYWxpc2UgZnVuY3Rpb25cblx0ICovXG5cdHByaXZhdGUgaW5pdCgpOnZvaWRcblx0e1xuXHRcdHRoaXMuaW5pdEVuZ2luZSgpO1xuXHRcdHRoaXMuaW5pdExpZ2h0cygpO1xuXHRcdHRoaXMuaW5pdE1hdGVyaWFscygpO1xuXHRcdHRoaXMuaW5pdE9iamVjdHMoKTtcblx0XHR0aGlzLmluaXRMaXN0ZW5lcnMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBlbmdpbmVcblx0ICovXG5cdHByaXZhdGUgaW5pdEVuZ2luZSgpOnZvaWRcblx0e1xuXHRcdHRoaXMuX3ZpZXcgPSBuZXcgVmlldyhuZXcgRGVmYXVsdFJlbmRlcmVyKCkpO1xuXG5cdFx0Ly9zZXQgdGhlIGJhY2tncm91bmQgb2YgdGhlIHZpZXcgdG8gc29tZXRoaW5nIHN1aXRhYmxlXG5cdFx0dGhpcy5fdmlldy5iYWNrZ3JvdW5kQ29sb3IgPSAweDFlMjEyNTtcblxuXHRcdC8vcG9zaXRpb24gdGhlIGNhbWVyYVxuXHRcdHRoaXMuX3ZpZXcuY2FtZXJhLnogPSAtMjAwMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBlbnRpdGllc1xuXHQgKi9cblx0cHJpdmF0ZSBpbml0TGlnaHRzKCk6dm9pZFxuXHR7XG5cdFx0Ly9jcmVhdGUgdGhlIGxpZ2h0IGZvciB0aGUgc2NlbmVcblx0XHR0aGlzLl9saWdodCA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KCk7XG5cdFx0dGhpcy5fbGlnaHQuY29sb3IgPSAweDY4MzAxOTtcblx0XHR0aGlzLl9saWdodC5kaXJlY3Rpb24gPSBuZXcgVmVjdG9yM0QoMSwgMCwgMCk7XG5cdFx0dGhpcy5fbGlnaHQuYW1iaWVudCA9IDAuNTtcblx0XHR0aGlzLl9saWdodC5hbWJpZW50Q29sb3IgPSAweDMwMzUzYjtcblx0XHR0aGlzLl9saWdodC5kaWZmdXNlID0gMi44O1xuXHRcdHRoaXMuX2xpZ2h0LnNwZWN1bGFyID0gMS44O1xuXHRcdHRoaXMuX3ZpZXcuc2NlbmUuYWRkQ2hpbGQodGhpcy5fbGlnaHQpO1xuXG5cdFx0Ly9jcmVhdGUgdGhlIGxpZ2h0IHBpY2tlciBmb3IgdGhlIG1hdGVyaWFsXG5cdFx0dGhpcy5fbGlnaHRQaWNrZXIgPSBuZXcgU3RhdGljTGlnaHRQaWNrZXIoW3RoaXMuX2xpZ2h0XSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbWF0ZXJpYWxzXG5cdCAqL1xuXHRwcml2YXRlIGluaXRNYXRlcmlhbHMoKTp2b2lkXG5cdHtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBzY2VuZSBvYmplY3RzXG5cdCAqL1xuXHRwcml2YXRlIGluaXRPYmplY3RzKCk6dm9pZFxuXHR7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgbGlzdGVuZXJzXG5cdCAqL1xuXHRwcml2YXRlIGluaXRMaXN0ZW5lcnMoKTp2b2lkXG5cdHtcblx0XHR3aW5kb3cub25yZXNpemUgID0gKGV2ZW50OlVJRXZlbnQpID0+IHRoaXMub25SZXNpemUoZXZlbnQpO1xuXG5cdFx0dGhpcy5vblJlc2l6ZSgpO1xuXG5cdFx0dGhpcy5fdGltZXIgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMub25FbnRlckZyYW1lLCB0aGlzKTtcblx0XHR0aGlzLl90aW1lci5zdGFydCgpO1xuXG5cdFx0QXNzZXRMaWJyYXJ5LmVuYWJsZVBhcnNlcihBV0RQYXJzZXIpO1xuXG5cdFx0QXNzZXRMaWJyYXJ5LmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbXBsZXRlKGV2ZW50KSk7XG5cdFx0QXNzZXRMaWJyYXJ5LmxvYWQobmV3IFVSTFJlcXVlc3QoJ2Fzc2V0cy9zdXphbm5lLmF3ZCcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBOYXZpZ2F0aW9uIGFuZCByZW5kZXIgbG9vcFxuXHQgKi9cblx0cHJpdmF0ZSBvbkVudGVyRnJhbWUoZHQ6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLl90aW1lICs9IGR0O1xuXG5cdFx0aWYgKHRoaXMuX3N1emFubmUpXG5cdFx0XHR0aGlzLl9zdXphbm5lLnJvdGF0aW9uWSArPSAxO1xuXG5cdFx0dGhpcy5fdmlldy5yZW5kZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMaXN0ZW5lciBmdW5jdGlvbiBmb3IgYXNzZXQgY29tcGxldGUgZXZlbnQgb24gbG9hZGVyXG5cdCAqL1xuXHRwcml2YXRlIG9uQXNzZXRDb21wbGV0ZShldmVudDpBc3NldEV2ZW50KVxuXHR7XG5cdFx0dmFyIGFzc2V0OklBc3NldCA9IGV2ZW50LmFzc2V0O1xuXG5cdFx0c3dpdGNoIChhc3NldC5hc3NldFR5cGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSBBc3NldFR5cGUuTUVTSCA6XG5cdFx0XHRcdHZhciBtZXNoOk1lc2ggPSA8TWVzaD4gYXNzZXQ7XG5cdFx0XHRcdG1lc2gueSA9IC0zMDA7XG5cdFx0XHRcdG1lc2gudHJhbnNmb3JtLnNjYWxlID0gbmV3IFZlY3RvcjNEKDkwMCwgOTAwLCA5MDApO1xuXG5cdFx0XHRcdHRoaXMuX3N1emFubmUgPSBtZXNoO1xuXHRcdFx0XHR0aGlzLl92aWV3LnNjZW5lLmFkZENoaWxkKG1lc2gpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgQXNzZXRUeXBlLk1BVEVSSUFMOlxuXHRcdFx0XHR2YXIgbWF0ZXJpYWw6VHJpYW5nbGVNZXRob2RNYXRlcmlhbCA9IDxUcmlhbmdsZU1ldGhvZE1hdGVyaWFsPiBhc3NldDtcblx0XHRcdFx0bWF0ZXJpYWwubGlnaHRQaWNrZXIgPSB0aGlzLl9saWdodFBpY2tlcjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIHN0YWdlIGxpc3RlbmVyIGZvciByZXNpemUgZXZlbnRzXG5cdCAqL1xuXHRwcml2YXRlIG9uUmVzaXplKGV2ZW50OlVJRXZlbnQgPSBudWxsKTp2b2lkXG5cdHtcblx0XHR0aGlzLl92aWV3LnkgPSAwO1xuXHRcdHRoaXMuX3ZpZXcueCA9IDA7XG5cdFx0dGhpcy5fdmlldy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHRoaXMuX3ZpZXcuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHR9XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKVxue1xuXHRuZXcgQmFzaWNfTG9hZEFXRCgpO1xufSJdfQ==