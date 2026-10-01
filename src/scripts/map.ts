import L from "leaflet";
import leafletCss from "leaflet/dist/leaflet.css?url";

function loadCss(href: string) {
  return new Promise<void>((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = link.onerror = () => resolve();
    document.head.append(link);
  });
}

export async function createMap(el: HTMLElement, lat: number, lng: number, label: string) {
  await loadCss(leafletCss);
  const map = L.map(el, {
    center: [lat, lng],
    zoom: 16,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: !L.Browser.mobile,
    attributionControl: true,
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const icon = L.divIcon({
    className: "map-pin",
    html: '<span class="map-pin__pulse"></span><span class="map-pin__dot"></span>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  L.marker([lat, lng], { icon, title: label, alt: label, keyboard: true }).addTo(map);
  return map;
}
