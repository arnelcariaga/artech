import React from "react"
import Head from "next/head"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Footer from "./../Footer"

export default function JoinLayout({ children, title }) {
    return <>
        <Head>
            <title>Artech || {title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        <CssBaseline />
        <Box sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
        }}>
            <Container maxWidth="xs">
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 1 }}>
                        <Typography variant="h5">
                            ARTECH || {title}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 1 }}>
                        {children}
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 1 }}>
                        <Footer />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
}