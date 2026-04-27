"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import Link from "next/link";
import { School } from "@/lib/types";
import {
  mySchoolCoordinates,
  schoolCoordinates,
} from "@/lib/mock/dashboard-destinations";

/* Custom DivIcon avoids Leaflet's default image-marker assets, which would
 * otherwise need to be served from /public. The pin colour matches our
 * brand tokens (school green for partners, student blue for "my school"). */
function pinIcon({
  color,
  dim,
  ring,
}: {
  color: string;
  dim?: boolean;
  ring?: boolean;
}) {
  const opacity = dim ? "0.35" : "1";
  const ringHtml = ring
    ? `<span style="
        position:absolute;inset:-6px;border-radius:9999px;
        border:2px solid ${color};opacity:${dim ? "0.25" : "0.45"};
        animation:wegoPinPulse 1.6s ease-out infinite;
      "></span>`
    : "";
  return L.divIcon({
    className: "wego-pin",
    html: `
      <div style="position:relative;width:24px;height:32px;opacity:${opacity};">
        ${ringHtml}
        <svg viewBox="0 0 24 32" width="24" height="32"
          style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25));">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20 12 20s12-11.6 12-20C24 5.4 18.6 0 12 0z"
            fill="${color}"/>
          <circle cx="12" cy="12" r="4.5" fill="#ffffff"/>
        </svg>
      </div>
    `,
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -28],
  });
}

function FitToHighlights({
  schools,
  highlightedIds,
}: {
  schools: School[];
  highlightedIds: string[];
}) {
  const map = useMap();
  const ids = highlightedIds.join(",");
  useEffect(() => {
    const points = schools
      .filter((s) => highlightedIds.includes(s.id) && schoolCoordinates[s.id])
      .map((s) => schoolCoordinates[s.id]!);
    points.push(mySchoolCoordinates);
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0]!.lat, points[0]!.lng], 6, { animate: true });
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.flyToBounds(bounds, {
      padding: [60, 60],
      maxZoom: 7,
      duration: 0.6,
    });
  }, [ids, map, schools, highlightedIds]);
  return null;
}

export function LeafletMap({
  schools,
  highlightedIds,
}: {
  schools: School[];
  highlightedIds: string[];
}) {
  const partnerIcons = useMemo(() => {
    return {
      active: pinIcon({ color: "#14a87a", ring: true }),
      dimmed: pinIcon({ color: "#14a87a", dim: true }),
    };
  }, []);
  const mySchoolIcon = useMemo(
    () => pinIcon({ color: "#6475e9", ring: true }),
    [],
  );

  return (
    <div className="relative h-[640px] overflow-hidden rounded-card-lg ring-1 ring-divider">
      <style>{`
        @keyframes wegoPinPulse {
          0% { transform: scale(0.8); opacity: 0.55; }
          80% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .wego-leaflet .leaflet-control-attribution {
          background: rgba(255,255,255,0.85);
          font-size: 10px;
        }
        .wego-leaflet .leaflet-popup-content-wrapper {
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(10,12,25,0.12);
        }
        .wego-leaflet .leaflet-popup-content {
          margin: 12px 14px;
          font-family: inherit;
        }
      `}</style>
      <MapContainer
        center={[49, 6]}
        zoom={5}
        scrollWheelZoom
        className="wego-leaflet h-full w-full"
        style={{ background: "#e6eef7" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        <FitToHighlights
          schools={schools}
          highlightedIds={highlightedIds}
        />

        {schools.map((s) => {
          const c = schoolCoordinates[s.id];
          if (!c) return null;
          const isHighlighted = highlightedIds.includes(s.id);
          return (
            <Marker
              key={s.id}
              position={[c.lat, c.lng]}
              icon={isHighlighted ? partnerIcons.active : partnerIcons.dimmed}
              opacity={isHighlighted ? 1 : 0.55}
              zIndexOffset={isHighlighted ? 100 : 0}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-school">
                    Partner school
                  </div>
                  <div className="text-sm font-bold text-fg">{s.name}</div>
                  <div className="text-xs text-fg-muted">
                    {s.city}, {s.country}
                  </div>
                  <div className="mt-1 text-xs text-fg-muted">
                    {s.spotsLeft} spots left · {s.orientation}
                  </div>
                  <Link
                    href={`/partners/${s.id}`}
                    className="mt-3 inline-flex items-center rounded-full bg-school px-3 py-1 text-[11px] font-bold text-white hover:brightness-105"
                  >
                    Open profile
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <Marker
          position={[mySchoolCoordinates.lat, mySchoolCoordinates.lng]}
          icon={mySchoolIcon}
          zIndexOffset={500}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-student">
                My school
              </div>
              <div className="text-sm font-bold text-fg">
                Liceo Tommaso Salvini
              </div>
              <div className="text-xs text-fg-muted">Milan, Italy</div>
              <Link
                href="/my-school"
                className="mt-3 inline-flex items-center rounded-full bg-student px-3 py-1 text-[11px] font-bold text-white hover:brightness-105"
              >
                Open profile
              </Link>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <div className="pointer-events-none absolute bottom-3 left-3 z-[400] flex items-center gap-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-fg shadow-md ring-1 ring-divider">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-school" />
          Partner schools
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-student" />
          My school
        </span>
      </div>
    </div>
  );
}

export default LeafletMap;
