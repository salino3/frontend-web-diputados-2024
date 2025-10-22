import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Alert,
    Fab,
    Tooltip,
    Snackbar
} from "@mui/material";
import {
    TrendingUp as TrendingIcon,
    Search as SearchIcon,
    TableChart as TableIcon,
    Refresh as RefreshIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FormData, GlobalContext, MyState } from "@/core";
import { ModernSearchComponent } from "./components/modern-search/modern-search.component";
import { ModernTableComponent } from "./components/modern-table/modern-table.component";

export const HomePageModern: React.FC = () => {
    const { t } = useTranslation("global");
    const { state, initialFilters, fetchApi } = useContext<MyState>(GlobalContext);
    const [formData, setFormData] = useState<FormData>(initialFilters);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    // Create theme based on dark/light mode
    const theme = createTheme({
        palette: {
            mode: state?.theme === 'dark' ? 'dark' : 'light',
            primary: {
                main: '#667eea',
                light: '#764ba2',
                dark: '#5a67d8',
            },
            secondary: {
                main: '#48bb78',
                light: '#68d391',
                dark: '#38a169',
            },
            background: {
                default: state?.theme === 'dark' ? '#1a202c' : '#f7fafc',
                paper: state?.theme === 'dark' ? '#2d3748' : '#ffffff',
            },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 600,
            },
            h3: {
                fontWeight: 600,
            },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
        },
    });

    const handleSearch = async (searchData: FormData) => {
        setLoading(true);
        try {
            const exactFilters = [""];
            const rangeFilters = ["Presentada"];
            const body = {
                Expediente: searchData?.Expediente,
                Contenido: searchData?.Contenido,
                Presentada: searchData?.Presentada,
                Grupo_Parlamentario:
                    searchData?.Grupo_Parlamentario?.length > 0
                        ? searchData?.Grupo_Parlamentario
                        : "",
                diputados_autores:
                    searchData?.diputados_autores?.length > 0
                        ? searchData?.diputados_autores
                        : "",
                comunidades_tags: searchData?.comunidades_tags,
                provincia_tags: searchData?.provincia_tags,
                municipios_tags: searchData?.municipios_tags,
            };

            await fetchApi(1, 25, body, exactFilters, rangeFilters);
            setSnackbar({ open: true, message: 'Búsqueda completada exitosamente' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error en la búsqueda' });
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        handleSearch(formData);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: state?.theme === 'dark'
                        ? 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 4,
                }}
            >
                <Container maxWidth="xl">
                    {/* Header */}
                    <Paper
                        elevation={8}
                        sx={{
                            mb: 4,
                            background: state?.theme === 'dark'
                                ? 'rgba(45, 55, 72, 0.95)'
                                : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 4,
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            }}
                        >
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    mb: 2,
                                }}
                            >
                                <TrendingIcon sx={{ mr: 2, verticalAlign: 'middle', fontSize: 'inherit' }} />
                                {t("home.title")}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ maxWidth: 600, mx: 'auto' }}
                            >
                                Sistema avanzado de búsqueda y análisis de preguntas parlamentarias
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Main Content */}
                    <Grid container spacing={4}>
                        {/* Search Panel */}
                        <Grid item xs={12} lg={4}>
                            <ModernSearchComponent
                                formData={formData}
                                setFormData={setFormData}
                                onSearch={handleSearch}
                                loading={loading}
                            />
                        </Grid>

                        {/* Results Panel */}
                        <Grid item xs={12} lg={8}>
                            <ModernTableComponent
                                data={state?.data?.products || []}
                                loading={loading}
                                totalCount={state?.data?.totalProducts || 0}
                                onRefresh={handleRefresh}
                            />
                        </Grid>
                    </Grid>

                    {/* Floating Action Button */}
                    <Fab
                        color="primary"
                        aria-label="refresh"
                        onClick={handleRefresh}
                        disabled={loading}
                        sx={{
                            position: 'fixed',
                            bottom: 24,
                            right: 24,
                            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
                            },
                        }}
                    >
                        <RefreshIcon />
                    </Fab>

                    {/* Snackbar for notifications */}
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={4000}
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={() => setSnackbar({ ...snackbar, open: false })}
                            severity="success"
                            variant="filled"
                            sx={{ borderRadius: 2 }}
                        >
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </ThemeProvider>
    );
};
