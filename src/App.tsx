import { useState, useEffect, useCallback } from "react";
import { ThemeProvider, CssBaseline, Box, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Crown } from "lucide-react";
import { royalTheme } from "./theme";
import { royalApi } from "./api/royalApi";
import { SEED_DATA } from "./data/royalData";
import type { RoyalMember } from "./types";
import DirectoryPanel from "./components/DirectoryPanel";
import FamilyTree from "./components/FamilyTree";
import NodeDetailDrawer from "./components/NodeDetailDrawer";
import CrudDialog from "./components/CrudDialog";

type Snack = { msg: string; severity: "success" | "error" };

function useRoyalMembers() {
  const [members, setMembers] = useState<RoyalMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await royalApi.getAll();
      setMembers(data);
    } catch {
      // Backend unavailable — use static seed data
      setMembers(SEED_DATA);
      setError("Backend offline — showing local data. Start the NestJS server for full CRUD.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { members, setMembers, loading, error, reload: load };
}

export default function App() {
  const { members, setMembers, loading, error } = useRoyalMembers();
  const [selectedMember, setSelectedMember] = useState<RoyalMember | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [editMember, setEditMember] = useState<RoyalMember | null | undefined>(undefined);
  const [snack, setSnack] = useState<Snack | null>(null);
  const [backendOk, setBackendOk] = useState(false);

  useEffect(() => {
    royalApi.getAll().then(() => setBackendOk(true)).catch(() => setBackendOk(false));
  }, []);

  const toast = (msg: string, severity: "success" | "error" = "success") =>
    setSnack({ msg, severity });

  const handleSelect = (m: RoyalMember) => {
    setSelectedMember(m);
    setFocusId(m.id);
  };

  const handleNavigate = (id: string) => {
    const m = members.find((x) => x.id === id);
    if (m) { setSelectedMember(m); setFocusId(id); }
  };

  const handleSave = async (data: Omit<RoyalMember, "createdAt" | "updatedAt">) => {
    try {
      if (editMember) {
        if (backendOk) {
          const updated = await royalApi.update(editMember.id, data);
          setMembers((prev) => prev.map((m) => m.id === editMember.id ? updated : m));
        } else {
          setMembers((prev) => prev.map((m) => m.id === editMember.id ? { ...m, ...data } : m));
        }
        toast("Royal member updated.");
      } else {
        if (backendOk) {
          const created = await royalApi.create(data);
          setMembers((prev) => [...prev, created]);
        } else {
          const newMember = { ...data, id: data.id || `local-${Date.now()}` };
          setMembers((prev) => [...prev, newMember]);
        }
        toast("Royal member added to the lineage.");
      }
    } catch (e: unknown) {
      toast(e instanceof Error ? e.message : "Save failed", "error");
      throw e;
    }
    setEditMember(undefined);
  };

  const handleDelete = async (id: string) => {
    try {
      if (backendOk) await royalApi.remove(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
      setSelectedMember(null);
      toast("Member removed from lineage.");
    } catch (e: unknown) {
      toast(e instanceof Error ? e.message : "Delete failed", "error");
    }
  };

  return (
    <ThemeProvider theme={royalTheme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
        {/* Header */}
        <Box component="header" sx={{
          display: "flex", alignItems: "center", gap: 2,
          px: 3, py: 1.75,
          background: "linear-gradient(90deg, #0B0F19 0%, #0F172A 40%, #0B0F19 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
          flexShrink: 0,
        }}>
          <Crown size={24} color="#D4AF37" />
          <Box>
            <Typography variant="h6" sx={{ color: "primary.main", lineHeight: 1.1, fontSize: "1rem" }}>
              Babiito Dynasty
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.1em" }}>
              Bunyoro-Kitara Royal Blood Directory
            </Typography>
          </Box>
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{
              width: 8, height: 8, borderRadius: "50%",
              bgcolor: backendOk ? "#22C55E" : "#EF4444",
              boxShadow: backendOk ? "0 0 6px #22C55E" : "0 0 6px #EF4444",
            }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {backendOk ? "API Connected" : "Local Mode"}
            </Typography>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {loading ? (
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "primary.main" }} />
            </Box>
          ) : (
            <>
              <DirectoryPanel
                members={members}
                selectedId={selectedMember?.id ?? null}
                onSelect={handleSelect}
                onAdd={() => setEditMember(null)}
              />

              <FamilyTree
                members={members}
                highlightedId={selectedMember?.id ?? null}
                focusId={focusId}
                onSelect={handleSelect}
              />
            </>
          )}
        </Box>

        <NodeDetailDrawer
          member={selectedMember}
          allMembers={members}
          onClose={() => setSelectedMember(null)}
          onEdit={(m) => { setEditMember(m); }}
          onDelete={handleDelete}
          onNavigate={handleNavigate}
        />

        <CrudDialog
          open={editMember !== undefined}
          member={editMember}
          allMembers={members}
          onClose={() => setEditMember(undefined)}
          onSave={handleSave}
        />

        {error && (
          <Snackbar open autoHideDuration={6000} onClose={() => {}}>
            <Alert severity="warning" sx={{ width: "100%" }}>{error}</Alert>
          </Snackbar>
        )}

        <Snackbar
          open={!!snack}
          autoHideDuration={3000}
          onClose={() => setSnack(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snack?.severity} sx={{ width: "100%" }}>
            {snack?.msg}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
