"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { feature } from "topojson-client";
import L from "leaflet";

// Starlink-style legend configuration
const MAP_COLORS = {
  available: "#3b82f6",   // Blue for covered states
  unavailable: "#1a1a1a", // Very dark for unavailable
  background: "transparent",
  border: "#333333",
};

const AVAILABLE_STATES = ["Anzoátegui", "Bolívar", "Monagas"];

// Auto-fits the map bounds to the GeoJSON data so nothing is clipped
const FitBoundsController = ({ geoData }: { geoData: GeoJSON.FeatureCollection }) => {
  const map = useMap();

  useEffect(() => {
    if (!geoData) return;

    const fit = () => {
      const layer = L.geoJSON(geoData);
      const bounds = layer.getBounds();
      if (bounds.isValid()) {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [16, 16], animate: true });
      }
    };

    // Initial fit
    const timer = setTimeout(fit, 100);

    // Re-fit on window resize (responsive behavior)
    window.addEventListener('resize', fit);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', fit);
    };
  }, [map, geoData]);
  
  return null;
};

const CoverageMapInner: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // Load and convert TopoJSON to GeoJSON
    fetch("/venezuela-estados.json")
      .then((res) => res.json())
      .then((topoJson) => {
        try {
          const objectKey = Object.keys(topoJson.objects)[0];
          const geoJsonData = feature(
            topoJson,
            topoJson.objects[objectKey]
          );
          setGeoData(geoJsonData);
        } catch (err) {
          console.error("Error parsing TopoJSON:", err);
        }
      })
      .catch((err) => console.error("Error loading TopoJSON:", err));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styleFeature = (feat: any) => {
    const stateName = feat?.properties?.NAME_1;
    const isAvailable = AVAILABLE_STATES.includes(stateName);
    return {
      fillColor: isAvailable ? MAP_COLORS.available : MAP_COLORS.unavailable,
      weight: 1,
      opacity: 1,
      color: MAP_COLORS.border,
      fillOpacity: 0.8,
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEachFeature = (feat: any, layer: L.Layer) => {
    const stateName = feat?.properties?.NAME_1;
    const isAvailable = AVAILABLE_STATES.includes(stateName);

    const statusText = isAvailable ? "Disponible Ahora" : "Próximamente";
    const popupContent = `
      <div style="background: #111; color: white; padding: 10px; border-radius: 4px; font-family: sans-serif;">
        <h3 style="margin: 0 0 5px 0; font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px;">${stateName}</h3>
        <p style="margin: 0; font-size: 14px; color: ${isAvailable ? MAP_COLORS.available : "#9ca3af"};">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${isAvailable ? MAP_COLORS.available : "#9ca3af"}; margin-right: 5px;"></span>
          ${statusText}
        </p>
      </div>
    `;

    layer.bindPopup(popupContent, {
      closeButton: false,
      className: "custom-map-popup",
    });

    layer.on({
      mouseover: (e) => {
        const target = e.target as L.Path;
        target.setStyle({
          fillOpacity: 1,
          weight: 2,
          color: "#ffffff",
        });
        target.bringToFront();
      },
      mouseout: (e) => {
        const target = e.target as L.Path;
        target.setStyle(styleFeature(feat));
      },
    });
  };

  return (
    <div className="w-full" style={{ isolation: 'isolate' }}>
      {/* isolation:isolate creates a new stacking context — Leaflet z-indexes stay inside and never bleed over the navbar */}
      <div className="relative w-full h-[400px] md:h-[560px] lg:h-[700px]">
        {geoData ? (
          <MapContainer
            center={[7.5, -66.0]}
            zoom={5}
            zoomControl={false}
            dragging={false}
            touchZoom={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            boxZoom={false}
            keyboard={false}
            className="w-full h-full"
            style={{ background: MAP_COLORS.background }}
          >
            <FitBoundsController geoData={geoData} />
            <GeoJSON
              data={geoData}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          </MapContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50">
            Cargando mapa interactivo...
          </div>
        )}

        {/* Legend — compact vertical card at bottom-right, at the level of Amazonas */}
        <div className="absolute bottom-8 right-4 z-[1000] bg-black/75 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-lg shadow-xl pointer-events-none">
          <p className="text-white/60 text-[10px] font-semibold tracking-widest uppercase mb-2">Cobertura</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: MAP_COLORS.available }} />
              <span className="text-gray-300 text-xs">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#444' }} />
              <span className="text-gray-300 text-xs">Próximamente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for Leaflet popups to match dark theme */}
      <style>{`
        .leaflet-container {
          background: transparent !important;
        }
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip {
          background: #111 !important;
        }
        .custom-map-popup .leaflet-popup-content {
          margin: 0;
        }
        path.leaflet-interactive:focus {
          outline: none !important;
        }
      `}</style>
    </div>
  );
};

export default CoverageMapInner;
