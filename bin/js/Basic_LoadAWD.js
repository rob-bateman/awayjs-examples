(function i(e,t,n){function s(r,o){if(!t[r]){if(!e[r]){var l=typeof require=="function"&&require;if(!o&&l)return l(r,!0);if(a)return a(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var d=t[r]={exports:{}};e[r][0].call(d.exports,function(i){var t=e[r][1][i];return s(t?t:i)},d,d.exports,i,e,t,n)}return t[r].exports}var a=typeof require=="function"&&require;for(var r=0;r<n.length;r++)s(n[r]);return s})({"./src/Basic_LoadAWD.ts":[function(i,e,t){var n=i("awayjs-core/lib/events/AssetEvent");var s=i("awayjs-core/lib/geom/Vector3D");var a=i("awayjs-core/lib/library/AssetLibrary");var r=i("awayjs-core/lib/net/URLRequest");var o=i("awayjs-core/lib/utils/RequestAnimationFrame");var l=i("awayjs-display/lib/containers/View");var h=i("awayjs-display/lib/entities/DirectionalLight");var d=i("awayjs-display/lib/entities/Mesh");var c=i("awayjs-display/lib/materials/MaterialBase");var u=i("awayjs-display/lib/materials/lightpickers/StaticLightPicker");var w=i("awayjs-renderergl/lib/DefaultRenderer");var y=i("awayjs-methodmaterials/lib/pool/MethodRendererPool");var f=i("awayjs-parsers/lib/AWDParser");var p=function(){function i(){this._time=0;this.init()}i.prototype.init=function(){this.initEngine();this.initLights();this.initMaterials();this.initObjects();this.initListeners()};i.prototype.initEngine=function(){this._view=new l(new w(y));this._view.backgroundColor=1974565;this._view.camera.z=-2e3};i.prototype.initLights=function(){this._light=new h;this._light.color=6828057;this._light.direction=new s(1,0,0);this._light.ambient=.5;this._light.ambientColor=3159355;this._light.diffuse=2.8;this._light.specular=1.8;this._view.scene.addChild(this._light);this._lightPicker=new u([this._light])};i.prototype.initMaterials=function(){};i.prototype.initObjects=function(){};i.prototype.initListeners=function(){var i=this;window.onresize=function(e){return i.onResize(e)};this.onResize();this._timer=new o(this.onEnterFrame,this);this._timer.start();a.enableParser(f);a.addEventListener(n.ASSET_COMPLETE,function(e){return i.onAssetComplete(e)});a.load(new r("assets/suzanne.awd"))};i.prototype.onEnterFrame=function(i){this._time+=i;if(this._suzanne)this._suzanne.rotationY+=1;this._view.render()};i.prototype.onAssetComplete=function(i){var e=i.asset;switch(e.assetType){case d.assetType:var t=e;t.y=-300;t.transform.scale=new s(900,900,900);this._suzanne=t;this._view.scene.addChild(t);break;case c.assetType:var n=e;n.lightPicker=this._lightPicker;break}};i.prototype.onResize=function(i){if(i===void 0){i=null}this._view.y=0;this._view.x=0;this._view.width=window.innerWidth;this._view.height=window.innerHeight};return i}();window.onload=function(){new p}},{"awayjs-core/lib/events/AssetEvent":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/containers/View":undefined,"awayjs-display/lib/entities/DirectionalLight":undefined,"awayjs-display/lib/entities/Mesh":undefined,"awayjs-display/lib/materials/MaterialBase":undefined,"awayjs-display/lib/materials/lightpickers/StaticLightPicker":undefined,"awayjs-methodmaterials/lib/pool/MethodRendererPool":undefined,"awayjs-parsers/lib/AWDParser":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},["./src/Basic_LoadAWD.ts"]);

//# sourceMappingURL=Basic_LoadAWD.js.map