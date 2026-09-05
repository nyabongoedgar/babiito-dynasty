import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack, Typography,
} from "@mui/material";
import type { RoyalMember, Era } from "../types";

const ERAS: Era[] = ["Foundational", "Imperial Expansion", "Modern State"];

interface Props {
  open: boolean;
  member?: RoyalMember | null;
  allMembers: RoyalMember[];
  onClose: () => void;
  onSave: (data: Omit<RoyalMember, "createdAt" | "updatedAt">) => Promise<void>;
}

const empty = (): Omit<RoyalMember, "createdAt" | "updatedAt"> => ({
  id: "",
  name: "",
  title: "",
  era: "Foundational",
  period: "",
  details: "",
  parentId: null,
});

export default function CrudDialog({ open, member, allMembers, onClose, onSave }: Props) {
  const [form, setForm] = useState(empty());
  const [saving, setSaving] = useState(false);
  const isEdit = !!member;

  useEffect(() => {
    if (member) {
      setForm({
        id: member.id,
        name: member.name,
        title: member.title,
        era: member.era,
        period: member.period,
        details: member.details,
        parentId: member.parentId,
      });
    } else {
      setForm(empty());
    }
  }, [member, open]);

  const set = (field: string, value: string | null) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const valid = form.name.trim() && form.title.trim() && form.period.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: "'Cinzel', serif", color: "primary.main", borderBottom: "1px solid rgba(212,175,55,0.2)", pb: 2 }}>
        {isEdit ? "Edit Royal Member" : "Add Royal Member"}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2.5}>
          {!isEdit && (
            <TextField
              label="ID (optional, auto-generated if blank)"
              value={form.id}
              onChange={(e) => set("id", e.target.value)}
              size="small"
              fullWidth
            />
          )}
          <TextField
            label="Full Name *"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Title / Rank *"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            select
            label="Era"
            value={form.era}
            onChange={(e) => set("era", e.target.value)}
            size="small"
            fullWidth
          >
            {ERAS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
          </TextField>
          <TextField
            label="Period *"
            value={form.period}
            onChange={(e) => set("period", e.target.value)}
            size="small"
            fullWidth
            placeholder="e.g. Reigned c. 1786–1835"
          />
          <TextField
            select
            label="Parent Member"
            value={form.parentId ?? ""}
            onChange={(e) => set("parentId", e.target.value || null)}
            size="small"
            fullWidth
          >
            <MenuItem value="">— None (Root) —</MenuItem>
            {allMembers
              .filter((m) => m.id !== form.id)
              .map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  <Typography variant="body2" noWrap>{m.name}</Typography>
                </MenuItem>
              ))}
          </TextField>
          <TextField
            label="Historical Details"
            value={form.details}
            onChange={(e) => set("details", e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, borderTop: "1px solid rgba(212,175,55,0.15)" }}>
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!valid || saving}
        >
          {saving ? "Saving…" : isEdit ? "Update" : "Add to Lineage"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
