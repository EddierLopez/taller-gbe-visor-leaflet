import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as L from "leaflet"
import "leaflet-draw"
import {Coords} from "../../models/models"
import {toHectares,fixHectares} from "../../utils/area.utils"

const DEFAULT_CENTER:L.LatLngExpression=[10.34210,-85.78893]
const DEFAULT_ZOOM=14

@Component({
  selector: 'app-farm',
  imports: [],
  templateUrl: './farm.html',
  styleUrl: './farm.css',
})
export class Farm implements AfterContentInit,OnDestroy{
  @ViewChild("mapcontainer",{static:true})
  private readonly mapContainer!:ElementRef<HTMLDivElement>

  private map!:L.Map
  private featureGroup!:L.FeatureGroup
  private layerGroup!:L.LayerGroup

  ngAfterContentInit():void{
    this.map=new L.Map(this.mapContainer.nativeElement).setView(DEFAULT_CENTER,DEFAULT_ZOOM)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    this.featureGroup=new L.FeatureGroup().addTo(this.map)
    this.layerGroup=new L.LayerGroup().addTo(this.map)

    const drawControl=new (L.Control as any).Draw({
      position:"topright",
      edit:{
        featureGroup:this.featureGroup,
        edit:false,
        remove:false
      },
      draw:{
        polygon:{
          allowIntersection:true,
          showArea:true,
          shapeOptions:{
            color:"#3F6142",
            weight:2,
            fillOpacity:0.3
          },
        },
        rectangle:false,
        circle:false,
        circlemarker:false,
        marker:false,
        polyline:false
      },

    })

    this.map.addControl(drawControl)
    this.map.on((L as any).Draw.Event.CREATED,(event:any)=>this.onDraw(event))

  }
  onDraw(event:any):void{
    const layer:L.Polygon=event.layer
    const areaHa=toHectares(layer)
    console.log(fixHectares(areaHa))
    const coords:Coords[]=(layer.getLatLngs()[0] as L.LatLng[]).map(({lat,lng})=>({
      lat,
      lng,
    }      
    ))  ///Convierte a JSON

    const newLayer=new L.Polygon(coords.map((p)=>[p.lat,p.lng]) as L.LatLngExpression[],
      {
        color:"#2F5233",
        weight:2,
        fillOpacity:0.25
      }
    )
    newLayer.addTo(this.layerGroup)

    console.log(coords)
  }
  ngOnDestroy():void{

  }

}
