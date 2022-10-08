import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React, {ReactNode} from "react";

interface ConfirmDialogProps {
    open: boolean,
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
    title: string,
    textContent: string,
    dialogActions: ReactNode[]
}

function ConfirmDialog(props: ConfirmDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.textContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.dialogActions.map((button: ReactNode) => button)}
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;