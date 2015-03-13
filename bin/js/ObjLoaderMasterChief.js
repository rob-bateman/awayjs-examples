(function e(t,i,a){function s(n,o){if(!i[n]){if(!t[n]){var l=typeof require=="function"&&require;if(!o&&l)return l(n,!0);if(r)return r(n,!0);var h=new Error("Cannot find module '"+n+"'");throw h.code="MODULE_NOT_FOUND",h}var d=i[n]={exports:{}};t[n][0].call(d.exports,function(e){var i=t[n][1][e];return s(i?i:e)},d,d.exports,e,t,i,a)}return i[n].exports}var r=typeof require=="function"&&require;for(var n=0;n<a.length;n++)s(a[n]);return s})({"./src/ObjLoaderMasterChief.ts":[function(e,t,i){var a=e("awayjs-core/lib/events/LoaderEvent");var s=e("awayjs-core/lib/geom/Vector3D");var r=e("awayjs-core/lib/library/AssetLibrary");var n=e("awayjs-core/lib/net/URLRequest");var o=e("awayjs-core/lib/textures/TextureBase");var l=e("awayjs-core/lib/utils/Debug");var h=e("awayjs-core/lib/utils/RequestAnimationFrame");var d=e("awayjs-display/lib/containers/DisplayObjectContainer");var u=e("awayjs-display/lib/containers/View");var c=e("awayjs-display/lib/entities/DirectionalLight");var w=e("awayjs-display/lib/entities/Mesh");var f=e("awayjs-display/lib/materials/lightpickers/StaticLightPicker");var y=e("awayjs-renderergl/lib/DefaultRenderer");var b=e("awayjs-methodmaterials/lib/MethodMaterial");var p=e("awayjs-methodmaterials/lib/pool/MethodRendererPool");var v=e("awayjs-parsers/lib/OBJParser");var g=function(){function e(){var e=this;this.meshes=new Array;this.spartan=new d;this.spartanFlag=false;this.terrainObjFlag=false;l.LOG_PI_ERRORS=false;l.THROW_ERRORS=false;this.view=new u(new y(p));this.view.camera.z=-50;this.view.camera.y=20;this.view.camera.projection.near=.1;this.view.backgroundColor=13551814;this.raf=new h(this.render,this);this.light=new c;this.light.color=12671021;this.light.direction=new s(1,0,0);this.light.ambient=.4;this.light.ambientColor=8762061;this.light.diffuse=2.8;this.light.specular=1.8;this.spartan.transform.scale=new s(.25,.25,.25);this.spartan.y=0;this.view.scene.addChild(this.light);r.enableParser(v);this.token=r.load(new n("assets/Halo_3_SPARTAN4.obj"));this.token.addEventListener(a.RESOURCE_COMPLETE,function(t){return e.onResourceComplete(t)});this.token=r.load(new n("assets/terrain.obj"));this.token.addEventListener(a.RESOURCE_COMPLETE,function(t){return e.onResourceComplete(t)});this.token=r.load(new n("assets/masterchief_base.png"));this.token.addEventListener(a.RESOURCE_COMPLETE,function(t){return e.onResourceComplete(t)});this.token=r.load(new n("assets/stone_tx.jpg"));this.token.addEventListener(a.RESOURCE_COMPLETE,function(t){return e.onResourceComplete(t)});window.onresize=function(t){return e.onResize()};this.raf.start()}e.prototype.render=function(){if(this.terrain)this.terrain.rotationY+=.4;this.spartan.rotationY+=.4;this.view.render()};e.prototype.onResourceComplete=function(e){var t=e.target;var i=t.baseDependency.assets.length;console.log("------------------------------------------------------------------------------");console.log("away.events.LoaderEvent.RESOURCE_COMPLETE",e,i,t);console.log("------------------------------------------------------------------------------");var t=e.target;var i=t.baseDependency.assets.length;for(var a=0;a<i;a++){var s=t.baseDependency.assets[a];console.log(s.name,e.url);switch(s.assetType){case w.assetType:if(e.url=="assets/Halo_3_SPARTAN4.obj"){var r=s;this.spartan.addChild(r);this.spartanFlag=true;this.meshes.push(r)}else if(e.url=="assets/terrain.obj"){this.terrainObjFlag=true;this.terrain=s;this.terrain.y=98;this.view.scene.addChild(this.terrain)}break;case o.assetType:if(e.url=="assets/masterchief_base.png"){this.mat=new b(s,true,true,false);this.mat.lightPicker=new f([this.light])}else if(e.url=="assets/stone_tx.jpg"){this.terrainMaterial=new b(s,true,true,false);this.terrainMaterial.lightPicker=new f([this.light])}break}}if(this.terrainObjFlag&&this.terrainMaterial){this.terrain.material=this.terrainMaterial;this.terrain.geometry.scaleUV(20,20)}if(this.mat&&this.spartanFlag)for(var a=0;a<this.meshes.length;a++)this.meshes[a].material=this.mat;this.view.scene.addChild(this.spartan);this.onResize()};e.prototype.onResize=function(e){if(e===void 0){e=null}this.view.y=0;this.view.x=0;this.view.width=window.innerWidth;this.view.height=window.innerHeight};return e}();window.onload=function(){new g}},{"awayjs-core/lib/events/LoaderEvent":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/textures/TextureBase":undefined,"awayjs-core/lib/utils/Debug":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/containers/DisplayObjectContainer":undefined,"awayjs-display/lib/containers/View":undefined,"awayjs-display/lib/entities/DirectionalLight":undefined,"awayjs-display/lib/entities/Mesh":undefined,"awayjs-display/lib/materials/lightpickers/StaticLightPicker":undefined,"awayjs-methodmaterials/lib/MethodMaterial":undefined,"awayjs-methodmaterials/lib/pool/MethodRendererPool":undefined,"awayjs-parsers/lib/OBJParser":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},["./src/ObjLoaderMasterChief.ts"]);

//# sourceMappingURL=ObjLoaderMasterChief.js.map