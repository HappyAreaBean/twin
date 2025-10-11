import { Select, MenuItem, Tooltip } from "@material-ui/core";
import { useEditorSettings } from "hooks/useEditorSettings";
import { useSnackbar } from "notistack";
import React from "react";

const PreviewLanguageButton = () => {
  const { languages, previewLanguage, setPreviewLanguage } = useEditorSettings();
  const { enqueueSnackbar } = useSnackbar();

  const changePreviewLanguage = (evt) => {
    enqueueSnackbar(`Updated preview language to ${evt.target.value}!`, { variant: "info" });
    setPreviewLanguage(evt.target.value);
  };

  return (
    <>
      <Tooltip title="Preview Language">
        <Select value={previewLanguage} onChange={changePreviewLanguage}>
          {languages.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Tooltip>
    </>
  );
};

export default PreviewLanguageButton;
