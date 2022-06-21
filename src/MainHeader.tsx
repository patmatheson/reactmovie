import { SystemUpdateTwoTone } from "@mui/icons-material";
import { Avatar, Box, Container, Grid, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import ThreePaneLayout from "./ThreePaneLayout";
import { signOut, getAuth, Auth, User } from "firebase/auth";

export interface MainHeaderProps{
    setUserId: (userId: string) => void;

}


export default function MainHeader(props: MainHeaderProps) {
    const auth = getAuth() as Auth;
    const googleUser = auth.currentUser as User;

    const userName = googleUser.displayName || undefined;
    const profilePic = googleUser.photoURL || undefined;

    const [avatarAnchor, setAvatarAnchor] = React.useState<null | HTMLElement>(null);
    const avatarIsOpen = Boolean(avatarAnchor);
    let isAdmin = false;
    if (googleUser.uid == "UcIN6lIg0Rcgc9tysruI5MZkJch1"){
        isAdmin = true;
    }
    const avatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAvatarAnchor(event.currentTarget);
    };
    const avatarClose = () => {
        setAvatarAnchor(null);
    }
    const avatarSelect = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = (event.target as HTMLInputElement).id;
        if (target == "logout"){
            console.log("Logout Selected");
            signOut(auth)
                .then(() => {
                    props.setUserId("");
                });
        }
        setAvatarAnchor(null);
    }

    return (


    <Grid padding={1} alignItems="center" container justifyContent="right">
        <Grid item xs={11}>
            <Typography textAlign="start" variant="h4" component="div">
                Movie Night
            </Typography>
        </Grid>
        <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
                <IconButton
                    id="avatar"
                    size="small"
                    aria-controls={avatarIsOpen ? 'avatar-Menu' : undefined}
                    aria-haspoppup = "true"
                    aria-expanded={avatarIsOpen ? 'true' : undefined}
                    onClick={avatarClick}
                >
                    <Avatar alt={userName} src={profilePic} />
                </IconButton>
                <Menu
                    anchorEl={avatarAnchor}
                    id="avatar-menu"
                    open={avatarIsOpen}
                    onClose={avatarClose}
                    onClick={avatarSelect}
                >
                    <MenuItem id="logout">
                        Logout
                    </MenuItem>
                    <MenuItem
                        disabled={!isAdmin}>
                        Complete Vote (Admin)   
                    </MenuItem>
                    <MenuItem
                        disabled={!isAdmin}>
                        Reset Vote (Admin)   
                    </MenuItem>

                </Menu>
            </Box>
        </Grid>
    </Grid>
  );
}