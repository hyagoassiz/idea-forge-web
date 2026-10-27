"use client";

import { Dialog } from "@/components/Dialog";
import { ControlledTextField } from "@/components/form/ControlledTextField";
import { IconAction } from "@/components/icon/IconAction";
import { InlineEditActions } from "@/components/InlineEditActions";
import { MoreOptions } from "@/components/MoreOptions";
import { useIdeaDetailsDialog } from "@/modules/idea/components/IdeaDetailsDialog/hooks/useIdeaDetailsDialog";
import { Idea } from "@/modules/idea/types";
import { Close } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface IdeaDetailsDialogProps {
  idea: Idea;
  open: boolean;
  onClose(): void;
}

type EditableField = "name" | "description";

export function IdeaDetailsDialog({
  idea,
  open,
  onClose,
}: IdeaDetailsDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { updateIdeaForm, isLoading, handleSave } = useIdeaDetailsDialog({
    idea,
  });

  const [editingField, setEditingField] = useState<EditableField | null>(null);

  const handleCancel = () => {
    if (!editingField) return;

    updateIdeaForm.setValue(editingField, idea[editingField], {
      shouldDirty: false,
    });

    setEditingField(null);
  };

  const handleSaveField = async () => {
    await handleSave();
    setEditingField(null);
  };

  const handleClose = () => {
    handleCancel();
    onClose();
  };

  return (
    <Dialog
      width={1000}
      title={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Detalhes da ideia
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MoreOptions
              size="small"
              options={[
                {
                  label: "Arquivar",
                  disabled: true,
                  onClick: () => console.log("clicou"),
                },
              ]}
            />

            <IconAction
              size="small"
              icon={<Close />}
              tooltip="Fechar"
              onClick={handleClose}
            />
          </Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        divider={
          <Divider
            orientation={isMobile ? "horizontal" : "vertical"}
            flexItem
          />
        }
        spacing={3}
        sx={{ minHeight: 300 }}
      >
        {/* Conteúdo principal */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack spacing={3}>
            {editingField === "name" ? (
              <Box>
                <ControlledTextField
                  name="name"
                  control={updateIdeaForm.control}
                  fullWidth
                  multiline
                  autoFocus
                  size="small"
                  onFocus={(event) => event.target.select()}
                  disabled={isLoading}
                  InputProps={{
                    sx: {
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      lineHeight: 1.334,
                      "& textarea": {
                        font: "inherit",
                        lineHeight: "inherit",
                      },
                    },
                    slotProps: {
                      input: { maxLength: 60 },
                    },
                  }}
                  onBlur={() => setEditingField(null)}
                />

                <InlineEditActions
                  onSave={handleSaveField}
                  onCancel={handleCancel}
                  isLoading={isLoading}
                />
              </Box>
            ) : (
              <Box
                // onClick={() => setEditingField("name")}
                sx={{
                  cursor: "text",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  mx: -1,
                  transition: "background-color 150ms ease",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    overflowWrap: "anywhere",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {updateIdeaForm.watch("name")}
                </Typography>
              </Box>
            )}

            <Box>
              <ControlledTextField
                label="Descrição"
                name="description"
                control={updateIdeaForm.control}
                fullWidth
                multiline
                minRows={3}
                disabled
                // onFocus={() => {
                //   if (!editingField) {
                //     setEditingField("description");
                //   }
                // }}
                InputProps={{
                  readOnly: editingField !== "description",
                  slotProps: {
                    input: { maxLength: 255 },
                  },
                }}
                onBlur={() => setEditingField(null)}
              />

              {editingField === "description" && (
                <InlineEditActions
                  onSave={handleSaveField}
                  onCancel={handleCancel}
                  isLoading={isLoading}
                />
              )}
            </Box>
          </Stack>
        </Box>

        {/* Informações complementares */}
        <Box
          sx={{
            width: isMobile ? "100%" : 240,
            flexShrink: 0,
          }}
        >
          <Stack spacing={2.5}>
            <Typography variant="subtitle1" fontWeight={600}>
              Detalhes
            </Typography>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>

              <Chip
                label={idea.status}
                size="small"
                variant="outlined"
                sx={{ alignSelf: "flex-start" }}
              />
            </Stack>

            {/* Adicione aqui o criador e as datas quando
                confirmar os campos existentes em Idea. */}
          </Stack>
        </Box>
      </Stack>
    </Dialog>
  );
}
