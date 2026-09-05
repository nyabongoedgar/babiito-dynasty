import { useState } from "react";
import {
  Box, TextField, Typography, List, ListItemButton,
  Chip, InputAdornment, Stack, Divider, Button,
} from "@mui/material";
import { Search, Plus, Crown } from "lucide-react";
import type { RoyalMember } from "../types";
import { ERA_COLORS } from "../theme";

type EraFilter = "All" | "Foundational" | "Imperial Expansion" | "Modern State";

interface Props {
  members: RoyalMember[];
  selectedId: string | null;
  onSelect: (m: RoyalMember) => void;
  onAdd: () => void;
}

export default function DirectoryPanel({ members, selectedId, onSelect, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState<EraFilter>("All");

  const filtered = members.filter((m) => {
    const matchEra = era === "All" || m.era === era;
    const q = query.toLowerCase();
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.title.toLowerCase().includes(q);
    return matchEra && matchQ;
  });

  return (
    <Box sx={{
      width: 280, flexShrink: 0, display: "flex", flexDirection: "column",
      bgcolor: "rgba(11,15,25,0.95)",
      borderRight: "1px solid rgba(212,175,55,0.15)",
      height: "100%",
    }}>
      {/* Header */}
      <Box sx={{
        p: 2.5, pb: 2,
        background: "linear-gradient(180deg, rgba(30,42,69,0.8) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(212,175,55,0.12)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Crown size={16} color="#D4AF37" />
          <Typography variant="caption" sx={{ color: "primary.main", letterSpacing: "0.12em" }}>
            Royal Directory
          </Typography>
          <Chip label={members.length} size="small" sx={{
            ml: "auto", height: 18, bgcolor: "rgba(212,175,55,0.15)",
            color: "primary.main", fontSize: "0.7rem",
            "& .MuiChip-label": { px: 0.75 },
          }} />
        </Box>

        {/* Search */}
        <TextField
          size="small"
          placeholder="Search by name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={14} color="#94A3B8" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1.5 }}
        />

        {/* Era filters */}
        <Stack direction="row" flexWrap="wrap" gap={0.75}>
          {(["All", "Foundational", "Imperial Expansion", "Modern State"] as EraFilter[]).map((e) => (
            <Chip
              key={e}
              label={e === "Imperial Expansion" ? "Imperial" : e}
              size="small"
              onClick={() => setEra(e)}
              variant={era === e ? "filled" : "outlined"}
              sx={{
                fontSize: "0.68rem",
                height: 22,
                cursor: "pointer",
                ...(era === e
                  ? { bgcolor: "rgba(212,175,55,0.2)", color: "primary.main", borderColor: "rgba(212,175,55,0.5)" }
                  : { borderColor: "rgba(212,175,55,0.15)", color: "text.secondary" }),
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Member list */}
      <List disablePadding sx={{ flex: 1, overflowY: "auto", py: 1 }}>
        {filtered.length === 0 && (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              No members found.
            </Typography>
          </Box>
        )}
        {filtered.map((m) => {
          const eraStyle = ERA_COLORS[m.era] || ERA_COLORS["Modern State"];
          const isSelected = m.id === selectedId;
          return (
            <ListItemButton
              key={m.id}
              selected={isSelected}
              onClick={() => onSelect(m)}
              sx={{
                px: 2, py: 1.25, borderRadius: 0,
                borderLeft: `3px solid ${isSelected ? "#D4AF37" : "transparent"}`,
                "&.Mui-selected": { bgcolor: "rgba(212,175,55,0.08)" },
                "&:hover": { bgcolor: "rgba(212,175,55,0.06)" },
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap sx={{
                  color: isSelected ? "primary.main" : "text.primary",
                  fontWeight: isSelected ? 600 : 400,
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.78rem",
                }}>
                  {m.name}
                </Typography>
                <Typography variant="caption" noWrap sx={{ color: "text.secondary", display: "block", fontSize: "0.7rem" }}>
                  {m.period}
                </Typography>
              </Box>
              <Box sx={{
                width: 6, height: 6, borderRadius: "50%",
                bgcolor: eraStyle.text, flexShrink: 0, ml: 1,
              }} />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(212,175,55,0.12)" }} />

      {/* Add button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Plus size={15} />}
          onClick={onAdd}
          sx={{ py: 1 }}
        >
          Add Member
        </Button>
      </Box>
    </Box>
  );
}
