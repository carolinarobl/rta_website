/** @jsxImportSource react */

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../../bastrop_section.module.css';
import { qwikify$ } from '@builder.io/qwik-react';

// Declaramos los tipos para la estructura de datos que maneja la aplicación
interface FeatureProperties {
  quadrant?: number;
  name?: string;
  id?: string;
  start?: string;
  end?: string;
  coverage?: string;
}

interface Feature {
  type: 'Feature';
  properties: FeatureProperties;
  geometry: any; // O un tipo más específico si lo conoces, como GeoJSON.Polygon
}

interface FeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

interface MapType {
  name: string;
  base: string;
  showRoads: boolean;
  showLabels: boolean;
  attribution: string;
}

const TILES_ESRI: string =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

const TILES_LABELS: string = 
  'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

const TILES_ROADS: string = 
  'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}';

const TILES_STREET: string = 
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

const TILES_TOPO: string = 
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';

const MAP_TYPES: { [key: string]: MapType } = {
  satellite: {
    name: 'Satellite',
    base: TILES_ESRI,
    showRoads: false,
    showLabels: false,
    attribution: 'Tiles © Esri — Imagery',
  },
  hybrid: {
    name: 'Hybrid',
    base: TILES_ESRI,
    showRoads: true,
    showLabels: true,
    attribution: 'Tiles © Esri — Imagery + Labels',
  },
  satelliteLabels: {
    name: 'Satellite + Labels',
    base: TILES_ESRI,
    showRoads: false,
    showLabels: true,
    attribution: 'Tiles © Esri — Imagery + Labels',
  },
  street: {
    name: 'Street Map',
    base: TILES_STREET,
    showRoads: false,
    showLabels: false,
    attribution: 'Tiles © Esri — Street Map',
  },
  topographic: {
    name: 'Topographic',
    base: TILES_TOPO,
    showRoads: false,
    showLabels: false,
    attribution: 'Tiles © Esri — Topographic',
  },
};

const QUADRANT_COLORS: { [key: number]: string } = {
  1: '#937cceff',
  2: '#46d1d1ff',
  3: '#f0a54bff',
  4: '#b4b41bff',
};

function fmt(d: string | null | undefined): string {
  if (!d) return 'N/A';
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  } catch {
    return d;
  }
}

function Legend({ usedQuadrants }: { usedQuadrants: (number | null)[] }) {
  const uniq = Array.from(new Set(usedQuadrants.filter(Boolean))).sort();
  if (!uniq.length) return null;
  return (
    <div role="note" aria-label="Quadrants caption" className={styles.legend}>
      <div className={styles.legendTitle}>Cuadrantes</div>
      {uniq.map((q: number | null) => (
        <div key={q} className={styles.legendItem}>
          <span
            className={styles.legendColorBox}
            style={{ background: QUADRANT_COLORS[q!] || '#A1A1A1' }}
          />
          <span>Q{q}</span>
        </div>
      ))}
    </div>
  );
}

function FitToBoundary({ boundary }: { boundary: GeoJSON.GeoJsonObject | null }) {
  const map = useMap();
  useEffect(() => {
    if (!boundary) return;
    const layer = L.geoJSON(boundary);
    const b = layer.getBounds();
    if (b.isValid()) map.fitBounds(b.pad(0.02));
  }, [boundary, map]);
  return null;
}

function SectionMap() {
  const [boundary, setBoundary] = useState<GeoJSON.GeoJsonObject | null>(null);
  const [enriched, setEnriched] = useState<FeatureCollection | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [mapType, setMapType] = useState<string>('topographic');
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [b, e] = await Promise.all([
          fetch('/bastrop_boundary.geojson').then((r) => r.json()),
          fetch('/bastrop_enriched.geojson').then((r) => r.json()),
        ]);
        setBoundary(b);
        setEnriched(e);
      } catch (e: unknown) {
        setErr('GeoJSON Not Found. ¿Are they /public located?');
        console.error(e);
      }
    })();
  }, []);

  const usedQuadrants = useMemo(
    () => (enriched?.features || []).map((f) => f.properties.quadrant ?? null),
    [enriched]
  );

