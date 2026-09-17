export interface Coords{
    lat:number
    lng:number
}
export interface Pacel{
    id:string
    name:string
    grass:string
    areaHa:number
    coords:Coords
}