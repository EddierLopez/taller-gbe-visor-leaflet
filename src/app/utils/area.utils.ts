import area from "@turf/area"
import type * as L from "leaflet"
export function toHectares(layer:L.Polygon):number{
    const geojson=layer.toGeoJSON()
    const areaM2=area(geojson)
    return areaM2/10000
}
export function fixHectares(area:number):string{
    return `${area.toFixed(2)} ha`
}