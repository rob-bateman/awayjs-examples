import { View } from "awayjs-full/lib/view";
import { Vector3D, RequestAnimationFrame, AssetLibrary, URLRequest, AssetEvent } from "awayjs-full/lib/core";
import { PrimitiveSpherePrefab, DisplayObject, DisplayObjectContainer, MouseEvent } from "awayjs-full/lib/scene";
import { BasicMaterial, ImageTexture2D } from "awayjs-full/lib/materials";
import { BitmapImage2D } from "awayjs-full/lib/stage";

class Hello_AwayJS
{
    //viewport into the scene
    private _view:View;

    //material placeholder
    private _material:BasicMaterial;

    //RAF callback timer
    private _timer:RequestAnimationFrame;

    //array of spheres
    private _spheres:DisplayObject[] = [];

    private _time:number = 0;

    private _mouseContainer:DisplayObjectContainer;

    constructor()
    {
        //instantiate view and set dimensions
        this._view = new View();
        this._view.x = 0;
        this._view.y = 0;
        this._view.width = 500;
        this._view.height = 500;

        //set camera position
        this._view.camera.z = -600;
        this._view.camera.y = 500;
        this._view.camera.lookAt(new Vector3D());

        this._material = new BasicMaterial();

        this._mouseContainer = new DisplayObjectContainer();
        this._view.scene.addChild(this._mouseContainer);

        //adding sphere object to scene
        var prefab:PrimitiveSpherePrefab = new PrimitiveSpherePrefab(this._material)
        for (var i:number = 0; i < 100; i++) {
            var object:DisplayObject = prefab.getNewObject();
            this._spheres.push(object);
            object.x = Math.random()*1000 - 500;
            object.y = Math.random()*1000 - 500;
            object.z = Math.random()*1000 - 500;
            this._mouseContainer.addChild(object);
        }

        this._mouseContainer.addEventListener(MouseEvent.MOUSE_DOWN, (event:MouseEvent) => this.onMouseDownEvent(event))
        this._mouseContainer.addEventListener(MouseEvent.MOUSE_UP, (event:MouseEvent) => this.onMouseUpEvent(event))

        //start the RAF timer
        this._timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this._timer.start();

        //Load asset files

        AssetLibrary.addEventListener(AssetEvent.ASSET_COMPLETE, (event:AssetEvent) => this.onAssetComplete(event));
        AssetLibrary.load(new URLRequest("assets/floor_diffuse.jpg"));
    }

    public onEnterFrame(dt:number):void
    {
        this._time += dt;

        for (var i:number = 0; i < 100; i++) {
            // this._spheres[i].x += Math.sin(this._time/200)*100;
            // this._spheres[i].y += Math.sin(this._time/60)*100;
        }
        
        this._view.render();
    }

    public onMouseDownEvent(event:MouseEvent):void
    {
        var object:DisplayObject = <DisplayObject> event.entity

        // if (object == this._mouseContainer)
        //     return;
        
        object.scaleX = 2;
        object.scaleY = 2;
        object.scaleZ = 2;
    }

    public onMouseUpEvent(event:MouseEvent):void
    {
        var object:DisplayObject = <DisplayObject> event.entity

        // if (object == this._mouseContainer)
        //     return;

        object.scaleX = 1;
        object.scaleY = 1;
        object.scaleZ = 1;
    }

    public onAssetComplete(event:AssetEvent):void
    {
        this._material.texture = new ImageTexture2D(<BitmapImage2D> event.asset);

    }
}
window.onload = function()
{
	new Hello_AwayJS();
}