import React, { useEffect, useRef, useState } from "react";
import "./MatBangTang.css";
import { IMAGE_WIDTH, IMAGE_HEIGHT, APARTMENT_TYPES, ZONES } from "./data";
import matBangTongThe from "../../assets/images/matbang/mat-bang-tong-the.webp";

const fmtArea = (m2) => `${m2} m²`;
const fmtPrice = (from, to) => `${from.toFixed(1)} – ${to.toFixed(1)} tỷ`;
const toDur = (v) =>
  v == null ? undefined : typeof v === "number" ? `${v}s` : v;
const toSize = (v) =>
  v == null ? undefined : typeof v === "number" ? `${v}px` : v;

// Ép style thắng tuyệt đối mọi CSS bên ngoài (kể cả !important của site),
// vì setProperty(..., "important") ở tầng inline luôn thắng class.
function useForceImportant(ref, styles, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Object.entries(styles).forEach(([prop, value]) => {
      if (value == null) return;
      try {
        el.style.setProperty(prop, value, "important");
      } catch {
        /* no-op */
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function MatBangTang({
  imageSrc = matBangTongThe,
  imageAlt = "Mặt bằng tổng thể dự án",
  zones = ZONES,
  types = APARTMENT_TYPES,
  onSelectZone,
  // Tốc độ: số (giây) hoặc chuỗi CSS ("1.5s", "800ms"...)
  breatheSpeed,
  transitionSpeed,
  popupSpeed,
  // Kích thước popup: số (px) hoặc chuỗi CSS ("360px", "24rem"...)
  popupWidth,
  popupImageHeight,
}) {
  const [hoverZoneId, setHoverZoneId] = useState(null);
  const [hoverTypeId, setHoverTypeId] = useState(null);
  const [pinned, setPinned] = useState(false);

  const popupRef = useRef(null);
  const popupImageRef = useRef(null);
  const statsRef = useRef(null);

  const activeZone = zones.find((z) => z.id === hoverZoneId) || null;
  const activeType = activeZone
    ? types[activeZone.typeId]
    : hoverTypeId
      ? types[hoverTypeId]
      : null;

  const activeTypeId = activeZone ? activeZone.typeId : hoverTypeId;
  const isSelectionActive = Boolean(hoverZoneId || hoverTypeId);

  const anchorZone =
    activeZone ||
    (hoverTypeId ? zones.find((z) => z.typeId === hoverTypeId) : null);

  const typeZones = hoverTypeId
    ? zones.filter((z) => z.typeId === hoverTypeId)
    : [];
  const typeSummary = typeZones.length
    ? {
        count: typeZones.length,
        areaMin: Math.min(...typeZones.map((z) => z.area)),
        areaMax: Math.max(...typeZones.map((z) => z.area)),
        priceMin: Math.min(...typeZones.map((z) => z.priceFrom)),
        priceMax: Math.max(...typeZones.map((z) => z.priceTo)),
        ratio: typeZones.reduce((s, z) => s + z.ratio, 0),
      }
    : null;

  const showPopup = Boolean(anchorZone && activeType);
  const popupImg =
    (activeZone ? activeZone.image : null) ||
    (activeType && activeType.image) ||
    "";

  // Ép cứng khung + nền popup — chống mọi CSS/element khác đè lên.
  useForceImportant(
    popupRef,
    {
      position: "absolute",
      display: "block",
      "z-index": "999",
      "background-color": "#0b2a3d",
      "background-image":
        "linear-gradient(180deg, rgba(11,42,61,0.96) 0%, rgba(7,27,40,0.98) 100%)",
      overflow: "hidden",
    },
    [showPopup, anchorZone?.id],
  );

  // Ép cứng ảnh layout trong popup — chỗ hay bị "lòi" ảnh/nội dung khác đè lên.
  useForceImportant(
    popupImageRef,
    {
      "background-image": popupImg ? `url(${popupImg})` : "none",
      "background-size": "cover",
      "background-position": "center",
      "background-repeat": "no-repeat",
    },
    [showPopup, popupImg],
  );

  // Ép cứng lưới 2 cột của các chỉ số (diện tích / tỷ lệ / giá) — chỗ bị chồng chữ.
  useForceImportant(
    statsRef,
    {
      display: "grid",
      "grid-template-columns": "1fr 1fr",
    },
    [showPopup, anchorZone?.id],
  );

  const handleZoneEnter = (zone) => () => {
    if (pinned) return;
    setHoverZoneId(zone.id);
    setHoverTypeId(null);
  };

  const handleZoneLeave = () => {
    if (pinned) return;
    setHoverZoneId(null);
  };

  const handleZoneClick = (zone) => (e) => {
    e.stopPropagation();
    if (pinned && hoverZoneId === zone.id) {
      setPinned(false);
      setHoverZoneId(null);
      return;
    }
    setHoverZoneId(zone.id);
    setHoverTypeId(null);
    setPinned(true);
    onSelectZone?.(zone);
  };

  const handleLegendEnter = (typeId) => () => {
    if (pinned) return;
    setHoverTypeId(typeId);
    setHoverZoneId(null);
  };

  const handleLegendLeave = () => {
    if (pinned) return;
    setHoverTypeId(null);
  };

  const closePopup = () => {
    setPinned(false);
    setHoverZoneId(null);
    setHoverTypeId(null);
  };

  useEffect(() => {
    if (!pinned) return;
    const onDocClick = () => closePopup();
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [pinned]);

  const rootStyle = {
    ...(breatheSpeed != null
      ? { "--mbt-zone-breathe-speed": toDur(breatheSpeed) }
      : {}),
    ...(transitionSpeed != null
      ? { "--mbt-transition-speed": toDur(transitionSpeed) }
      : {}),
    ...(popupSpeed != null
      ? { "--mbt-popup-in-speed": toDur(popupSpeed) }
      : {}),
    ...(popupWidth != null ? { "--mbt-popup-width": toSize(popupWidth) } : {}),
    ...(popupImageHeight != null
      ? { "--mbt-popup-image-height": toSize(popupImageHeight) }
      : {}),
  };

  return (
    <div className="mbt" style={rootStyle}>
      <div className="mbt__stage">
        <img
          className="mbt__img"
          src={imageSrc}
          alt={imageAlt}
          draggable={false}
        />

        <svg
          className="mbt__overlay"
          viewBox={`0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}`}
          preserveAspectRatio="none"
        >
          {zones.map((zone) => {
            const type = types[zone.typeId];
            const isActive =
              hoverZoneId === zone.id ||
              (!hoverZoneId && hoverTypeId === zone.typeId);
            const isDimmed = isSelectionActive && !isActive;
            return (
              <polygon
                key={zone.id}
                points={zone.points}
                className={`mbt__zone${isActive ? " is-active" : ""}${isDimmed ? " is-dimmed" : ""}`}
                style={{ "--zone-color": type.color }}
                tabIndex={0}
                role="button"
                aria-label={`${type.label} — ${zone.code}`}
                onMouseEnter={handleZoneEnter(zone)}
                onMouseLeave={handleZoneLeave}
                onFocus={handleZoneEnter(zone)}
                onBlur={handleZoneLeave}
                onClick={handleZoneClick(zone)}
              >
                <title>{`${type.label} — ${zone.code}`}</title>
              </polygon>
            );
          })}
        </svg>

        {showPopup && (
          <div
            ref={popupRef}
            className={`mbt__popup side-${anchorZone.popupSide || "right"}`}
            style={{ top: anchorZone.popupTop, left: anchorZone.popupLeft }}
          >
            <button
              className="mbt__popup-close"
              onClick={closePopup}
              aria-label="Đóng"
            >
              ×
            </button>

            <div ref={popupImageRef} className="mbt__popup-image" />

            <div className="mbt__popup-body">
              <span
                className="mbt__popup-eyebrow"
                style={{ "--zone-color": activeType.color }}
              >
                {activeZone
                  ? activeZone.code
                  : `${typeSummary.count} vị trí trên mặt bằng`}
              </span>
              <h4 className="mbt__popup-title">{activeType.label}</h4>

              <div ref={statsRef} className="mbt__popup-stats">
                <div className="mbt__popup-stat">
                  <span className="mbt__popup-stat-label">Diện tích</span>
                  <span className="mbt__popup-stat-value">
                    {activeZone
                      ? fmtArea(activeZone.area)
                      : `${typeSummary.areaMin} – ${typeSummary.areaMax} m²`}
                  </span>
                </div>
                <div className="mbt__popup-stat">
                  <span className="mbt__popup-stat-label">Tỷ lệ căn hộ</span>
                  <span className="mbt__popup-stat-value">
                    {activeZone
                      ? `${activeZone.ratio}%`
                      : `${typeSummary.ratio}%`}
                  </span>
                </div>
                <div className="mbt__popup-stat mbt__popup-stat--price">
                  <span className="mbt__popup-stat-label">Giá dự kiến</span>
                  <span className="mbt__popup-stat-value">
                    {activeZone
                      ? fmtPrice(activeZone.priceFrom, activeZone.priceTo)
                      : fmtPrice(typeSummary.priceMin, typeSummary.priceMax)}
                  </span>
                </div>
              </div>

              <p className="mbt__popup-desc">{activeType.desc}</p>
            </div>
          </div>
        )}

        {Object.entries(types).map(([id, type]) => {
          const isActive = hoverTypeId === id || activeTypeId === id;
          return (
            <button
              key={id}
              type="button"
              className={`mbt__legend-chip${isActive ? " is-active" : ""}`}
              style={{
                "--zone-color": type.color,
                top: type.labelTop,
                left: type.labelLeft,
              }}
              onMouseEnter={handleLegendEnter(id)}
              onMouseLeave={handleLegendLeave}
              onFocus={handleLegendEnter(id)}
              onBlur={handleLegendLeave}
              onClick={(e) => {
                e.stopPropagation();
                setHoverTypeId(id);
                setHoverZoneId(null);
                setPinned(true);
              }}
            >
              <span className="mbt__legend-dot" />
              {type.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
