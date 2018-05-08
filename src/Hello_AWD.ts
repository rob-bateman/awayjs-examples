import { DefaultRenderer, IEntity } from "awayjs-full/lib/renderer";
import { View, SceneGraphPartition, IEntityNodeClass } from "awayjs-full/lib/view";
import { PerspectiveProjection, CoordinateSystem, Loader, LoaderEvent, URLRequest, RequestAnimationFrame } from "awayjs-full/lib/core";
import { LoaderContainer, DisplayObject, MovieClip } from "awayjs-full/lib/scene";
import { AWDParser } from "awayjs-full/lib/parsers";
import { AS2SceneGraphFactory } from "awayjs-full/lib/player";

class Hello_AWD
{
    private _fps:number = 30;
    private _view:View;
    private _renderer: DefaultRenderer;
    private _projection:PerspectiveProjection;
    private _timer:RequestAnimationFrame;
    private _time:number = 0;
    private _rootTimeline:MovieClip;
    private stage_height = 400;
    private stage_width = 550;

    constructor()
    {
        //set renderableSorter to null for 2D
        this._renderer = new DefaultRenderer();
        this._renderer.renderableSorter = null;

        //create View object
        this._view = new View(this._renderer);
        this._view.width = 500;
        this._view.height = 500;

        //set right-handed projection
        this._projection = new PerspectiveProjection();
        this._projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;

        //sets the origin in the top-left corner of the screen
        this._projection.fieldOfView = 30;
        this._projection.originX = 0;
        this._projection.originY = 0;

        //set the cameras projection value
        this._view.camera.projection = this._projection;


        //create Loader container and load awd file
        var loader:LoaderContainer = new LoaderContainer();
        loader.addEventListener(LoaderEvent.LOAD_COMPLETE, (event:LoaderEvent) => this.onLoadComplete(event));
        loader.load(new URLRequest("assets/AWD3/MagnifyGlass.awd"), null, null, new AWDParser(new AS2SceneGraphFactory(this._view)));

        //start RAF timer
        this._timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this._timer.start();

        //set resize listener
        window.onresize = (event) => this.onResize(event);
        this.onResize();
    }

    public onLoadComplete(event:LoaderEvent):void
    {
        this._rootTimeline = <MovieClip> event.assets[event.assets.length - 1]
        
        this._view.setPartition(this._rootTimeline, new SceneGraphPartition(this._rootTimeline));

        this._view.scene.addChild(this._rootTimeline);
    }
q
    public onEnterFrame(dt:number):void
    {
        var frameMarker:number = Math.floor(1000/this._fps);

        this._time += Math.min(dt, frameMarker);

        if (this._time >= frameMarker) {
            this._time -= frameMarker;

            if (this._rootTimeline)
                this._rootTimeline.update();
        }

        this._view.render();
    }

    private onResize(event = null)
    {
        this._view.x = 0;
        this._view.y = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;

        this._projection.fieldOfView = Math.atan(this.stage_height/1000/2)*360/Math.PI;
        this._projection.originX = (0.5 - 0.5*(window.innerHeight/this.stage_height)*(this.stage_width/window.innerWidth))
    }
}

window.onload = function() {
    new Hello_AWD();
}