import { useRef, useState, useCallback, useEffect } from "react";
import { Box, Typography, Chip, Tooltip, IconButton } from "@mui/material";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import type { RoyalMember, TreeNode } from "../types";
import { ERA_COLORS } from "../theme";

function buildTree(members: RoyalMember[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  members.forEach((m) => map.set(m.id, { ...m, children: [], depth: 0 }));
  const roots: TreeNode[] = [];
  map.forEach((node) => {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  function assignDepth(node: TreeNode, d: number) {
    node.depth = d;
    node.children.forEach((c) => assignDepth(c, d + 1));
  }
  roots.forEach((r) => assignDepth(r, 0));
  return roots;
}

interface Props {
  members: RoyalMember[];
  highlightedId: string | null;
  focusId: string | null;
  onSelect: (m: RoyalMember) => void;
}

export default function FamilyTree({ members, highlightedId, focusId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [ancestorPath, setAncestorPath] = useState<Set<string>>(new Set());

  const roots = buildTree(members);

  // Compute ancestor path for highlighted node
  useEffect(() => {
    if (!highlightedId) { setAncestorPath(new Set()); return; }
    const path = new Set<string>();
    const map = new Map(members.map((m) => [m.id, m]));
    let cur = map.get(highlightedId);
    while (cur) {
      path.add(cur.id);
      cur = cur.parentId ? map.get(cur.parentId) : undefined;
    }
    setAncestorPath(path);
  }, [highlightedId, members]);

  // Auto-focus scroll
  useEffect(() => {
    if (!focusId || !containerRef.current) return;
    setTimeout(() => {
      const el = containerRef.current?.querySelector(`[data-node-id="${focusId}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 150);
  }, [focusId]);

  const toggleCollapse = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const zoom = (delta: number) =>
    setScale((s) => Math.max(0.3, Math.min(2, s + delta)));

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {/* Zoom controls */}
      <Box sx={{
        position: "absolute", top: 12, right: 12, zIndex: 10,
        display: "flex", flexDirection: "column", gap: 0.5,
        bgcolor: "rgba(15,23,42,0.9)", borderRadius: 1,
        border: "1px solid rgba(212,175,55,0.2)", p: 0.5,
      }}>
        <Tooltip title="Zoom in" placement="left">
          <IconButton size="small" onClick={() => zoom(0.1)} sx={{ color: "primary.main" }}>
            <ZoomIn size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom out" placement="left">
          <IconButton size="small" onClick={() => zoom(-0.1)} sx={{ color: "primary.main" }}>
            <ZoomOut size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset zoom" placement="left">
          <IconButton size="small" onClick={() => setScale(0.85)} sx={{ color: "text.secondary" }}>
            <Maximize2 size={14} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Scrollable canvas */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1, overflow: "auto", display: "flex",
          alignItems: "flex-start", justifyContent: "center",
          p: 4, cursor: "grab", "&:active": { cursor: "grabbing" },
          scrollbarWidth: "thin", scrollbarColor: "rgba(212,175,55,0.3) transparent",
        }}
        onWheel={(e) => { e.preventDefault(); zoom(e.deltaY < 0 ? 0.08 : -0.08); }}
      >
        <Box sx={{ transform: `scale(${scale})`, transformOrigin: "top center", transition: "transform 0.15s" }}>
          {roots.map((root) => (
            <TreeBranch
              key={root.id}
              node={root}
              collapsed={collapsed}
              ancestorPath={ancestorPath}
              highlightedId={highlightedId}
              focusId={focusId}
              onSelect={onSelect}
              onToggle={toggleCollapse}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function TreeBranch({ node, collapsed, ancestorPath, highlightedId, focusId, onSelect, onToggle }: {
  node: TreeNode;
  collapsed: Set<string>;
  ancestorPath: Set<string>;
  highlightedId: string | null;
  focusId: string | null;
  onSelect: (m: RoyalMember) => void;
  onToggle: (id: string, e: React.MouseEvent) => void;
}) {
  const isCollapsed = collapsed.has(node.id);
  const hasChildren = node.children.length > 0;
  const isHighlighted = node.id === highlightedId;
  const isOnPath = ancestorPath.has(node.id);
  const isFocused = node.id === focusId;
  const eraStyle = ERA_COLORS[node.era] || ERA_COLORS["Modern State"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 200 }}>
      {/* Node card */}
      <Box
        data-node-id={node.id}
        onClick={() => onSelect(node)}
        sx={{
          width: 220,
          p: 2,
          borderRadius: 1.5,
          cursor: "pointer",
          position: "relative",
          border: isHighlighted
            ? "2px solid #D4AF37"
            : isOnPath
            ? "1px solid rgba(212,175,55,0.55)"
            : "1px solid rgba(212,175,55,0.12)",
          bgcolor: isHighlighted
            ? "rgba(212,175,55,0.15)"
            : isOnPath
            ? "rgba(212,175,55,0.07)"
            : "rgba(22,29,48,0.9)",
          boxShadow: isFocused
            ? "0 0 0 3px rgba(212,175,55,0.4), 0 8px 32px rgba(0,0,0,0.5)"
            : isHighlighted
            ? "0 4px 20px rgba(212,175,55,0.3)"
            : "0 2px 12px rgba(0,0,0,0.4)",
          transition: "all 0.2s",
          "&:hover": {
            borderColor: "rgba(212,175,55,0.5)",
            bgcolor: "rgba(212,175,55,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Era dot */}
        <Box sx={{
          position: "absolute", top: 10, right: 10,
          width: 8, height: 8, borderRadius: "50%",
          bgcolor: eraStyle.text, opacity: 0.8,
        }} />

        <Typography variant="body2" sx={{
          color: isHighlighted ? "primary.main" : "text.primary",
          fontFamily: "'Cinzel', serif",
          fontWeight: 600, fontSize: "0.8rem",
          lineHeight: 1.35, mb: 0.5, pr: 1.5,
        }}>
          {node.name}
        </Typography>
        <Typography variant="caption" sx={{
          color: "text.secondary", display: "block",
          fontSize: "0.72rem", fontStyle: "italic", mb: 1,
        }}>
          {node.title}
        </Typography>
        <Typography variant="caption" sx={{
          color: eraStyle.text, fontSize: "0.68rem",
          letterSpacing: "0.05em", display: "block",
        }}>
          {node.period}
        </Typography>

        {/* Collapse toggle */}
        {hasChildren && (
          <Chip
            label={isCollapsed ? `+${node.children.length}` : "−"}
            size="small"
            onClick={(e) => onToggle(node.id, e)}
            sx={{
              position: "absolute", bottom: -10, left: "50%",
              transform: "translateX(-50%)",
              height: 20, fontSize: "0.7rem",
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(212,175,55,0.35)",
              color: "primary.main",
              zIndex: 2,
              "& .MuiChip-label": { px: 1 },
              cursor: "pointer",
            }}
          />
        )}
      </Box>

      {/* Connector line down */}
      {hasChildren && !isCollapsed && (
        <>
          <Box sx={{ width: 2, height: 24, bgcolor: "rgba(212,175,55,0.25)", mt: 1.5 }} />
          {/* Children row */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", position: "relative" }}>
            {/* Horizontal bar */}
            {node.children.length > 1 && (
              <Box sx={{
                position: "absolute", top: 0, left: "50%",
                transform: "translateX(-50%)",
                height: 2, bgcolor: "rgba(212,175,55,0.25)",
                width: `calc(100% - 110px)`,
              }} />
            )}
            {node.children.map((child) => (
              <Box key={child.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ width: 2, height: 20, bgcolor: "rgba(212,175,55,0.25)" }} />
                <TreeBranch
                  node={child}
                  collapsed={collapsed}
                  ancestorPath={ancestorPath}
                  highlightedId={highlightedId}
                  focusId={focusId}
                  onSelect={onSelect}
                  onToggle={onToggle}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