const sectionStyle = (feature: Feature | undefined) => {
  // Si el feature es undefined, devuelve un estilo por defecto o un objeto vacío
  if (!feature) {
    return {
      color: '#2b2b2b',
      weight: 1.2,
      opacity: 1,
      fillColor: '#A1A1A1',
      fillOpacity: 0.45,
    };
  }

  const q = feature.properties.quadrant;
  const color = (q && QUADRANT_COLORS[q]) || '#A1A1A1';
  return {
    color: '#2b2b2b',
    weight: 1.2,
    opacity: 1,
    fillColor: color,
    fillOpacity: 0.45,
  };
};

const onEach = (feature: Feature | undefined, layer: L.GeoJSON) => {
  if (!feature || !feature.properties) {
    return;
  }

  const props = feature.properties;
  const name = props.name || `Section ${props.id}`;
  const start = fmt(props.start);
  const end = fmt(props.end);

  layer.bindTooltip(`${name}<br/>Construction: ${start} → ${end}`, {
    sticky: true,
    direction: 'center',
    opacity: 0.95,
  });

  layer.on('mouseover', () => layer.setStyle({ weight: 2.5, fillOpacity: 0.6 }));
  layer.on('mouseout', () => layer.setStyle(sectionStyle(feature)));

  layer.on('click', () => {
    const m = mapRef.current;
    if (m && layer.getBounds) {
      const bounds = layer.getBounds();
      if (bounds.isValid()) m.fitBounds(bounds.pad(0.03));
    }
    const q = props.quadrant ? `Q${props.quadrant}` : '—';
    const cov = props.coverage ?? '—';
    const html = `
      <div style="min-width:220px">
        <div style="font-weight:700;margin-bottom:6px">${name}</div>
        <div style="margin-bottom:4px"><b>Quadrant:</b> ${q}</div>
        <div style="margin-bottom:4px"><b>Construction:</b> ${start} → ${end}</div>
        <div style="margin-bottom:2px"><b>Coverage:</b> ${cov}</div>
      </div>`;
    layer.bindPopup(html, { maxWidth: 320 }).openPopup();
  });
};

  return (
    <section aria-label="Bastrop Project Map – Coverage and Calendar" className={styles.sectionContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>Bastrop – Coverage and Calendar</h2>
        <div className={styles.mapControls}>
          <label htmlFor="mapTypeSelector" className={styles.controlLabel}>
            Map Type:
          </label>
          <select
            id="mapTypeSelector"
            value={mapType}
            onChange={(e) => setMapType(e.target.value)}
            className={styles.mapSelector}
          >
            {Object.entries(MAP_TYPES).map(([key, config]) => (
              <option key={key} value={key}>
                {config.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {err && <div className={styles.errorMsg}>{err}</div>}

      <div className={styles.mapWrapper}>
<MapContainer
  ref={mapRef}
  center={[30.1, -97.31]}
  zoom={10}
  preferCanvas
  scrollWheelZoom
  attributionControl
  style={{ height: '100%', width: '100%' }}
>
          <TileLayer 
            url={MAP_TYPES[mapType].base} 
            attribution={MAP_TYPES[mapType].attribution} 
          />
          
          {MAP_TYPES[mapType].showRoads && (
            <TileLayer 
              url={TILES_ROADS} 
              attribution="" 
              opacity={0.4}
              className="roads-layer"
            />
          )}
          
          {MAP_TYPES[mapType].showLabels && (
            <TileLayer 
              url={TILES_LABELS} 
              attribution="" 
              opacity={0.9}
              className="labels-layer"
            />
          )}

          {boundary && (
            <>
              <FitToBoundary boundary={boundary} />
              <GeoJSON data={boundary} style={{ color: '#111', weight: 5, opacity: 0.9, fill: false }} />
            </>
          )}

          {enriched && (
            <GeoJSON data={enriched} style={sectionStyle} onEachFeature={onEach} />
          )}
        </MapContainer>

        <Legend usedQuadrants={usedQuadrants} />
      </div>
    </section>
  );
}

export const QSectionMap = qwikify$(SectionMap, { eagerness: 'hover' });