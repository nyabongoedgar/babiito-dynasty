import {
  Drawer, Box, Typography, IconButton, Divider,
  Chip, Button, Stack,
} from "@mui/material";
import { X, Crown, Edit, Trash2, Users, UserCheck } from "lucide-react";
import type { RoyalMember } from "../types";
import { ERA_COLORS } from "../theme";

interface Props {
  member: RoyalMember | null;
  allMembers: RoyalMember[];
  onClose: () => void;
  onEdit: (m: RoyalMember) => void;
  onDelete: (id: string) => void;
  onNavigate: (id: string) => void;
}

export default function NodeDetailDrawer({ member, allMembers, onClose, onEdit, onDelete, onNavigate }: Props) {
  if (!member) return null;

  const parent = allMembers.find((m) => m.id === member.parentId);
  const children = allMembers.filter((m) => m.parentId === member.id);
  const siblings = allMembers.filter(
    (m) => m.parentId === member.parentId && m.id !== member.id
  );

  const eraStyle = ERA_COLORS[member.era] || ERA_COLORS["Modern State"];

  return (
    <Drawer anchor="right" open={!!member} onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100vw", sm: 420 }, p: 0 } }}
    >
      {/* Gold header bar */}
      <Box sx={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E2A45 100%)",
        borderBottom: "2px solid rgba(212,175,55,0.4)",
        p: 3, pb: 2.5,
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
          <Crown size={22} color="#D4AF37" />
          <IconButton size="small" onClick={onClose} sx={{ color: "text.secondary", mt: -0.5 }}>
            <X size={18} />
          </IconButton>
        </Box>
        <Typography variant="h5" sx={{ color: "primary.main", lineHeight: 1.3, mb: 0.75 }}>
          {member.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic", mb: 1.5 }}>
          {member.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label={member.era}
            size="small"
            sx={{
              bgcolor: eraStyle.bg,
              color: eraStyle.text,
              border: `1px solid ${eraStyle.border}`,
              fontSize: "0.75rem",
            }}
          />
          <Chip
            label={member.period}
            size="small"
            variant="outlined"
            sx={{ borderColor: "rgba(212,175,55,0.25)", color: "text.secondary", fontSize: "0.75rem" }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 3, overflowY: "auto", flex: 1 }}>
        {/* Details */}
        <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.8, mb: 3 }}>
          {member.details}
        </Typography>

        <Divider sx={{ borderColor: "rgba(212,175,55,0.15)", mb: 2.5 }} />

        {/* Kinship */}
        <Typography variant="caption" sx={{ color: "primary.main", mb: 1.5, display: "block" }}>
          Kinship Links
        </Typography>
        <Stack spacing={1} sx={{ mb: 3 }}>
          {parent && (
            <KinshipLink label="Parent" member={parent} onNavigate={onNavigate} icon={<UserCheck size={14} />} />
          )}
          {children.map((c) => (
            <KinshipLink key={c.id} label="Child" member={c} onNavigate={onNavigate} icon={<Users size={14} />} />
          ))}
          {siblings.map((s) => (
            <KinshipLink key={s.id} label="Sibling" member={s} onNavigate={onNavigate} icon={<Users size={14} />} />
          ))}
          {!parent && !children.length && !siblings.length && (
            <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              No linked relations in dataset.
            </Typography>
          )}
        </Stack>

        <Divider sx={{ borderColor: "rgba(212,175,55,0.15)", mb: 2.5 }} />

        {/* Actions */}
        <Stack direction="row" spacing={1.5}>
          <Button
            startIcon={<Edit size={15} />}
            variant="outlined"
            size="small"
            onClick={() => onEdit(member)}
            sx={{ borderColor: "rgba(212,175,55,0.35)", color: "primary.main", flex: 1 }}
          >
            Edit
          </Button>
          <Button
            startIcon={<Trash2 size={15} />}
            variant="outlined"
            size="small"
            color="error"
            onClick={() => { onDelete(member.id); onClose(); }}
            sx={{ flex: 1 }}
          >
            Remove
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

function KinshipLink({ label, member, onNavigate, icon }: {
  label: string; member: RoyalMember; onNavigate: (id: string) => void; icon: React.ReactNode;
}) {
  return (
    <Box
      onClick={() => onNavigate(member.id)}
      sx={{
        display: "flex", alignItems: "center", gap: 1.5,
        p: 1.25, borderRadius: 1, cursor: "pointer",
        border: "1px solid rgba(212,175,55,0.12)",
        bgcolor: "rgba(212,175,55,0.04)",
        "&:hover": { bgcolor: "rgba(212,175,55,0.1)", borderColor: "rgba(212,175,55,0.3)" },
        transition: "all 0.18s",
      }}
    >
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
          {label}
        </Typography>
        <Typography variant="body2" noWrap sx={{ color: "text.primary" }}>
          {member.name}
        </Typography>
      </Box>
    </Box>
  );
}
