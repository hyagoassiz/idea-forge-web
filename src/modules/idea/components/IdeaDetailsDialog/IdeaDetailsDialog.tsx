"use client";

import { Dialog } from "@/components/Dialog";
import { ControlledTextField } from "@/components/form/ControlledTextField";
import { useIdeaDetailsDialog } from "@/modules/idea/components/IdeaDetailsDialog/hooks/useIdeaDetailsDialog";
import { Idea } from "@/modules/idea/types";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface IdeaDetailsDialogProps {
  idea: Idea;
  open: boolean;
  onClose(): void;
}

export function IdeaDetailsDialog({
  idea,
  open,
  onClose,
}: IdeaDetailsDialogProps) {
  const { ideaForm, isLoading, handleSave } = useIdeaDetailsDialog({
    idea,
  });

  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameBlur = async () => {
    setIsEditingName(false);

    await handleSave();
  };

  return (
    <Dialog
      title={
        <Stack direction="row" alignItems="center" gap={1}>
          {isEditingName ? (
            <ControlledTextField
              name="name"
              control={ideaForm.control}
              autoFocus
              fullWidth
              inputProps={{ maxLength: 60 }}
              onBlur={handleNameBlur}
            />
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              gap={0.5}
              sx={{
                cursor: "pointer",
                minWidth: 0,
                "&:hover .edit-name-button": {
                  opacity: 1,
                },
              }}
              onClick={() => setIsEditingName(true)}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  overflowWrap: "anywhere",
                  minWidth: 0,
                }}
              >
                {ideaForm.watch("name") || "Nova ideia"}
              </Typography>

              <IconButton
                className="edit-name-button"
                size="small"
                aria-label="Editar nome da ideia"
                sx={{ opacity: 0.6 }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      }
      open={open}
      onClose={onClose}
      actions={[
        {
          id: "cancelar",
          variant: "outlined",
          label: "Cancelar",
          onClick: onClose,
        },
      ]}
    >
      <Stack gap={2}>
        <ControlledTextField
          label="Descrição"
          name="description"
          control={ideaForm.control}
          fullWidth
          minRows={2}
          maxRows={10}
          multiline
          InputProps={{
            slotProps: { input: { maxLength: 255 } },
          }}
        />
      </Stack>
    </Dialog>
  );
}
