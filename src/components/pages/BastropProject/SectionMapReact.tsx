/** @jsxImportSource react */

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../../bastrop_section.module.css';
import { qwikify$ } from '@builder.io/qwik-react';
import { supabase } from "~/utils/supabase";

// Tipos
interface FeatureProperties {
  quadrant?: number;
  id?: string;
  start?: string;
  end?: string;
}

interface Feature {
  type: 'Feature';
  properties: FeatureProperties;
  geometry: any;
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

// Tiles
const TILES_ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const TILES_LABELS = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';
const TILES_ROADS = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}';
const TILES_STREET = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
const TILES_TOPO = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const TILES_CARTO_POSITRON = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

// Configuración de mapas
const MAP_TYPES: { [key: string]: MapType } = {
  satellite: { name: 'Satellite', base: TILES_ESRI, showRoads: false, showLabels: false, attribution: 'Tiles © Esri — Imagery' },
  hybrid: { name: 'Hybrid', base: TILES_ESRI, showRoads: true, showLabels: true, attribution: 'Tiles © Esri — Imagery + Labels' },
  satelliteLabels: { name: 'Satellite + Labels', base: TILES_ESRI, showRoads: false, showLabels: true, attribution: 'Tiles © Esri — Imagery + Labels' },
  street: { name: 'Street Map', base: TILES_STREET, showRoads: false, showLabels: false, attribution: 'Tiles © Esri — Street Map' },
  topographic: { name: 'Topographic', base: TILES_TOPO, showRoads: false, showLabels: false, attribution: 'Tiles © Esri — Topographic' },
  light: { name: 'Light', base: TILES_CARTO_POSITRON, showRoads: false, showLabels: false, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' },
};

// Colores de cuadrantes
const QUADRANT_COLORS: { [key: string]: string } = {
  'QUADRANT - 1': '#2063e0ff',
  'QUADRANT - 2': '#ffc800ff',
  'QUADRANT - 3': '#ff5714ff',
  'QUADRANT - 4': '#77bc00ff',
  'Habitat': '#5b00bcff',
};

// Formateo de fechas
function formatMonthYear(dateStr: string | null | undefined): string {
  if (!dateStr) return 'N/A';
  const [year, month, day] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString("en", { year: "numeric", month: "short" });
}

// Legend
function Legend({ usedQuadrants }: { usedQuadrants: (number | null)[] }) {
  const uniq = Array.from(new Set(usedQuadrants.filter(Boolean))).sort();
  if (!uniq.length) return null;
  return (
    <div role="note" aria-label="Quadrants caption" className={styles.legend}>
      <div className={styles.legendTitle}>Cuadrantes</div>
      {uniq.map((q: number | null) => (
        <div key={q} className={styles.legendItem}>
          <span className={styles.legendColorBox} style={{ background: QUADRANT_COLORS[q!] || '#A1A1A1' }} />
          <span>Q{q}</span>
        </div>
      ))}
    </div>
  );
}

// Ajusta el mapa a la boundary
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

// Componente principal
function SectionMap() {
  const [boundary, setBoundary] = useState<GeoJSON.GeoJsonObject | null>(null);
  const [enriched, setEnriched] = useState<FeatureCollection | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [mapType, setMapType] = useState<string>('light');

  const mapRef = useRef<LeafletMap | null>(null);
  const geoJsonRef = useRef<L.GeoJSON<any> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const sections: FeatureCollection = await fetch('/bastrop_sections.geojson').then(r => r.json());
        const boundary: GeoJSON.GeoJsonObject = await fetch('/bastrop_boundary.geojson').then(r => r.json());
        const { data: supaData, error } = await supabase
          .schema('rta_surveys')
          .from('bastrop_construction_plan')
          .select('*');

        if (error) { setErr("Error al cargar datos de construcción."); return; }

        const enriched: FeatureCollection = {
          ...sections,
          features: sections.features.map((feature) => {
            const match = supaData?.find((row) => row.section_no === feature.properties.id);
            return {
              ...feature,
              properties: {
                ...feature.properties,
                quadrant: match?.quadrant ?? null,
                start: match?.constr_start_date ?? null,
                end: match?.constr_end_date ?? null,
              },
            };
          }),
        };

        setBoundary(boundary);
        setEnriched(enriched);
      } catch (e) {
        setErr('GeoJSON Not Found. ¿Are they /public located?');
        console.error(e);
      }
    })();
  }, []);

  const usedQuadrants = useMemo(
    () => (enriched?.features || []).map(f => f.properties.quadrant ?? null),
    [enriched]
  );

  // Estilo base
  const sectionStyle = (feature: Feature | undefined) => {
    if (!feature) return { color: '#2b2b2b', weight: 1.2, opacity: 1, fillColor: '#A1A1A1', fillOpacity: 0.45 };
    const q = feature.properties.quadrant;
    const color = (q && QUADRANT_COLORS[q]) || '#A1A1A1';
    return { color, weight: 1.25, opacity: 1, fillColor: color, fillOpacity: 0.30, dashArray: '4,4' };
  };

  // Tooltips y hover
  const onEach = (feature: Feature | undefined, layer: L.GeoJSON) => {
    if (!feature || !feature.properties) return;
    const props = feature.properties;
    const name = `Section ${props.id}`;
    const start = formatMonthYear(props.start);
    const end = formatMonthYear(props.end);

    layer.bindTooltip(
      `<div style="
         background-color: ${QUADRANT_COLORS[props.quadrant!] || '#A1A1A1'};
         color: white;
         font-weight: 500;
         padding: 8px;
         border-radius: 15px;
       ">
         ${name}<br/>Construction: ${start} → ${end}
       </div>`,
      { sticky: true, direction: 'top', opacity: 0.95 }
    );

    layer.on('mouseover', () => layer.setStyle({ weight: 2.5, fillOpacity: 0.6 }));
    layer.on('mouseout', () => layer.setStyle(sectionStyle(feature)));
  };

  // Ajuste dinámico de grosor de líneas según zoom
  const updateLineWidth = () => {
    if (!mapRef.current || !geoJsonRef.current) return;
    const zoom = mapRef.current.getZoom();
    const scale = 1 + (zoom - 10) * 0.15; // Ajusta a tu gusto
    geoJsonRef.current.getLayers().forEach(layer => {
      if (layer instanceof L.Path) layer.setStyle({ weight: 1.25 * scale });
    });
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.on('zoom', updateLineWidth);
    updateLineWidth(); // Inicial
    return () => { map.off('zoom', updateLineWidth); };
  }, [enriched]);

  return (
    <section aria-label="Bastrop Project Map – Coverage and Calendar" className={styles.sectionContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>Bastrop – Coverage and Calendar</h2>
        <div className={styles.mapControls}>
          <label htmlFor="mapTypeSelector" className={styles.controlLabel}>Map Type:</label>
          <select id="mapTypeSelector" value={mapType} onChange={(e) => setMapType(e.target.value)} className={styles.mapSelector}>
            {Object.entries(MAP_TYPES).map(([key, config]) => (<option key={key} value={key}>{config.name}</option>))}
          </select>
        </div>
      </div>

      {err && <div className={styles.errorMsg}>{err}</div>}

      <div className={styles.mapWrapper}>
        <MapContainer ref={mapRef} center={[30.1, -97.31]} zoom={10} preferCanvas scrollWheelZoom attributionControl style={{ height: '100%', width: '100%' }}>
          <TileLayer url={MAP_TYPES[mapType].base} attribution={MAP_TYPES[mapType].attribution} />
          {MAP_TYPES[mapType].showRoads && <TileLayer url={TILES_ROADS} opacity={0.4} />}
          {MAP_TYPES[mapType].showLabels && <TileLayer url={TILES_LABELS} opacity={0.9} />}

          {boundary && <>
            <FitToBoundary boundary={boundary} />
            <GeoJSON data={boundary} style={{ color: '#111', weight: 2, opacity: 0.25, fill: false }} />
          </>}

          {enriched && <GeoJSON data={enriched} style={sectionStyle} onEachFeature={onEach} ref={geoJsonRef} />}
        </MapContainer>

        <Legend usedQuadrants={usedQuadrants} />
      </div>
    </section>
  );
}

export const QSectionMap = qwikify$(SectionMap, { eagerness: 'hover' });
