import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Chip,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Stack,
    Divider,
    IconButton,
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    LinearProgress,
    Grid
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Clear as ClearIcon,
    Download as DownloadIcon,
    ViewList as ViewListIcon,
    DateRange as DateRangeIcon,
    LocationOn as LocationIcon,
    People as PeopleIcon,
    Business as BusinessIcon,
    ContentCopy as ContentIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale/es';
import { GlobalContext, MyState, FormData } from '@/core';
import {
    arrayGruposParlamentarios_tags,
    filterArrayDeputies,
    filterArrayMunicipios_01,
    filterArrayMunicipios_02,
    filterArrayProvincencies,
    newArrayComunidades_tags_01
} from '@/core/data';

interface ModernSearchProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onSearch: (formData: FormData) => void;
    loading?: boolean;
}

export const ModernSearchComponent: React.FC<ModernSearchProps> = ({
    formData,
    setFormData,
    onSearch,
    loading = false
}) => {
    const { t } = useTranslation('global');
    const { state } = useContext<MyState>(GlobalContext);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleInputChange = (field: keyof FormData) => (event: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleMultiSelectChange = (field: keyof FormData) => (event: any) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: typeof value === 'string' ? value.split(',') : value
        }));
    };

    const handleDateChange = (field: 'min' | 'max') => (date: any) => {
        setFormData(prev => ({
            ...prev,
            Presentada: {
                ...prev.Presentada,
                [field]: date ? date.toISOString().split('T')[0] : ''
            }
        }));
    };

    const handleSearch = () => {
        onSearch(formData);
    };

    const handleClear = () => {
        setFormData({
            Expediente: '',
            Contenido: '',
            Presentada: { min: '', max: '' },
            Grupo_Parlamentario: [],
            diputados_autores: [],
            comunidades_tags: [],
            provincia_tags: [],
            municipios_tags: []
        });
        setSelectedFilters([]);
    };

    const getFilterChips = () => {
        const chips = [];

        if (formData.Expediente) chips.push({ label: `Expediente: ${formData.Expediente}`, field: 'Expediente' });
        if (formData.Contenido) chips.push({ label: `Contenido: ${formData.Contenido.substring(0, 30)}...`, field: 'Contenido' });
        if (formData.Presentada.min || formData.Presentada.max) {
            const dateRange = `${formData.Presentada.min || '...'} - ${formData.Presentada.max || '...'}`;
            chips.push({ label: `Fecha: ${dateRange}`, field: 'Presentada' });
        }
        if (formData.Grupo_Parlamentario?.length > 0) {
            chips.push({ label: `Grupos: ${formData.Grupo_Parlamentario.length}`, field: 'Grupo_Parlamentario' });
        }
        if (formData.comunidades_tags?.length > 0) {
            chips.push({ label: `Comunidades: ${formData.comunidades_tags.length}`, field: 'comunidades_tags' });
        }

        return chips;
    };

    const filterChips = getFilterChips();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                }}
            >
                {/* Header */}
                <Box sx={{ p: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Búsqueda Avanzada
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Sistema de búsqueda de preguntas parlamentarias
                    </Typography>
                </Box>

                {/* Quick Search */}
                <Box sx={{ p: 3, bgcolor: 'white' }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                label="Buscar en contenido o expediente"
                                variant="outlined"
                                value={formData.Expediente || formData.Contenido || ''}
                                onChange={(e) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        Expediente: e.target.value,
                                        Contenido: e.target.value
                                    }));
                                }}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#667eea',
                                        },
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    disabled={loading}
                                    startIcon={<SearchIcon />}
                                    sx={{
                                        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                                        borderRadius: 2,
                                        px: 3,
                                        py: 1.5,
                                        fontWeight: 600,
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
                                        }
                                    }}
                                >
                                    Buscar
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => setShowFilters(!showFilters)}
                                    startIcon={<FilterIcon />}
                                    sx={{ borderRadius: 2, px: 2 }}
                                >
                                    Filtros
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Filter Chips */}
                    {filterChips.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Filtros activos:
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {filterChips.map((chip, index) => (
                                    <Chip
                                        key={index}
                                        label={chip.label}
                                        onDelete={() => {
                                            if (chip.field === 'Expediente' || chip.field === 'Contenido') {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    Expediente: '',
                                                    Contenido: ''
                                                }));
                                            } else if (chip.field === 'Presentada') {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    Presentada: { min: '', max: '' }
                                                }));
                                            } else {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    [chip.field]: []
                                                }));
                                            }
                                        }}
                                        sx={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            '& .MuiChip-deleteIcon': {
                                                color: 'white'
                                            }
                                        }}
                                    />
                                ))}
                                <Button
                                    size="small"
                                    onClick={handleClear}
                                    startIcon={<ClearIcon />}
                                    sx={{ ml: 1 }}
                                >
                                    Limpiar todo
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Box>

                {/* Advanced Filters Dialog */}
                <Dialog
                    open={showFilters}
                    onClose={() => setShowFilters(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: 3, minHeight: '70vh' }
                    }}
                >
                    <DialogTitle>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <FilterIcon />
                            <Typography variant="h6">Filtros Avanzados</Typography>
                        </Stack>
                    </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            {/* Basic Information */}
                            <Grid item xs={12}>
                                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ContentIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            Información Básica
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Expediente"
                                                    value={formData.Expediente}
                                                    onChange={handleInputChange('Expediente')}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Contenido"
                                                    value={formData.Contenido}
                                                    onChange={handleInputChange('Contenido')}
                                                    multiline
                                                    rows={3}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Date Range */}
                            <Grid item xs={12}>
                                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                            <DateRangeIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            Rango de Fechas
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <DatePicker
                                                    label="Fecha mínima"
                                                    value={formData.Presentada.min ? new Date(formData.Presentada.min) : null}
                                                    onChange={handleDateChange('min')}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            variant: 'outlined'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <DatePicker
                                                    label="Fecha máxima"
                                                    value={formData.Presentada.max ? new Date(formData.Presentada.max) : null}
                                                    onChange={handleDateChange('max')}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            variant: 'outlined'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Political Filters */}
                            <Grid item xs={12}>
                                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                            <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            Filtros Políticos
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Grupos Parlamentarios</InputLabel>
                                                    <Select
                                                        multiple
                                                        value={formData.Grupo_Parlamentario || []}
                                                        onChange={handleMultiSelectChange('Grupo_Parlamentario')}
                                                        input={<OutlinedInput label="Grupos Parlamentarios" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {(selected as string[]).map((value) => (
                                                                    <Chip key={value} label={value} size="small" />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    >
                                                        {arrayGruposParlamentarios_tags.map((group) => (
                                                            <MenuItem key={group.value} value={group.value}>
                                                                {group.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Diputados</InputLabel>
                                                    <Select
                                                        multiple
                                                        value={formData.diputados_autores || []}
                                                        onChange={handleMultiSelectChange('diputados_autores')}
                                                        input={<OutlinedInput label="Diputados" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {(selected as string[]).map((value) => (
                                                                    <Chip key={value} label={value} size="small" />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    >
                                                        {filterArrayDeputies(formData.Grupo_Parlamentario).map((deputy) => (
                                                            <MenuItem key={deputy.value} value={deputy.value}>
                                                                {deputy.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Geographic Filters */}
                            <Grid item xs={12}>
                                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                            <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                                            Filtros Geográficos
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Comunidades</InputLabel>
                                                    <Select
                                                        multiple
                                                        value={formData.comunidades_tags || []}
                                                        onChange={handleMultiSelectChange('comunidades_tags')}
                                                        input={<OutlinedInput label="Comunidades" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {(selected as string[]).map((value) => (
                                                                    <Chip key={value} label={value} size="small" />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    >
                                                        {newArrayComunidades_tags_01.map((community) => (
                                                            <MenuItem key={community.value} value={community.value}>
                                                                {community.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Provincias</InputLabel>
                                                    <Select
                                                        multiple
                                                        value={formData.provincia_tags || []}
                                                        onChange={handleMultiSelectChange('provincia_tags')}
                                                        input={<OutlinedInput label="Provincias" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {(selected as string[]).map((value) => (
                                                                    <Chip key={value} label={value} size="small" />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    >
                                                        {filterArrayProvincencies(formData.comunidades_tags).map((province) => (
                                                            <MenuItem key={province.value} value={province.value}>
                                                                {province.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Municipios</InputLabel>
                                                    <Select
                                                        multiple
                                                        value={formData.municipios_tags || []}
                                                        onChange={handleMultiSelectChange('municipios_tags')}
                                                        input={<OutlinedInput label="Municipios" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {(selected as string[]).map((value) => (
                                                                    <Chip key={value} label={value} size="small" />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    >
                                                        {[
                                                            ...filterArrayMunicipios_01(formData.provincia_tags),
                                                            ...filterArrayMunicipios_02(formData.provincia_tags)
                                                        ].map((municipality) => (
                                                            <MenuItem key={municipality.value} value={municipality.value}>
                                                                {municipality.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={() => setShowFilters(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                handleSearch();
                                setShowFilters(false);
                            }}
                            variant="contained"
                            disabled={loading}
                            sx={{
                                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
                                }
                            }}
                        >
                            Aplicar Filtros
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Loading Indicator */}
                {loading && (
                    <LinearProgress
                        sx={{
                            background: 'rgba(255,255,255,0.3)',
                            '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                            }
                        }}
                    />
                )}
            </Paper>
        </LocalizationProvider>
    );
};
